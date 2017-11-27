// JavaScript Document 整理簡單快速跨瀏覽器的JS 函數
/**
版本:1.1 beta plug-in(不含1.0 版本，可選擇性加掛於1.0 版，無法獨立使用)
作者:王德安
更新日期:2016/01/04
1.FxDataObj.FxCustomEventPolyfill() 新增擴充New CustomEvent 相容性到IE9 的函數
2.FxDataObj.handheld = {} 新增用來管理手持裝置的物件
3.FxDataObj.handheld.getWindowRatio() 回傳目前瀏覽器視窗的寬高比值(手持裝置)
4.FxDataObj.handheld.enableOrientationEvent() 產生三個新的監聽事件orientationUpdate , orientationToLandscape , orientationToPortrait(手持裝置)
5.FxDataObj.handheld.currentOrentation() 回傳目前判斷的瀏覽器旋轉方向(手持裝置)

/**
@說明:管理手持裝置函數的集合物件.
@型態:public Object
@回傳:無
*/
FxDataObj.handheld = {lastWindowRatio:0 , lastOrentation:'' , run_excuteOrentationUpdate:0/* 手持裝置擴充*/};
/**
@使用:擴充New CustomEvent 函數向下相容到IE9.
@型態:Object Function
@回傳:無,但會在網頁的<head>或<body>內產生一個<script id="FxUtility_FxCustomEventPolyfill">
*/
FxDataObj.FxCustomEventPolyfill = function (){
	if(document.getElementById('FxUtility_FxCustomEventPolyfill')) return;
	var script , scode , append , append_ary , chk;
	script = document.createElement('script');
	script.setAttribute('language' , 'javascript');
	script.setAttribute('type' , 'text/javascript');
	script.setAttribute('id' , 'FxUtility_FxCustomEventPolyfill');
	scode = 
'(function () {/* 擴充new CustomEvent 的相容性 , IE 系列向下相容到IE9*/'+
'function CustomEvent ( event, params ) {'+
'	params = params || { bubbles: false, cancelable: false, detail: undefined };'+
'	var evt = document.createEvent( \'CustomEvent\' );'+
'	evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );'+
'	return evt;'+
'}'+
'CustomEvent.prototype = window.Event.prototype;'+
'window.CustomEvent = CustomEvent;'+
'})();';
	script.text = scode;//for most browser
	append_ary = [document.getElementsByTagName('HEAD')[0] , document.getElementsByTagName('BODY')[0]];
	chk = false;
	for(var i = 0;i<append_ary.length;i++){
		if(append_ary[i]){
			append = append_ary[i];
			chk = true;
			break;
		}
	}
	if(chk == true){
		append.appendChild(script);
		//console.log('FxUtility 1.1 beta info:Custom Event Polyfill success');
	} else {
		//console.log('FxUtility 1.1 beta info:Custom Event Polyfill fail');
	}
};
/**
@使用:回傳目前偵測到的旋轉方向，須搭配FxDataObj.handheld.enableOrientationEvent() 先執行.
@型態:Object Function
@回傳:String | landscape(手機橫向) 或 portrait(手機直向)
*/
FxDataObj.handheld.currentOrentation = function (){
	return FxDataObj.handheld.lastOrentation;
};
/**
@使用:回傳目前偵測到的旋轉方向比例.
@型態:Object Function
@回傳:Number | 1(大於1)(手機橫向) 或0(手機直向)
*/
FxDataObj.handheld.getWindowRatio = function (){
	var windowWidth , windowHeight;
	if(window.innerWidth){
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	} else {
		windowWidth = window.outerWidth;
		windowHeight = window.outerHeight;
	}
	if(!windowWidth){
		console.log('FxUtility 1.1 beta info:lose window size');
		return null;
	} else {
		return Math.floor(windowWidth / windowHeight);
		// 0 or 1
	}
};
/**
@使用:將監聽手持裝置旋轉狀態的三個事件加入到網頁,目前只有啟用(enable)沒有棄用(disable).
@型態:Object Function
@回傳:Object | 內含6個字串的物件,字串值即為監聽事件觸發字串
@回傳:Object.u:String | 監聽手機的旋轉方向有變化(只要有變化)的事件觸發字串
@回傳:Object.update:String | 同上
@回傳:Object.h:String | 監聽手機的旋轉方向變化為橫向的事件觸發字串
@回傳:Object.toLandscape:String | 同上
@回傳:Object.v:String | 監聽手機的旋轉方向變化為直向的事件觸發字串
@回傳:Object.toPortrait:String | 同上
@事件擲回:detail.currentOrentation:String | 發生變化的這一次旋轉方向
@事件擲回:detail.lastOrentation:String | 發生變化前的最後一次旋轉方向
*/
FxDataObj.handheld.enableOrientationEvent = function (){
	FxDataObj.FxCustomEventPolyfill();//擴充Custom Event 向下相容性
	var update , toLandscape , toPortrait;
	update = 'orientationUpdate';
	toLandscape = 'orientationToLandscape';
	toPortrait = 'orientationToPortrait';
	FxDataObj.handheld.lastOrentation = FxDataObj.handheld.getWindowRatio();
	if(FxDataObj.handheld.lastOrentation > 1){
		FxDataObj.handheld.lastOrentation = 1;//確認為橫向後,比例大於1 = 1
	}
	if(FxDataObj.handheld.lastOrentation > 0){
		FxDataObj.handheld.lastOrentation = 'landscape';
	} else {
		FxDataObj.handheld.lastOrentation = 'portrait';
	}
	function excuteOrentationUpdate(){
		var eventUpdate , eventLandscape , eventPortrait , windowRatio , throwObj;
		throwObj = {currentOrentation:'' , lastOrentation:FxDataObj.handheld.lastOrentation};
		windowRatio = FxDataObj.handheld.getWindowRatio();
		if(windowRatio > 1){
			windowRatio = 1;//確認為橫向後,比例保持為1
		}
		if(windowRatio != FxDataObj.handheld.lastWindowRatio){
			//螢幕方向發生改變
			FxDataObj.handheld.lastWindowRatio = windowRatio;
			if(windowRatio > 0){
				//landscape
				FxDataObj.handheld.lastOrentation = 'landscape';
				throwObj.currentOrentation = 'landscape';
				eventLandscape = new CustomEvent(toLandscape , {detail:throwObj});
				window.dispatchEvent(eventLandscape);//將新產生的事件"附加"到需要監聽的元素
			} else {
				//portrait
				FxDataObj.handheld.lastOrentation = 'portrait';
				throwObj.currentOrentation = 'portrait';
				eventPortrait = new CustomEvent(toPortrait , {detail:throwObj});
				window.dispatchEvent(eventPortrait);//將新產生的事件"附加"到需要監聽的元素
			}
			eventUpdate = new CustomEvent(update , {detail:throwObj});
			window.dispatchEvent(eventUpdate);//將新產生的事件"附加"到需要監聽的元素
		}
	}
	excuteOrentationUpdate();
	FxDataObj.handheld.run_excuteOrentationUpdate = setInterval(excuteOrentationUpdate , 15);
	return {'update':'orientationUpdate' , 'u':'orientationUpdate' , 'toLandscape':'orientationToLandscape' , 'h':'orientationToLandscape' , 'toPortrait':'orientationToPortrait' , 'v':'orientationToPortrait'};//回傳監聽用的事件觸發字串
};
/**************************************************************************************************************


                                              以下為介面函數


***************************************************************************************************************/

