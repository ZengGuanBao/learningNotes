let BrowserInfo = function getBrowserType () {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera || userAgent.indexOf("rv:11") > -1; //判断是否IE浏览器  
  var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
  if (isIE) {
    if (userAgent.indexOf("rv:11") > -1) {
      return "IE11";
    }
    if (userAgent.indexOf("rv:12") > -1) { //这一段还没验证
      return "IE12";
    }
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) { return "IE7"; }
    else if (fIEVersion == 8) { return "IE8"; }
    else if (fIEVersion == 9) { return "IE9"; }
    else if (fIEVersion == 10) { return "IE10"; }
    else if (fIEVersion == 11) { return "IE11"; }
    else if (fIEVersion == 12) { return "IE12"; }
    else { return "0" }//IE版本过低  
  } else if (isFF) { return "FF"; } else if (isOpera) { return "Opera"; } else if (isSafari) { return "Safari"; } else if (isChrome) { return "Chrome"; } else if (isEdge) { return "Edge"; } else { return "app" }
}


export default BrowserInfo