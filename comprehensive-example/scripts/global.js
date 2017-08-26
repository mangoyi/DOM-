// 省略addLoadEvent函数

// insertAfter函数
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// addClass 函数
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

// 添加here类的函数
function highlightPage () {
    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) {
        return false;   // 安全检测，防止js报错
    }
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) {
        return false;   // 安全检测
    }
    var links = navs[0].getElementsByTagName('a');
    for (var i=0, len=links.length; i<len; i++) {
        var linkurl;
        for (var j=0, jlen=links.length; j<jlen; j++) {
            // 比较当前链接的URL与当前页面的URL是否一致。
            linkurl = links[i].getAttribute('href');

            // 如果没有匹配到，则indexOf方法将返回-1
            if (window.location.href.indexOf(linkurl) != -1) {
                // 此时的链接一定是指向当前页面的链接
                links[i].className = "here";
                var linktext = links[i].lastChild.nodeValue.toLowerCase();
                console.log(linktext);                                           // home
                document.body.setAttribute("id", linktext);                      // 每个页面的body具有自己的id值
            }
        }
    }
}

window.onload = function() {
    highlightPage();
}