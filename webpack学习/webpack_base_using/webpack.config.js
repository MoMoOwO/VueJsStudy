const path = require("path"); // 导入 node.js 中专门操作路径的模块
// 导入生成预览页面的插件，得到一个构造函数
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 导入 vue
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const htmlPlugin = new HtmlWebpackPlugin({ // 创建插件的实例对象
    template: "./src/index.html", // 指定要用到的模板文件
    filename: "index.html" // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
});

module.exports = {
    // 编译模式
    // 两个可选值 development production
    mode: "development",
    entry: path.join(__dirname, "./src/index.js"), // 打包入口文件的路径
    output: {
        path: path.join(__dirname, "./dist"), // 输出文件的存放路径
        filename: "bundle.js" // 输出文件的名称
    },
    plugins: [
        htmlPlugin,
        new VueLoaderPlugin() // vue 单文件加载，请确保引入这个插件
    ], // plugins 数组是 webpack 打包期间会用到的一些插件列表
    // 所有第三方文件模块的匹配规则
    module: {
        rules: [
            // css 文件加载器
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            // less 文件加载器
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            // sass 文件加载器
            {
                test: /\.scss/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            // 图片、字体文件加载器
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: "url-loader?limit=16940"
            },
            // 高级 js 加载器
            // exclude 未排除想，表示 babel-loader 不需要处理 node_modules 中的 js 文件
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            // vue 加载器
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    }
}
