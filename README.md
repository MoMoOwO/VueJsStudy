# Vue.js 学习记录

1. [视频链接](https://www.bilibili.com/video/av50680998)，P200 之后的 2019 系列教程内容。

2. 笔记为个人纪录，章节号与文件夹序号对应。

## Vue 基础

1. 学习目标：能够说出 Vue 的基本用法、能够说出 Vue 的模板语法、能够说出 Vue 的常用特性、能够基于 Vue 实现案例效果。
2. 学习内容：Vue 概述、Vue 基本使用、Vue 模板语法、基础案例、Vue 常用特性、综合案例等内容。

### Vue 概述

1. Vue：渐进式 JavaScript 框架，声明式渲染->组件系统->客户端路由->集中式状态管理->项目构建。

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
   - ![前端渲染](http://image.acmx.xyz/msj%2F2.png)

   (2) 前端渲染方式有哪些？

   - 原生 js 拼接字符串：基本上就是将数据以字符串的方式拼接 HTML 标签中；缺点是不同的开发人员的代码风格差别很大，随着业务的复杂，后期的维护便地逐渐困难起来；
   - 使用前端模板引擎：基于模板引擎的一段代码，与拼接字符相比代码明显规范了很多，它拥有自己的一套模板语法规范；优点是大家都遵循同样的规范写代码，代码可读性明显提高了，方便后期的维护；缺点是没有专门提供事件机制；
   - 使用 Vue 特有的模板语法：插值表达式、指令、事件绑定、属性绑定、样式绑定、分支循环结构。

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

   - 页面中的数据发生改变，ViewModel 实例中的数据也发生改变，进而页面中其他使用该数据的地方也会发生数据的的改变。
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

   - 对象语法：通过 `v-bind` 为 `class` 属性值绑定一个对象，对象中属性名为不同的样式名，属性值为 true/false 表示是否使用该样式，实例：

     ```HTML
     <div  v-bind:class="{active: isActive, error: isError}">测试样式</div>
     ```

   - 数组语法：通过 `v-bind` 为 class 属性值绑定一个数组，数组为 vm 实例的 data 中与样式对应的属性的属性值，而属性名为样式名。

     ```HTML
     <div v-bind:class="[activeClass, errorClass]">测试样式</div>
     ```

   (2) class 样式处理的细节

   - 对象绑定和数组绑定可以结合使用；
   - class 绑定的值可以简化操作；
   - 默认的 class 如何处理？默认的 class 样式会保留。

   (3) style 样式处理

   - 对象语法：类似 style 内联样式，属性名为 style 样式属性名，属性值为 vm 实例的 data 中的数据值，可以使用简写的对象方式，即将整个对象放到 vm 实例的 data 中。实例：

     ```HTML
     <div :style="{border: borderStyle, width: widthStyle, height: heightStyle}"></div>
     ```

   - 数组语法：数组中的每一项都是要给对象形式的 style，位置靠后的对象样式属性会替换前面重复的样式并增添新的样式。实例：

     ```HTML
     <div :style="[baseClasses, overridingStyle]"></div>
     ```

8. 分支循环结构

   (1) 分支结构

   - `v-if`，`v-else-if`，`v-else` 指令：与 JavaScript 中的 `if else` 条件判断类似，在 DOM 元素中配合使这些指令可以实现当满足某些条件时显示特定的 DOM 元素。
   - `v-show` 指令：通过控制 DOM 元素 `display` 样式属性来控制 DOM 元素的显示。
   - `v-if` 与 `v-show` 的区别：`v-if` 控制的是元素是否渲染到页面；而 `v-show` 控制的是元素是否显示（已经渲染到了页面）。
   - `v-if` 与 `v-show` 的使用场景：如果前端的 DOM 元素需要频繁的显示与隐藏，则是推荐使用 `v-show`；相反若元素渲染到页面后就不会或很少改变则可以使用 `v-if`。

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

   - `v-for` 不仅可以遍历对象，还可以遍历数组，遍历时：value 为属性值、key 为属性名、index 为索引，实例：

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

2. 案例实现步骤：

   (1) 实现静态 UI 效果

   - 用传统的方式实现标签结构和样式

   (2) 基于数据重构 UI 效果

   - 将静态的结构和样式重构为基于 Vue 模板语法的形式；
   - 处理事件绑定和 js 控制逻辑。
   - ![设计过程](http://image.acmx.xyz/msj%2F20202262252456592.jpg)

### Vue 常用特性

1. 表单操作  
   (1) 基于 Vue 的表单操作

   - input 单行文本：可以使用 `v-model` 指令进行数据双向绑定，从而能够方便获取输入值和提供默认值。实例：

     ```HTML JavaScript
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

   - select 下拉选择框：可以为多选也可以为单选，由 `multiple` 属性值决定；当为单选时 `v-model` 绑定一个常用数据类型，而当多选时 `v-model` 需要绑定到一个数组上。

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

   - radio 单选按钮：单选框也可以使用 `v-model`进行双向绑定，由于是单选框，所以一组单选按钮绑定到同一个数据上，数据值为每一个单选按钮的 `value` 属性值。实例：

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

   - checkbox 多选按钮：多选框也可以使用 `v-model` 进行双向绑定，由于是多选框，所以一组多选框按钮绑定到同一个数组上，数组的值为选中的项目的 `value` 的属性值。实例：

     ```HTML JavaScript
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

   - 表单提交默认事件：表单提交若只发生在当前页面，而不需要页面刷新和跳转，则需要阻止表单提交的默认行为，具体监听提交按钮的点击事件并使用 `.prevent` 来修饰。实例：

     ```HTML
     <input type="submit" value="提交" @click.prevent="submit">
     ```

   (2) 表单域修饰符

   - number：转化为数值，实例：

     ```HTML
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

   (1) 为何需要自定义指令？内置的指令不能满足需求。内置的指令：`v-text`，`v-html`，`v-show`，`v-if`，`v-else`，`v-else-if`，`v-for`，`v-on`，`v-bind`，`v-model`，`v-pre`，`v-cloak`，`v-once`。

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

     ```JavaScript
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

     ```HTML
     <!-- 在使用传递参数的自定义指令时可以像 v-model 等指令一样在后面加个等号来传递参数 -->
     <input type="text" v-color="msg">
     ```

   (4) 局部自定义指令，定义在单个 Vue 实例中的指令，尽在该 Vue 实例组件中可用。

   - 语法规则

     ```JavaScript
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

   (2) 计算属性的用法：Vue 中的计算属性在在 Vue 实例的 `computed` 属性中声明，computed 的属性值为一个对象；键为计算属性名称，之后使用计算属性也是使用该名称，值为一个回调函数用来进行复杂计算操作并返回计算结果。实例：

   ```JavaScript
   // JS Vue 实例中
   computed: {
       reversedMessage: function () {
           return this.msg.split("").reverse().join("");
       }
   }
   ```

   (3) 计算属性与方法的区别

   - 计算属性是基于他们的依赖进行缓存的，方法不存在缓存。
   - 缓存就是只要计算属性计算的 `data` 的数据不改变，那么计算属性只执行一次；而这个计算的 `data` 中的值就称为计算属性的依赖。
   - 由于计算属性存在缓存机制，所以若遇到耗时费力的计算时可以节省性能和时间。

4. 侦听器

   (1) 侦听器的概念及作用：侦听器用于监听数据的变化，数据一旦发生变化就通知侦听器所绑定的方法，从而执行一定的操作。
   ![侦听器](http://image.acmx.xyz/msj%2F20203322976701.jpg)

   (2) 侦听器的应用场景：数据变化时值型异步或开销较大的操作。

   (3) 侦听器的用法：

   ```JavaScript
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

   ```JavaScript
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

   ```HTML
   <!-- 在插值表达式的数据后面加上过滤器名称中间使用竖线(按位或符) -->
   <div>{{ msg | upper }}</div>
   <!-- 一个插值表达式中可以在数据后面携带多个过滤器，前面过滤器的结果作为后面过滤器的输入 -->
   <div>{{ msg | upper | lower }}</div>
   <!-- 再进行属性绑定的时候也可以使用过滤器 -->
   <div :id="msg | upper"></div>
   ```

   (4) 局部过滤器，类似于自定义指令，过滤器也有局部过滤器

   ```JavaScript
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

     ```JavaScript
     // 在定义过滤器的回调函数的时候可以传递第二个参数来接受使用过滤器时传递的参数
     Vue.filter('dateFormat', function (val, arg) {
         if (arg === "yyyy-MM-dd") {
             return `${val.getFullYear()}-${val.getMonth() + 1}-${val.getDate()}`;
         }
     });
     ```

   - 使用

     ```HTML
     <!-- 使用时像调用方法一样传递参数 -->
     <div>{{ date | dateFormat("yyyy-MM-dd") }}</div>
     ```

6. 生命周期

   (1) 主要阶段

   - 挂载（初始化相关属性）：beforeCreate -> created -> beforeMount -> mounted
   - 更新（元素或组件的变更操作）：beforeUpdate -> updated
   - 销毁（销毁相关属性）：beforeDestroy -> destroyed
   - ![生命周期图示](http://image.acmx.xyz/msj%2Flifecycle.png)

   (2)

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

2. 补充知识（Vue 数组相关 API）
   (1) 变异方法（修改原有数组），这些方法会改变原有的数据从而绑定该数组的 DOM 组件会发生变化，这些方法有：`push()`，`pop()`，`shift()`，`unshift()`，`splice()`，`sort()`，`reverse()`。

   (2) 替换数组（生成新的数组），有些方法会保留之前的数组，生成新的数组作为返回值，这些方法有：`filter()`，`concat()`，`slice()`，一般若要使用新的数组重新渲染 DOM (数组操作影响 DOM) 采取的方法是用新数组代替旧数组。

   (3) 修改响应式数据：

   - 相对于上面两种继承自 JavaScript 的数组操作的方法，Vue 也有自己的处理数组的方式。
   - 两个接口：`Vue.set(vm.items, indexOfItem, newVale)`，`Vue.$set(vm.items, indexOfItem, newVale)`
   - 参数列表：参数一标识要处理的数据/对象名称，参数二标识要处理的数组的索引/对象的属性名，参数三标识要处理的数组的值/对象的属性值。
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

1. 学习目标：能够知道组件化开发的思想、能够知道组件的注册方式、能够输出组件键的数据交互方式、能够说出组件插槽的用法、能够说出 Vue 调试工具的用法、能够基于组件的方式实现业务功能。
2. 学习内容：组件化开发思想、组件注册、Vue 调试工具用法、组件间数据交互、组件插槽、基于组件的案例等。

### 组件开发思想

1. 现实生活中的组件化思想体现：

   (1) 标准

   (2) 分治

   (3) 重用

   (4) 组合

   ![谷歌组件化手机](http://image.acmx.xyz/msj%2Fmobile.jpg)

2. 编程中的组件化思想体现

   ![组件化开发](http://image.acmx.xyz/msj%2Fcoms.png)

3. 组件化规范：Web Components

   (1) 我们希望尽可能多的重用代码；

   (2) 自定义组件的方式不太容易（html、css 和 js 三者组合）；

   (3) 多次使用组件可能导致冲突；

   (4) Web Components 通过创建封装好功能的定制元素解决上述问题。[Web_Components 介绍网站](https:// developer.mozilla.org/zh-CN/docs/Web/Web_Components)

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

   ````HTML
   // 使用组建的命名来调用组件
   <div id="#app">
     <button-counter></button-counter>
   </div>

   // 组件注册后可以重复使用，组件之间数据相互独立

   ``` HTML
   <div id="#app">
     <button-counter></button-counter>
     <button-counter></button-counter>
     <button-counter></button-counter>
   </div>
   ````

2. 组件注册中的注意事项：

   (1) 组件中的 `data` 必须是一个函数，该函数需要返回一个对象，对象中包括组件中需要的数据；

   (2) 组件模板内容必须是单个根元素；

   (3) 组件模板内容可以是模板字符串，模板字符串需要浏览器提供支持(ES6 语法)。

   (4) 组件命名方式：

   - 短横线方式：

     ```JavaScript4
     Vue.component("my-component", { /* ... */ });
     ```

   - 驼峰命名方式，使用该方式命名的组件只有在其他的自定义组件的字符串模板中才能直接使用驼峰名称来使用，在普通标签中需要转换为短横线方式，即单词首字母小写单词间使用短横线相隔。

     ```JavaScript
     Vue.component("MyComponent", { /* ... */ })
     ```

3. 局部组件

   (1) 局部组件注册语法

   ```JavaScript
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

   (2) 局部组建的使用与全局组件相同，但是局部组件只能在对应 Vue 实例的 `el` 中使用，在其他地方如另外的全局组件中则不能使用。

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
   在安装完调式工具之后，在浏览采用 Vue.js 框架构建的网页，进入开发者模式则会注意到多了 Vue 一项，点击并进入，我们可以看到 Vue 组件之间的关系和数据等信息。
   ![VueDevtools](http://image.acmx.xyz/msj%2FVueDevtools.png)

### 组件间数据交互

1. 父组件向子组件传值

   (1) 组件内部通过 `props` 属性接受传递过来的值，属性值为一个数组。

    ``` JavaScript
    Vue.component("menu-item", {
      data(){
        return {}; // 组件中的数据
      },
      props: ["title"], // props 数组接受父组件传递过来的数据
      template: "<div></div>"
    });
    ```

   (2) 父组件通过属性将值传递给子组件

    ``` HTML
    <!-- 通过直接赋值方式传递数据 -->
    <menu-item title="来自父组件的数据"></menu-item>
    <!-- 通过属性绑定方式传递数据 -->
    <menu-item :title="Hello"></menu-item>
    ```

   (3) `props` 属性名规则：
   - 在 `props` 中使用驼峰形式，模板中需要使用短横线的形式，
   - 字符串形式的模板中没有这个限制。

     ``` JavaScript + HTML
     Vue.component("menu-item", {
       // 在 JavaScript 中是驼峰式的
       props: ['menuTile'],
       // 在普通字符串模板中可以直接使用
       template: "<div>{{ menuTile }}</div>"
     });

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

   (4) 子组件向父组件传值主要通过子组件使用 `$emit()` 接口来创建自定义事件，然后父组件在调用该组件时监听该事件，从而达到子组件向父组件的通讯。`$emit()` 接口提供两个参数：第一个参数为自定义事件的名称，为必选参数，监听事件必须监听创建的自定义事件，即保持事件名称的统一性；第二个参数为可选参数，是自定义事件触发时传递的数据，父组件在监听子组件创建的自定义事件时可以使用 `$event` 来获取传递的数据。

3. 非父子（兄弟）组件间传值
![事件中心](http://image.acmx.xyz/msj%2F2020313175767751.jpg)

   (1) 单独的事件中心管理组件间的通信

   ``` JavaScript
   let eventHub = new Vue(); // 创建事件中心
   ```

   (2) 监听事件与销毁事件

   ``` JavaScript
   eventHub.$on("add-todo", addToDo); // 使用事件处理中心的 $on 接口监听事件，绑定事件名称(参数1)和事件处理函数（参数2）
   eventHub.$off("ddd-todo"); // 使用事件处理中心的 $off 接口销毁事件
   ```

   (3) 触发事件

   ``` JavaScript
   eventHub.$emit("add-todo", val); // 使用事件处理中心的 $emit 接口触发事件，参数一出发事件的名称参数二为传递的参数
   ```

### 组件插槽

1. 组件插槽的作用：父组件在以标签形式使用子组件的使用，在标签内部向子组件传递内容。
![组件插槽](http://image.acmx.xyz/msj%2F20203132238143274.jpg)

2. 组件插槽的基本使用

   (1) 插槽的位置

   ``` JavaScript
   // 插槽定义在组件的模板中，使用 <slot></slot> 标签进行占位，标签内部可以添加默认信息，在父组件中使用子组件，并在子组件标签中传递内容时，该内容会替换子组件中插槽的位置
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

   ``` HTML
   <!-- Something bad happened. 会替换子组件模板中的插槽和里面的默认内容-->
   <alert-box>Something bad happened.</alert-box>
   <!-- 会显示子组件插槽中的默认内容 -->
   <alert-box></alert-box>
   ```
