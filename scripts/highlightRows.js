// js实现斑马线效果(巧妙！！！！！！！！！！！！！！！！！！！)
function stripeTables() {
    var tables = document.getElementsByTagName('table');
    var odd, rows;
    for (var i=0,len=tables.length; i<len; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName('tr');
        for (var j=0, rowlen=rows.length; j<rowlen; j++) {
            if (odd == true) {
                rows[j].style.backgroundColor = '#ffc';
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}
window.onload = function() {
    stripeTables();
    hightlightRows();
}

// DOM 实现鼠标悬停在表格某一行上方的时候，该行文本加黑加粗
function hightlightRows() {
    var rows = document.getElementsByTagName('tr');
    for (var i=0,len=rows.length; i<len; i++) {
        rows[i].onmouseover = function() {
            this.style.fontWeight = "bold";
        }
        rows[i].onmouseout = function() {
            this.style.fontWeight = "normal";
        }
    }
}