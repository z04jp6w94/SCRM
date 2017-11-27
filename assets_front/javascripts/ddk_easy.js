DDK.easy = {
	isShowcase : false,
	isFaq : false,
	isContact : false,
	isWitness : false,
	isPartner : false,
	init : function (){
		if(DDK.easy.isShowcase == true) DDK.easy.Showcase.init();
		if(DDK.easy.isFaq == true) DDK.easy.Faq.init();
		if(DDK.easy.isWitness == true) DDK.easy.Witness.init();
	}
	,
	initYoutubeVideo : function (){
		DDK.mutual.ytApiReady = true;
		if(DDK.easy.isShowcase == true) DDK.easy.Showcase.initBriefVideo();//初始化影片的播放功能
	}
	,
	Showcase : {
		init : function (){
			DDK.easy.Showcase.duplicateTreeMenu();//將PC 版的內容複製到手機版
			DDK.easy.Showcase.initTreeMenu();//僅對Pc 版執行功能的初始化
			/*
			//功能移除
			DDK.easy.Showcase.initShowcaseVideos();
			DDK.mutual.fotoCaptain.add({
				preload : true,
				update : true,
				contenter : 'figure',
				imageList : $('.contentBrief .ctx figure img'),
				formatter : 'shrink'
			});//若圖檔包含在任何套件內,則在套件初始化之後呼叫
			*/
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
				slidesToShow:1 , 
				swipe:true , 
				fade:false,
				dots: true,
				dotsClass: 'contentBrief-dots',
				responsive:[]
			};
			
			
			$('.contentBrief .slickPlugIn').on('init' , profileInit);
			$('.contentBrief .slickPlugIn').on('beforeChange' , profileBeforeChange);
			$('.contentBrief .slickPlugIn').on('afterChange' , profileAfterChange);
			$('.contentBrief .slickPlugIn').slick(profile);
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
		,
		initTreeMenu : function (){
			var li_ary = $('.treeMenu').not('.treeMenu.rwd').find(' > ol > li');
			var btnAction = function (e){
				var _t = e.currentTarget;
				var _li = DDK.parentElement(_t , 'LI');
				if($(_li).hasClass('open') == false){
					$(_li).addClass('open');
				} else {
					$(_li).removeClass('open');
				}
			};
			for(var i = 0;i<li_ary.length;i++){
				if($(li_ary[i]).find(' > button').length > 0) FxAddEventListener($(li_ary[i]).find(' > button')[0] , 'click' , btnAction , false);
			}
		}
		,
		duplicateTreeMenu : function(){
			$('.treeMenu.rwd').append($('.treeMenu').not('.treeMenu.rwd').children().clone());
			$('.treeMenu.rwd').find(' > ol').attr('class' , 'toBreakChildren when-2-4');//插入產生折行的<br>
			$('.treeMenu.rwd').append('<div class="clearFloat"></div>');
			var li_ary = $('.treeMenu.rwd').find(' > ol > li');
			var _h4;
			for(var i = 0;i<li_ary.length;i++){
				if($(li_ary[i]).find('button').length > 0){
					_h4 = document.createElement('H4');
					$(li_ary[i]).prepend(_h4);
					$(_h4).append($(li_ary[i]).find('button span'));//將原本當作開啟關閉按鈕的<button type="button"><span></span></button> 結構置換
					$(li_ary[i]).find('button').remove();
				}
				if($(li_ary[i]).hasClass('alone') == true){
					$(li_ary[i]).find('a').prepend($(document.createElement('STRONG')).html('&nbsp;'));
				}
			}
			DDK.mutual.insertListFix($('nav.treeMenu.rwd'));
			$('<br class="clearFloat break-all">').insertBefore($('.treeMenu.rwd').find(' > ol > li.alone').eq(0));
			var tmp = $('.treeMenu.rwd').find(' > ol > li.alone').eq(0).index();
			var tmp_ary = $('.treeMenu.rwd').find(' > ol > .alone');
			for(var i = 1;i<tmp_ary.length;i+=2){
				$('<br class="clearFloat break-half">').insertAfter(tmp_ary[i]);//手動插入產生折行的<br>
			}
			tmp_ary = $('.treeMenu.rwd').find(' > ol > *');
			for(var i = 0;i<tmp_ary.length;i++){
				if($(tmp_ary[i]).index() > tmp && $(tmp_ary[i]).hasClass('break-4') == true) $(tmp_ary[i]).remove();
			}
		}
	}
	,
	Faq : {
		init : function (){
			if($('.faqTab ul li').not('li.more').length > 0){
				DDK.easy.Faq.initFaqTab();
				DDK.easy.Faq.initFaqTabBySelect();
				DDK.easy.Faq.initFaqList();
				DDK.easy.Faq.guideToQuiz();
			}
		}
		,
		switchFaq : function (index){
			var li_ary = $('.faqTab ul li').not('li.more');
			var dl_ary = $('.faqList dl');
			$(li_ary).removeClass('open');
			$(dl_ary).removeClass('open');
			$(li_ary).eq(index).addClass('open');
			$(dl_ary).eq(index).addClass('open');
		}
		,
		initFaqTabBySelect : function (){
			var li_ary = $('.faqTab ul li').not('li.more');
			var _select = $('.faqTab ul li.more > select')[0];
			var tmpE;
			var tabChange = function (e){
				if(e.currentTarget.value != 'none') DDK.easy.Faq.switchFaq(Number(e.currentTarget.value));
			}
			$(_select).find('option').val('none');
			for(var i = 0;i<li_ary.length;i++){
				tmpE = document.createElement('OPTION');
				$(tmpE).text($(li_ary[i]).find('h3 > span').text()).val(i);
				$(_select).append(tmpE);
			}
			FxAddEventListener(_select , 'change' , tabChange , false);
		}
		,
		initFaqTab : function (){
			var li_ary = $('.faqTab ul li').not('li.more');
			var _btn;
			var tabChange = function (e){
				var _t = e.currentTarget;
				DDK.easy.Faq.switchFaq(Number($(_t).attr('data-index')));
				
			};
			for(var i = 0;i<li_ary.length;i++){
				var _btn = $(li_ary[i]).find('button')[0];
				$(_btn).attr('data-index' , i);
				FxAddEventListener(_btn , 'click' , tabChange , false);
			}
		}
		,
		initFaqList : function (){
			var dl_ary = $('.faqList dl');
			var dt_ary = $('.faqList dl dt');
			var dl , hash , _a;
			DDK.insertTableFloatFix($('.faqList dl dd .text'));
			var openContent = function (e){
				FxEventObject(e).overwriteDefault();
				var _t = e.currentTarget;
				var _dt = DDK.parentElement(_t , 'DT');
				var _dl = DDK.parentElement(_t , 'DL');
				var _dd = $(_dl).children().eq($(_dt).index() + 1);
				if($(_dd).hasClass('open') == false){
					$(_dt).addClass('open');
					$(_dd).addClass('open');
				} else {
					$(_dt).removeClass('open');
					$(_dd).removeClass('open');
				}
				location.hash = $(_t).attr('href');
			}
			for(var i = 0;i<dt_ary.length;i++){
				_a = $(dt_ary[i]).find('a')[0];
				dl = DDK.parentElement(_a , 'DL');
				hash = $(_a).attr('href');
				hash = hash.substring(1 , hash.length);
				$(_a).attr('href' , '#G' + $(dl).find(' > a').attr('name') + '/Q' + hash);
				FxAddEventListener(_a , 'click' , openContent , false);
			}
		}
		,
		guideToQuiz : function (){
			var li_ary = $('.faqTab ul li').not('li.more');
			var dl_ary = $('.faqList dl');
			var _hash = location.href;
			var groupIndex , quizIndex , tmp;
			if(_hash.indexOf('#') == -1) return;//中斷,沒有快捷參數
			_hash = _hash.substring(_hash.indexOf('#') + 1 , _hash.length);
			tmp = _hash.split('/');
			if(tmp.length > 2) return;//中斷,沒有到第三層
			groupIndex = tmp[0];
			groupIndex = Number(groupIndex.substring(1 , groupIndex.length));
			quizIndex = tmp[1];
			quizIndex = Number(quizIndex.substring(1 , quizIndex.length));
			if(groupIndex > li_ary.length) return;//中斷,超過問題群組數
			if(quizIndex > $(dl_ary[groupIndex]).find('dt').length) return;//中斷,超過對應群組問題總數
			$(li_ary).removeClass('open');
			$(li_ary[groupIndex]).addClass('open');
			$('.faqTab ul li.more select').prop('selectedIndex' , groupIndex + 1);
			$(dl_ary).removeClass('open');
			$(dl_ary[groupIndex]).addClass('open');
			$(dl_ary[groupIndex]).find('dt').eq(quizIndex).addClass('open');//問題
			$(dl_ary[groupIndex]).find('dt').eq(quizIndex).next().addClass('open');//問題內容
			$('html, body').stop().animate({scrollTop:$(dl_ary[groupIndex]).find('dt').eq(quizIndex).offset().top}, 700, 'easeOutQuart', function(){
			});
			console.log(groupIndex);
			console.log(quizIndex);
		}
	}
	,
	Witness : {
		init : function (){
			if($('.witnessList ul li').length > 0) {
				//DDK.mutual.insertListFix($('.witnessList'));
				DDK.mutual.fotoCaptain.add({
					preload : true,
					update : true,
					contenter : 'strong',
					imageList : $('.witnessList ul li a strong img'),
					formatter : 'shrink'
				});//若圖檔包含在任何套件內,則在套件初始化之後呼叫
			}
		}
	}
};

$(document).ready(DDK.easy.init);