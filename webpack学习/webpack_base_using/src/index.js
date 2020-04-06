// 引入 jquery
import $ from "jquery";
// 引入 css 样式文件
import "./css/1.css";
// 引入 less 样式文件
import "./css/1.less";
// 引入 sass 样式文件
import "./css/1.scss";
// 引入 vue 单文件组件
//import App from "./components/App.vue";

// 列表项交替变色
$(function () {
    $("li:odd").css("backgroundColor", "red");
    $("li:even").css("backgroundColor", "lightblue");
});

// js 高级语法
class Person {
    static info = "aaa";
}

console.log(Person.info);

// -----------------------
// 1. 导入 Vue 构造函数
import Vue from "vue";
// 2.引入 App 根组件
import App from "./components/App.vue";

const vm = new Vue({
    // 3. 指定 vm 实例要控制的页面区域
    el: "#app",
    // 4. 通过 render 函数，把指定的组件渲染到 el 区域中
    render: h => h(App)
});
