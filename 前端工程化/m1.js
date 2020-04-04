// 当前文件模块为 m1.js

// 定义私有成员
let a = 10;
let c = 20;
// 外界访问不到变量 d，因为它没有被暴漏出去
let d = 30;

function show() {
    console.log("我是 show 方法");
}

// 将本模块中的私有成员暴漏出去，供其他模块使用
export default {
    a,
    c,
    show
}

// 注意：每个模块中，只有内需使用唯一的一次 `export default`，否则会报错！
/* export default {
    d
} */

// 向外界按需导出变量 s1
export let s1 = "aaa";
// 向外按需导出变量 s2
export let s2 = "bbb";
// 向外按需导出方法
export function say() {
    console.log("Hello!");
}
