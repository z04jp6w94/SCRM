// JavaScript Document 整理簡單快速跨瀏覽器的JS 函數
/**
版本:1.0
作者:王德安
更新日期:2015/12/15
1.FxCheckMultiImgLoad //dataObj.end 新增一個拋回一個引數 , 即為啟動時傳入的檢查圖檔清單的陣列
新增:
1.改寫為仿物件導向,原本外部呼叫函數為全域函數不變
2.原本外部呼叫函數內容移至FxDataObj 內
3.FxReplace //文字取代的RegExp書寫簡易版本
新增:
1.FxImgShrinkToRect //將圖片依據指定的寬高,貼齊寬或高的一邊以溢出不可視方式縮圖
2.FxCheckMultiImgLoad //依據image.complete 為根據偵測圖片是否下載完成,可擲入單張完成後事件與全部清單完成後事件
新增:
1.FxImgScaleToRect //將圖片依據比例縮入指定的矩形中
2.FxFindThis //跨瀏覽器協助addEventListener 註冊的接收事件內,取得正確的目標元素參照
3.FxEventObject //新增 函數"stopBubble",用來執行stopPropagation,並於結束後再度回傳新的事件拋回物件
日期：2014/12/15
包含:
1.FxAddEventListener //跨瀏覽器註冊監聽事件
2.FxRemoveEventListener //跨瀏覽器移除監聽事件
3.FxEventObject //跨瀏覽器相容性的取得事件拋回物件
4.FxShareTo //將網址分享到Facebook Google+ Plurk Twitter Sina 等五個社群網站
*/

/**
@說明:FxUtility.js 仿物件導向函數集.
@型態:public Object
@回傳:無
*/
var FxDataObj = {initTime:new Date()};

/**
@說明:儲存註冊或移除事件記錄的陣列.
@型態:private Array
@儲存值:包含多個屬性的物件
@回傳:標準陣列
*/
FxDataObj.logs_ary = [];

/**
@使用:儲存目前瀏覽器採用的事件註冊函數種類.
@型態:private Number
@儲存值:0 或1 , (0 = 使用addEventListener ,非IE與IE 9 (含)以上 , 1 = 使用attachEvent ,IE 8(含)以下)
@回傳:0 或1
*/
FxDataObj.eventMode = undefined;//事件監聽模式,0 = 舊版IE 以外
if(typeof window.addEventListener != "undefined"){
	FxDataObj.eventMode = 0;//addEventListener
} else {
	FxDataObj.eventMode = 1;//attachEvent
}

/**
@說明:記錄Event Listener的註冊與移除.
@型態:Object Function
@回傳:無
mode:Number | 0 或 1 (0 = 使用addEventListener ,非IE與IE 9 (含)以上 , 1 = 使用attachEvent ,IE 8(含)以下)
job:String | "add" 註冊 或 "remove" 移除
e_ref:HTML Element Reference | 註冊事件的element 參照
event_str:String | 註冊事件型態字串
handler:Function | 要註冊的監聽函數
capture:Boolean | 堆疊模式
*/
FxDataObj.FxEventLog = function (mode , job , e_ref , event_str , handler , capture){
	var p = {e_id_str:null , e_class_str:null};
	p.addTime = new Date();
	p.time = p.addTime - FxDataObj.initTime;
	p.handler_func = handler;
	p.event_str = event_str;
	if(job == 'add'){
		p.job_str = '註冊';
		if(mode == 0){
			p.mode_str = 'addEventListener';
			p.capture_str = capture;
		} else {
			p.mode_str = 'attachEvent';
			p.capture = '不支援堆疊模式';
		}
	} else {
		p.job_str = '移除';
		if(mode == 0){
			p.mode_str = 'removeEventListener';
			p.capture_str = capture;
		} else {
			p.mode_str = 'detachEvent';
			p.capture = '不支援堆疊模式';
		}
	}
	if(e_ref == window){
		p.e_str = 'window';
	} else {
		p.e_str = e_ref.tagName;
	}
	if(e_ref.hasAttribute){
		if(e_ref.hasAttribute('id') == true){
			p.e_id_str = e_ref.getAttribute('id');
		}
		if(e_ref.hasAttribute('class') == true){
			p.e_class_str = e_ref.getAttribute('class');
		}
	}
	FxDataObj.logs_ary.push(p);
};
/**
@使用:跨瀏覽器相容性的addEventListener 補強函數.
@型態:Object Function
@回傳:無
e_ref:HTML Element Reference | 註冊事件的element 參照
event_str:String | 註冊事件型態字串
handler:Function | 要註冊的監聽函數
capture:Boolean | 堆疊模式
*/
FxDataObj.FxAddEventListener = function (e_ref , event_str , handler , capture){
	if(FxDataObj.eventMode == 0){
		if(event_str.indexOf('on') == 0){
			event_str = event_str.substring(2 , event_str.length);
		}
		e_ref.addEventListener(event_str , handler , capture);
	} else {
		if(event_str.indexOf('on') == -1){
			event_str = 'on' + event_str;
		}
		e_ref.attachEvent(event_str , handler);
	}
	FxDataObj.FxEventLog(FxDataObj.eventMode , 'add' , e_ref , event_str , handler , capture);
};

