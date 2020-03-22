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

// Ajax、Promise基本使用测试接口
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

// Promise 常用 API 测试接口
app.get("/a1", (req, res) => {
  setTimeout(function () {
    res.send("Hello a1!");
  }, 1000);
});
app.get("/a2", (req, res) => {
  setTimeout(function () {
    res.send("Hello a2!");
  }, 2000);
});
app.get("/a3", (req, res) => {
  setTimeout(function () {
    res.send("Hello a3!");
  }, 3000);
});

// fetch 用法测试接口
app.get("/fdata", (req, res) => {
  res.send("Hello Fetch!");
});
app.get("/books", (req, res) => {
  // req.query是包含传统 url 请求传递的参数的。
  res.send("传统的 url 传递参数：" + req.query.id);
});
app.get("/fruits/:id", (req, res) => {
  // req.params是包含 Restful 形式的 url 请求传递的参数的。
  res.send("Restful 形式的 url 传递参数：" + req.params.id);
});
app.delete("/books/:id", (req, res) => {
  // req.params是包含 Restful 形式的 url 请求传递的参数的。
  res.send("delete 请求传递参数：" + req.params.id);
});

// 启动监听
app.listen(3000, () => {
  console.log("running...");
});
