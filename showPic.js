function showPic(whichPic){
    var source = whichPic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    var text = whichPic.getAttribute('title');
    var description = document.getElementById('description');
    placeholder.setAttribute("src", source);
    description.firstChild.nodeValue = text;
}

function countBodyChildren() {
    var body_element = document.getElementsByTagName('body')[0];


    for (var i = 0, len=body_element.childNodes.length; i < len; i++) {
        console.log(body_element.childNodes[i].nodeType + '\n');
    }
}

window.onload = function() {
    countBodyChildren();
}