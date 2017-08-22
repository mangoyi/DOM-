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
// 文档的机构和文档的行为分开
/*
    结构化程序设计： 函数应该只有一个入口和一个出口。
    如果一个函数有多个出口，只要这些出口集中出现在函数的开头部分，就是相当可以接受的，如下：

*/
function getGallery() {
    if(!document.getElementById()) {
        return false;
    }
    if(!document.getElementsByTagName()) {
        return false;
    }
    // doSomething
}

/*
    在为变量命名的时候，一定要谨慎，"保留字"的单词不能作为变量名，关键字当然也是要注意的细节。
*/

/*
    结构和行为彻底分开。
    DOM提供了insertBefore()方法，但是没有相应的insertAfter()方法.
*/