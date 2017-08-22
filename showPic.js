function showPic(whichPic){
    if (!document.getElementById('placeholder')){
        return false;
    }
    var source = whichPic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute("src", source);
    if (document.getElementById('description')) {   // 即使文档中没有placehoolder和decription元素，也不会发生任何javascript错误。
        var text = whichPic.getAttribute('title');
        var description = document.getElementById('description');
        description.firstChild.nodeValue = text;
    }
    return true;    
}

function prepareGallery() {
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for(var i=0; i<links.length; i++) {
        links[i].onclick = function() {
            return showPic(this) ? false : true;   // 阻止a元素的默认行为
        }
        links[i].onkeypress = links[i].onclick;
    }
}

// js创建img元素和p元素生成到文档中
function preparePlaceholder() {
    var placeholder = document.createElement('img');
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.jpg");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement('p');
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

// insertAfter() 函数
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

window.onload = function() {

    preparePlaceholder();
    prepareGallery();
}