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

      (5) 按键修饰符
        + `.enter` 当回车键触发事件时产生回调，实例：

          ``` HTML
          <input type="text" name="password" @keyup.enter="handleSubmit" v-model="passWord">
          ```

        + `.delete` 当删除键出发事件时产生回调，实例：

          ``` HTML
          <input type="text" name="username" @keydown.delete="clearContent" v-model="userName">
          ```

      (6) 自定义按键修饰符
        + 通过全局 `config.keyCodes` 对象来自定义按键修饰符。
        + 规则：自定义按键修饰符名字是自定义的，但是对应的值必须是案件对应 event.keyCode 值，实例：

          ``` JavaScript
          Vue.config.keyCodes.f1 = 112;
          ```

  6. 属性绑定  

      (1) Vue 如何动态处理属性？
        + `v-bind` 指令用法，实例：

          ``` HTML
          <a v-bind:href="url">百度</a>
          ```

        + `v-bind` 指令可以只缩写为 `:`，实例：

          ``` HTML
          <a :href="url">百度</a>
          ```

      (2) `v-model` 的底层实现原理分析。
        + `v-model` 数据双向绑定的原理实际上是通过 `v-bind` 将数据向前端进行单向绑定，
            然后使用 `v-on` 监听前端数据变换然后修改 Vue 实例中 data 中的相应数据。实例：

          ``` HTML
          <input type="text" v-bind:value="msg" v-on:input="msg = $event.target.value">
          ```

  7. 样式绑定

      (1) class 样式处理
        + 对象语法：通过 `v-bind` 为 `class` 属性值绑定一个对象，对象中属性名为不同的样式名，属性值为 true/false 表示是否使用该样式，实例：

          ``` HTML
          <div  v-bind:class="{active: isActive, error: isError}">测试样式</div>
          ```

        + 数组语法：通过 `v-bind` 为 class 属性值绑定一个数组，数组为 vm 实例的 data 中与样式对应的属性的属性值，而属性名为样式名。

          ``` HTML
          <div v-bind:class="[activeClass, errorClass]">测试样式</div>
          ```

      (2) class 样式处理的细节
        + 对象绑定和数组绑定可以结合使用；
        + class 绑定的值可以简化操作；
        + 默认的 class 如何处理？默认的 class 样式会保留。

      (3) style 样式处理
        + 对象语法：类似 style 内联样式，属性名为 style 样式属性名，属性值为 vm 实例的 data 中的数据值，可以使用简写的对象方式，即将整个对象放到 vm 实例的 data 中。实例：

          ``` HTML
          <div :style="{border: borderStyle, width: widthStyle, height: heightStyle}"></div>
          ```

        + 数组语法：数组中的每一项都是要给对象形式的 style，位置靠后的对象样式属性会替换前面重复的样式并增添新的样式。实例：

          ``` HTML
          <div :style="[baseClasses, overridingStyle]"></div>
          ```

  8. 分支循环结构

      (1) 分支结构
        + `v-if`，`v-else-if`，`v-else` 指令：与 JavaScript 中的 `if else` 条件判断类似，在 DOM 元素中配合使这些指令可以实现当满足某些条件时显示特定的 DOM 元素。
        + `v-show` 指令：通过控制 DOM 元素 `display` 样式属性来控制 DOM 元素的显示。
        + `v-if` 与 `v-show` 的区别：`v-if` 控制的是元素是否渲染到页面；而 `v-show` 控制的是元素是否显示（已经渲染到了页面）。
        + `v-if` 与 `v-show` 的使用场景：如果前端的 DOM 元素需要频繁的显示与隐藏，则是推荐使用 `v-show`；相反若元素渲染到页面后就不会或很少改变则可以使用 `v-if`。

      (2) 循环结构
        + `v-for` 指令遍历数组，与 JavaScript 中的 `for` 循环语句类似，实例：

          ``` HTML
          <div>城市列表</div>
          <ul>
              <li v-for="item in cityList">{{ item }}</li>
          </ul>
          <div>汽车列表</div>
          <ul>
              <li v-for="(item, index) in carList">{{ item }} --- {{ index }}</li>
          </ul>
          ```

        + key 的作用：帮助 Vue 区分不同的元素，从而提高性能；所以选取具有唯一性的属性项作为 key，实例：

          ``` HTML
          <div>水果列表</div>
          <ul>
              <li v-for="item in fruitList" :key="item.id">{{ item.eName }} --- {{ item.cName }}</li>
          </ul>
          ```

        + `v-for` 不仅可以遍历对象，还可以遍历数组，遍历时：value 为属性值、key 为属性名、index 为索引，实例：

          ``` HTML
          <div v-for="(value, key, index) in object">{{ value }} --- {{ key }} --- {{ index }}</div>
          ```

        + `v-if` 与 `v-for` 可以配合使用来控制循环时满足条件的数据来显示，实例：

          ``` HTML
          <div v-for="(value, key, index) in object" v-if="value==18">{{ value  }}</div>
          ```

## Vue 基础案例

  1. 案例名称：Tab 选项卡，实现效果如下：
  ![效果图](https://s2.ax1x.com/2020/02/27/30ccod.gif)

  2. 案例实现步骤：

      (1) 实现静态 UI 效果
        + 用传统的方式实现标签结构和样式

      (2) 基于数据重构 UI 效果
        + 将静态的结构和样式重构为基于 Vue 模板语法的形式；
        + 处理事件绑定和 js 控制逻辑。
        + ![设计过程](http://image.acmx.xyz/msj%2F20202262252456592.jpg)

## Vue 常用特性

## Vue 综合案例
