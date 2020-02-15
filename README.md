# Vue.js学习记录

  1. [视频链接](https://www.bilibili.com/video/av50680998)，P200之后的2019系列教程内容。
  2. 笔记为个人纪录，章节号与文件夹序号对应。

## Vue概述

  1. Vue：渐进式JavaScript框架，声明式渲染->组件系统->客户端路由->集中式状态管理->项目构建。
  2. 优点：  
      + 易用：熟悉HTML、CSS、JavaScript知识后可快速上手Vue；  
      + 灵活：在一个库和一套完整框架之间自如伸缩；  
      + 高效：20KB运行大小，超快虚拟DOM。

## Vue基本使用

  1. 在DOM中渲染Hello World的三种实现方式对比。  

      ``` HTML
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- 引入 jQuery 依赖 -->
            <script src="./js/jquery-3.4.1.js"></script>
            <!-- 引入 Vue 依赖 -->            <script src="./js/vue.js"></script>
            <title>Document</title>
        </head>
        <body>

            <div id="msgdiv1"></div>
            <div id="msgdiv2"></div>
            <div id="msgdiv3">{{ msg }}</div>

            <script>
                // 使用原生 js 在 div 中输出 Hello World
                let msg = 'Hello World! --- JS';
                let div = document.querySelector("#msgdiv1"); // 获取 DOM 元素
                div.innerHTML = msg;

                // 使用 jQuery 在 div 中输出 Hello World
                msg = 'Hello World! --- jQuery';
                $('#msgdiv2').html(msg);

                // 使用 Vue 在 div 中输出 Hello World
                let vm = new Vue({
                    el: '#msgdiv3',
                    data: {
                        msg: 'Hello World! --- Vue'
                    }
                })
            </script>
        </body>
        </html>
      ```  

  2. Vue.js 之 HelloWorld 细节分析。  

      (1) 实例参数分析：  
        + el：元素的挂载的位置（值可以是 CSS 选择器或者 DOM 元素）。
        + data：模型数量（值是一个对象）。  

      (2) 插值表达式 {{}}：  
        + 将数据填充到 HTML 标签中。
        + 插值表达式支持基本的计算操作。  

      (3) Vue 代码运行原理分析  
        + 概述编译过程的原理：Vue语法->原生js语法
        + ![编译过程](https://yanxuan.nosdn.127.net/7ac0dd6c1b285530b7b92aa284a90e54.png)

## Vue 模板语法

## Vue 基础案例

## Vue 常用特性

## Vue综合案例