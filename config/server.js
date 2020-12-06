const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const config = require("./dev.webpack.config.js");
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    writeToDisk: true, // 文件保存在内存
  })
);

app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__yejiawei',    // 必须和客户端设置的path一致
    heartbeat: 5000,        // 检查和客户端是否保持连接的时间间隔，必须比客户端设置的timeout小，一般为一半
}));

app.listen(4000, function () {
  console.log("Example app listening on port 4000!\n");
});
