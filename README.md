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
        + 实例：

          ``` HTML
          <!-- 使用 v-model 指令来实现双向数据绑定 -->
          <input type="text" v-model="msg">
          ```

      (3) MVVM 设计思想
        + M：Model、V：View、VM：ViewModel。
        + [Vue 与 MVVM](https://is.gd/aE5ZYh)
        + ![Vue.js 中的 MVVM](http://image.acmx.xyz/msj%2F4.png)

  5. 事件绑定  

      (1) Vue 如何处理事件？
        + `v-on` 指令来实现事件的监听。
        + 实例：

          ``` HTML
          <div id="app">
            <div>{{ num }}</div>
            <!-- 
                v-on 指令的用法是在 v-on:监听事件名，可以使用 @ 来对 v-on: 进行简写
            -->
            <div><input type="button" value="点击增加" v-on:click="num++"></div>
            <div><input type="button" value="点击减少" @click="num--"></div>
          </div>
          ```

      (2) Vue 中事件处理/响应函数的调用方式。
        + Vue 中在绑定时间响应函数的时候可以直接使用函数名也可以使用调用函数的方式。
        + 实例：

          ``` HTML
          <div id="app">
            <div>{{ num }}</div>
            <!-- 
                事件响应函数调用可以直接绑定函数名称，也可以通过调用函数的方式。
                事件响应函数定义在 Vue 实例u第项的 methods 对象属性中。
            -->

            <div><input type="button" value="点击增加" v-on:click="addNum"></div>
            <div><input type="button" value="点击减少" @click="subNum()"></div>
          </div>
          ```

      (3) 事件函数的参数传递
        + 传递的参数有两类：普通参数和事件对象。传递参数的方式也有所不同。
        + 实例：

          ``` HTML JavaScript
          <div id="app">
            <div>{{ num }}</div>
            <!-- 
                事件响应函数与参数传递
                1.如果时间直接绑定函数名称，那么默认会传递事件对象作为事件函数的第一个参数
                2.如果事件绑定函数调用，那么事件兑现必须作为最后一个参数显示传递，并且事件名称的名字必须是 $event。
            -->
            <div><input type="button" value="+3" v-on:click="addNum"></div>
            <div><input type="button" value="-2" @click="subNum('减', '二', $event)"></div>
          </div>

          <script>
              let vm = new Vue({
                  el: '#app',
                  data: {
                      num: 0
                  },
                  methods: {
                      addNum(event){
                          console.log(event.target.tagName);
                          // 这里的 this 指向的是 Vue 实例对象
                          this.num += 3;
                      },
                      subNum(p1, p2, event){
                          console.log(p1, p2);
                          console.log(event.target.tagName);
                          this.num -= 2;
                      }
                  }
              });
          </script>
          ```

      (4) 事件修饰符
        + `.stop` 阻止事件冒泡，实例：

          ``` HTML
          <div style="height: 300px; width: 300px; background-color: red;" v-on:click='divClick'>
            <!-- 
                传统的阻止冒泡的方式为通过js调用事件对象的 stopPropagation() 方法。
                Vue 提供了事件修饰符 .stop 来阻止事件冒泡，即子元素的事件触发不会触发父元素的事件。
                使用方式为：在绑定事件监听时在事件名称后面紧跟 .stop 修饰符。
            -->
            <input type="button" value="点击我" v-on:click='btnClick'>
          </div>
          ```

        + `.prevent` 阻止默认行为，实例：

          ``` HTML
          <div style="height: 300px; width: 300px; background-color: green;">
              <!-- 
                  传统的的阻止默认行为的方式为通过js调用事件对象的 preventDefault() 方法
                  Vue 提供了事件修饰符 .prevent 来阻止默认行为，即取消特定标签的默认行为，如 a 标签的跳转刷新。
                  使用方式为：在绑定事件监听时在事件名称后面紧跟 .prevent 修饰符。
              -->
              <a href="www.baidu.com" v-on:click.prevent="aClick">去百度</a>
          </div>
          ```

        + `.self` 只当事件是从侦听器绑定的元素本身触发时才触发回调，实例：

          ``` HTML
          <!-- 
              Vue 提供了时间修饰符 .self 只当事件是从侦听器绑定的元素本身触发时才触发回调。
          -->
          <div style="height: 300px; width: 300px; background-color: blue;" v-on:click.self="cdivClick">
              <button v-on:click="cbtnClick">点击</button>
          </div>
          ```

## Vue 基础案例

## Vue 常用特性

## Vue综合案例
