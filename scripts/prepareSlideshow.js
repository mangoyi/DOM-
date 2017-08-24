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

// 但是 如果鼠标指针在链接之间快速地来回移动，动画效果将变得混乱起来~~~~~~~!
/*
    每当用户把鼠标指针停在某个连接的时候，不管上一次调用是否已经把图片移动到位。
    moveElement函数都会被再次调用并试图把这个图片移动到另外一个目标位置去。于是
    当用户在链接之间快速移动鼠标时，movement变量就像一条拔河绳那样来回变化
    而moveElement函数就会试图把图片同时移动到两个不同的地方去。

    如果用户移动的速度够快，积累在setTimeout队列里面的事件就会导致动画效果产生滞后。
    为了清除动画滞后的现象，可以用clearTimeout函数清除积累在setTimeout队列里的事件：
    clearTimeout(movement);

    而！！！！！！！！！！！！！！！！！！！！！！！！切换到moveElement.js
    
*/