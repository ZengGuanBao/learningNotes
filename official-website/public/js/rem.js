;(function(window){
	function getRem(pwidth, prem) {
		var html = window.document;
		var htmlEle = html.documentElement;
		var oWidth = htmlEle.clientWidth || 320;
		oWidth = oWidth>750?750:oWidth;
		htmlEle.style.fontSize = oWidth / pwidth * prem + "px";
	}
	getRem(750, 100);
	window.onresize = function () {
		getRem(750, 100);
	};
})(window);