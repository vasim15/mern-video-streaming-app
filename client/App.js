import React, {useEffect} from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import MainRouter from "./MainRouter";

const App = () => {
  useEffect(() => {
     const jssStyles = document.querySelector("#jss-server-side");
     if (jssStyles) {
       jssStyles.parentElement.removeChild(jssStyles);
     }
  }, []);


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};
export default hot(module)(App);