/**
@使用:跨瀏覽器相容性的removeEventListener 補強函數.
@型態:Object Function
@回傳:無
e_ref:HTML Element Reference | 解除註冊事件的element 參照
event_str:String | 解除註冊事件型態字串
handler:Function | 要解除註冊的監聽函數
capture:Boolean | 堆疊模式
*/
FxDataObj.FxRemoveEventListener = function (e_ref , event_str , handler , capture){
	if(FxDataObj.eventMode == 0){
		if(event_str.indexOf('on') == 0){
			event_str = event_str.substring(2 , event_str.length);
		}
		e_ref.removeEventListener(event_str , handler , capture);
	} else {
		if(event_str.indexOf('on') == -1){
			event_str = 'on' + event_str;
		}
		e_ref.detachEvent(event_str , handler);
	}
	FxDataObj.FxEventLog(FxDataObj.eventMode , 'remove' , e_ref , event_str , handler , capture);
};

/**
@使用:跨瀏覽器相容性的取得事件拋回物件(Event Object).
@型態:Object Function
@回傳:Object | 新的物件,不是傳入物件的擴充 
@回傳:Object.e:Event Object | 瀏覽器回傳的事件擲回物件 , 若是瀏覽器使用attachEvent 回傳為event , 若是瀏覽器使用addEventListener 回傳為傳入的Event Object
@回傳:Object.target:HTML Element Reference | 包裝過的e.target , 若是瀏覽器使用attachEvent 回傳為event.srcElement , 若是瀏覽器使用addEventListener 回傳為傳入的Event Object.target
@回傳:Object.overwriteDefault:Object Function | 包裝過的e.preventDefault() , 若是瀏覽器使用attachEvent 使用returnValue = false , 若是瀏覽器使用addEventListener 使用preventDefault(), 函數執行完後會把Object 再度回傳
@回傳:Object.stopBubble:Object Function | 包裝過e.stopPropagation() , 若是瀏覽器使用attachEvent 使用cancelBubble = true , 若是瀏覽器使用addEventListener 使用stopPropagation(), 函數執行完後會把Object 再度回傳
_e:Event Listener throw back Object | 事件監聽擲回物件
*/
FxDataObj.FxEventObject = function (_e){
	var newE = {};
	newE.e = _e || event;
	newE.target = newE.e.target || newE.e.srcElement;
	newE.overwriteDefault = function (){
		(this.e.preventDefault) ? this.e.preventDefault() : this.e.returnValue = false;
		return this;
	};
	newE.stopBubble = function (){
		(this.e.stopPropagation) ? this.e.stopPropagation() : this.e.cancelBubble = true;
		return this;
	};
	return newE;
};

/**
@使用:跨瀏覽器從接收事件內,取得正確的目標元素參照 , 若是瀏覽器使用attachEvent 回傳為srcElement , 若是瀏覽器使用addEventListener 回傳為傳入的this. 
@型態:Object Function
@回傳:HTML Element Reference | 觸發事件的元素參照
_e:Event Listener throw back Object | 事件監聽擲回物件
_this:HTML Element Reference | 事件監聽函數中直接呼叫的this
*/
FxDataObj.FxFindThis = function (_e , _this){
	if(FxDataObj.eventMode == 0){
		//IE 以外
		return _this;
	} else if(FxDataObj.eventMode == 1){
		//也許是IE
		return _e.srcElement;
	}
};

