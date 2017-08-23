// 编写displayAbbreviations函数
function displayAbbreviations() {
    // 1 获取abbr元素(节点集合)
    var abbreviations = document.getElementsByTagName('abbr');

    // 2 确保元素存在(不至于报错)
    if (abbreviations.length < 1) {
        return false;
    }

    // 3 获取保存每个abbr元素提供的信息(数组是理想的存储媒介)
    var defs = [];
    
    // 4 遍历数组
    for (var i=0, len=abbreviations.length; i<len; i++) {
        var definition = abbreviations[i].getAttribute("title");    // title
        var key = abbreviations[i].firstChild.nodeValue;            // 文本
        defs[key] = definition;
    }

    // 5 创建dl元素
    var dlist = document.createElement('dl');

    // 6 遍历数组
    for (key in defs) {
        var info = defs[key];   // title

        // 7 创建dt元素内容
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);

        // 8 创建dd元素内容
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(info);
        ddesc.appendChild(ddesc_text);

        // 9 添加到dl元素
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }

    // 10 创建描述性标题
    var header = document.createElement('h2');
    var header_text = document.createTextNode('Abbreviations');
    header.appendChild(header_text);

    // 11 插入描述性标题到body里
    document.body.appendChild(header);
    
    // 12 插入“缩略语”本身列表
    document.body.appendChild(dlist);

    console.log(defs);
}

window.onload = function() {
    displayAbbreviations();
};   

/*
    微软IE在IE6不支持abbr标签元素。
    而如果该页面是在IE6浏览器中使用的，那么就意外地踩到了一个地雷
    三种方式：
    1、把abbr元素同一替换成IE6支持的acronym元素，但是这样对语义化标签元素不合理。
    2、在元素使用html命名空间(<html :abbr>abbr</html :abbr>),这样IE就可以识别这个元素了。这让我联想到了Vue框架中扩展元素
    3、平稳退化，也就是当IE（或者不能识别abbr元素的浏览器）可以提前退出。 --- 最佳选择
*/