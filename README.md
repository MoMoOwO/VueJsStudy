# Vue.js学习记录

  1. [视频链接](https://www.bilibili.com/video/av50680998)，P200之后的2019系列教程内容。  

  2. 笔记为个人纪录，章节号与文件夹序号对应。

## Vue概述

  1. Vue：渐进式JavaScript框架，声明式渲染->组件系统->客户端路由->集中式状态管理->项目构建。  

  2. 优点：  

      (1) 易用：熟悉HTML、CSS、JavaScript知识后可快速上手Vue；  

      (2) 灵活：在一个库和一套完整框架之间自如伸缩；  

      (3) 高效：20KB运行大小，超快虚拟DOM。

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
        + 概述编译过程的原理：Vue 语法 -> 原生 js 语法
        + ![编译过程总览](http://image.acmx.xyz/msj%2F1.png)

## Vue 模板语法

  1. 模板语法概述  

      (1) 如何理解前端渲染？  
        + 把数据填充到HTML标签中。
        + ![前端渲染](http://image.acmx.xyz/msj%2F2.png)

      (2) 前端渲染方式有哪些？  
        + 原生 js 拼接字符串：基本上就是将数据以字符串的方式拼接HTML标签中；缺点是不同的开发人员的代码风格差别很大，随着业务的复杂，后期的维护便地逐渐困难起来；
        + 使用前端模板引擎：基于模板引擎的一段代码，与拼接字符相比代码明显规范了很多，它拥有自己的一套模板语法规范；优点是大家都遵循同样的规范写代码，代码可读性明显提高了，方便后期的维护；缺点是没有专门提供事件机制；
        + 使用 Vue 特有的模板语法：插值表达式、指令、事件绑定、属性绑定、样式绑定、分支循环结构。  

  2. 指令  

      (1) 什么是指令？  
        + 什么是自定义属性？
        + 指令的本质就是自定义属性。
        + 指令的格式：以 `v-` 开始（比如：`v-cloak`）。

      (2) `v-cloak` 指令用法：  
        + 插值表达式存在的问题：“闪动/闪烁”；
        + 如何解决该问题：使用 `v-cloak` 指令；
        + 解决该问题的原理：先隐藏，替换好值之后再显示最终的值。
        + v-cloak指令的用法：首先提供如下样式，之后在插值表达式所在的标签中添加v-cloak指令。 

          ``` CSS
            [v-cloak]{
                display: none;
            }
          ```

      (3) 数据绑定指令 `v-text` 指令：
        + 绑定数据信息；
        + 相比插值表达式更加简洁。

      (4) 数据绑定指令 `v-html` 指令：
        + 绑定 HTML 文档；
        + 存在安全问题；  
        + 本网站内部数据可以使用，来自第三方的数据不可以使用。

      (5) 数据绑定指令 `v-pre` 指令：
        + 显示 HTML 标签中的原始信息，跳过编译过程。

  3. 数据响应式  

      (1) 如何理解响应式
        + HTML5 中的响应式：屏幕尺寸的变花导致样式的变化；
        + 数据的响应式：数据的变化导致页面内容的变化。

      (2) 什么是数据绑定？
        + 数据绑定：将数据填充到标签中。

      (3) `v-once` 指令，只编译一次
        + 显示内容之后不再具有响应式功能。
        + `v-once` 的应用场景：如果显示的信息后续不需要再修改，我们可以使用 `v-once`，这样可以提高性能。

  4. 双向数据绑定  

      (1) 什么是双向数据绑定？  
        + 页面中的数据发生改变，ViewModel 实例中的数据也发生改变，进而页面中其他使用该数据的地方也会发生数据的的改变。
        + ![双向数据绑定](http://image.acmx.xyz/msj%2F3.png)

      (2) 双向绑定分析，如何实现双向绑定，`v-model` 指令
        + 使用 `v-model` 指令来实现数据的双向绑定，一方的数据发生变化会影响另一方的数据。

        + ``` HTML
          <!-- 使用 v-model 指令来实现双向数据绑定 -->
          <input type="text" v-model="msg">
          ```

      (3) MVVM 设计思想
        + M：Model、V：View、VM：ViewModel。
        + [Vue 与 MVVM](https://is.gd/aE5ZYh)
        + ![Vue.js 中的 MVVM](http://image.acmx.xyz/msj%2F4.png)

## Vue 基础案例

## Vue 常用特性

## Vue综合案例