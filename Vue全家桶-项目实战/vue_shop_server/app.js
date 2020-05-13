const express = require('express')
// 导入压缩传输包
const compression = require('compression')
const https = require('https')
const fs = require('fs')
const options = {
    cert: fs.readFileSync('./ssl/full_chain.pem'),
    key: fs.readFileSync('./ssl/private.key')
}

// 创建 web 服务器
const app = express()

// 启用压缩传输中间件，一定要把这一行代码，写到静态资源托管之前
app.use(compression())
// 托管静态资源
app.use(express.static('./dist'))
// 启动 web 服务器
app.listen(80, () => {
    console.log('server running at http://127.0.0.1')
})

// 启用 https
// https.createServer(options, app).listen(443)
