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

// 图片库
function showPic(whichpic) {
    if (!document.getElementById('placeholder')) {
        return true;
    }
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute("src", source);
    if (!document.getElementById('description')) {
        return false;
    }
    if (whichpic.getAttribute('title')) {
        var text = whichpic.getAttribute('title');
    } else {
        var text = ' ';
    }
    var description = document.getElementById('description');
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}


// 创建placeholder图片
function preparePlaceholder() {
    if (!document.getElementById('imagegallery')) {
        return false;
    }
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id', "placeholder");
    placeholder.setAttribute('src', "images/placeholder.jpg");
    placeholder.setAttribute('alt', "my image gallery");
    var description = document.createElement('p');
    description.setAttribute('id', "description");
    var desctext = document.createTextNode('Choose an image');
    description.appendChild(desctext);
    var gallery = document.getElementById('imagegallery');
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}

// 为每一张图片增加点击事件
function prepareGallery() {
    if (!document.getElementById('imagegallery')) {
        return false;
    }
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for (var i=0, len=links.length; i<len; i++) {
        links[i].onclick = function() {
            return showPic(this);
        }
    }
}

// live 表格中的stripeTables函数
function stripeTables() {
    var tables = document.getElementsByTagName('table');
    for (var i=0,len=tables.length; i<len; i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName('tr');
        for (var j=0, len2=rows.length; j<len2; j++) {
            if (odd == true) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
} 

// highlightRows函数
function highlightRows() {
    var rows = document.getElementsByTagName('tr');
    for (var i=0, len=rows.length; i<len; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}

// displayAbbreviations 函数
function displayAbbreviations() {
    var abbreviations = document.getElementsByTagName('abbr');
    if (abbreviations.lenth < 1) {
        return false;
    }
    var defs = [];
    for (var i=0, len=abbreviations.length; i<len; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) {
            continue;                     
        }
        var definition = current_abbr.getAttribute('title');
        var key = current_abbr.lastChild.nodeValue;          // abbr标签元素的内容
        defs[key] = definition;
    }
    var dlist = document.createElement('dl');
    for (key in defs) {
        var definition2 = defs[key];
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition2);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) {
        return false;   // 安全检查
    }
    var header = document.createElement('h3');
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName('article');
    if (articles.length == 0) {
        return false;
    }
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}

// 模拟实现点击label关联的表单聚焦
function focusLabels() {
    var labels = document.getElementsByTagName('label');
    for (var i=0, len=labels.length; i<len; i++) {
        if (!labels[i].getAttribute("for")) {
            continue;
        }
        labels.onclick = function() {
            var id = this.getAttribute('for');
            var element = document.getElementById(id);
            element.focus();
        }
    }
}

// getHTTPObject函数
function getHTTPObject() {
    if (typeof XMLHttpRequest == 'undefined') {
        var versions = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP"];
        for (var i =0, len=versions.length; i<len; i++) {
            try {
                return new ActiveXObject(versions[i]);
            } catch (e) {
                throw error("error");
            }    
        }
    }
    return new XMLHttpRequest();
}

// displayAjaxLoading函数
function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute('src', 'images/loading.gif');
    content.setAttribute('alt', 'Loading...');
    element.appendChild(content);
}

// submitFormWithAjax函数
function submitFormWithAjax( whichform, thetarget) {
    var request = getHTTPObject();
    if (!request) {
        return false;
    }
    displayAjaxLoading(thetarget);               //  在thetargetDOM中显示loading.gif

    // 创建url编码的表单数据字符串 name=value&name2=value2&name3=value3
    var dataParts = [];
    var element;
    for (var i=0, len=whichform.elements.length; i<len; i++) {
        element  = whichform.elements[i];
        dataParts[i] = element.name + '=' +encodeURIComponent(element.value);
    }

    // 获得name=value&name2=value2数据格式的字符串
    var data = dataParts.join('&');

    // 向原始表单的action属性指定的处理函数发送POST请求
    request.open('POST', whichform.getAttribute('action'), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    // 正则提取<article>中内容的正则表达式
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);

                // var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                // 如果加上g修饰符，那么匹配的结果只是长度为1的数组。

                if (matches.length > 0) {
                    thetarget.innerHTML = matches[1];     // matches[1]匹配的是括号捕获组里面的内容
                } else {
                    thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
                }
            } else {
                thetarget.innerHTML = '<p> '+ request.statusText + '</p>';
            }
        }
    };

    // 发送请求
    request.send(data);
    return true;
}

// 提交表单
function prepareForms() {
    for (var i=0, len=document.forms.length; i<len; i++) {
        var thisform = document.forms[i];
        var formSub = thisform.getElementsByTagName('input')[2];
        formSub.onclick = function() {
            
            // 表单校验成功
            var article = document.getElementsByTagName('article')[0];
            if (submitFormWithAjax(thisform, article)) {
                return false;   // 阻止默认行为
            }
            return true;   // 如果之前没有成功发送ajax请求，这里依然使用不阻止表单的默认提交方式
        }
    }
}

window.onload = function () {
    prepareSlideshow();
    highlightPage();
    prepareInternalnav();
    preparePlaceholder();
    prepareGallery();

    stripeTables();
    highlightRows();
    displayAbbreviations();

    prepareForms();
};