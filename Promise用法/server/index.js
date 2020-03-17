const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// 处理静态资源
app.use(express.static("public"));
// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// 设置允许跨域访问该服务
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "mytoken");
  next();
});

// 路由
app.get("/data", (req, res) => {
  res.send("Hello World!");
});
app.get("/data1", (req, res) => {
  setTimeout(function () {
    res.send("Hello TOM!");
  }, 1000);
});
app.get("/data2", (req, res) => {
  res.send("Hello JERRY!");
});

// 启动监听
app.listen(3000, () => {
  console.log("running...");
});
