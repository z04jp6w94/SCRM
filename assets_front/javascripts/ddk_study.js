DDK.study = {
	init : function (){
		if($('.studyInfo dt').length > 1){//確認有可切換的內容時
			var _ary = $('.studyInfo dt button');
			var _switch = function (e){
				var _t = DDK.parentElement(e.currentTarget , 'DT');
				var _parent = DDK.parentElement(_t , 'DL');
				//console.log(_parent)
				if($(_t).hasClass('open') == false){
					$(_parent).find('dt , dd').removeClass('open');
					$(_t).addClass('open');
					$(_t).next().addClass('open');
				}
			};
			for(var i = 0;i<_ary.length;i++){
				FxAddEventListener(_ary[i] , 'click' , _switch , false);
			}
		}
	}
};
$(document).ready(DDK.study.init);