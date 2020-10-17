# Vue.js 学习记录

1. [视频链接](https://www.bilibili.com/video/av50680998)，P200 之后的 2019 系列教程内容。

2. 笔记为个人纪录，章节号与文件夹序号对应。

## Vue 基础

1. 学习目标：

    (1) 能够说出 Vue 的基本用法

    (2) 能够说出 Vue 的模板语法

    (3) 能够说出 Vue 的常用特性

    (4)能够基于 Vue 实现案例效果。

2. 学习内容：

    (1) Vue 概述

    (2) Vue 基本使用

    (3) Vue 模板语法

    (4) 基础案例

    (5) Vue 常用特性

    (6) 综合案例等内容。

### Vue 概述

1. Vue：渐进式 JavaScript 框架，声明式渲染 -> 组件系统 -> 客户端路由 -> 集中式状态管理 -> 项目构建。

2. 优点：

   (1) 易用：熟悉 HTML、CSS、JavaScript 知识后可快速上手 Vue；

   (2) 灵活：在一个库和一套完整框架之间自如伸缩；

   (3) 高效：20KB 运行大小，超快虚拟 DOM。

### Vue 基本使用

1. 在 DOM 中渲染 Hello World 的三种实现方式对比。

   ```HTML
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

   - el：元素的挂载的位置（值可以是 CSS 选择器或者 DOM 元素）。
   - data：模型数量（值是一个对象）。

   (2) 插值表达式 {{}}：

   - 将数据填充到 HTML 标签中。
   - 插值表达式支持基本的计算操作。

   (3) Vue 代码运行原理分析

   - 概述编译过程的原理：Vue 语法 -> 原生 js 语法
   - ![编译过程总览](http://image.acmx.xyz/msj%2F1.png)

### Vue 模板语法

1. 模板语法概述

   (1) 如何理解前端渲染？

   - 把数据填充到 HTML 标签中。
   - ![前端渲染](http://image.acmx.xyzmsj%2F2.png)

   (2) 前端渲染方式有哪些？

   - 原生 js 拼接字符串：基本上就是将数据以符串的方式拼接 HTML 标签中；缺点是不同的发人员的代码风格差别很大，随着业务的复杂，期的维护便地逐渐困难起来；
   - 使用前端模板引擎：基于模板引擎的一段代码与拼接字符相比代码明显规范了很多，它拥有自的一套模板语法规范；优点是大家都遵循同样的范写代码，代码可读性明显提高了，方便后期的护；缺点是没有专门提供事件机制；
   - 使用 Vue 特有的模板语法：插值表达式、指令、事件绑定、属性绑定、样式绑定、分支循环构。

2. 指令

   (1) 什么是指令？

   - 什么是自定义属性？
   - 指令的本质就是自定义属性。
   - 指令的格式：以 `v-` 开始（比如：`v-cloak`）。

   (2) `v-cloak` 指令用法：

   - 插值表达式存在的问题：“闪动/闪烁”；
   - 如何解决该问题：使用 `v-cloak` 指令；
   - 解决该问题的原理：先隐藏，替换好值之后再显示最终的值。
   - v-cloak 指令的用法：首先提供如下样式，之后在插值表达式所在的标签中添加 v-cloak 指令。

     ```CSS
       [v-cloak]{
           display: none;
       }
     ```

   (3) 数据绑定指令 `v-text` 指令：

   - 绑定数据信息；
   - 相比插值表达式更加简洁。

   (4) 数据绑定指令 `v-html` 指令：

   - 绑定 HTML 文档；
   - 存在安全问题；
   - 本网站内部数据可以使用，来自第三方的数据不可以使用。

   (5) 数据绑定指令 `v-pre` 指令：

   - 显示 HTML 标签中的原始信息，跳过编译过程。

3. 数据响应式

   (1) 如何理解响应式

   - HTML5 中的响应式：屏幕尺寸的变花导致样式的变化；
   - 数据的响应式：数据的变化导致页面内容的变化。

   (2) 什么是数据绑定？

   - 数据绑定：将数据填充到标签中。

   (3) `v-once` 指令，只编译一次

   - 显示内容之后不再具有响应式功能。
   - `v-once` 的应用场景：如果显示的信息后续不需要再修改，我们可以使用 `v-once`，这样可以提高性能。

4. 双向数据绑定

   (1) 什么是双向数据绑定？

   - 页面中的数据发生改变，ViewModel 实例中的数据也发生改变，进而页面中其他使用该数据的地方也会发生数据 的改变。
   - ![双向数据绑定](http://image.acmx.xyz/msj%2F3.png)

   (2) 双向绑定分析，如何实现双向绑定，`v-model` 指令

   - 使用 `v-model` 指令来实现数据的双向绑定，一方的数据发生变化会影响另一方的数据。
   - 实例：

     ```HTML
     <!-- 使用 v-model 指令来实现双向数据绑定 -->
     <input type="text" v-model="msg">
     ```

   (3) MVVM 设计思想

   - M：Model、V：View、VM：ViewModel。
   - [Vue 与 MVVM](https://is.gd/aE5ZYh)
   - ![Vue.js 中的 MVVM](http://image.acmx.xyz/msj%2F4.png)

5. 事件绑定

   (1) Vue 如何处理事件？

   - `v-on` 指令来实现事件的监听。
   - 实例：

     ```HTML
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

   - Vue 中在绑定时间响应函数的时候可以直接使用函数名也可以使用调用函数的方式。
   - 实例：

     ```HTML
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

   - 传递的参数有两类：普通参数和事件对象。传递参数的方式也有所不同。
   - 实例：

     ```HTML JavaScript
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

   - `.stop` 阻止事件冒泡，实例：

     ```HTML
     <div style="height: 300px; width: 300px; background-color: red;" v-on:click='divClick'>
       <!--
           传统的阻止冒泡的方式为通过js调用事件对象的 stopPropagation() 方法。
           Vue 提供了事件修饰符 .stop 来阻止事件冒泡，即子元素的事件触发不会触发父元素的事件。
           使用方式为：在绑定事件监听时在事件名称后面紧跟 .stop 修饰符。
       -->
       <input type="button" value="点击我" v-on:click='btnClick'>
     </div>
     ```

   - `.prevent` 阻止默认行为，实例：

     ```HTML
     <div style="height: 300px; width: 300px; background-color: green;">
         <!--
             传统的的阻止默认行为的方式为通过js调用事件对象的 preventDefault() 方法
             Vue 提供了事件修饰符 .prevent 来阻止默认行为，即取消特定标签的默认行为，如 a 标签的跳转刷新。
             使用方式为：在绑定事件监听时在事件名称后面紧跟 .prevent 修饰符。
         -->
         <a href="www.baidu.com" v-on:click.prevent="aClick">去百度</a>
     </div>
     ```

   - `.self` 只当事件是从侦听器绑定的元素本身触发时才触发回调，实例：

     ```HTML
     <!--
         Vue 提供了时间修饰符 .self 只当事件是从侦听器绑定的元素本身触发时才触发回调。
     -->
     <div style="height: 300px; width: 300px; background-color: blue;" v-on:click.self="cdivClick">
         <button v-on:click="cbtnClick">点击</button>
     </div>
     ```

   (5) 按键修饰符

   - `.enter` 当回车键触发事件时产生回调，实例：

     ```HTML
     <input type="text" name="password" @keyup.enter="handleSubmit" v-model="passWord">
     ```

   - `.delete` 当删除键出发事件时产生回调，实例：

     ```HTML
     <input type="text" name="username" @keydown.delete="clearContent" v-model="userName">
     ```

   (6) 自定义按键修饰符

   - 通过全局 `config.keyCodes` 对象来自定义按键修饰符。
   - 规则：自定义按键修饰符名字是自定义的，但是对应的值必须是案件对应 event.keyCode 值，实例：

     ```JavaScript
     Vue.config.keyCodes.f1 = 112;
     ```

6. 属性绑定

   (1) Vue 如何动态处理属性？

   - `v-bind` 指令用法，实例：

     ```HTML
     <a v-bind:href="url">百度</a>
     ```

   - `v-bind` 指令可以只缩写为 `:`，实例：

     ```HTML
     <a :href="url">百度</a>
     ```

   (2) `v-model` 的底层实现原理分析。

   - `v-model` 数据双向绑定的原理实际上是通过 `v-bind` 将数据向前端进行单向绑定，
     然后使用 `v-on` 监听前端数据变换然后修改 Vue 实例中 data 中的相应数据。实例：

     ```HTML
     <input type="text" v-bind:value="msg" v-on:input="msg = $event.target.value">
     ```

7. 样式绑定

   (1) class 样式处理

   - 对象语法：通过 `v-bind` 为 `class` 属性值绑定一个对象，对象中属性名为不同的样式名，属性值为 true false 表示是否使用该样式，实例：

     ```HTML
     <div  v-bind:class="{active: isActive, error: isError}">测试样式</div>
     ```

   - 数组语法：通过 `v-bind` 为 class 属性值绑定一个数组，数组为 vm 实例的 data 中与样式对应的属性 属性值，而属性名为样式名。

     ```HTML
     <div v-bind:class="[activeClass, errorClass]">测试样式</div>
     ```

   (2) class 样式处理的细节

   - 对象绑定和数组绑定可以结合使用；
   - class 绑定的值可以简化操作；
   - 默认的 class 如何处理？默认的 class 样式会保留。

   (3) style 样式处理

   - 对象语法：类似 style 内联样式，属性名为 style 样式属性名，属性值为 vm 实例的 data 中的数据值， 以使用简写的对象方式，即将整个对象放到 vm 实例的 data 中。实例：

     ```HTML
     <div :style="{border: borderStyle, width: widthStyle, height: heightStyle}"></div>
     ```

   - 数组语法：数组中的每一项都是要给对象形式的 style，位置靠后的对象样式属性会替换前面重复的样式并增添 的样式。实例：

     ```HTML
     <div :style="[baseClasses, overridingStyle]"></div>
     ```

8. 分支循环结构

   (1) 分支结构

   - `v-if`，`v-else-if`，`v-else` 指令：与 JavaScript 中的 `if else` 条件判断类似，在 DOM 元 中配合使这些指令可以实现当满足某些条件时显示特定的 DOM 元素。
   - `v-show` 指令：通过控制 DOM 元素 `display` 样式属性来控制 DOM 元素的显示。
   - `v-if` 与 `v-show` 的区别：`v-if` 控制的是元素是否渲染到页面；而 `v-show` 控制的是元素是否显 （已经渲染到了页面）。
   - `v-if` 与 `v-show` 的使用场景：如果前端的 DOM 元素需要频繁的显示与隐藏，则是推荐使用 `v-show` 相反若元素渲染到页面后就不会或很少改变则可以使用 `v-if`。

   (2) 循环结构

   - `v-for` 指令遍历数组，与 JavaScript 中的 `for` 循环语句类似，实例：

     ```HTML
     <div>城市列表</div>
     <ul>
         <li v-for="item in cityList">{{ item }}</li>
     </ul>
     <div>汽车列表</div>
     <ul>
         <li v-for="(item, index) in carList">{{ item }} --- {{ index }}</li>
     </ul>
     ```

   - key 的作用：帮助 Vue 区分不同的元素，从而提高性能；所以选取具有唯一性的属性项作为 key，实例：

     ```HTML
     <div>水果列表</div>
     <ul>
         <li v-for="item in fruitList" :key="item.id">{{ item.eName }} --- {{ item.cName }}</li>
     </ul>
     ```

   - `v-for` 不仅可以遍历对象，还可以遍历数组，遍历时：value 为属性值、key 为属性名、index 为索引， 例：

     ```HTML
     <div v-for="(value, key, index) in object">{{ value }} --- {{ key }} --- {{ index }}</div>
     ```

   - `v-if` 与 `v-for` 可以配合使用来控制循环时满足条件的数据来显示，实例：

     ```HTML
     <div v-for="(value, key, index) in object" v-if="value==18">{{ value  }}</div>
     ```

### Vue 基础案例

1. 案例名称：Tab 选项卡，实现效果如下：
![效果图](https://s2.ax1x.com/2020/02/27/30ccod.gif)

1. 案例实现步骤：

    (1) 实现静态 UI 效果

    - 用传统的方式实现标签结构和样式

    (2) 基于数据重构 UI 效果

    - 将静态的结构和样式重构为基于 Vue 模板语法的形式；
    - 处理事件绑定和 js 控制逻辑。
    - ![设计过程](http://image.acmx.xyz/msj%2F20202262252456592.jpg)

### Vue 常用特性

1. 表单操作

    (1) 基于 Vue 的表单操作

    - input 单行文本：可以使用 `v-model` 指令进行数据双向绑定，从而能够方便获取输入值和提供默认值。 例：

      ``` HTML JavaScript
      <input type="text" v-model="userName">
      ...
      data: {
        userName: "李四"
      }
      ```

    - textarea 多行文本：可以直接使用 `v-model` 进行数据双向绑定。实例：

      ```HTML JavaScript
      <textarea v-model="desc"></textarea>
      ...
      data: {
        desc: "Hello"
      }
      ```

    - select 下拉选择框：可以为多选也可以为单选，由 `multiple` 属性值决定；当为单选时 `v-model` 绑定 个常用数据类型，而当多选时 `v-model` 需要绑定到一个数组上。

      ```HTML JavaScript
      <select v-model="occupation" multiple="true">
          <option value="default">请选择职业...</option>
          <option value="teacher">教师</option>
          <option value="softwareEngineers">软件工程师</option>
          <option value="lawyer">律师</option>
      </select>
      ...
      data: {
        //occupation: "default",
        occupation: [],
      }
      ```

    - radio 单选按钮：单选框也可以使用 `v-model`进行双向绑定，由于是单选框，所以一组单选按钮绑定到同一 数据上，数据值为每一个单选按钮的 `value` 属性值。实例：

      ```HTML JavaScript
      <input type="radio" id="male" value="male" v-model="gender">
      <label for="male">男</label>
      <input type="radio" id="female" value="female" v-model="gender">
      <label for="female">女</label>
      ...
      data: {
        gender: "male"
      }
      ```

    - checkbox 多选按钮：多选框也可以使用 `v-model` 进行双向绑定，由于是多选框，所以一组多选框按钮绑定在同一个数组上，数组的值为选中的项目的 `value` 的属性值。实例：

     ``` HTML JavaScript
     <input type="checkbox" id="ball" value="ball" v-model="hobby">
     <label for="ball">篮球</label>
     <input type="checkbox" id="sing" value="sing" v-model="hobby">
     <label for="sing">唱歌</label>
     <input type="checkbox" id="code" value="code" v-model="hobby">
     <label for="code">编程</label>
     ...
     data: {
      hobby: []
     }
     ```

    - 表单提交默认事件：表单提交若只发生在当前页面，而不需要页面刷新和跳转，则需要阻止表单提交的默认行为， 体监听提交按钮的点击事件并使用 `.prevent` 来修饰。实例：

      ``` HTML
      <input type="submit" value="提交" @click.prevent="submit">
      ```

    (2) 表单域修饰符

    - number：转化为数值，实例：

      ``` HTML
      <input type="text" v-model.number="num">
      ```

    - trim：去掉开始和结尾的空格，实例：

      ```HTML
      <!-- .trim 修饰符只能去掉开始和结尾的空格，不能去除字符串中间的空格 -->
      <input type="text" v-model.trim="info">
      ```

    - lazy：将 input 时间切换为 change 事件，实例：

      ```HTML
      <!-- input 事件在文本框输入改变时触发， change 事件在文本框失去焦点时触发 -->
      <input type="text" v-model.lazy="msg">
      ```

2. 自定义指令

    (1) 为何需要自定义指令？内置的指令不能满足需求。内置的指令：`v-text`，`v-html`，`v-show` `v-if`，`v-else`，`v-else-if`，`v-for`，`v-on`，`v-bind`，`v-model`，`v-pre`，`v-cloak` `v-once`。

    (2) 普通自定义指令

    - 语法规则（应用场景：获取元素焦点）

      ```JavaScript
      /*
        使用 Vue 的 directive 方法来自定义指令，需要两个参数，第一个参数为指令名称，
        注意在使用指令的时候需要使用 v-指令名称 着中国方式，第二个参数为钩子函数，
        目前先知道使用 inserted 来进行操作。
      */
      Vue.directive('focus', {
        inserted: function(el) {
          // 获取元素的焦点
          el.focus();
        }
      });
      ```

    - 普通自定义指令用法

      ```HTML
      <!-- 在使用普通自定义指令时，只需要像 v-cloak 指令一样，直接加上指令名称即可 -->
      <input type="text" v-focus>
      ```

    (3) 带参数的自定义指令

    - 语法规则（应用场景：改变元素背景色）

      ``` JavaScript
      /*
        带参数的自定义指令同样使用 Vue 提供的 directive 接口，使用钩子函数 inserted 或
        第二个参数为绑定元素过程的信息，其中可以通过 binding,value 获取传递的参数。
      */
      Vue.directive('color', {
          bind: function (el, binding) {
              // 可以通过 binding 对象的 value 属性拿到传递的参数
              //console.log(binding);

              // 根据指令的参数设置背景色
              el.style.backgroundColor = binding.value;
          }
      });
      ```

    - 带参数的指令的用法

      ``` HTML
      <!-- 在使用传递参数的自定义指令时可以像 v-model 等指令一样在后面加个等号来传递参数 -->
      <input type="text" v-color="msg">
      ```

    (4) 局部自定义指令，定义在单个 Vue 实例中的指令，尽在该 Vue 实例组件中可用。

    - 语法规则

      ``` JavaScript
      // 定义在某个 Vue 实例的 directives 属性下
      directives: {
          focus: {
              inserted: function (el) {
                  el.focus();
              }
          },
          color: {
              bind: function (el, binding) {
                  el.style.backgroundColor = binding.value;
              }
          }
      }
      ```

3. 计算属性

    (1) 为何需要计算属性？表达式的计算逻辑可能会比较复杂，使用计算属性可以是模板内容更加简洁。

    (2) 计算属性的用法：Vue 中的计算属性在在 Vue 实例的 `computed` 属性中声明，computed 的属性值为 个对象；键为计算属性名称，之后使用计算属性也是使用该名称，值为一个回调函数用来进行复杂计算操作并返回计 结果。实例：

    ``` JavaScript
    // JS Vue 实例中
    computed: {
        reversedMessage: function () {
            return this.msg.split("").reverse().join("");
        }
    }
    ```

    (3) 计算属性与方法的区别

    - 计算属性是基于他们的依赖进行缓存的，方法不存在缓存。
    - 缓存就是只要计算属性计算的 `data` 的数据不改变，那么计算属性只执行一次；而这个计算的 `data` 中的 就称为计算属性的依赖。
    - 由于计算属性存在缓存机制，所以若遇到耗时费力的计算时可以节省性能和时间。

4. 侦听器

    (1) 侦听器的概念及作用：侦听器用于监听数据的变化，数据一旦发生变化就通知侦听器所绑定的方法，从而执行 定的操作。
    ![侦听器](http://image.acmx.xyz/msj%2F20203322976701.jpg)

    (2) 侦听器的应用场景：数据变化时值型异步或开销较大的操作。

    (3) 侦听器的用法：

    ``` JavaScript
    // 在 watch 属性下创建侦听器
    watch: {
        // 监听 firstName 和 lastName 两个数据的变化，来拼接 fullName
        /*
            watch 属性值为一个对象，对象的属性名为要监听的数据的数据名，
            对象的属性值为回调函数，即该数据发生变化时执行的行为，该函数有两个参数，
            第一个为数据发生变化后的新的值，第二个为发生变化前的旧的值
        */
        firstName: function (newVal, oldVal) {
            this.fullName = newVal + " " + this.lastName;
        },
        lastName: function (newVal, oldVal) {
            this.fullName = this.firstName + " " + newVal;
        }
    }
    ```

5. 过滤器

    (1) 多滤器的作用是什么：格式化数据，比如将字符串格式化为首字母大写，将日期格式化为指定的格式等。
    ![过滤器](http://image.acmx.xyz/msj%2F10.png)

    (2) 自定义过滤器

    ``` JavaScript
    /*
        使用 Vue 的 filter 接口来创建过滤器，第一个参数为过滤器的名称，之后使用过滤器也是通过该名称，
        第二个参数为回调函数，即对数据要进行的格式化工作，接受的参数为要进行格式化的数据
    */
    Vue.filter("upper", function (val) {
        // 过滤器业务逻辑，最后将结果 return 出去
        return val.charAt(0).toUpperCase() + val.slice(1);
    });
    ```

    (3) 过滤器的使用

    ``` HTML
    <!-- 在插值表达式的数据后面加上过滤器名称中间使用竖线(按位或符) -->
    <div>{{ msg | upper }}</div>
    <!-- 一个插值表达式中可以在数据后面携带多个过滤器，前面过滤器的结果作为后面过滤器的输入 -->
    <div>{{ msg | upper | lower }}</div>
    <!-- 再进行属性绑定的时候也可以使用过滤器 -->
    <div :id="msg | upper"></div>
    ```

    (4) 局部过滤器，类似于自定义指令，过滤器也有局部过滤器

    ``` JavaScript
    // 在 Vue 实例中可以在 filters 属性值下声明创建局部过滤器，仅在该 Vue 上生效
    /*
        filters 的属性值为一个对象，属性名为过滤器名称，属性值为格式化数据的回调函数
    */
    filters: {
        upper: function (val) {
            return val.charAt(0).toUpperCase() + val.slice(1);
        }
    }
    ```

    (5) 带参数的过滤器

    - 定义规范

      ``` JavaScript
      // 在定义过滤器的回调函数的时候可以传递第二个参数来接受使用过滤器时传递的参数
      Vue.filter('dateFormat', function (val, arg) {
          if (arg === "yyyy-MM-dd") {
              return `${val.getFullYear()}-${val.getMonth() + 1}-${val.getDate()}`;
          }
      });
      ```

    - 使用

      ``` HTML
      <!-- 使用时像调用方法一样传递参数 -->
      <div>{{ date | dateFormat("yyyy-MM-dd") }}</div>
      ```

6. 生命周期

    (1) 主要阶段

    - 挂载（初始化相关属性）：beforeCreate -> created -> beforeMount -> mounted
    - 更新（元素或组件的变更操作）：beforeUpdate -> updated
    - 销毁（销毁相关属性）：beforeDestroy -> destroyed
    - ![生命周期图示](http://image.acmx.xyz/msj%2Flifecycle.png)

    (2) 生命周期钩子函数

    - beforeCreate：在实例初始化之后，数据观测和时间配置之前调用。
    - created：在实例创建完成后立即调用。
    - beforeMount：在挂载开始之前被调用。
    - mounted：`el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。
    - beforeUpdate：数据更新时调用，发生在虚拟 DOM 打补丁之前。
    - updated：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    - beforeDestroy：实例销毁之前调用。
    - destroyed：实例销毁后调用。

### Vue 综合案例

1. 案例名称：图书管理，实现效果如下：
![图书管理](https://s1.ax1x.com/2020/03/14/8lcTiV.gif)

2. 补充知识（Vue 数组相关 API）

    (1) 变异方法（修改原有数组），这些方法会改变原有的数据从而绑定该数组的 DOM 组件会发生变化，这些方法 有：`push()`，`pop()`，`shift()`，`unshift()`，`splice()`，`sort()`，`reverse()`。

    (2) 替换数组（生成新的数组），有些方法会保留之前的数组，生成新的数组作为返回值，这些方法有：`filter()`，`concat()`，`slice()`，一般若要使用新的数组重新渲染 DOM (数组操作影响 DOM) 采取的方法是用新数组 代替旧数组。

    (3) 修改响应式数据：

    - 相对于上面两种继承自 JavaScript 的数组操作的方法，Vue 也有自己的处理数组的方式。
    - 两个接口：`Vue.set(vm.items, indexOfItem, newVale)`，`Vue.$set(vm.items, indexOfItem, newVale)`
    - 参数列表：参数一标识要处理的数据/对象名称，参数二标识要处理的数组的索引/对象的属性名，参数三标识要处 理的数组的值/对象的属性值。
    - 注：这两种方式都可适用于数组和对象数据；经过这两种方式任意一种方式设置后的数组/对象中的数据项将变为响应式，之后直接修改该数据那么 DOM 中将响应式的发生改变。

3. 案例实现：

    (1) 图书列表展示功能

    - 实现静态列表效果
    - 基于数据实现模板效果
    - 处理每行的操作按钮

    (2) 添加图书

    - 实现表单的静态效果
    - 添加图书表单域数据绑定
    - 添加按钮事件绑定
    - 实现添加业务逻辑

    (3) 修改图书

    - 修改信息填充到表单
    - 修改后重新提交表单
    - 重用添加和修改的方法

    (4) 删除图书

    - 删除按钮绑定事件处理方法
    - 实现删除业务逻辑

    (5) 常用特性应用场景，在案例中使用前面学习的 Vue 常用特性

    - 过滤器（格式化日期）
    - 自定义指令（获取表单焦点）
    - 计算属性（统计图书数量）
    - 侦听器（验证图书存在性）
    - 生命周期（图书数量处理）

## 组件化开发

1. 学习目标：

    (1) 能够知道组件化开发的思想

    (2) 能够知道组件的注册方式

    (3) 能够输出组件键的数据交互方式

    (4) 能够说出组件插槽的用法

    (5) 能够说出 Vue 调试工具的用法

    (6)能够基于组件的方式实现业务功能。

2. 学习内容：

    (1) 组件化开发思想

    (2) 组件注册

    (3) Vue 调试工具用法

    (4) 组件间数据交互

    (5) 组件插槽

    (6) 基于组件的案例等。

### 组件开发思想

1. 现实生活中的组件化思想体现：

    (1) 标准

    (2) 分治

    (3) 重用

    (4) 组合

    ![谷歌组件化手机](http://image.acmx.xyz/msj%2Fmobile.jpg)

2. 编程中的组件化思想体现

![组件化开发](http://image.acmx.xyz/msj%2Fcoms.png)

1. 组件化规范：Web Components

    (1) 我们希望尽可能多的重用代码；

    (2) 自定义组件的方式不太容易（html、css 和 js 三者组合）；

    (3) 多次使用组件可能导致冲突；

    (4) Web Components 通过创建封装好功能的定制元素解决上述问题。[Web_Components 介绍网站](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

   (5) Vue.js 框架部分上实现了上述的规范。

### 组件注册

1. 全局组件

    (1) 全局组件注册语法

    ```JavaScript
    Vue.component(组件名称, {
      data(): {
        return {
          组件数据
        };
      },
      template: 组件模板内容
    });

    // 定义一个名为 button-counter
    Vue.component("button-counter", {
        data: function () {
            return {
                count: 0
            };
        },
        template: "<button @click='count++'>点击了{{ count }}下</button>",
        methods: {
            // 在组件内部，也可以使用 methods 属性来为组件添加方法
            handle: function () {
                this.count += 2;
            }
        }
    });
    ```

    (2) 全局组件用法

    ``` HTML
    <!-- 使用组建的命名来调用组件 -->
    <div id="#app">
      <button-counter></button-counter>
    </div>

    <!-- 组件注册后可以重复使用，组件之间数据相互独立 -->
    <div id="#app">
      <button-counter></button-counter>
      <button-counter></button-counter>
      <button-counter></button-counter>
    </div>
    ```

2. 组件注册中的注意事项：

    (1) 组件中的 `data` 必须是一个函数，该函数需要返回一个对象，对象中包括组件中需要的数据；

    (2) 组件模板内容必须是单个根元素；

    (3) 组件模板内容可以是模板字符串，模板字符串需要浏览器提供支持(ES6 语法)。

    (4) 组件命名方式：

    - 短横线方式：

      ``` JavaScript
      Vue.component("my-component", { /* ... */ });
      ```

    - 驼峰命名方式，使用该方式命名的组件只有在其他的自定义组件的字符串模板中才能直接使用驼峰名称来使用，在普通标签中需要转换为短横线方式，即单词首字母小写单词间使用短横线相隔。

      ``` JavaScript
      Vue.component("MyComponent", { /* ... */ })
      ```

3. 局部组件

    (1) 局部组件注册语法

    ``` JavaScript
    let ComponentA = { /* ... */};
    let ComponentB = { /* ... */};
    let ComponentC = { /* ... */};

    new Vue({
      el: "#app",
      components: {
        "component-a": ComponentA,
        "component-b": ComponentB,
        "component-c": ComponentC
      }
    });
    ```

    (2) 局部组建的使用与全局组件相同，但是局部组件只能在对应 Vue 实例的 `el` 中使用，在其他地方如另外的 局组件中则不能使用。

### Vue 调试工具用法

1. 调式工具安装：

    (1) 克隆仓库：[仓库地址](https://github.com/vuejs/vue-devtools)；

    (2) 安装依赖包；

    (3) 构建项目，生成 Chrome 扩展程序包；

    (4) 打开 Chrome 浏览器扩展页面；

    (5) 选中开发者模式；

    (6) 加载已解压的扩展，选择 `shells/chrome`。

    (7) 快捷安装：国内厂商浏览器扩展商店可以直接搜索下载，或者 Chrome [网上商店扩展](https://chrome.google.com/webstore/category/extensions)下载，搜索 Vue.js devtools 并[下载](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)。

2. 调式工具的使用：

    (1) 在安装完调式工具之后，在浏览采用 Vue.js 框架构建的网页，进入开发者模式则会注意到多了 Vue 一项，点击并进  入，我们可以看到 Vue 组件之间的关系和数据等信息。

    (2) 调试工具界面：
    ![VueDevtools](http://image.acmx.xyz/msj%2FVueDevtools.png)

### 组件间数据交互

1. 父组件向子组件传值

    (1) 组件内部通过 `props` 属性接受传递过来的值，属性值为一个数组。

    ```JavaScript
    Vue.component("menu-item", {
      data(){
        return {}; // 组件中的数据
      },
      props: ["title"], // props 数组接受父组件传递过来的数据
      template: "<div></div>"
    });
    ```

    (2) 父组件通过属性将值传递给子组件

    ```HTML
    <!-- 通过直接赋值方式传递数据 -->
    <menu-item title="来自父组件的数据"></menu-item>
    <!-- 通过属性绑定方式传递数据 -->
    <menu-item :title="Hello"></menu-item>
    ```

    (3) `props` 属性名规则：

    - 在 `props` 中使用驼峰形式，模板中需要使用短横线的形式，
    - 字符串形式的模板中没有这个限制。

      ``` JavaScript
      Vue.component("menu-item", {
        // 在 JavaScript 中是驼峰式的
        props: ['menuTile'],
        // 在普通字符串模板中可以直接使用
        template: "<div>{{ menuTile }}</div>"
      });
      ```

      ``` HTML
      <!-- 在 HTML 中需要使用短横线方式 -->
      <menu-item menu-item="hello"></menu-item>
      ```

    (4) `props` 属性值类型

    - 字符串 String
    - 数值 Number
    - 布尔值 Boolean
    - 数组 Array
    - 对象 Object

2. 子组件向父组件传值

    (1) `props` 传递数据的基本原则：单向数据流，只允许父组件向子组件传递数据，虽然没有屏蔽使用 `props` 修改父组件中数据的接口，但是不提倡使用该方式向父组件传值。

    (2) 子组件向父组件传值的基本用法

    - 子组件通过自定义事件（`$emit()` 接口实现）向父组件传递信息

      ``` HTML
      <button @click="$emit('enlarge-text')">增大字体</button>
      ```

    - 父组件监听子组件的事件

      ``` HTML
      <menu-item :fruits="parr" v-on:enlarge-text="enlarge"></menu-item>
      ```

    (3) 子组件向父组件传递数据

    - 子组件通过自定义事件向父组件传递信息

      ``` HTML
      <button @click="$emit('enlarge-text', 5)">扩大字体</button>
      ```

    - 父组件监听子组件的事件

      ``` HTML
      <menu-item @enlarge-text="fontSize += $event"></menu-item>
      ```

    (4) 子组件向父组件传值主要通过子组件使用 `$emit()` 接口来创建自定义事件，然后父组件在调用该组件时监听该事  件，从而达到子组件向父组件的通讯。`$emit()` 接口提供两个参数：第一个参数为自定义事件的名称，为必选参数，监听事件必须监听创建的自定义事件，即保持事件名称的统一性；第二个参数为可选参数，是自定义事件触发时传递的数据，父组件在监听子组件创建的自定义事件时可以使用 `$event` 来获取传递的数据。

3. 非父子（兄弟）组件间传值

    (1) 单独的事件中心管理组件间的通信

    - 事件处理中心：
      ![事件中心](http://image.acmx.xyz/msj%2F2020313175767751.jpg)
    - 创建事件处理中心：

      ``` JavaScript
      let eventHub = new Vue(); // 创建事件中心
      ```

    (2) 监听事件与销毁事件

    ``` JavaScript
    eventHub.$on("add-todo", addToDo); // 使用事件处理中心的 $on 接口监听事件，绑定事件名称(参数1) 和事件  处理函数（参数2）
    eventHub.$off("ddd-todo"); // 使用事件处理中心的 $off 接口销毁事件
    ```

    (3) 触发事件

    ``` JavaScript
    eventHub.$emit("add-todo", val); // 使用事件处理中心的 $emit 接口触发事件，参数一出发事件的名称  参数  二为传递的参数
    ```

### 组件插槽

1. 组件插槽的作用：父组件在以标签形式使用子组件的使用，在标签内部向子组件传递内容。
![组件插槽](http://image.acmx.xyz/msj%2F20203132238143274.jpg)

2. 组件插槽的基本使用

    (1) 插槽的位置

    ```JavaScript
    // 插槽定义在组件的模板中，使用 <slot></slot> 标签进行占位，标签内部可以添加默认信息，在父组件中使用 子组  件，并在子组件标签中传递内容时，该内容会替换子组件中插槽的位置
    Vue.component("alert-box", {
      template: `
       <div>
         <strong>Error!</strong>
         <slot>默认内容</slot>
       </div>
      `
    });
    ```

    (2) 插槽内容/使用插槽

    ```HTML
    <!-- Something bad happened. 会替换子组件模板中的插槽和里面的默认内容-->
    <alert-box>Something bad happened.</alert-box>
    <!-- 会显示子组件插槽中的默认内容 -->
    <alert-box></alert-box>
    ```

3. 具名插槽，即有名字的插槽

    (1) 具名插槽的定义，可以在组件模板中使用 `slot` 标签中声明多个插槽，使用 `name` 来进行命名并区别不同的插 槽，为命名的插槽将作为默认插槽。

    ```JavaScript
    let vm = new Vue({
        el: "#app",
        data: {

        },
        components: {
            "base-layout": {
                template: `
                    <div>
                        <header>
                            <slot name="header"></slot>
                        </header>
                        <main>
                            <slot></slot>
                        </main>
                        <footer>
                            <slot name="footer"></slot>
                        </footer>
                    </div>
                `
            }
        }
    });
    ```

    (2) 具名插槽的使用

    - 常规使用：在父组件中调用子组件的时候标签内部的子元素可以通过 `slot` 属性来指定要替换的插槽，若不指定该属性则使用默认插槽。

      ```HTML
      <base-layout>
          <h1 slot="header">标题信息</h1>
          <h3>主要内容1</h3>
          <h3>主要内容2</h3>
          <h5 slot="footer">底部信息</h5>
      </base-layout>
      ```

    - 特殊使用：如果想要多个 DOM 标签替换插槽，可以使用 `template` 标签来进行包裹，前端渲染的时候并不会渲染 `template`，在这里 `template` 标签起到一个虚拟容器的作用。

     ``` HTML
     <base-layout>
         <template slot="header">
             <h1>标题信息1</h1>
             <h2>标题信息2</h2>
         </template>
         <h3>主要内容1</h3>
         <h3>主要内容2</h3>
         <template>
             <h4>底部信息1</h4>
             <h5>底部信息2</h5>
         </template>
     </base-layout>
     ```

4. 作用域插槽

    (1) 应用场景：父组件得到子组件的数据并对子组件的内容进行加工处理，即父组件通过子组件的数据来调整子组件中的数据渲染效果。

    (2) 作用域插槽的定义，在父组件需要操作的子组件的地方使用插槽并在插槽中绑定给一个自定义属性要操作的数据。

    ``` JavaScript
    components: {
        "fruits-list": {
            props: ["fruits"],
            // 在父组件需要操作的子组件的地方使用插槽并在插槽中绑定给一个自定义属性要操作的数据
            template: `
                <ul>
                    <li :key="item.id" v-for="item in fruits">
                        <slot :info="item">{{ item.name }}</slot>
                    </li>
                </ul>
            `
        }
    }
    ```

    (3) 作用域插槽的使用，使用作用域插槽时，需要在 `template` 标签内操作，首先使用 `template` 的   `slot-scope` 属性拿到插槽中的值，slot-scope 的属性值是一个对象，使用 `.` 运算符即可拿到插槽中的值，进行加 工处理。

    ``` HTML
    <fruits-list :fruits="fruitsList">
        <!-- 使用作用域插槽时，需要在 template 标签内操作，
            首先使用 template 的 slot-scope 属性拿到插槽中的值，
            slot-scope 的属性值是一个对象，使用 . 运算符即可拿到插槽中的值，进行加工处理 -->
        <template slot-scope="slotProps">
            <p v-if="slotProps.info.id % 2 === 0" class="current">{{ slotProps.info.name }}</p>
            <p v-else>{{ slotProps.info.name }}</p>
        </template>
    </fruits-list>
    ```

### 基于组件的案例

1. 购物车案例，最终效果如下：
![购物车案例](https://s1.ax1x.com/2020/03/16/8tS2i4.gif)

1. 按照组件化方式实现业务需求

    (1) 根据业务功能进行组件化划分

    - 标题组件（展示文本）
    - 列表组件（列表显示、商品数量变更、商品删除）
    - 结算组件（计算商品总额）

    (2) 功能实现步骤

    - 实现整体布局和样式效果
    - 划分独立的功能组件
    - 组合所有的子组件形成整体结构
    - 逐个实现各个组件功能：标题组件，列表组件，结算组件

## 前后端交互

1. 学习目标：

    (1) 能够说出什么是前后端交互模式

    (2) 能够说出 Promise 的相关概念和用法

    (3) 能够使用 fetch 进行接口调用

    (4) 能够使用 axios 进行接口调用

    (5) 能够使用 async/await 方式调用接口

    (6) 能够基于后台接口实现案例

2. 学习内容：

    (1) 前后端交互模式

    (2) Promise 用法

    (3) 接口调用 - fetch 用法

    (4) 接口调用 - axios 用法

    (5) 接口调用 - async/await 用法

    (6) 基于接口的案例

### 前后端交互模式

1. 接口调用方式：

    (1) 原生 Ajax

    (2) 基于 jQuery 的 Ajax

    (3) fetch

    (5) axios

2. URL 地址格式

    (1) 传统形式的 URL：`schema://host:post/path?query#fragment`

    - `schema`：协议，例如 `http`、`https`、`ftp`等。
    - `host`：域名或者 IP 地址。
    - `post`：端口，http 默认端口 80，可以省略。
    - `path`：路径，例如 `/abc/a/b/c`。
    - `query`：查询参数，`例如 uname=lisi&age=12`。
    - `fragment`：锚点（哈希 Hash），用于定位页面的某个位置。

    (2) Restful 形式的 URL，HTTP 请求方式有：

      - GET 查询。
      - POST 添加。
      - PUT 修改。
      - DELETE 删除。

### Promise 用法

1. DemoServer 提供后端测试接口，安装运行方式如下：

    ``` brush
    cd DemoServer
    npm i
    node index.js
    ```

2. 异步调用

    (1) 异步效果分析

    - 定时任务 `setTimeout()` 与 `setInterval()`。
    - Ajax。
    - 事件函数。

    (2) 多次异步调用的依赖分析

    - 多次异步调用的结果顺序不确定。
    - 异步调用的结果如果存在依赖则需要嵌套。

3. Promise 概述

    (1) Promise 是异步编程的一种解决方案，从语法上讲，Promise 是一个对象，使用它可以获取异步操作的消息。

    (2) 使用 Promise 主要有以下好处：

    - 可以避免多层 i 不调用嵌套问题（回调地狱）。
    - Promise 对象提供了简洁的 API，是得控制异步操作更加容易。

    (3) Promise 基本用法

    - 实例化 Promise 对象，构造函数中传递一个回调函数，该函数中用于处理异步操作。
    - `resolve` 和 `reject` 两个参数用于处理成功和失败两种情况，并通过 `p.then` 获取处理结果。

      ``` JavaScript
      let p = new Promise(function (resolve, reject) {
          // 这里用于实现异步任务

          // 任务操作成功，调用 resolve 回调，并可在参数列表中传递数据
          //resolve("Success！Hello！");
          // 任务操作失败，调用 reject 回调，亦可传参
          //reject("Error！No！");
      });

      p.then(function (data) {
          console.log("成功的回调：", data);
      }, function (info) {
          console.log("失败的回调：", info);
      });
      ```

    (4) 基于 Promise 处理 Ajax 请求

    - 处理原生 Ajax

      ``` JavaScript
      function queryData(url) {
          let p = new Promise((resolve, reject) => {
              let xhr = new XMLHttpRequest();
              xhr.onreadystatechange = function () {
                  if (xhr.readyState != 4) return;
                  if (xhr.readyState == 4 && xhr.status == 200) {
                      // 后台正常响应的处理
                      resolve(xhr.responseText);
                  } else {
                      // 后台异常的处理
                      reject("服务器无响应！");
                  }
              };
              xhr.open("get", url);
              xhr.send(null);
          });
          return p; // 返回该 Promise 对象，可以连续链式像后台发起请求
      }

      // 发送一次请求
      queryData("http://localhost:3000/data").then(data => {
          // 后台正常响应并返回数据后的业务逻辑
          console.log(data);
      }, error => {
          // 后台异常，返回错误信息
          console.log(error);
      });
      ```

    - 处理连续的 Ajax 请求

      ``` JavaScript
      // 发送多次请求
      queryData("http://localhost:3000/data").then(data => {
          console.log(data);
          return queryData("http://localhost:3000/data1");
      }).then(data => {
          console.log(data);
          return queryData("http://localhost:3000/data2");
      }).then(data => console.log(data));
      ```

    (5) `then` 参数中的函数返回值。

    - 返回 Promise 实例对象，返回的该实例对象可以调用下一个 `then`。这时 下一个 `then` 可以拿到上一个 Promise 对象中的返回值。
    - 返回普通值，返回的普通值会直接传递给下一个 `then`，通过 `then` 参数中函数的参数接受该值。此时 `then` 会默认产生一个 Promise 对象来保证下面的链式操作的进行。

    (6) Promise 常用 API，两个对象方法

    - `Promise.all()`，并发处理多个异步任务，所有任务都执行完成才能得到结果。

      ``` JavaScript
      let p1 = queryData("http://localhost:3000/a1");
      let p2 = queryData("http://localhost:3000/a2");
      let p3 = queryData("http://localhost:3000/a3");

      // Promise.all()，并发处理多个异步任务，所有任务都执行完成才能得到结果。
      Promise.all([p1, p2, p3]).then(result => {
          console.log(result);
      });
      ```

    - `Promise.race()`，并发处理多个异步任务，只要一个任务完成就能得到结果。

      ``` JavaScript
      // Promise.race()，并发处理多个异步任务，只要一个任务完成就能得到结果。
      Promise.race([p1, p2, p3]).then(result => {
          console.log(result);
      });
      ```

### 接口调用 - fetch 用法

1. fetch 概述

    (1) 基本特征

    - 更加简单的数据获取方式，功能更强大、更灵活，可以看作是 xhr 的升级版
    - 基于 Promise 实现。

    (2) 语法结构：[API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

    ``` JavaScript
    fetch(url).then(fn2)
              .then(fn3)
              ...
              .then(fnn);
    ```

2. fetch 的基本用法

    ``` JavaScript
    fetch("http://localhost:3000/fdata").then(data => {
          // text() 方法属于 fetch API的一部分，它返回一个 Promise实例对象，用于获取后台返回的数据
          return data.text(); // 返回的是一个 Promise 对象实例，下一次调用 .then 才能拿到数据
      }).then(data => console.log(data)); // 此时得到的才是最终的数据。
    ```

3. fetch 请求参数

    (1) 常用配置选项：

    - method(String)：HTTP 请求方法，默认为 Get，请求方法都有：GET、POST、PUT、DELETE。
    - body(String)：HTTP 的请求参数。
    - headers(Object)：HTTP 的请求头，默认为 0。

      ``` JavaScript
      fetch("/abc", {
        method: "get"
      }).then(data => {
        return data.text();
      }).then(result => {
        console.log(result);
      })
      ```

    (2) Get 方式传参

    ``` JavaScript
    // get请求方式1：传统 url 传递参数，后端使用 req.query 来挥去传递的参数
    fetch("http://localhost:3000/books?id=233", {
            // 请求地址后加一个对象，method 属性的属性值为设置的请求类型
            method: "get"
        })
        .then(data => data.text())
        .then(result => console.log(result));

    // get请求方式2：通过 Restful 形式的 url 传递参数，后端使用 req.params 来挥去传递的参数
    fetch("http://localhost:3000/fruits/456", {
            methods: "get"
        })
        .then(data => data.text())
        .then(res => console.log(res));
    ```

    (3) Delete 方式传参，与 Get 请求类似。Get 与 Delete 传参都是通过 url 来传递参数

    ``` JavaScript
    // delete 请求方式：与 get 类似。
    fetch("http://localhost:3000/books/987", {
            method: "delete"
        })
        .then(data => data.text())
        .then(result => console.log(result));
    ```

    (4) POST 请求方式的参数传递，需要另外两个属性帮助，其中 `body` 属性用来传递数据，`headers` 用来指定请求的  内容类型。

    ``` JavaScript
    // POST 请求方式1 url 传参方式
    fetch("http://localhost:3000/books", {
            method: "post",
            // body 用来传递参数
            body: "username=lisi&pwd=123321",
            headers: {
                // 设置请求头
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(data => data.text())
        .then(res => console.log(res));

    // Post 请求方式，json 形式参数传递
    fetch("http://localhost:3000/books", {
            method: "post",
            // body 用来传递参数
            body: JSON.stringify({
                username: "张三",
                pwd: "321123"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.text())
        .then(res => console.log(res));
    ```

    todo：方法二存在跨域问题

    (5) PUT 请求方式的参数传递，一般用于修改数据，在请求 url 中传递 id，配置对象的 body 属性中传递参数。

    ``` JavaScript
    // 方式1
    fetch("http://localhost:3000/books", {
            method: "put",
            // body 用来传递参数
            body: "username=zhangsan&pwd=321123",
            headers: {
                // 设置请求头
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(data => data.text())
        .then(res => console.log(res));
    // 方式二
    fetch("http://localhost:3000/books/77", {
            method: "PUT",
            // body 用来传递参数
            body: JSON.stringify({
                username: "张三",
                pwd: "321123"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(data => data.text())
        .then(res => console.log(res));
    ```

    (6) fetch 响应结果

    - text()：将返回体处理成字符串类型；
    - json()：返回结果和 `JSON.parse(responseText)` 一样。

      ``` JavaScript
      // web
      fetch("http://localhost:3000/json")
          .then(data => data.json()) // 转换为 json 格式数据
          .then(res => console.log(typeof res, res, res.username));

      // server
      app.get("/json", (req, res) => {
        res.json({  // 发送 json 数据
          username: "张三",
          gender: "男",
          age: 17
        });
      });
      ```

### 接口调用 - axios 用法

1. axios 的基本特性

    (1) axios （[官网](https://github.com/axios/axios)）是一个基于 Promise 用于浏览器和 node.js 的   HTTP 客户端。

    (2) 特征：

    - 支持浏览器和 node.js
    - 支持 Promise
    - 能拦截请求和响应
    - 自动转换 JSON 数据

2. axios 的基本用法

    ``` JavaScript
    // axios 需要单独引入 axios.js 的依赖
    axios.get("http://localhost:3000/adata").then(res => {
        // 通过 res.data 获取后台响应的数据，data 属性是固定的用法
        console.log(res.data);
    });
    ```

3. axios 的常用 API

    (1) GET 传递参数，用来获取数据

    - 通过 URL 传递参数

      ``` JavaScript
      // 通过传统 url 传参发起 get 请求
      // web
      axios.get("http://localhost:3000/axios?id=32").then(res => {
          console.log(res.data);
      });
      // server
      app.get("/axios", (req, res, next) => {
        res.send("axios get （URL）传递的参数：" + req.query.id);
      });

      // 通过 Restful 形式传参发起 get 请求
      // web
      axios.get("http://localhost:3000/axios/33").then(res => {
          console.log(res.data);
      });
      // server
      app.get("/axios/:id", (req, res, next) => {
        res.send("axios get （Restful）传递的参数：" + req.params.id);
      });
      ```

    - 通过 params 选项传递参数

      ``` JavaScript
      // 通过 params 属性传递参数发起 get 请求
      // web
      axios.get("http://localhost:3000/axios", {
          params: {
              id: 31
          }
      }).then(res => console.log(res.data));

        // server
      app.get("/axios", (req, res, next) => {
        res.send("axios get （params）传递的参数：" + req.query.id);
      });
      ```

    (2) DELETE 传递参数，用来删除数据，使用方式与 GET 类似，只是使用的是 axios 的 `delete` 接口。

    (3) POST 传递参数，用来添加数据。

    - 通过选项传递参数（默认传递的是 json 格式的数据）

      ``` JavaScript
      axios.post("http://localhost:3000/axios", {
          // 数据直接在第二个参数中以对象形式传递
          name: "李四",
          age: 18
      }).then(res => console.log(res.data));
      ```

      - 通过 URLSearchParams 传递参数（application/x-www/form-urlencoded）

        ``` JavaScript
        // web
        let params = new URLSearchParams();
        params.append("name", "张三");
        params.append("age", 19);
        axios.post("http://localhost:3000/axios", params).then(res => console.log(res.data));

        // server  post
        app.post("/axios", (req, res, next) => {
          res.send("axios post （选项列表）传递参数：" + req.body.name + "---" + req.body.age);
        });
        ```

    (4) PUT 传递参数，用于修改数据

    - 参数传递方式与 POST 类似，同样支持选项传递和 URLSearchParams 传参。

4. axios 的主要响应结果与全局配置

    (1) 响应结果的主要属性

    - data：实际相应回来的数据
    - headers：响应头信息
    - status：响应状态码
    - statusText：响应状态信息

    (2) axios 的全局配置

      - `axios.defaults.timeout = 3000`：超时时间
      - `axios.defaults.baseURL = "http://localhost:3000/app"`：默认地址
      - `axios.defaults.headers['mytoken'] = "aquefdasdfdaf234dsaf32d`：设置请求头

5. axios 拦截器

    (1) 请求拦截器，在请求发出之前设置一些信息。
    ![请求拦截器](http://image.acmx.xyz/msj%2FreqIntor.jpg)

    ```JavaScript
    // 创建一个请求拦截器
    axios.interceptors.request.use(function(config){
      // 在请求发出之前通过 config 进行一些信息设置，并返回设置好的 config
      ...
      return config;
    }, function(err){
      // 处理响应错误信息
    });
    ```

    (2) 响应拦截器，再获取数据之前递数据做一些加工处理。
    ![响应拦截器](http://image.acmx.xyz/msj%2FresIntor.jpg)

    ```JavaScript
    // 添加一个响应拦截器
    axios.interceptors.response.use(function(res){
      // 在这里对返回的数据进行处理，并将新数据返回
      return res.data;
    },function(err){
      // 处理响应的错误信息
    });
    ```

### 接口调用 - async/await 用法

1. async/await 的基本用法

    (1) async/await 是 ES7 引入的新语法，可以更加方便地进行异步操作。

    (2) async 关键字用于函数（async 函数的返回值是 Promise 实例对象）

    (3) await 关键字用于 async 函数当中（await 可以得到异步的结果）

    ``` JavaScript
    // 使用 async/await 处理异步操作
    async function queryData() {
        // await 修饰的语句返回的是一个 Promise 对象
        let ret = await axios.get("http://localhost:3000/adata");
        return ret;
    }
    // 调用该一部函数之后可以通过 .then 进行下一步操作
    queryData().then(ret => console.log(ret.data));
    ```

2. async/await 理多个异步请求

    处理多个异步请求且保持异步请求按一定顺序进行

    ``` JavaScript
    // async/await 处理多个异步任务
    axios.defaults.baseURL = "http://localhost:3000";
    async function queryData() {
        // 第一次异步操作
        let info = await axios.get("/async1");
        // 第二次异步操作
        let ret = await axios.get("/async2?info=" + info.data);
        return ret.data;
    }
    queryData().then(res => console.log(res));
    ```

### 基于接口的案例

1. 案例：基于后台接口重构图书管理案例
![基于后台接口的图书管理](https://s1.ax1x.com/2020/03/29/GZtOqU.gif)

2. 案例分析

    (1) 图书相关的操作基于后台接口数据进行操作

    (2) 需要调用接口的功能点

    | 功能                          | 请求方式 | 后台接口                                 |
    | :---------------------------- | :------- | :--------------------------------------- |
    | 图书列表数据加载              | GET      | <http://localhost:3000/books>            |
    | 添加图书                      | POST     | <http://localhost:3000/books>            |
    | 验证图书名称是否存在          | GET      | <http://localhost:3000/books/book/:name> |
    | 编辑图书-根据 ID 查询图书信息 | GET      | <http://localhost:3000/books/:id>        |
    | 编辑图书-提交图书信息         | PUT      | <http://localhost:3000/books/:id>        |
    | 删除图书                      | DELETE   | <http://localhost:3000/books/:id>        |

## 前端路由

1. 学习目标：

    (1) 能够说出路由的概念

    (2) 能够说出 Vue-router 的基本使用步骤

    (3) 能够说出 Vue-router 的嵌套路由用法

    (4) 能够说出 Vue-router 动态路由匹配用法

    (5) 能够说出 Vue-router 命名路由用法

    (6) 能够说出 Vue-router 编程式导航用法

    (7) 能够基于路由方法实现业务功能

2. 学习内容：

    (1) 路由的基本概念与原理

    (2) vue-router 的基本使用

    (3) vue-router 嵌套路由

    (4) vue-router 动态路由匹配

    (5) vue-router 命名路由

    (6) vue-router 编程式导航

    (7) 基于 vue-router 的案例

### 路由的基本概念与原理

1. 路由是一个比较广义和抽象的概念，路由的本质就是对应关系。在开发中，路由分为后端路由和前端路由。

2. 后端路由

    (1) 概念：根据不同的用户 URL 请求，返回不同的内容。

    (2) 本质：URL 请求地址与服务气资源之间的对应关系。

    ![后端路由](http://image.acmx.xyz/msj%2Fbgrouter.jpg)

3. SPA（Single Page Application）

    (1) 后端渲染（存在性能问题）

    (2) Ajax 前端渲染（前端渲染提高性能，但是不支持浏览器的前进后退操作）

    (3) SPA（Single Page Application）单页面应用程序：整个网站只有一个页面，内容的变化通过 Ajax 局部更新实 现，同时支持浏览器地址栏的前进和后退操作。

    (4) SPA 实现原理之一：基于 URL 地址栏的 hash（hash 的变化会导致浏览器记录访问历史的变化、但是 hash 的变化  不会触发新的 URL 请求）。

    (5) 在实现 SPA 过程中，最核心的技术点就是前端路由。

4. 前端路由

    (1) 概念：根据不同的用户事件，显示不同的页面内容。

    (2) 本质：用户事件与事件处理函数之间的对应关系。

    ![前端路由](http://image.acmx.xyz/msj%2Ffrtouter.jpg)

5. 前端路由实现

    (1) 简易前端路由：基于 URL 中的 hash 实现：点击菜单的时候改变 URL 的 hash，根据 hash 的变化控制组建的切  换。
    ![简易前端路由](https://s1.ax1x.com/2020/03/30/GuGk8A.gif)

    ``` JavaScript
    // 监听 window 的 onhsahchange 事件，根据获取道德最新的 hash 值，切换要显示的组件的名称
    window.onhashchange = function () {
        // 通过 location.hash 获取到最新的 hash 值
    }
    ```

    (2) [Vue Router](https://router.vuejs.org/zh/) 是 Vue.js 官方的路由管理器。

    - 它和 Vue.js 的核心深度集成，可以非常方便的用于 SPA 应用程序的开发。
    - Vue Router 包含的功能有：
      - 支持 HTML5 历史模式或 hash 模式
      - 支持嵌套路由
      - 支持路由参数
      - 支持编程式路由
      - 支持命名路由

### vue-router 的基本使用

1. 基本使用步骤

    (1) 引入相关的库文件

    ``` HTML
    <!-- 导入 vue 文件，为全局 window 对象 挂载 Vue 构造函数 -->
    <script src="./js/vue.js"></script>
    <!-- 导入 vue-router wenjian，为全局 window 对象 挂载 VueRouter 构造函数 -->
    <script src="./js/vue-router.js"></script>
    ```

    (2) 添加路由链接

    ``` HTML
    <!-- router-link 是 vue 中提供的标签，默认会被渲染为 a 标签 -->
    <!-- to 属性默认会被渲染������� href 属性 -->
    <!-- to 属性的值默认会被渲染为 # 开头的 hash 地址 -->
    <router-link to="/user">User</router-link>
    <router-link to="/register">Register</router-link>
    ```

    (3) 添加路由填充位

    ``` HTML
    <!-- 路由填充位（也叫做路由占位符） -->
    <!-- 将来通过路由规则匹配到的组件，将会被渲染到 router-view 所在的位置 -->
    <router-view></router-view>
    ```

    (4) 定义路由组件

    ``` JavaScript
    const User = {
        template: "<div>User</div>"
    };
    const Register = {
        template: "<div>Register</div>"
    };
    ```

    (5) 配置路由规则并创建路由实例

    ``` JavaScript
    // 创建路由实例对象
    const router = new VueRouter({
        // routes 是路由规则数据
        routes: [
            // 每个路由规则都是一个配置对象，其中至少包含 path 和 component 两个属性
            // path 表示当前路由规则对应要展示的组件
            // component 表示当前路由规则对应要展示的组件
            {
                path: "/user",
                component: User
            },
            {
                path: "/register",
                component: Register
            }
        ]
    });
    ```

    (6) 把路由挂载到 Vue 根实例中

    ``` JavaScript
    new Vue({
        el: "#app",
        // 为了能够让路由规则生效，必须把路由对象挂载到 vue 实例对象上
        router
    });
    ```

2. 路由重定向

    (1) 路由重定向指的是，用户在访问地址 A 的时候，强制用户跳转到地址 C，从而展示特定的组件页面。

    (2) 通过路由规则的 `redirect` 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

    ``` JavaScript
    const router = new VueRouter({
      routes: [
          // 其中，path 表示需要重定向的原地址，redirect 表示将要被重定向到的新地址
          {
              path: "/",
              redirect: "/user"
          },
          {
              path: "/user",
              component: User
          },
          {
              path: "/register",
              component: Register
          }
      ]
    });
    ```

### vue-router 嵌套路由

1. 嵌套路由用法

    (1) 嵌套路由功能分析

    - 点击父级路由链接显示模板内容
    - 模板内容中又有子级路由链接
    - 点击子级路由链接显示子级模板内容

    (2) 父组件路由模板

    - 父级路由链接
    - 父级组件路由填充位

      ``` HTML
      <!-- 父级路由链接 -->
      <p>
          <router-link to="/user">User</router-link>
          <router-link to="/register">Register</router-link>
      </p>

      <div>
          <!-- 父组件路由填充位 -->
          <router-view></router-view>
      </div>
      ```

    (3) 子级路由模板

    - 子级路由链
    - 子级路由填充位

    ``` JavaScript
    const Register = {
        template: `
            <div>
                <h1>Register</h1>
                <hr />
                <!-- 子级路由链接 -->
                <router-link to="/register/tab1">Tab1</router-link>
                <router-link to="/register/tab2">Tab2</router-link>

                <!-- 子级路由填充位 -->
                <router-view></router-view>
            </div>`
    };
    ```

2. 嵌套路由的实现

    (1) 为子组件创建子组件

    ``` JavaScript
    // register 的子组件
    const Tab1 = {
        template: "<h2>tab1</h2>"
    };
    const Tab2 = {
        template: "<h2>tab2</h2>"
    };
    ```

    (2) 完善路由规则，通过 `children` 属性数组来实现子组件中组件的路由

    ``` JavaScript
    const router = new VueRouter({
        // routes 是路由规则数据
        routes: [
            {
                path: "/",
                redirect: "/user"
            },
            {
                path: "/user",
                component: User
            },
            {
                path: "/register",
                component: Register,
                // children 数组表示子路由规则
                children: [{
                        path: "/register/tab1",
                        component: Tab1
                    },
                    {
                        path: "/register/tab2",
                        component: Tab2
                    }
                ]
            }
        ]
    });
    ```

### vue-router 动态路由匹配

1. 动态路由匹配的概念

    (1) 动态路由规则指的是，如果某些路由规则他它们的一部分是完全一样的，只另一部分是动态变化的，这是可以将动态变化 的部分形成路由参数，这些路由参数就是动态路路由匹配。

    (2) 应用场景：通过动态路由参数的模式惊醒路由匹配。

2. 动态路由匹配规则使用

    (1) 在配置路由规则是，使用 `path` 指定路由地址时，在动态路径参数以冒号开头

    ``` JavaScript
    const router = new VueRouter({
        // routes 是路由规则数据
        routes: [{
                path: "/",
                redirect: "/user"
            },
            {
                // 在配置路由规则是，使用 `path` 指定路由地址时，在动态路径参数以冒号开头
                path: "/user/:id",
                component: User
            },
            {
                path: "/register",
                component: Register
            }
        ]
    });
    ```

    (2) 路由组件中可以通过 `$route.params` 获取路由参数

    ``` JavaScript
    const User = {
        // 路由组件中可以通过 `$route.params` 获取路由参数
        template: "<h1>User --- {{$route.params.id}}</h1>"
    };
    ```

3. 路由组件传递参数

    (1) `$route` 与对应路由形成高度耦合，不够灵活，所以可以使用 `props` 将组件和路由解耦。

    (2) 使用方式一：将 `props` 的值为布尔类型

    ``` JavaScript
    const router = new VueRouter({
        // routes 是路由规则数据
        routes: [
            {
                // 在配置路由规则是，使用 `path` 指定路由地址时，在动态路径参数以冒号开头
                path: "/user/:id",
                component: User,
                // 如果 props 被设置为 true，route.params 将会被设置为组件属性
                props: true
            }
        ]
    });

    // 定义路由组件
    const User = {
        props: ["id"], // 在子组件中可以使用 props 接收被解耦的 route.props 路由参数
        template: "<h1>User --- {{id}}</h1>"
    };
    ```

    (3) 使用方式二：`props` 的值为对象类型

    ``` JavaScript
    const router = new VueRouter({
        // routes 是路由规则数据
        routes: [
            {
                // 在配置路由规则是，使用 `path` 指定路由地址时，在动态路径参数以冒号开头
                path: "/user/:id",
                component: User,
                // 如果 props 是一个对象，他会被按原样设置为组件属性
                props: {
                    uname: "sam",
                    age: 18
                }
            }
        ]
    });

    // 定义路由组件
    const User = {
        props: ["id", "uname", "age"], // 在子组件中可以使用 props 接收路由传参
        template: "<h1>User --- id：{{id}} --- 姓名：{{uname}} --- 年龄：{{age}}</h1>"
    };
    ```

    (4) 使用方式三：`props` 的值为函数类型，此时可以既传递静态数据也可以传递动态参数

    ``` JavaScript
    const router = new VueRouter({
        // routes 是路由规则数据
        routes: [
            {
                // 在配置路由规则是，使用 `path` 指定路由地址时，在动态路径参数以冒号开头
                path: "/user/:id",
                component: User,
                // 如果 props 是一个函数，则这个函数接收 route 对象为自己的形参
                props: route => ({uname: "tom", age: 13, id: route.params.id})
            }
        ]
    });

    const User = {
        props: ["id", "uname", "age"], // 在子组件中可以使用 props 接收被解耦的 route.props 路由参数
        // 路由组件中可以通过 `$route.params` 获取路由参数
        template: "<h1>User --- id：{{id}} --- 姓名：{{uname}} --- 年龄：{{age}}</h1>"
    };
    ```

### vue-router 命名路由

1. 命名路由的匹配规则，为了更加方便地表示路由的路径，可以给卢欧规则请一个别名，既为“命名路由”。

2. 命名路由使用

``` JavaScript
const router = new VueRouter({
    // routes 是路由规则数据
    routes: [
        {
            // 在定义路由规则时，使用 name 属性来命名路由
            name: "user",
            path: "/user/:id",
            component: User
        }
    ]
});
```

``` HTML
<!-- 在使用命名路由的时候，需要给 router-link 的 to 属性添加属性绑定，绑定一个对象，
name 属性设置跳转的路由，params 设置要传递的参数 -->
<router-link :to="{name: 'user', params: {id: 3}}">User3</router-link>
```

### vue-router 编程式导航

1. 页面导航的两种方式

    (1) 声明式导航：通过点击链接实现导航的方式，叫做声明式导航。例如普通网页中的 `<a></a>` 链接或 vue 中的   `router-link`。

    (2) 编程式导航：通过调用 JavaScript 形式的 API 实现导航的方式，叫做编程式导航。例如普通网页中的  `location.href`。

2. 编程式导航基本用法，常用的编程式导航 API

    (1) `this.$router.push("hash地址")`，直接导航到对应路由的组件。

    (2) `this.$router.go(n)`，n 为一个整数，表示前进或后退的次数。

3. 编程式导航参数规则

    `router.push()` 方法的参数规则

    ```JavaScript
    // 字符串路径名称
    router.push("home");
    // 对象
    router.push({ path: "/home" });
    // 命名的路由，并传递参数
    router.push({ name: "user", params: { userId: 123 }});
    // 带查询参数，最终变成 /register?uname=sam
    router.push({ path: "/register", query: { uname: "sam" }});
    ```

### 基于 vue-router 的案例

1. 后台管理路由案例：
![后台管理路由案例.gif](https://s1.ax1x.com/2020/04/04/G0y0u6.gif)

2. 案例分析

    (1) 用到的路由技术要点：

    - 路由的基本用法
    - 嵌套路由
    - 路由重定向
    - 路由传参
    - 编程式导航

    (2) 根据项目的整体布局规划好组件结构，通过路由导航控制组件的显示

    - 抽离并渲染 App 跟根组
    - 将左侧菜单栏改造为路由链接
    - 创建左侧菜单对应的路由组件
    - 在右侧主题区域添加路由占位符
    - 添加子路由规则
    - 通过路由重定向默认渲染用户组件
    - 渲染用户列表数据
    - 编程式导航跳转用户详情页
    - 实现后退功能

## 前端工程化

1. 学习目标

    (1) 能够指导有哪些模块化的相关规范

    (2) 能够使用 webpack

    (3) 能够使用 Vue 单文件组件

    (4) 能够使用 Vue 脚手架

    (5) 能够使用 Element-UI

2. 学习内容

    (1) 模块化的相关规范

    (2) webpack 用法

    (3) Vue 单文件组件

    (4) Vue 脚手架

    (5) Element-UI 的基本使用

### 模块化相关规范

1. 模块化概述

    (1) 传统开发模式的主要问题：

    - 命名冲突
    - 文件依赖

    (2) 通过模块化解决上述问题

    - 模块化就是把单独的一个功能封装到一个模块（文件）中，模块之间相互隔离，但是可以通过特定的接口公开内部成员，也可以依赖别的模块。
    - 模块化开发的好处：方便代码的重用，从而提升开发效率，并且方便后期的维护。

2. 浏览器端模块化

    (1) AMD 规范，代表：[Require.js](https://requirejs.org/)

    (2) CMD 规范，代表：[sea.js](https://seajs.github.io/seajs/docs/)

3. 服务器端模块化规范

    CommonJS：
    - 模块分为单文件模块与包
    - 模块成员到处：`module.exports` 和 `exports`
    - 模块成员导入：`require("模块标识符")`

4. 大一统的模块化规范 - ES6模块化规范

    (1) 在 ES6 模块化规范诞生之前，JavaScript 社区已经尝试并提出了 AMD、CMD、CommonJS 等模块化规范。但是，这些社区提出的模块化标准，还是存在一定的差异性与局限，并不是浏览器与服务器通用的模块化标准，例如 AMD 和 CMD 适用于浏览器端的 JavaScript 模块化，CommonJS 适用于服务器端的 JavaScript 模块化。因此，ES6 语法规范中，在语言层面上定义了 ES6 模块化规范，是浏览器端与服务器端通用的模块化开发规范。

    (2) ES6 模块化规范中定义

    - 每个 js 文件都是一个独立的模块
    - 导入模块成员使用 `import` 关键字
    - 暴漏模块成员使用 `export` 关键字

    (3) Node.js 中通过 babel 体验 ES6 模块化

    - `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node`
    - `npm install --save @babel/polyfill`
    - 项目根目录创建文件 babel.config.js
    - babel.config.js 文件内容如下：

        ``` JavaScript
        const presets = [
            ["@babel/env", {
                targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1"
                }
            }]
        ];
        module.exports = { presets };
        ```

    - 创建想要运行的 index.js 文件，通过 `npx babel-node .\index.js` 命令执行代码

5. ES6 模块化的基本用法

    (1) 默认导出与默认

    - 默认导出语法： `export default 默认导出的成员`

        ``` JavaScript
        // 当前文件模块为 m1.js

        // 定义私有成员
        let a = 10;
        let c = 20;
        // 外界访问不到变量 d，因为它没有被暴漏出去
        let d = 30;

        function show() {

        }

        // 将本模块中的私有成员暴漏出去，供其他模块使用
        export default {
            a,
            c,
            show
        }
        ```

    - 默认导入语法： `import 接受名称 from "模块标识符"`

        ``` JavaScript
        // 导入模块成员
        import m1 from "./m1.js";

        console.log(m1);
        // 打印输出结果为：
        // { a: 10, c: 20, [Function: show] }
        ```

    - 注意：每个模块中，只有内需使用唯一的一次 `export default`，否则会报错！当然模块可以不使用 `export default` 暴漏内部成员。

    (2) 按需导出与按需导入

    - 按需导出语法：`export let s1 = 10;`

        ``` JavaScript
        // 但钱文件模块为 m1.js

        // 向外界按需导出变量 s1
        export let s1 = "aaa";
        // 向外按需导出变量 s2
        export let s2 = "bbb";
        // 向外按需导出方法
        export function say = function () {
            console.log("Hello!");
        }
        ```

    - 按需导入语法：`import { s1 } from "模块标识符"`

        ``` JavaScript
        // 导入模块成员，其中 s2 通过 as 修饰符重命名为 ss2
        import { s1, s2 as ss2, say } from "./m1.js";

        console.log(m1);
        // 打印输出结果为：
        // { a: 10, c: 20, [Function: show] }

        console.log(s1); // 打印输出 aaa
        console.log(ss2); // 打印输出 bbb
        console.log(say); // 打印输出 [Function: say]
        ```

    (3) 直接导入并执行模块代码
    有时候，我们只想淡出执行某个模块中的代码，并不需要得到模块中向外暴漏的成员，此时可以直接导入并执行模块代码。

    ``` JavaScript
    // 当前文件模块为 m2.js

    // 在当前模块中执行一个 for 循环操作
    for (let i = 0; i < 3; i++) {
        console.log(i);
    }

    // index.js
    // 直接导入并执行模块代码
    import "./m2.js";
    ```

### webpack

1. webpack 的出现

    (1) 当前 Web 开发面临的困境

    - 文件依赖关系错综复杂
    - 静态资源请求效率低
    - 模块化支持不友好
    - 浏览器对高级 JavaScript 特性兼容程度较低

    (2) webpack 概述
    - webpack 是一个流行的前端项目构建工具（打包工具），可以解决当前 web 开发中所面临的困境。
    - webpack 提供了有好的模块化支持，以及代码压缩混淆、处理 js 兼容问题、性能优化等强大的功能，从而让程序员把工 作重心放到具体的功能是线上，提高了开发效率和项目的可维护性。
    - 目前绝大多数企业中的前端项目，都是基于 webpack 进行打包构建的。
    ![webpack](http://image.acmx.xyz/msj%2Fwebpack.jpg)

2. webpack 的基本使用

    (1) 创建列表隔行变色项目

    - 新建项目空白目录，并运行 `npm init -y` 命令，初始化包管理配置文件 package.json
    - 新建 src 源代码目录
    - 新建 src/index.html 首页文件
    - 初始化首页基本的结构
    - 运行 `npm initall jquery -S` 命令，安装 jQuery
    - 通过模块化的形式，实现列表隔行变色效果。

    (2) 在项目中安装和配置 webpack

    - 运行 `npm install webpack webpack-cli -D` 命令，安装 webpack 相关的包
    - 在项目根目录中，创建名为 webpack.config.js 的 webpack 配置文件
    - 在 webpack 的配置文件中，初始化如下基本配置，`mode` 属性用来指定构建模式，有两个可选值 `develpoment` 和 `production`，前者不会对转换的代码进行压缩与混淆，转换时间可能会较长，而后者则相反。

        ``` JavaScript
        module.exports = {
            mode: "development" // mode 用来指定构建模式
        }
        ```

    - 在 package.json 配置文件中的 scripts 节点下，新增如下 dev 脚本，script 节点下的脚本可以通过 `npm run` 执行

        ``` json
        "scripts": {
            "dev": "webpack"
        }
        ```

    - 在终端中运行 `npm run dev` 命令，启动 webpack 进行项目打包

    (3) webpack 配置打包的入口与出口

    - webpack 的 4.x 版本中默认约定：打包的入口文件为 src/index.js，而打包的输出口文件为 dist/main.js
    - 如果要修改打包的入口与出口，可以在 webpack.config.js 中新增如下配置信息

        ``` JavaScript
        const path = require("path"); // 导入 node.js 中专门操作路径的模块
        module.exports = {
            entry: path.join(__dirname, "./src/index.js"), // 打包入口文件的路径
            output: {
                path: path.join(__dirname, "./dist"), // 输出文件的存放路径
                filename: "bundle.js" // 输出文件的名称
            }
        }
        ```

    (4) 配置 webpack 的自动打包功能

    - 运行 `npm install webpack-dev-server -D` 命令，安装支持项目自动打包的工具
    - 修改 package.json 文件中 scripts 节点下的 dev 命令如下

        ``` json
        "scripts": {
            "dev": "webpack-dev-server"
        }
        ```

    - 将 src/index.html 中 script 脚本的引用路径修改为 `/bundle.js`
    - 运行 `npm run dev` 命令，重新进行打包
    - 在浏览器中访问 <http://localhost:8080> 地址，查看自动打包效果
    - 注意：
      - webpack-dev-server 会启动一个实时打包的 http 服务器
      - webpack-dev-server 打包生成的输出文件，默认放到了项目根目录中，而且是虚拟的、看不见的。

    (5) 配置 html-webpack-plugin 生成预览页面
    - 运行 `npm install html-webpack-plugin -D` 命令，安装生成预览页面的插件
    - 修改 webpack.config.js 文件头部区域，添加如下配置信息

        ``` JavaScript
        // 导入生成预览页面的插件，得到一个构造函数
        const HtmlWebpackPlugin = require("html-webpack-plugin");

        const htmlPlugin = new HtmlWebpackPlugin({ // 创建插件的实例对象
            template: "./webpack_base_using/src/index.html", // 指定要用到的模板文件
            filename: "index.html" // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
        });
        ```

    - 修改 webpack.config.js 文件中向外暴漏配置对象，新增如下配置节点

        ``` JavaScript
        module.exports = {
            plugins: [htmlPlugin] // plugins 数组是 webpack 打包期间会用到的一些插件列表
        }
        ```

    (6) 配置自动打包相关的参数，在 package.json 文件的 `script` 节点中的 `dev` 节点下进行参数配置。参数：`--open` 标识打包完成后自动打开浏览器页面，`--host` 配置 IP 地址，`port` 配置端口。

    ``` json
    "script": {
        "dev": "webpack-dev-server --open --host 217.0.0.1 --port 8000"
    }
    ```

3. webpack 中的加载器

    (1) 通过 loader 打包非 js 模块

    - 在实际开发过程中，webpack 默认只能打包处理以 .js 后缀名结尾的模块，其他非 .js 后缀名结尾的模块，webpack 默认处理不了，需要调用 loader 加载器才可以正常打包，否则就会报错！
    - loader 加载器可以协助 webpack 打包处理特定的文件模块，比如
      - less-loader 可以打包处理 .less 相关的文件
      - sass-loader 可以打包处理 .scss 相关的文件
      - url-loader 可以打包处理 css 中与 url 路径相关的文件

    (2) loader 的调用过程

    ![loader 调用过程](http://image.acmx.xyz/msj%2FloaderP.jpg)

4. webpack 中加载器的基本使用

    (1) 打包处理 css 文件

    - 运行 `npm i style-loader css-loader -D` 命令，安装处理 css 文件内的 loader
    - 在 webpack.config.js 暴漏出口中添加 `module` 属性属性值为一个对象，该对象中中添加 `rules` 数组，该数组管理各类 loader 加载器匹配规则，每一条规则为一个对象，其中 `test` 表示匹配的文件类型，`use` 表示对应要调用的 loader，css 文件的 loader 处理如下

        ``` JavaScript
         // 所有第三方文件模块的匹配规则
        module: {
            rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }]
        }
        ```

    - 注意：
      - `use` 数组中指定的 loader 顺序是固定的
      - 多个 loader 的调用顺序是从后往前调用

    (2) 打包处理 less 文件

    - 运行 `npm i less-loader less -D` 命令
    - 在 webpack.config.js 的第三方文件匹配规则 `rules` 数组中添加如下 loader 规则

        ``` JavaScript
        module: {
            rules: [{
                    test: /\.less$/,
                    use: ["style-loader", "css-loader", "less-loader"]
                }
            ]
        }
        ```

    (3) 打包处理 scss 文件

    - 运行 `npm i sass-loader node-sass -D` 命令
    - 在 webpack.config.js 的第三方文件匹配规则 `rules` 数组中添加如下 loader 规则

        ``` JavaScript
        module: {
            rules: [{
                    test: /\.scss/,
                    use: ["style-loader", "css-loader", "sass-loader"]
                }
            ]
        }
        ```

    (4) 配置 postCSS 自动添加 css 的兼容前缀

    - 运行 `npm i postcss-loader autoprefixer -D` 命令
    - 在项目根目录中创建 postcss 的配置文件 postcss.config.js 并初始化如下配置

        ``` JavaScript
        const autoprefixer = require("autoprefixer"); // 导入自动添加前缀的插件
        module.exports = {
            plugins: [autoprefixer] // 挂载插件
        }
        ```

    - 在 webpack.config.js 的第三方文件匹配规则 `rules` 数组中修改 css 的 loader 规则

        ``` JavaScript
        module: {
            rules: [{
                    test: /\.css$/,
                    use: ["style-loader", "css-loader", "postcss-loader"]
                }
            ]
        }
        ```

    (5) 打包样式表中的图片和字体文件

    - 运行 `npm i url-loader file-loader -D` 命令
    - 在 webpack.config.js 的第三方文件匹配规则 `rules` 数组中添加如下 loader 规则，其中 `?` 之后的是 loader 的参数项。`limit` 用来指定图片的大小，单位是字节（byte），只有小于 `limit` 大小的图片，才会转为 base64 图片。

        ``` JavaScript
        module: {
            rules: [
                {
                    test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                    use: "url-loader?limit=16940"
                }
            ]
        }
        ```

    (6) 打包处理 js 文件中的高级语法

    - 安装 babel 转换器相关的包，运行命令 `npm i babel-loader @babel/core @babel/runtime -D`
    - 安装 babel 语法插件相关的包，运行命令 `npm i @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D`
    - 在项目根目录中，创建 babel 配置文件 babel.config.js 并初始化基本配置如下：

        ``` JavaScript
        module.exports = {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"]
        }
        ```

    - 在 webpack.config.js 的第三方文件匹配规则 `rules` 数组中添加如下 loader 规则

        ``` JavaScript
        module: {
            rules: [
                // exclude 未排除想，表示 babel-loader 不需要处理 node_modules 中的 js 文件
                {
                    test: /\.js$/,
                    use: "babel-loader",
                    exclude: /node-modules/
                }
            ]
        }
        ```

### Vue 单文件组件

1. 传统组件的问题和解决方案

    (1) 问题

    - 全局定义的组件必须保证组件的名称不重复
    - 字符串模板缺乏语法高亮，在 HTML 有很多行的时候，需要用到丑陋的 `\`
    - 不支持 CSS，意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
    - 没有构建步骤限制，只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器（如：Babel）

    (2) 解决方案：针对传统组建的问题，Vue 提供了一个解决方案，就是使用 Vue 单文件组件。

2. Vue 单文件组件的基本用法

    (1) 单文件的组成结构

    - `template`：组建的模板区域
    - `script`：业务逻辑区域
    - `style`：样式区域

    (2) Vue 单文件模板实例

    ``` Vue
    <template>
        <!-- 这里用于定义 Vue 组件的模板内容 -->
    </template>

    <script>
        // 这里用于定义 Vue 组件的业务逻辑
        export default {
            data(){
                return {} // 私有数据
            },
            methods: {
                // 处理函数
            },
            // ... 其他业务逻辑
        }
    </script>

    <style scoped>
        /* 这里用于定义组件的样式 */
        /* 建议添加 scoped 属性，从而是样式仅在当前组件生效 */
    </style>
    ```

3. webpack 进阶及与 Vue 配合使用

    (1) webpack 中配置 vue 组件的加载器

    - 运行 `npm i vue-loader vue-template-compiler -D` 命令
    - 在 webpack.config.js 配置文件中，添加 vue-loader 的配置项，如下：

        ``` JavaScript
        // 导入 vue
        const VueLoaderPlugin = require("vue-loader/lib/plugin");

        module.exports = {
            plugins: [
                // ... 其他插件
                new VueLoaderPlugin() // vue 单文件加载，请确保引入这个插件
            ],
            module: {
                rules: [
                    // ...其他规则
                    // vue 加载器
                    {
                        test: /\.vue$/,
                        use: "vue-loader"
                    }
                ]
            }
        }
        ```

    (2) 在 webpack 项目中使用 vue

    - 运行 `npm i vue -S` 安装 vue
    - 在 src/index.js 入口文件中通过 `import Vue form "vue";` 来导入 vue 构造函数
    - 创建 vue 的实例对象，并指定要控制的 el 区域
    - 通过 render 函数渲染 App 根组件

        ``` JavaScript
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
        ```

    (3) webpack 打包发布，项目上线之前需要通过 webpack 将应用进行整体打包，可以通过 package.json 文件配置打包命令，该命令默认加载项目根目录中的 webpack.config.js 配置文件。`scripet` 节点下 `build` 用来打包 `dev` 用于开发调式

    ``` json
    "script": {
        "build": "webpack -p",
        "dev": "webpack-dev-server --open -host 127.0.0.1 8888"
    }
    ```

### Vue 脚手架

1. Vue 脚手架的基本用法

    (1) Vue 脚手架用于快速生成 Vue 项目基础架构，[官方网址](https://cli.vuejs.org/zh/)

    (2) 使用步骤，安装 3.x 版本的 Vue 脚手架，运行命令 `npm install -g @vue/cli`

2. 基于 3.x 版本的脚手架创建 vue 项目

    (1) 基于交互式命令行的方式，创建新版 vue 项目，运行命令 `vue create my-project`

    (2) 基于图形化界面的方式，创建新版 vue 项目，运行命令 `vue ui`

    (3) 基于 2.x 的就模板，创建旧版 vue 项目

    ``` bash
    npm install -g @vue/cli-init
    vue init webpack my-project
    ```

3. Vue 脚手架分析生成的项目结构分析
![项目结构](http://image.acmx.xyz/msj%2Fsturct.jpg)

4. Vue 脚手架的自定义配置

    (1) 方式一：通过 package.json 配置项目

    - 将所有的自定义配置添加到 `vue` 节点下，注意要必须符合规范的 json 语法

        ``` json
        "vue": {
            "devServer": {
                "port": "8888",
                "open": true
            }
        }
        ```

    - 注意：不推荐使用这种配置方式，因为 package.json 主要用来管理报的配置信息；为了方便维护，推荐将 vue 脚手架相关的配置，单独定义到 vue.config.js 配置文件中。

    (2) 方式二：通过单独的配置文件配置项目

    - 在项目根目录中创建文件 vue.config.js
    - 在该文件中进行相关配置，从而覆盖默认配置

        ``` JavaScript
        // vue.config.js
        module.exports = {
            devServer: {
                open: true,
                port: 8888
            }
        };
        ```

### Element-UI 基本使用

1. Element-UI：是一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。[官方网站](https://element.eleme.cn/#/zh-CN)

2. 基于命令行方式手动安装

    (1) 安装依赖包 `npm i element-ui -S`

    (2) 在 src/main.js 入口文件中导入 Element-UI 相关资源

    ``` JavaScript
    // 导入组件库
    import ElementUI from 'element-ui'
    // 导入组件相关样式
    import 'element-ui/lib/theme-chalk/index.css'
    // 配置 Vue 插件
    Vue.use(ElementUI)
    ```

3. 基于图形化界面自动安装

    (1) 运行 `vue ui` 命令，打开图形化界面

    (2) 通过 Vue 项目管理器，进入具体的项目配置面板

    (3) 点击“插件 -> 添加插件”，进入插件查询面板

    (4) 搜索 vue-cli-plugin-element 并安装

    (5) 配置插件，实现按需导入，从而减少打包后项目的体积

## Vue 全家桶-项目实战

1. 学习目标

    (1) 能够基于 Vue 初始化项目

    (2) 能够基于 Vue 技术栈进行项目开发

    (3) 能够使用 Vue 的第三方组件进行项目开发

    (4) 能够说出前后端分离的开发模式

2. 开发目录

    (1) 项目概述

    (2) 项目初始化

    (3) 登录/退出功能

    (4) 主页布局

    (5) 用户管理模块

    (6) 权限管理模块

    (7) 分类管理模块

    (8) 参数管理模块

    (9) 商品管理模块

    (10) 订单管理模块

    (11) 数据统计模块

### 项目概述

1. 电商项目基本业务概述：根据不同的应用场景，电商系统一般都提供了 PC 端、移动 APP、移动 Web、微信小程序等多种终端访问方式。
![电商](http://image.acmx.xyz/msj%2Fstore.jpg)

2. 电商后台管理系统的功能：电商后台管理系统用于管理用户账号、商品分类、商品信息、订单、数据统计等业务功能。
![后台管理系统](http://image.acmx.xyz/msj%2Fback.jpg)

3. 电商后台管理系统的开发模式（前后端分离）：电商后台管理系统整体采用前后端分离的开发模式，其中前端项目是基于 Vue 技术栈的 SPA 项目。
![前后端分离](http://image.acmx.xyz/msj%2Ffb.jpg)

4. 电商后台管理系统的技术选型

    (1) 前端项目技术栈

    - Vue
    - Vue-router
    - Element-UI
    - Axios
    - Echarts

    (2) 后端项目技术栈

    - node.js
    - Express
    - Jwt
    - Mysql
    - Sequelize

### 项目初始化

1. 前端项目初始化步骤

    (1) 安装 Vue 脚手架

    (2) 通过 Vue 脚手架创建项目

    (3) 配置 Vue 路由

    (4) 配置 Element-UI 组件库

    (5) 配置 axios 库

    (6) 初始化 git 远程仓库

    (7) 将本地项目托管到 github 或码云中

2. 后台项目的环境安装配置

    (1) 安装 MySQL 数据库，[MySQL 安装教程](https://www.runoob.com/mysql/mysql-install.html)

    (2) 安装 Node.js 环境，[Node.js 官网](https://nodejs.org/en/) [Node.js 中文网](http://nodejs.cn/)

    (3) 配置项目相关信息

    (4) 启动项目

    (5) 使用 Postman 测试后台项目接口是否正常

### 登录/退出功能

1. 登录概述

   (1) 登录业务流程

    - 在登陆页面输入用户名和密码
    - 调用后台接口进行验证
    - 通过验证之后，根据后台的响应状态跳转到项目主页

   (2) 登录业务的相关技术点

   - http 无状态的
   - 通过 cookies 在客户端记录状态
   - 通过 session 在服务器端记录状态
   - 通过 token 方式维持状态（存在跨域问题推荐此方式）

2. 登录 - token 原理分析
![token原理分析](http://image.acmx.xyz/msj%2Ftoken.jpg)

3. 登录功能实现

    (1) 创建子分支 login，运行命令 `git checkout -b login`

    (2) 登陆页面的布局，通过 Element-UI 组件实现布局

    - el-form
    - el-form-item
    - el-input
    - el-button
    - 字体图标

    (3) 路由到行首为控制访问权限：如果用户没用登录，但是直接通过 URL 访问特定页面，需要重新导导航登陆页面。

    ``` JavaScript
    // 为路由象添加 beforeEach 导航守卫，to 去哪个页面，from 从哪个页面来，next 放行函数
    router.beforeEach((to, from, next) => {
    // 如果用户访问的登录页，直接放行
    if (to.path === '/login') {
        return next()
    } else {
        // 从 sessionStorage 中获取保存的 token 值
        const tokenStr = window.sessionStorage.getItem('token')
        // 没有 token 强制跳转到登录页
        if (!tokenStr) {
        return next('/login')
        } else {
        next()
        }
    }
    })
    ```

4. 退出

    (1) 退出功能实现原理：基于 token 的方式实现退出不叫简单，只需要销毁本地的 token 即可。这样，后续的请求就不会携带 token，必须重新新登陆生成一个新的 token 之后才可以继续访问页面。

    (2) 核心代码

    ``` JavaScript
    // 清空 token
    window.sessionStorage.clear()
    // 跳转到登录页
    this.$router.push('/login')
    ```

    (3) 提交登录/登出分支

    ``` bash
    git status
    git add .
    git status
    git commit -m "完成了登录功能"

    git branch
    git checkout master
    git branch
    git merge login
    git push

    git checkout login
    git branch
    git push -u origin login
    ```

### 主页布局

1. 整体布局

    (1) 页面效果
    ![整体页面布局](http://image.acmx.xyz/msj%2Flayout.jpg)

    (2) 整体布局：像上下划分，再左右划分，主要代码如下

    ``` HTML
    <el-container>
        <!-- 头部区域 -->
        <el-header>Header</el-header>
        <!-- 页面主题区域 -->
        <el-container>
        <!-- 左侧侧边栏 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 右侧主题内容区域 -->
        <el-main>Main</el-main>
        </el-container>
    </el-container>
    ```

2. 左侧菜单

    (1) 效果
    ![左侧菜单栏效果](http://image.acmx.xyz/msj%2Fmenu.jpg)

    (2) 菜单分为二级，并且可以折叠，主要代码如下

    ``` HTML
    <el-menu>
        <el-submenu>
            <!-- 这个 template 是一级菜单的内容模板 -->
            <i class=el-icon-menu></i>
            <span>一级菜单</span>
            <!-- 在一级菜单中，可以嵌套二级菜单 -->
            <el-menu-item>
                <i class="el-icon-menu"></i>
                <span slot="title">二级菜单</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
    ```

3. 通过接口获取菜单数据

    通过 axios 请求拦截器添加 token，保证拥有获取数据的权限。

    ``` JavaScript
    // Axios 请求拦截器
    Axios.interceptors.request.use(config => {
        // 为请求头对象添加 Token 验证的 Authorization 字段
        config.headers.Authoriztion = window.sessionStorage.getItem('token')
        return config
    })
    ```

### 其他功能设计

1. 用户列表页设计

    (1) 用户列表效果
    ![用户列表](http://image.acmx.xyz/msj%2Fusers.jpg)

    (2) 用户列表页主要使用面包屑和表格来完成，主体代码如下

    ``` HTML
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表表格 -->
      <el-table :data="userlist" border strip>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-card>
    ```

2. 权限管理功能

    (1) 权限管理业务分析：通过权限管理模块控制不同的用户可以进行哪些操作，具体可以通过角色的方式进行控制，即每个用户分配一个特定的角色，角色包括不同的功能权限。
    ![权限管理业务](http://image.acmx.xyz/msj%2Frights.jpg)

    (2) 权限列表设计

    - 权限列表页面效果
    ![权限列表效果](http://image.acmx.xyz/msj%2Frightslist.jpg)

    - 主要页面布局代码

    ``` HTML
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level"></el-table-column>
      </el-table>
    </el-card>
    ```

3. 分类管理

    (1) 商品分类用于在购物时，快速找到所要购买的商品，可以通过电商平台主页直观的看到。
    ![实现效果](http://image.acmx.xyz/msj%2Fgoodscate.jpg)

    (2) 安装第三方依赖 `npm i vue-table-with-tree-grid -S -D`，[vue-table-with-tree-grid](https://www.npmjs.com/package/vue-table-with-tree-grid)

    (3) 基本页面结构

    ``` HTML
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品分类卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 分类表格 -->
      <tree-table
        class="treeTable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text
        border
        :show-row-hover="false"
      >
        <!-- 是否有效列的模板 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen;"
          ></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template>
        <!-- 排序列的模板 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作列模板 -->
        <!-- <template slot="opt" slot-scope="scope"> -->
        <template slot="opt">
          <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    ```

4. 参数管理

    (1) 参数管理概述：商品参数用于显示商品的固定的特征信息，可以通过电商平台商品详细页面直观的看到。
    ![Demo](http://image.acmx.xyz/msj%2Fparams1.jpg)

    (2) 最终效果
    ![最终效果](http://image.acmx.xyz/msj%2Fgoodsparams.jpg)

    (3) 基本页面结构

    ``` HTML
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 头部警告区域 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false" show-icon></el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cate_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader v-model="selectedCateKeys" :options="cateList" :props="cascaderProps" @change="cascaderChanged" clearable></el-cascader>
        </el-col>
      </el-row>
      <!-- tab 页签区域 -->
      <el-tabs v-model="tabsActiveName" @tab-click="tabsClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加动态参数的按钮 -->
          <el-button:disabled="isBtnDisabled"type="primary"size="mini"@click="addDialogVisible = true">添加参数</el-button:disabled=>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染已有的标签 -->
                <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable @close="tagClose(i, scope.row)">{{item}}</el-tag>
                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加静态属性的按钮 -->
          <el-button :disabled="isBtnDisabled" type="primary" size="mini" @click="addDialogVisible = true">添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染已有的标签 -->
                <el-tag v-for="(item, i) in scope.row.attr_vals" :key="i" closable @close="tagClose(i, scope.row)">{{item}}</el-tag>
                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    ```

5. 商品列表管理

    (1) 最终效果
    ![最终效果](http://image.acmx.xyz/msj%2Fgoodslist.jpg)

    (2) 页面布局主要代码

    ``` HTML
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表表格 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="110px"></el-table-column>
        <el-table-column label="商品数量" prop="goods_number" width="90px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="90px"></el-table-column>
        <el-table-column label="创建时间" width="160px">
          <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.goods_id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoodsById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    ```

6. 订单列表管理

    (1) 最终效果
    ![订单列表](http://image.acmx.xyz/msj%2Forderlist.jpg)

    (2) 基本页面结构

    ``` HTML
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryId" clearable @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderById"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status === '0'" type="danger">未付款</el-tag>
            <el-tag v-else type="sucess">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showAddressDialog"></el-button>
            <el-button type="success" size="mini" icon="el-icon-location" @click="showProgressDialog"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    ```

7. 统计报表

    (1) 安装依赖，通过 vue-echarts 实现，`cnpm i echarts vue-echarts -S -D`，[官网](https://github.com/ecomfe/vue-echarts/)

    (1) 最终效果
    ![报表](http://image.acmx.xyz/msj%2Freport.jpg)

    (2) 主要代码

    ``` HTML
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 报表卡片区域 -->
    <el-card>
      <v-chart :options="areaStackOptions" />
    </el-card>
    ```

### 项目优化上线

1. 学习目标：能够优化 Vue 项目，能够部署 Vue 项目。

2. 学习内容：项目优化，项目上线

3. 项目优化

    (1) 项目优化策略

    - 生成打包报告
    - 第三方库启用 CDN
    - Element-UI 组件按需加载
    - 路由懒加载
    - 首页内容定制

    (2) 生成打包报告：

    -打包时，为了直观发现项目中存在的问题，可以在打包时生成报告。生成报告的方式有两种：
    - 通过命令行参数的形式生成报告

        ``` b0ash
        // 通过 vue-cli 的命令行选项可以生成打包报告
        // --report 选项可以生成 report.html 以帮助分析包内容
        vue-cli-service build --report
        ```

    - 通过可视化的 UI 面板直接查看报告（推荐），在可视化的 UI 面板中，通过控制台和分析面板，可以方便地到项目中所存在的问题。

    (3) 通过 vue.config.js 修改 webpack 的默认配置

    - 通过 vue-cli 3.0 工具生成的项目，默认隐藏了所有的 webpack 的配置项，目的是为了屏蔽项目的配置程，让程序员把工作的中心放到具体功能和业务逻辑的实现上。
    - 如果程序员有修改 wwebpack 默认配置的需求，可以在项目根目录中，按需创建 vue.config.js 这个配置件，从而对项目的打包发布过程做自定义的配置，[具体配置参考](https://cli.vuejs.org/zh/config#vue-config-js)

        ``` JavaScript
        // vue.config.js
        // 这个文件中，应该导出一个包含了自定义配置选项的对象
        module.exports = {
            // 选项....
        }
        ```

    - 为开发模式与发布模式指定不同的打包入口：
      - 默认情况下，Vue 项目的开发模式与发布模式，公用同一个打包的口文件（即 `src/main.js`）。
      - 为了将项目的开发过程与发布过程分离，我们可以为两种模式，各自指定打包的口文件，即：开发模式的入口文件为 `src/main-dev.js`，发布模式的入口文件为 `src/main-prod.js`。
    - configureWebpack 和 chainWebpack：
      - 在 vue.config.js 导出的配置对象中，新增configureWebpack 或 chainWebpack 节点，来自定义 webpack 的打包配置。
      - 在这里 configureWebpack 和 chainWebpack 的租用相同，唯一的区别就是他们修改 webpack 配置的方式不同chainWebpack 通过链式编程的形式来修改默认的 webapack 配置，configureWebpack 通过操作对象的式，来修改默认的 webpack 配置。[参考地址](https://cli.vuejs.org/zh/guide/webpack.html)
      - 通过 chainWebpack 自定义打包入口

        ``` JavaScript
        module.exports = {
            chainWebpack: config => {
                config.when(process.env.NODE_ENV === 'production', config => {
                    config.entry('app').clear().add('./src/main-prod.js')
                })
                config.when(process.env.NODE_ENV === 'development', config => {
                    config.entry('app').clear().add('./src/main-dev.js')
                })
            }
        }
        ```

    (4) 通过 externals 加载外部 CDN 资源

    - 默认情况下，通过 import 语法导入的第三方依赖包，最终会被打包合并到同一个文件中，从而导致打包成功后，但文件体积过大的问题。
    - 为了解决上述问题，可以通过 webpack 的 externals 节点，来配置并加载外部的 CDN 资源。凡是声明在 externals 中的第三方依赖包，都不会被打包。
    - 具体配置代码

        ``` JavaScript
        config.set('externals', {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            axios: 'axios',
            lodash: '_',
            echarts: 'echarts',
            nprogress: 'NProgress',
            'vue-quill-editor': 'VueQuillEditor'
        })
        ```

    - 同时，需要在 `public/index.html` 文件的头部，添加如下的 CDN 资源引用

        ``` HTML
        <!-- nprogress 的样式表文件 -->
        <link rel="stylesheet" href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css">
        <!-- 富文本编辑器的样式表文件 -->
        <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.core.min.css">
        <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.snow.min.css">
        <link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.bubble.min.css">
        ```

    - 同时，需要在 `public/index.html` 文件的头部，添加如下的 CDN 资源引用

        ``` HTML
        <!-- js 文件 -->
        <script src="https://cdn.staticfile.org/vue/2.6.11/vue.min.js"></script>
        <script src="https://cdn.staticfile.org/vue/3.1.6/vue-router.min.js"></script>
        <script src="https://cdn.staticfile.org/vue/0.19.2/axios.min.js"></script>
        <script src="https://cdn.staticfile.org/vue/4.7.0/echarts.min.js"></script>
        <script src="https://cdn.staticfile.org/vue/0.2.0/nprogress.min.js"></script>
        <script src="https://cdn.staticfile.org/vue/0.2.0/nprogress.min.js"></script>
        <script src="https://cdn.staticfile.org/vue/1.3.4/quill.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.6/dist/vue-quill-editor.js"></script>
        ```

    - 通过 CDN 优化 ElementUI 的打包，虽然在开发阶段，我们启用了 element-ui 组建的按需加载，尽可能地减少了打包的体积，但是那些被按需加载的组件，还是占用了较大的文件体积。此时我们可以将 element-ui 中的组件，也通过 CDN 的形式来加载，这样能够进一步减小打包后的文件体积。具体操作流程如下：
      - 在 main-prod.js 中，注释掉 element-ui 按需加载的代码
      - 在 index.html 的头部区域中，通过 CDN 加载 element-ui 的 js 和 css 样式

        ``` HTML
        <!-- element-ui 样式表 -->
        <link rel="stylesheet" href="https://cdn.staticfilr.org/element-ui/2.13.0/theme-chalk/index.css">
        <!-- element-ui 的 js 文件 -->
        <script src="https://cdn.staticfile.org/element-ui/2.13.0/index.js"></script>
        ```

    (5) 首页内容定制

    - 在不同的打包环境下，首页内容可能会有所不同。我们可以通过插件的方式进行定制，插件配置如下：

        ``` JavaScript
        module.exports = {
            chainWebpack: config => {
                // 发布模式
                config.when(process.env.NODE_ENV === 'production', config => {
                    config.plugin('html').tap(args => {
                        args[0].isProd = true
                        return args
                    })
                })
                // 开发模式
                config.when(process.env.NODE_ENV === 'development', config => {
                    config.plugin('html').tap(args => {
                        args[0].isProd = false
                        return args
                    })
                })
            }
            }
        ```

    - 在 `public/index.html` 首页中，可以根据 `isProd` 的值，来决定如何渲染页面结构：

        ``` HTML
        <!-- 按需渲染页面的标题 -->
        <title><%= htmlWebpackPlugin.options.isProd ? '电商后台管理系统' : 'dev - 电商后台管理系统' %></title>
        <!-- 按需加载外部的 CDN 资源 -->
        <% if(htmlWebpackPlugin.options.isProd) { %>
        <!-- 通过 externals 加载的外部 CDN 资源 -->
        <% } %>
        ```

    (6) 路由懒加载

    - 当打包构建项目时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
    - 具体需要如下 3 步：
      - 安装 @babel/plugin-syntax-dynamic-import 包
      - 在 babel.config.js 配置文件中声明该插件
      - 将路由改为按需加载的形式，示例代码如下：

        ``` JavaScript
        const Foo = () => import (/* webpackChunkName: "group-foo" */  './Foo.vue')
        const Bar = () => import (/* webpackChunkName: "group-foo" */  './Bar.vue')
        const Baz = () => import (/* webpackChunkName: "group-baz" */  './Baz.vue')
        ```

    - 关于路由懒加载的[详细文档](https://router.vuejs.org/ah/guide/advanced/lazy-loading.html)

4. 项目上线

    (1) 主要步骤

    - 通过 node 创建 web服务器
    - 开启 gzip 配置
    - 配置 https 服务
    - 使用 pm2 管理应用

    (2) 通过 node 创建 web 服务器

    - 创建 node 项目，并安装 express，通过 express 快速创建 web 服务器，将 vue 打包生成的 dist 文件夹托管为静态资源即可，关键代码如下：

        ``` JavaScript
        const express = require('express')
        // 创建 web 服务器
        const app = express()
        // 托管静态资源
        app.use(express.static('./dist'))
        // 启动 web 服务器
        app.listen(80, () => {
            console.log('server running at http://127.0.0.1')
        })
        ```

    - 将打包好的项目 dist 文件复制到 express 服务器根目录下，通过 `node app` 启动项目即可。

    (2) 项目上线相关配置

    - 开启 gzip 配置
      - 使用 gzip 可以减少文件体积，是传输速度更快
      - 安装相应的包：`npm i compression -D`
      - 可以通过服务器端使用 Express 做 gzip 压缩。其配置如下：

        ``` JavaScript
        // 导入压缩传输包
        const compression = require('compression')

        // 启用压缩传输中间件
        app.use(compression())
        ```

    - 配置 HTTPS 服务
      - 为什么要启用 HTTPS 服务？传统的 HTTP 协议传出的数据都是明文，不安全；采用 HTTPS 协议对传输的数据进行了加密处理，可以防止数据被中间人窃取，使用更安全。
      - [申请 SSL 证书](https://freessl.org)：进入官网，输入要申请的域名并选择品牌；输入自己的邮箱并选择相关选项；验证 DNS（在域名管理后台添加 TXT 记录）；验证通过之后，下载 SSL 证书（full_chain.pem 公钥；private.key 私钥）。
      - 在后台项目中导入证书

        ``` JavaScript
        const https = require('https')
        const fs = require('fs')
        const options = {
            cert: fs.readFileSync('./ssl/full_chain.pem'),
            key: fs.readFileSync('./ssl/private.key')
        }
        https.createServer(options, app).listen(443)
        ```

    - 使用 pm2 管理应用
      - 安装 pm2 依赖：`npm i pm2 -g`
      - 启动项目：`pm2 start 脚本 --name 自定义名称`
      - 查看运行项目：`pm2 ls`
      - 重启项目：`pm2 restart 自定义名称`
      - 停止项目：`pm2 stop 自定义名称`
      - 删除项目：`pm2 delete 自定义名称`

## Nuxt.js 框架

### Nuxt.js 框架介绍

1. 什么是 Nuxt.js？

    (1) Nuxt.js 简单地说是 Vue.js 的通用框架，最常用的就是用来做 SSR（服务器端渲染）。再直白点说，就是 Vue.js 原来是开发 SPA（单页面应用）的，但是随着技术的普及很多人想用 Vue 开发多页应用，并在服务端完成渲染。这个时候就出现了 Nuxt.js 这个框架，它简化了 SSR 的开发难度。还可以直接用命令把我们制作的 Vue 项目生成为静态 HTML。

    (2) Nuxt.js 的官方网站是这样介绍的：Nuxt.js 是一个基于 Vue.js 的通用应用框架。通过对客户端/服务端基础框架的抽象组织，Nuxt.js 主要关注的是应用的 UI 渲染。

2. 服务器端渲染的好处有哪些？

    (1) 最主要的原因是 SPA（单页应用）不利于搜索引擎的 SEO 操作。比如你作一个新闻网站，流量的一个主要来源是通过百度、谷歌、bing 这些搜索引擎，但是它们对 SPA 的抓取并不好，特别是百度根本没法抓取到 SPA 的内容页面，所以我们必须把我们的应用在服务端渲染成适合搜索引擎抓取的页面，再下载到客户端。那 Nuxt.js 适合作新闻、博客、电影、咨询这样的需要搜索引擎提供流量的项目。如果你要作移动端的项目，就没必要使用这个框架了。

    (2) 如果你是一个Vuer（vue程序员），那不会这个框架，说明你的技能没有全部点亮。

3. 什么是 SSR？

    (1) SSR，即服务器渲染（server side render），就是在服务器端将对Vue页面进行渲染生成html文件，将html页面传递给浏览器。

    (2) SSR 的两个优点：

    - SEO 不同于 SPA 的 HTML 只有一个无实际内容的 HTML 和一个 app.js，SSR 生成的 HTML 是有内容的，这让搜索引擎能够索引到页面内容。
    - 更快内容到达时间 传统的 SPA 应用是将 bundle.js 从服务器获取，然后在客户端解析并挂载到 dom。而 SSR 直接将 HTML 字符串传递给浏览器。大大加快了首屏加载时间。

4. Nuxt.js 的特点（优点）：

    (1) 基于 Vue.js

    (2) 自动代码分层

    (3) 服务端渲染

    (4) 强大的路由功能，支持异步数据

    (5) 静态文件服务

    (6) ES6/ES7 语法支持

    (7) 打包和压缩 JS 和 CSS

    (8) HTML 头部标签管理

    (9) 本地开发支持热加载

    (10) 集成 ESLint

    (11) 支持各种样式预处理器：SASS、LESS、Stylus 等等

### Nuxt.js [环境搭建](https://www.nuxtjs.cn/guide/installation)与 Hello World

1. Nuxt.js 安装

    (1) Nuxt.js 项目的安装需要使用 NPM 包管理工具。为了快速入门，Nuxt.js 团队创建了脚手架工具。确保安装了 npx（npx 在 NPM 版本 5.2.0 默认安装了）。

    (2) 初始化 Nuxt.js 项目，运行命令：`npx create-nuxt-app <项目名>`。

    (3)
