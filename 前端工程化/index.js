// 导入模块成员
import m1, {
    s1,
    s2 as ss2,
    say
} from "./m1.js";

console.log(m1);
// 打印输出结果为：
// { a: 10, c: 20, [Function: show] }

console.log(s1); // 打印输出 aaa
console.log(ss2); // 打印输出 bbb
console.log(say); // 打印输出 [Function: say]

// 直接导入并执行模块代码
import "./m2.js";
