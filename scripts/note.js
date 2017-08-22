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

// 编写insertAfter()函数：(脚本)
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/*
    模拟服务器相应：
    1.创建一个example.txt文件--  内如: This was loaded asynchronously!
    2. 编写getHTTPObject.js
    3. 编写getNewContent.js

    注意：在使用Ajax时，千万要注意同源策略，使用XMLHttpRequest对象发送的请求只能访问与其所在的HTML处于同一个域中的数据。
         不能向其他域发送请求。当然使用ajax，一定要是用服务器来打开的。
    异步传输。
    ajax 可以增强站点的可用性，用户无须刷新页面，从而可以很快地得到响应。
    ajax应用的一个特色就是减少重复加载页面的次数，只更新部分页面区域的特性也会影响到用户的预期。
    理想情况，用户每一次操作都应该得到一个清晰明确的结果。为此web设计人员必须在向服务器发出请求和服务器返回响应的时候，给出用户明确的提示。
    所以：
        要构建成功的ajax应用，关键在于将ajax功能看做一般的Javascript增强功能，在平稳退化的基础上求得渐进增强。
*/