/**
@使用:用於檢查HTML DOM 中的<img> 下載狀態.主要是檢查<img>.complete 屬性是否為true. 不會將檢查的<img> 以new Image 重製. *另外檢查的<img> 在確認下載後,會被動態寫入一個<img>.done="true"的屬性.
@型態:Object Function
@回傳:Function | 一個可被喚起(invoke)的函數 , 若無執行呼叫則僅只是設定完成但不會執行
dataObj:Object | 作為設定用的物件
dataObj.img_ary:Array | 檢查圖檔清單的陣列 , 可以是jQuery 選取的回傳物件 , 也可以是JS Native Array
dataObj.interval:String | 用於檢查作用中interval 的辨識名稱 , 任意值
dataObj.delay:Number } 執行中interval的檢查毫秒頻率 ，建議用50 毫秒即可
dataObj.eachEnd:Function | 單張圖下載完後執行的函數，拋回一個引數為該張圖檔的參照
dataObj.end:Function | 當清單的全部圖檔下載完後執行的函數，拋回一個引數 , 即為啟動時傳入的檢查圖檔清單的陣列
*/
FxDataObj.FxCheckMultiImgLoad = function (dataObj){
	if(!dataObj.img_ary){
		console.log('FxCheckMultiImgLoad error : without image list array');
		return;
	}
	if(!dataObj.interval){
		dataObj.interval = 'FxCheckMultiImgLoad Interval ' + new Date().toString();
	}
	if(!dataObj.eachEnd){
		dataObj.eachEnd = function (){};
	}
	if(!dataObj.end){
		dataObj.end = function (){};
	}
	if(!dataObj.delay) {
		dataObj.delay = 50;
	}
	var _callBack = function (){
		var _ary = dataObj.img_ary;//檢查圖檔的清單陣列
		var tmp = String(Math.random());
		tmp = tmp.substring(tmp.indexOf('.')+1 , tmp.length);//產生interval ID
		var run = {};
		run['interval' + '-' + tmp] = 0;
		var eachEnd = dataObj.eachEnd;//單張圖檔載入後的執行事件
		var end = dataObj.end;//全部的圖檔載入後的執行事件
		var img;
		/*console.log('interval' + '-' + tmp + ' passer:' + dataObj.interval + ' start');// 監控下載開始*/
		var _excute = function (){
			var chk = 0;
			for(var i = 0;i<_ary.length;i++){
				img = _ary[i];
				if(img.complete == true){
					chk+= 1;
				}
				if(img.complete == true && img.getAttribute('done') != 'true'){
					img.setAttribute('done' , 'true');//避免重複檢查
					eachEnd(img);
				}
				//console.log('interval' + '-' + tmp + ' : ' + 'image ' + i + ' complete = ' + img.complete);/*圖檔載入狀態*/
			}
			if(chk == _ary.length){
				clearInterval(run['interval' + '-' + tmp]);
				/*console.log('interval' + '-' + tmp + ' passer:' + dataObj.interval + ' finish');// 監控下載完成*/
				end(_ary);
			}
		};
		run['interval' + '-' + tmp] = setInterval(_excute , dataObj.delay);
	};
	return _callBack;
};

