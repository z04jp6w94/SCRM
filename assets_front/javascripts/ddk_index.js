DDK.index = {
	init : function (){
		if(DDK.isRwd == true || DDK.isMobile == true){
			if($('.rwdAccordionTriggerIndex').length > 0) DDK.mutual.initAccordionContent('.rwdAccordionTriggerIndex[data-group]');//只初始化手持裝置使用的部分
		} else {
		}
		//DDK.index.initShowcaseVideos();
	}
	,
	initYoutubeVideo : function (){
		DDK.mutual.ytApiReady = true;
		DDK.index.initBriefVideo();//初始化影片的播放功能
	}
	,
	initShowcaseVideos : function (){
		var profileBeforeChange = function (e, slick, direction){//direction > 0:slide to left or 1:slide to right
			//console.log('BeforeChange:' + slick.slickCurrentSlide());
			var _t = e.target;
			var thisYID = DDK.findYouTubeIdByUrl($(_t).find('.slick-active .ctx a').attr('href'));
			var videoKey = $(_t).find('.slick-active .ctx a').attr('data-video-key');//差異化可能有不同區域使用同一支影片的辨識字串
			if(DDK.mutual.ytPlayer(videoKey , thisYID) != null) {//已經產生且可能撥放中的影片且尚未撥畢才進入暫停
				DDK.mutual.pauseVideoKv($(_t).find('.slick-active .ctx a')[0] , videoKey);//暫停已經產生且可能撥放中的影片
			}
			console.log(DDK.findYouTubeIdByUrl($(_t).find('.slick-active .ctx a').attr('href')));
			//thisYID = DDK.findYouTubeIdByUrl($(_t).find('.slick-active .ctx .videoStart').attr('href'));
		};
		var profileAfterChange = function (e, slick, direction){//direction > 0:slide to left or 1:slide to right
			//console.log('AfterChange:' + slick.slickCurrentSlide());
			var _t = e.target;
		};
		
		var profileInit = function (e , slick){
			//console.log('Init:' + slick.slickCurrentSlide());
			var _t = e.target;
		}
		var profile = {
			arrows:true , 
			prevArrow:'.contentBrief .controls .prev' , 
			nextArrow:'.contentBrief .controls .next'  , 
			autoplay:false , 
			autoplaySpeed:1800 , 
			adaptiveHeight:false,
			/*centerPadding:'15px' , */
			slidesToShow:3 , 
			swipe:false , 
			fade:false,
			dots: false,
			dotsClass: 'contentBrief-dots',
			responsive:[]
		};
		profile.responsive.push({
			breakpoint: 1030,/*螢幕最寬邊低於640者*/
			settings: {
				arrows:false,
				fade:false,
				swipe:true,
				dots: true,
				slidesToShow:1,
				dotsClass: 'contentBrief-dots'
			}
		});
		
		$('.contentBrief .slickPlugIn').on('init' , profileInit);
		$('.contentBrief .slickPlugIn').on('beforeChange' , profileBeforeChange);
		$('.contentBrief .slickPlugIn').on('afterChange' , profileAfterChange);
		$('.contentBrief .slickPlugIn').slick(profile);
		DDK.mutual.fotoCaptain.add({
			preload : true,
			update : true,
			contenter : 'figure',
			imageList : $('.contentBrief .ctx figure img'),
			formatter : 'shrink'
		});//若圖檔包含在任何套件內,則在套件初始化之後呼叫
	}
	,
	initBriefVideo : function (){
		var _ary = $('.contentBrief .ctx .video');
		var _ctx , _a;
		for(var i = 0;i<_ary.length;i++){
			_ctx = _ary[i].parentElement;
			_a = $(_ctx).find('a')[0];
			FxAddEventListener(_a , 'click' , function (e){
				FxEventObject(e).overwriteDefault();
				DDK.mutual.playVideoKv(e.currentTarget , $(e.currentTarget).attr('data-video-key'));
			} , false);
		}
	}
};
$(document).ready(DDK.index.init);