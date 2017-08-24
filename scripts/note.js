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
/*
    HTML在某些情况下允许省略结束标签，比如你可以省略</p> 表面上看它提供了一种弹性。但事实上一旦文档在浏览器里的呈现效果与你预期不符合
    追查其中的问题会变得很困难。在XHML中，所有标签都必须闭合--<img> 等孤立元素也不例外。
    不管你使用HTML或者是XHTML，重要的是你使用的标记语言应该与你选用的DOCTYPE声明保持一致。

    某些浏览器要根据DOCTYPE来决定使用标准模式，还是使用兼容模式来呈现页面。兼容模式意味着浏览器要模仿某些早期浏览器“怪异行为”。
    并容许那些不规范的页面在新浏览器也能正常工作。 一般来说，我们应当坚持标准模式。而HTML5 DOCTYPE默认对应的就是标准模式
*/

/*
    HTML去搭建文档的结构
    CSS去设置文档的呈现效果
    DOM脚本去实现文档的行为

    三种技术之前存在着潜在的重叠区域，用DOM可以改变网页的结构，诸如：createElement和appendChild之类的DOM方法允许创建和添加标记
    在CSS上也有这种技术相互重叠的例子，诸如 :hover和:focus之类的伪类允许你根据用户触发事件改变元素的呈现效果。
    CSS正在利用伪类走向DOM的领地，DOM也可以给元素设定样式。

*/

// 封装当前元素节点的下一个元素节点（不是下一个节点--可能是文本节点）
function getNextElement(node) {
    if (nodeType === 1) {  // 元素节点为1 文本节点为3
        return node;
    }
    if (node.nexSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}

/* position: static/fixed/absolute/relative
   static是position属性的默认值，意思是有关元素将按照它们在标记里出现的先后顺序出现在浏览器窗口里
*/