/**
@使用:圖檔固定比例縮進目標寬高中 , 或是以寬或高某一邊為縮圖目標 , 另一邊刻意"溢出"目標寬高.
@型態:Object Function
@回傳:Array | 陣列,內容為[上外距 , 左外距 , 縮圖寬 , 縮圖高]
_maxWidth:Number | 縮圖目標寬度
_maxHeight:Number | 縮圖目標高度
_imgWidth:Number | 圖檔寬度
_imgHeight:Number | 圖檔高度
fLetterBox:Boolean | 是否完全縮入目標尺寸內 , true 寬高等比縮入 , false 依據寬或高的某一邊為縮放基準縮入
*/
FxDataObj.FxImgScale = function (_maxWidth , _maxHeight , _imgWidth , _imgHeight , fLetterBox){
	var maxWidth , maxHeight , scaleWidth , scaleHeight , scale , fixWidth , fixHeight , fixTop , fixLeft;
	maxWidth = _maxWidth;
	maxHeight = _maxHeight;
	var result = { width: 0, height: 0, fScaleTo_maxWidth: true };

    if ((_imgWidth <= 0) || (_imgHeight <= 0) || (_maxWidth <= 0) || (_maxHeight <= 0)) {
        return result;
    }

    // scale to the target width
    var scaleX1 = _maxWidth;
    var scaleY1 = (_imgHeight * _maxWidth) / _imgWidth;

    // scale to the target height
    var scaleX2 = (_imgWidth * _maxHeight) / _imgHeight;
    var scaleY2 = _maxHeight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > _maxWidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
       fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleTo_maxWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleTo_maxWidth = false;
    }
    result.targetleft = Math.floor((_maxWidth - result.width) / 2);
    result.targettop = Math.floor((_maxHeight - result.height) / 2);

    return [result.targettop , result.targetleft , result.width , result.height];
};

