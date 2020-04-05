// 引入 jquery
import $ from "jquery";

$(function () {
    $("li:odd").css("backgroundColor", "red");
    $("li:even").css("backgroundColor", "lightblue");
});
