const path = require("path");
const nodeExternal = require("webpack-node-externals");
const CURRENT_WORKING_DIR = process.cwd();

const config = {
  name: "server",
  entry: [path.join(CURRENT_WORKING_DIR, "./server/server.js")],
  target: "node",
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist/"),
    filename: "server.generated.js",
    publicPath: "/dist/",
    libraryTarget: "commonjs2",
  },
  externals: [nodeExternal()],
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: "/.(ttf|eot|svg|gif|jpg|png)(?[sS]+)?$/",
        use: "file-loader",
      },
    ],
  },
};
module.exports = config;
