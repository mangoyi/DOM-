// 减少访问DOM和尽量减少标记
if (document.getElementsByTagName('a').length >0) {
    var links = document.getElementsByTagName('a');
    for(var i=0, len=links.length; i<len; i++) {
        // dosomething
    }
}

/*
    搞清楚代码的作用。自然发现查询了两次DOM。

    不管什么时候，只要查询DOM中的某些元素，浏览器都会搜索整个DOM树，从中查找匹配的元素。
    这段代码居然使用了两次getElementsTagName()方法执行相同的操作，浪费了一次搜索。
    所以要尽量少访问DOM。如下：

*/
var links = document.getElementsByTagName('a');
if (links.lengh > 0) {
    for (var i=0, len=links.length; i<len; i++) {
        // dosomething
    }
}
