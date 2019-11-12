var tools = {
	getRandom:function(){
		return Number(new Date())+""+Math.floor(Math.random()*100000);
	},
	//本地缓存
	delItem:function(key){
		window.localStorage[key]="";
	},
	saveItem:function(key,value){
		window.localStorage[key]=value;
	},
	getItem:function(key){
		return window.localStorage[key];
	},
	
	getParm: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]); return null;
	},
	joinParm:function(arr){
		var str="";
		for(var i=0;i<arr.length;i++){
			str+=arr[i]+"="+tools.getParm(arr[i])+"&";
		}
		return str;
	},
	telCheck:function(tel){
		var telreg=/^0?1[0-9][0-9]\d{8}$/;
		if(telreg.test(tel)){
		   return true;
		}else{
			return false;
		}
	},
	openApp:function(parmStr){
		// if(isWeiXin()){
        // 	alert("请点击右上角，选择在浏览器中打开");
        // 	return;
        // }
		//尝试启动app
		//检测启动是否成功
        window.location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.mh.gfsb";
	},
	openAppShopinfo:function(parmStr){
		// if(isWeiXin()){
        // 	alert("请点击右上角，选择在浏览器中打开");
        // 	return;
        // }
        //尝试启动app
		// window.location = "znbcity://cbs?"+parmStr;
		//检测启动是否成功

        var data = OpenInstall.parseUrlParams(parmStr);
			new OpenInstall({
				/*appKey必选参数，openinstall平台为每个应用分配的ID*/
			appKey : "yh5v1y",
			/*可选参数，自定义android平台的apk下载文件名；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
			// apkFileName : 'com.fm.openinstalldemo-v2.2.0.apk',
			/*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
			preferWakeup:true,
			/*自定义遮罩的html*/
			// mask:function(){
			//  return "<div id='openinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
			// },
			/*openinstall初始化完成的回调函数，可选*/
			onready : function() {
				var m = this;

				/*在app已安装的情况尝试拉起app*/
				m.schemeWakeup();

				setTimeout(function() {
					m.wakeupOrInstall();
					return false;
				},3000)
			}
		}, data);
	}
}

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}