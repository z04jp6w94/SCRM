DDK.tutors = {
	isList : false,
	isIntro : false,
	init : function (){
		if(DDK.isRwd == true){
			FxAddEventListener(window , DDK.orientationEvent.u , DDK.tutors.updateAllSizeFix , false);
		} else {
			FxAddEventListener(window , 'resize' , DDK.tutors.updateAllSizeFix , false);
		}
		if(DDK.tutors.isList == true) DDK.tutors.List.init();
		if(DDK.tutors.isIntro == true) DDK.tutors.Intro.init();
	}
	,
	/**
	將長版的照片以人像照片調整,照片置上對齊
	*/
	portraitLikeFormatter : function (img , ctx){
		var _adj = FxImgShrinkToRect($(ctx).width() , $(ctx).height() , $(img).width() , $(img).height());
		var ratio = $(img).width() / $(img).height();
		$(img).css({'margin-top': + _adj[0] + 'px' , 'margin-left': + _adj[1] + 'px' , 'width': + _adj[2] + 'px' , 'height': + _adj[3] + 'px'});
		if(ratio < 1) $(img).css({'margin-top':'0px'});/*特別處理,人像類窄版照片垂直定位貼齊頂端*/
	}
	,
	List : {
		init : function (){
			DDK.mutual.fotoCaptain.add({
				preload : true,
				update : true,
				contenter : 'figure',
				imageList : $('.teachers li a figure img'),
				formatter : DDK.tutors.portraitLikeFormatter
			});//若圖檔包含在任何套件內,則在套件初始化之後呼叫
		}
	}
	,
	Intro : {
		init : function (){
			DDK.mutual.fotoCaptain.add({
				preload : true,
				update : true,
				contenter : 'figure',
				imageList : $('.teacherDetail .icon figure img'),
				formatter : DDK.tutors.portraitLikeFormatter
			});//若圖檔包含在任何套件內,則在套件初始化之後呼叫
			DDK.tutors.Intro.initSwitchProfile();
		}
		,
		initSwitchProfile : function (){
			var _ary = $('.teacherDetail .spec dt button');
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
$(document).ready(DDK.tutors.init);