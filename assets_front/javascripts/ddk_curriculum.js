DDK.curriculum = {
	checkItemsLength : null,
	init : function (){
		if($('.sellItems ul li').length > 0) {
			DDK.curriculum.initCheckItems();
			DDK.mutual.insertListFix($('.sellItems'));
			DDK.curriculum.checkItemsLength = $('.sellItems ul li').length;//取得初始化的數量
			FxAddEventListener($('.final .resetBtn')[0] , 'click' , function (e){
				$('.sellItems ul li .group').removeClass('checked');
				$('.sellItems ul li .group input').prop('checked' , false);
			} , false);	
		}
		if($('.shoppingItems .features ul li').length > 0) DDK.mutual.insertListFix($('.shoppingItems .features'));
		if($('.courseInfo figure img').length > 0){
			DDK.mutual.fotoCaptain.add({
				preload : true,
				update : true,
				contenter : 'figure',
				imageList : $('.courseInfo figure img'),
				formatter : 'shrink'
			});//若圖檔包含在任何套件內,則在套件初始化之後呼叫
		}
		if($('.shoppingInfo dt').length > 1){//確認有可切換的內容時
			var _ary = $('.shoppingInfo dt button');
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
		if($('.socialShare').length > 0) DDK.mutual.initSocialShare($('.socialShare'));
	}
	,
	initCheckItems : function (){
		var _ary = $('.sellItems ul li label.group');
		var _label , _chkBox , hasEvent;
		var onchange = function (e){
			var _t = e.currentTarget;
			var _p = _t.parentElement;
			if($(_t).prop('checked') == false){
				$(_p).removeClass('checked');
			} else {
				$(_p).addClass('checked');
			}
		};
		for(var i = 0;i<_ary.length;i++){
			_label = _ary[i];
			_chkBox = $(_label).find('input')[0];
			hasEvent = Boolean(Number($(_chkBox).attr('data-evented')));
			if(hasEvent == false){//避免即時更新重覆註冊事件
				if($(_chkBox).prop('checked') == true) $(_label).addClass('checked');
				FxAddEventListener(_chkBox , 'change' , onchange , false);
				$(_chkBox).attr('data-evented' , '1');
			}
		}
	}
};
$(document).ready(DDK.curriculum.init);