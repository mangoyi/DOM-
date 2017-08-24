window.onload = function() {
    function prepareSlideshow() {
        var preview = document.getElementById('preview');
        preview.style.position = 'absolute';
        preview.style.left = '0px';
        preview.style.top = '0px';
        var list = document.getElementById('linklist');
        var links = list.getElementsByTagName('a');
        links[0].onmouseover = function() {
            moveElement("preview", -100, 0, 10);
        };
        links[1].onmouseover = function() {
            moveElement("preview", -200, 0, 10);
        };
        links[2].onmouseover = function() {
            moveElement("preview", -300, 0, 10);
        } 
    }

    prepareSlideshow();
}

/*
    理论上效果已经实现。当鼠标悬停在某一个连接上的时候，图片不同的部分
    进入到我们的实现。
*/