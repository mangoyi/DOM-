function moveElement(elementID, final_x, final_y, interval) {
    var elem = document.getElementById(elementID);
    if (elem.moveElement) {
        clearTimeout(elem.moveElement);
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        xpos++;
    }
    if (xpos > final_x) {
        xpos--;
    }
    if (ypos < final_y) {
        ypos++;
    }
    if (ypos > final_y) {
        ypos--;
    }
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    // movement = setTimeout(repeat, interval);
    elem.moveElement = setTimeout(repeat, interval);
}
/*
    如果在没有设置movement变量之前就执行这条语句，会出现报错。所以不能使用局部变量，也不能使用全局变量。
    需要使用一种介乎二者之间的东西，需要一个只与被移动的那个元素有关的变量。

    而只与某个特定的元素有关的变量是存在的。   那就是 “属性”
    这很像创建了一个变量，但区别是这个变量专属于某个特定的元素。

    将变量movement从一个全局变量改编为正在被移动的那个元素的属性。这样当检测到该属性存在的时候就可以使用clearTimeout函数了。

    于是不管moveElement函数正在移动的是哪个元素，该元素都会获得一个名为movement的属性。
    如果该元素在moveElement函数开始执行的时候已经有了一个movement属性，就应该用clearTimeout函数对它进行复位。
    这样一来，即使因为用户快速移动鼠标而使得某个元素需要向不同的方向移动，实际执行的也只有一条setTimeout函数条用语句。

*/