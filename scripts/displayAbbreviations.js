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

    console.log(defs)
}

displayAbbreviations();