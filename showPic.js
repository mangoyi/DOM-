function showPic(whichPic){
    if (!document.getElementById('placeholder')){
        return false;
    }
    var source = whichPic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute("src", source);
    if (document.getElementById('decription')) {   // 即使文档中没有placehoolder和decription元素，也不会发生任何javascript错误。
        var text = whichPic.getAttribute('title');
        var description = document.getElementById('description');
        description.firstChild.nodeValue = text;        
    }
    return true;    
}

// function countBodyChildren() {
//     var body_element = document.getElementsByTagName('body')[0];

//     for (var i = 0, len=body_element.childNodes.length; i < len; i++) {
//         console.log(body_element.childNodes[i].nodeType + '\n');
//     }
// }

window.onload = function() {
    // countBodyChildren();
    prepareGallery();
}

function prepareGallery() {
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for(var i=0; i<links.length; i++) {
        links[i].onclick = function() {
            return showPic(this) ? false : true;   // 阻止a元素的默认行为
        }
        // links[i].onkeypress = function() {
        //     return showPic(this) ? false : true;   // 非鼠标用户
        // }
    }
}