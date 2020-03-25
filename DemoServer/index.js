const express = require("express");
const app = express();
// post、put 请求传参的中间件
const bodyParser = require("body-parser");
// 处理静态资源
app.use(express.static("public"));
// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoriaztion");
  // res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Headers', 'mytoken');

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
  // req.query 是包含传统 url get 请求传递的参数的。
  res.send("传统的 url 传递参数：" + req.query.id);
});
app.get("/fruits/:id", (req, res) => {
  // req.params 是包含 Restful 形式的 url get 请求传递的参数的。
  res.send("Restful 形式的 url 传递参数：" + req.params.id);
});
app.delete("/books/:id", (req, res) => {
  res.send("delete 请求传递参数：" + req.params.id);
});
app.post("/books", (req, res) => {
  // req.body 中包含 post 请求传递的参数
  res.send("post 请求传参：" + req.body.username + "---" + req.body.pwd);
});
app.put("books/:id", (req, res) => {
  res.send("put 请求传参：" + req.params.id + "---" + req.body.username + "---" + req.body.pwd)
});
app.get("/json", (req, res) => {
  // 发送 json 数据
  res.json({
    username: "张三",
    gender: "男",
    age: 17
  });
});

// axios 后台 API 接口
app.get("/adata", (rea, res, next) => {
  res.send("Hello axios!");
});
app.get("/axios", (req, res, next) => {
  res.send("axios get （URL 或 params）传递的参数：" + req.query.id);
});
app.get("/axios/:id", (req, res, next) => {
  res.send("axios get （Restful）传递的参数：" + req.params.id);
});
app.delete("/axios", (req, res, next) => {
  res.send("axios delete （URL 或 params）传递的参数：" + req.query.id);
});
app.delete("/axios/:id", (req, res, next) => {
  res.send("axios delete （Restful）传递的参数：" + req.params.id);
});
app.post("/axios", (req, res, next) => {
  res.send("axios post （选项列表）传递参数：" + req.body + req.body.uname);
})


// 启动监听
app.listen(3000, () => {
  console.log("running...");
});
