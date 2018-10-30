//随着屏幕宽度变化，根目录的字体大小随之改变
(function(doc,win){
    var refont = function(){
        //获取屏幕宽度
        var docWidth = doc.documentElement.clientWidth;
        console.log(docWidth);
        //求出根目录的字体大小
        var fonts = 20 * (docWidth / 375);
        //将字体赋给根目录
        doc.documentElement.style.fontSize = fonts + "px";
    }
    refont();
    //移动端 屏幕反转事件 orientationchange  或者  屏幕变化事件 resize
    var changeSize = window.orientationchange ? "orientationchange" : "resize";
    if(!addEventListener){
        window["on" + changeSize] = refont();
    }else{
        addEventListener(changeSize,refont,false);
    }
})(document,window)
