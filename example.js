function insertParagraph(text) {
    var str = '<p>';
    str += text;
    str += '</p>';
    document.write(str);
}

window.onload = function() {
    var para = document.createElement('p');
    var txt1 = document.createTextNode('This is');
    para.appendChild(txt1);
    var em = document.createElement('em');
    var txt2 = document.createTextNode(' my ')
    em.appendChild(txt2);
    para.appendChild(em);
    var txt3 = document.createTextNode('content.');
    para.appendChild(txt3);
    var testdiv = document.getElementById('testdiv');
    testdiv.appendChild(para);
}