/**
@使用:跨瀏覽器的分享到各社群網站 , 建議於不適用各社群網站提供的分享UI 時使用.
@型態:Object Function
@回傳:無
_site:字串 | 要分享的社群網站 , 目前支援 'facebook' , 'google+' , 'twitter' , 'plurk' , 'sina'
_url:字串 | 要分享的網址
*/
FxDataObj.FxShareTo = function (_site , _url){
	var popWin = _site + '_go';
	switch(_site){
		case 'facebook':
			FxDataObj.FxOpenToSocialMedia('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(_url),popWin,580,400);
		break;
		case 'google+':
			FxDataObj.FxOpenToSocialMedia('https://plus.google.com/share?url='+encodeURIComponent(_url),popWin,580,400);
		break;
		case 'twitter':
			FxDataObj.FxOpenToSocialMedia('http://www.twitter.com/share?url='+encodeURIComponent(_url)+'&text='+encodeURIComponent(document.title),popWin,580,400);
		break;
		case 'plurk':
			FxDataObj.FxOpenToSocialMedia('http://www.plurk.com/?qualifier=shares&amp;status=' .concat(encodeURIComponent(_url)) .concat(' ') .concat('(') .concat(encodeURIComponent(document.title)) .concat(')'),popWin,580,400);
		break;
		case 'sina':
			FxDataObj.FxOpenToSocialMedia('http://v.t.sina.com.cn/share/share.php?url='+encodeURIComponent(_url)+'&title='+encodeURIComponent(document.title),popWin,580,400);
		break;
	}
};
/**
@使用:開啟分享網站pop window
@型態:Object Function
@回傳:無
url:String | 分享的網址
name:String | 視窗名稱 , 固定為'facebook' , 'google+' , 'twitter' , 'plurk' , 'sina' 後方加上一個'_go'
iWidth:Number | 目前固定傳入580
iHeight:Number | 目前固定傳入400
*/
FxDataObj.FxOpenToSocialMedia = function (url,name,iWidth,iHeight){
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	window.open(url,name,'height='+iHeight+',width='+iWidth+',top='+iTop+',left='+iLeft+',status=no,location=no,status=no,menubar=no,toolbar=no,resizable=no,scrollbars=no');
};
/**
@使用:文字取代的RegExp書寫簡易版本.
@型態:Object Function
@回傳:字串
_str:String | 來源字串
_kill:String | 被取代的目標字串
_pat:String | 要置入的字串
_mode:String | 字串取代模式 , 'first' 取代來源字串中出現第一次的目標字串(預設值) , 'all' 取代來源字串中所有的目標字串
*/
FxDataObj.FxReplace = function(_str , _kill , _pat , _mode){
	if(!_mode || _mode == ''){
		_mode = 'first';
	}
	var reg;
	if(_mode == 'first'){
		reg = new RegExp( _kill, 'i' );
	}
	if(_mode == 'all'){
		reg = new RegExp( _kill, 'gi' );
	}
	return _str.replace(reg , _pat);
};
/**
@使用:輸出加入或移除的事件歷程
@回傳:無
*/
FxDataObj.FxEventAnalyticReport = function(){
	var scode = 'FxUtility.js:Event analytic report:' + '\n';
	var obj;
	var funcName = '';
	for(var i = 0;i<FxDataObj.logs_ary.length;i++){
		obj = FxDataObj.logs_ary[i];
		for(var j in this){
			if(typeof(this[j]) != 'object'){
				//全域下的Function
				if(obj.handler_func == this[j]){
					funcName = j;
					break;
				}
			} else if(typeof(this[j]) == 'object'){
				//全域下的Object內的Function
				for(var k in this[j]){
					if(obj.handler_func == this[j][k]){
						funcName = j + '.' + k;
						break;
					}
				}
			}
		}
		scode += (i + 1) + '.於初始後' + obj.time + ' ms 以' + obj.mode_str + ' ' + obj.job_str + '了[' + obj.e_str + ' id="' + obj.e_id_str + '" class="' + obj.e_class_str + '"' + ']上的' + obj.event_str + '事件,監聽者為' + funcName + ' 堆疊參數:' + obj.capture_str + '\n';
	}
	console.log(scode);
}

/**************************************************************************************************************


                                              以下為介面函數


***************************************************************************************************************/
/**
@使用:跨瀏覽器相容性的addEventListener 補強函數, FxDataObj.FxAddEventListener 的介面函數.
@型態:global Function
@回傳:無
e_ref:HTML Element Reference | 註冊事件的element 參照
event_str:String | 註冊事件型態字串
handler:Function | 要註冊的監聽函數
capture:Boolean | 堆疊模式
*/
function FxAddEventListener(e_ref , event_str , handler , capture){
	FxDataObj.FxAddEventListener(e_ref , event_str , handler , capture);
}

/**
@使用:跨瀏覽器相容性的removeEventListener 補強函數 , FxDataObj.FxRemoveEventListener 的介面函數.
@型態:global Function
@回傳:無
e_ref:HTML Element Reference | 解除註冊事件的element 參照
event_str:String | 解除註冊事件型態字串
handler:Function | 要解除註冊的監聽函數
capture:Boolean | 堆疊模式
*/
function FxRemoveEventListener(e_ref , event_str , handler , capture){
	FxDataObj.FxRemoveEventListener(e_ref , event_str , handler , capture);
}

/**
@使用:跨瀏覽器相容性的取得事件拋回物件(Event Object) , FxDataObj.FxEventObject 的介面函數.
@型態:global Function
@回傳:Object | 新的物件,不是傳入物件的擴充 
@回傳:Object.e:Event Object | 瀏覽器回傳的事件擲回物件 , 若是瀏覽器使用attachEvent 回傳為event , 若是瀏覽器使用addEventListener 回傳為傳入的Event Object
@回傳:Object.target:HTML Element Reference | 包裝過的e.target , 若是瀏覽器使用attachEvent 回傳為event.srcElement , 若是瀏覽器使用addEventListener 回傳為傳入的Event Object.target
@回傳:Object.overwriteDefault:Object Function | 包裝過的e.preventDefault() , 若是瀏覽器使用attachEvent 使用returnValue = false , 若是瀏覽器使用addEventListener 使用preventDefault(), 函數執行完後會把Object 再度回傳
@回傳:Object.stopBubble:Object Function | 包裝過e.stopPropagation() , 若是瀏覽器使用attachEvent 使用cancelBubble = true , 若是瀏覽器使用addEventListener 使用stopPropagation(), 函數執行完後會把Object 再度回傳
_e:Event Listener throw back Object | 事件監聽擲回物件
*/
function FxEventObject(_e){
	return FxDataObj.FxEventObject(_e);
}

/**
@使用:跨瀏覽器從接收事件內,取得正確的目標元素參照 , FxDataObj.FxFindThis 的介面函數 , 若是瀏覽器使用attachEvent 回傳為srcElement , 若是瀏覽器使用addEventListener 回傳為傳入的this. 
@型態:global Function
@回傳:HTML Element Reference | 觸發事件的元素參照
_e:Event Listener throw back Object | 事件監聽擲回物件
_this:HTML Element Reference | 事件監聽函數中直接呼叫的this
*/
function FxFindThis(_e , _this){
	return FxDataObj.FxFindThis(_e , _this);
}

/**
@使用:用於檢查HTML DOM 中的<img> 下載狀態 , FxDataObj.FxCheckMultiImgLoad 的介面函數.主要是檢查<img>.complete 屬性是否為true. 不會將檢查的<img> 以new Image 重製. *另外檢查的<img> 在確認下載後,會被動態寫入一個<img>.done="true"的屬性.
@型態:global Function
@回傳:Function | 一個可被喚起(invoke)的函數 , 若無執行呼叫則僅只是設定完成但不會執行
dataObj:Object | 作為設定用的物件
dataObj.img_ary:Array | 檢查圖檔清單的陣列 , 可以是jQuery 選取的回傳物件 , 也可以是JS Native Array
dataObj.interval:String | 用於檢查作用中interval 的辨識名稱 , 任意值
dataObj.delay:Number } 執行中interval的檢查毫秒頻率 ，建議用50 毫秒即可
dataObj.eachEnd:Function | 單張圖下載完後執行的函數，拋回一個引數為該張圖檔的參照
dataObj.end:Function | 當清單的全部圖檔下載完後執行的函數無拋回引數
*/
function FxCheckMultiImgLoad(dataObj){
	return FxDataObj.FxCheckMultiImgLoad(dataObj);
}

/**
@使用:圖檔固定比例縮進目標寬高中 , FxDataObj.FxImgScale 的介面函數.
@型態:globalt Function
@回傳:Array | 陣列,內容為[上外距 , 左外距 , 縮圖寬 , 縮圖高]
_maxWidth:Number | 縮圖目標寬度
_maxHeight:Number | 縮圖目標高度
_imgWidth:Number | 圖檔寬度
_imgHeight:Number | 圖檔高度
*/
function FxImgScaleToRect(_maxWidth , _maxHeight , _imgWidth , _imgHeight){
	/*var maxWidth , maxHeight , scaleWidth , scaleHeight , scale , fixWidth , fixHeight , fixTop , fixLeft;
	maxWidth = _maxWidth;
	maxHeight = _maxHeight;
	scaleWidth = maxWidth / _imgWidth;
	scaleHeight = maxHeight / _imgHeight;
	scale = Math.min(scaleWidth , scaleHeight);
	fixWidth = _imgWidth * scale;
	fixHeight = _imgHeight * scale;
	fixLeft = (maxWidth - fixWidth)/2;
	fixTop = (maxHeight - fixHeight)/2;
	return [fixTop , fixLeft , fixWidth , fixHeight];*/
	return FxDataObj.FxImgScale(_maxWidth , _maxHeight , _imgWidth , _imgHeight , true);
}
/**
@使用:圖檔以某一側寬高為基準等比例縮圖 , 產生某一邊貼齊目標尺寸 , 另一邊溢出的效果 , FxDataObj.FxImgScale 的介面函數.
@型態:global Function
@回傳:Array | 陣列,內容為[上外距 , 左外距 , 縮圖寬 , 縮圖高]
_maxWidth:Number | 縮圖目標寬度
_maxHeight:Number | 縮圖目標高度
_imgWidth:Number | 圖檔寬度
_imgHeight:Number | 圖檔高度
*/
function FxImgShrinkToRect(_maxWidth , _maxHeight , _imgWidth , _imgHeight){
	return FxDataObj.FxImgScale(_maxWidth , _maxHeight , _imgWidth , _imgHeight , false);
}

/**
@使用:跨瀏覽器的分享到各社群網站 , FxDataObj.FxShareTo 的介面函數 , 建議於不適用各社群網站提供的分享UI 時使用.
@型態:global Function
@回傳:無
_site:字串 | 要分享的社群網站 , 目前支援 'facebook' , 'google+' , 'twitter' , 'plurk' , 'sina'
_url:字串 | 要分享的網址
*/
function FxShareTo(_site , _url){
	FxDataObj.FxShareTo(_site , _url);
}

/**
@使用:文字取代的RegExp書寫簡易版本.
@型態:Object Function
@回傳:字串
_str:String | 來源字串
_kill:String | 被取代的目標字串
_pat:String | 要置入的字串
_mode:String | 字串取代模式 , 'first' 取代來源字串中出現第一次的目標字串(預設值) , 'all' 取代來源字串中所有的目標字串
*/
function FxReplace(_str , _kill , _pat , _mode){
	return FxDataObj.FxReplace(_str , _kill , _pat , _mode);
}