/**
@使用:擴充New CustomEvent 函數向下相容到IE9.
@型態:global Function
@回傳:無,但會在網頁的<head>或<body>內產生一個<script id="FxUtility_FxCustomEventPolyfill">
*/
function FxCustomEventPolyfill(){
	FxDataObj.FxCustomEventPolyfill();
}
/**
@使用:回傳目前偵測到的旋轉方向，須搭配FxHHenableOrientationEvent() 先執行.
@型態:global Function
@回傳:String | landscape(手機橫向) 或 portrait(手機直向)
*/
function FxHHcurrentOrentation(){
	return FxDataObj.handheld.currentOrentation();
}
/**
@使用:回傳目前偵測到的旋轉方向比例.
@型態:global Function
@回傳:Number | 1(大於1)(手機橫向) 或0(手機直向)
*/
function FxHHgetWindowRatio(){
	return FxDataObj.handheld.getWindowRatio();
}
/**
@使用:將監聽手持裝置旋轉狀態的三個事件加入到網頁,目前只有啟用(enable)沒有棄用(disable).
@型態:global Function
@回傳:Object | 內含6個字串的物件,字串值即為監聽事件觸發字串
@回傳:Object.u:String | 監聽手機的旋轉方向有變化(只要有變化)的事件觸發字串
@回傳:Object.update:String | 同上
@回傳:Object.h:String | 監聽手機的旋轉方向變化為橫向的事件觸發字串
@回傳:Object.toLandscape:String | 同上
@回傳:Object.v:String | 監聽手機的旋轉方向變化為直向的事件觸發字串
@回傳:Object.toPortrait:String | 同上
@事件擲回:detail.currentOrentation:String | 發生變化的這一次旋轉方向
@事件擲回:detail.lastOrentation:String | 發生變化前的最後一次旋轉方向
*/
function FxHHenableOrientationEvent(){
	return FxDataObj.handheld.enableOrientationEvent();
}