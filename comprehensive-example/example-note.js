/*
    为乐队公司设计一个网站。Jay Skript and the Domsters
    别忘了，你设计的网站还必须对残疾用户以及搜索引擎保持友好
    网站的作用： 相当于一个宣传手册
    页面：
        1、详细介绍乐队信息的页面
        2、相册放照片的页面
        3、巡演日程安排的页面
        4、歌迷与乐队沟通，还必须有一个联系页面
        5、主页！ 放上乐队简介和导航
    5个页面的结构相似，先创建一个模板html文件template.html
*/
/*
    1 构建完模板 template.html
    2 完成基本的布局 layout.css
    3 完成单页面之间的跳转
*/

/*
    安全检测是非常重要的！！！！！！！！！！！！！！！！
*/
/**
 * 
 * label 对于增进可访问性的元素，label是非常有用的。
 * 很多浏览器都会为label元素添加默认行为，如果label中的文本被单击。关联的表单字段就会获得焦点。
 */
/*
    placeholder属性在旧版浏览器是看不到在字段中的占位符文本。
    HTML DOM中常用的一个对象， form对象。


    文档中的每个表单元素都是一个form对象，每个form对象都有一个elements.length属性，这个属性返回表单包含的表单元素的个数.
    
    form.elements.length，这个返回值和childNodes.length不一样，后者返回的事元素中包含的所有节点的个数。
    而form对象的elements.length属性只关注那些属于表单的元素，input、textarea等

    相应地：：：： 表单的所有字段都保存在form对象的elements属性中。也就是说下面是一个包含所有表单元素的数组
    form.elements
*/