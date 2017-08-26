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

// 添加here类的函数（导航）
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

        // 比较当前链接的URL与当前页面的URL是否一致。
        var linkurl = links[i].getAttribute('href');

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

// moveElement函数
function moveElement(elementID, final_x, final_y, interval) {
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos==final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    var repeat = "moveElement('"+ elementID +"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat, interval);
}

// 将幻灯片放置在intro文档段落后面
function prepareSlideshow() {
    if (!document.getElementById('intro')) {
        return false;                               // 安全检查（nav之间的切换中，有些元素不存在。不做安全检查会出错）
    }
    var intro = document.getElementById('intro');
    var slideshow = document.createElement('div');
    slideshow.setAttribute("id", "slideshow");
    var preview = document.createElement('img');
    preview.setAttribute('src', 'images/slideshow.jpg');
    preview.setAttribute('alt', "a glimpse of what awaits you ");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    // 动画效果更明显将interval设置为5
    var links = intro.getElementsByTagName('a');
    var destination;
    for (var i=0, len=links.length; i<len; i++) {
        links[i].onmouseover = function() {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -240, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -480, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -720, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -960, 0, 5);
            }
        }
    }
}

// 根据指定id显示相应的<section> 同时隐藏其他部分
function showSection(id) {
    var sections = document.getElementsByTagName('section');
    for (var i=0, len=sections.length; i<len; i++) {
        if (sections[i].getAttribute('id') != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

// nav所包含的链接单机时调用showSection函数
function prepareInternalnav() {
    var articles = document.getElementsByTagName('article');
    if (articles.length == 0) {
        return false;
    }
    var navs = articles[0].getElementsByTagName('nav');
    if (navs.length == 0) {
        return false;
    }
    var links = navs[0].getElementsByTagName('a');
    for (var i=0, len=links.length; i<len; i++) {
        // #开头表示内部链接。 #jay
        var sectionId = links[i].getAttribute("href").split('#')[1];  // 得到id值为jay
        document.getElementById(sectionId).style.display = "none";

        // 存在变量作用域问题 sectionId 时局部变量，只有在函数执行期间存在，等事件处理函数执行的时候就已经不存在了。
        // 解决的方法 ： 可以为每个链接创建一个自定义的属性 比如属性命名为destination  然后把sectionId的值赋给它。
        links[i].destination = sectionId;
        
        // 这个属性的作用域是持久存在的。
        links[i].onclick = function() {
            showSection(this.destination);
            return false;                           // 取消事件默认行为
        }

        // 例子： 要是有一个常见问题页面。那么每个问题都可以作为内部链接来处理。点击其中一个问题，就会显示该问题对应的答案。其他答案不显示。
    } 
}

window.onload = function() {
    prepareSlideshow();
    highlightPage();
    prepareInternalnav();
}