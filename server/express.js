import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { matchPath } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@mui/styles";

import authRoutes from "./routes/auth.router";
import userRoutes from "./routes/user.router";
import mediaRoutes from "./routes/media.router";
import template from "../template";
import theme from "../client/theme";
import MainRouter from "../client/MainRouter";
import routes from "../client/routeConfig";

import devBundal from "./devBundal";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();


devBundal.compile(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", mediaRoutes);

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/*", (req, res, next) => {
  console.log(req.url, 'URL')
  const activeRoute = routes.find((route) => matchPath(route.path, req.url)) || {};
  const promis = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  const sheet = new ServerStyleSheets();
  const context = {};

  promis
    .then((data) => {
      const markup = ReactDOMServer.renderToString(
        sheet.collect(
          <StaticRouter location={req.url} contex={context}>
            <ThemeProvider theme={theme}>
              <MainRouter serverData={data} />
            </ThemeProvider>
          </StaticRouter>
        )
      );
      if (context.url) {
        return res.redirect(303, context.url);
      }
      const css = sheet.toString();
      res.status(200).send(
        template({
          markup: markup,
          css: css,
        })
      );
    })
    .catch(next);
});


app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error: err.name + ": " + err.message,
    });
  } else if (err) {
    res.status(400).json({
      error: err.name + ": " + err.message,
    });
    console.log(err);
  }
});

export default app;
