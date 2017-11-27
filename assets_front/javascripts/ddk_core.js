// JavaScript Document
/**
版本:1.0
作者:王德安
更新日期:2017/06/21

*/
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
var DDK = {
	active:function(){
		DDK.isRwd = DDK.checkRwd();
		if(DDK.isMobile == true) DDK.orientationEvent = FxHHenableOrientationEvent();
		FxAddEventListener(window , 'resize' , function(){DDK.isRwd = DDK.checkRwd();DDK.blert('onresize RWD:'+DDK.isRwd);} , false)
	},
	blert:function (info){
		if(window.console) console.log(info);
		if(!window.console) alert(info);
	},
	checkRwd:function (){
		var ele = document.getElementById('pingForRwd').getElementsByTagName('P')[0];
		if(window.getComputedStyle){
			var judge = window.getComputedStyle(ele,null).getPropertyValue('float');
			if(judge == 'left'){
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	,
	/**不使用
	clearContentInLineStyle : function (_ele){
		var tag_ary = ['p' , 'span' , 'a' , 'div' , 'img'];
		var s_ary , _s;
		var _style = '';
		for(var i = 0;i<tag_ary.length;i++){
			//s_ary = $(_ele).find(tag_ary[i]).attr('style').split(';');
			if($(_ele).find(tag_ary[i]).attr('style')){
				s_ary = $(_ele).find(tag_ary[i]).attr('style').toLowerCase().split(';');
				for(var j = 0;j<s_ary.length;j++){
					_s = s_ary[j];
					if(_s.indexOf('font-size') == -1 && _s.indexOf('line-height') == -1){
						_style += _s + ';'
					}
				}
			}
			
			$(_ele).find(tag_ary[i]).attr('style' , _style);
			if(tag_ary[i] == 'img') $(_ele).find(tag_ary[i]).attr('style' , 'width:100%;');
		}
	},*/
	/**
	於內文頁中清除多餘的格式,只保留顏色設定
	*/
	insertTableFloatFix : function (_ele){
		var tag_ary = $(_ele).find('table');
		$('<div class="clearFloat"></div>').insertAfter(tag_ary);
	}
	,
	claerContentStyle : function (jq_ary){
		var _ary = jq_ary;
		var _e , tmp , style_ary , style_str;
		for(var i = 0;i<_ary.length;i++){
			_e = _ary[i];
			if($(_e).attr('style')){
				tmp = FxReplace($(_e).attr('style').toLowerCase() , ' ' , '' , 'all');
				style_ary = tmp.split(';');
				style_str = '';
				for(var j = 0;j<style_ary.length;j++){
					tmp = style_ary[j].split(':');
					if(tmp[0] == 'color') style_str+= tmp[0] + ':' + tmp[1] + ';';//只保留顏色設定
				}
				$(_e).attr('style' , style_str);
			}
		}
	}
	,
	isIE8 : (function(){//http://stackoverflow.com/questions/5574842/best-way-to-check-for-ie-less-than-9-in-javascript-without-library
    	var undef , v = 3 , div = document.createElement('div') , all = div.getElementsByTagName('i');

		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);

		return v > 4 ? v : undef;

	}()),
	parentElement:function (currentElement , tagName){
		var _p = currentElement;
		tagName = tagName.toUpperCase();
		for(var i = 0;;i++){
			if(_p.tagName.toUpperCase() == tagName){
				return _p;
			} else {
				_p = _p['parentElement'];
			}
			if(_p.tagName.toUpperCase() == 'HTML'){
				//視為尋找失敗
				return 'undefined';
			}
		}
	}
	,
	findYouTubeIdByUrl : function(_url){
		var _s , _ary;
		if(_url.indexOf('?') == -1){
			return _url.substring(_url.lastIndexOf('/') + 1 , _url.length);//舊時期
		} else {
			_s = _url.substring(_url.indexOf('?') + 1 , _url.length);
			_ary = _s.split('&');
			for(var i = 0;i<_ary.length;i++){
				if(_ary[i].split('=')[0] == 'v'){
					return _ary[i].split('=')[1];
				}
			}
		}
	},
	orientationEvent:null,
	isRwd:null,
	isMobile: window.mobileAndTabletcheck(),
	mutual: {/*全站共用性功能*/uiFlowStopper: {/*全站共用的Alert 類功能*/} , fotoCaptain:{/*全站共用處理圖檔預載與尺寸更新*/}},
	uiAPI: {work:function (){/*假的,之後會複寫*/}/*客製化的UI API 介面*/},
	index: {/*首頁功能*/},
	easy : {/*首頁附屬功能*/},
	tutors : {/*師資團隊*/},
	member : {/*會員功能*/},
	curriculum : {/*課程購買功能*/},
	payment : {/*購物車*/},
	study : {/*上課去*/},
	expe : {/*試聽*/},
	searchs : {/*站內搜尋*/}
	
};
$(document).ready(function (){
	DDK.active();
	DDK.blert('RWD:'+DDK.isRwd);DDK.blert('Mobile:'+DDK.isMobile);
});
function ddkUIComponent(n , r){
	var ok = DDK.uiAPI.work(n , r);
	if(ok != null) DDK.blert(ok);
}