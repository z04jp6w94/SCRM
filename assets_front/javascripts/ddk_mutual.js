DDK.mutual = {
	ytApiReady : false/*youtube iframe API 是否就緒*/,
	ytPlayers_obj : {}/*儲存透過youTube API 產生的player 的參照{youTube ID String:youTube player reference}*/,
	init : function (){
		if(DDK.isRwd == true || DDK.isMobile == true){
			DDK.mutual.initSearchTool();//手持裝置的搜尋功能需要兩段式開啟
			DDK.mutual.initRwdMenu();//手持裝置的網站主選單
			if($('.rwdAccordionTrigger').length > 0) DDK.mutual.initAccordionContent('.rwdAccordionTrigger[data-group]');//只初始化手持裝置使用的部分
		} else {
		}
		if($('.grandBanner .ctx').length > 0) {
			DDK.mutual.initGrandBanner();
			DDK.mutual.fotoCaptain.add({
				preload : true,
				update : true,
				contenter : 'figure',
				imageList : $('.grandBanner .ctx figure img'),
				formatter : 'shrink'
			});//若圖檔包含在任何套件內,則在套件初始化之後呼叫
		}
		if($('.examsFly').length > 0) DDK.mutual.initExamsFly();
		
		//if($('.actions .setToBuy').length > 0) DDK.mutual.initSetToBuy();
		
		DDK.mutual.insertListFix($('footer .siteMap'));
		
		//註冊會使用到的click/touch Event begin
		DDK.mutual.uiWindowOverlap.registLapClickEvent({
			behaviorName:'forRwdSearch'/*RWD 搜尋功能控制*/ , 
			replaced:false , 
			work:function(e){
				DDK.mutual.useSearchTool(false);//關閉RWD 版本的搜尋功能
			}
		});
		//註冊會使用到的click/touch Event end
		
		//設定回頁頂功能 begin
		if($('.goTop').length > 0){
			FxAddEventListener($('.goTop')[0] , 'click' , function (e){
				e = FxEventObject(e).overwriteDefault();
				var _body = $('html, body');
				_body.stop().animate({scrollTop:0}, '500', 'swing', function() { 
				   //
				});
			} , false);
		}
		//設定回頁頂功能 end
		
	}
	,
	initGrandBanner : function (){
		var autoPlay = Boolean(Number($('.grandBanner').attr('data-loop')));
		var playSpeed = Number($('.grandBanner').attr('data-loopinterval'));
		var profileBeforeChange = function (e, slick, direction){//direction > 0:slide to left or 1:slide to right
			//console.log('BeforeChange:' + slick.slickCurrentSlide());
			var _t = e.target;
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
			prevArrow:'.grandBanner .controls .prev' , 
			nextArrow:'.grandBanner .controls .next'  , 
			autoplay:false , 
			autoplaySpeed:1800 , 
			adaptiveHeight:false,
			/*centerPadding:'15px' , */
			slidesToShow:1 , 
			swipe:false , 
			fade:true,
			dots: true,
			dotsClass: 'grandBanner-dots',
			responsive:[]
		};
		
		profile.responsive.push({
			breakpoint: 736,/*螢幕最寬邊低於640者*/
			settings: {
				fade:false,
				swipe:true,
				dots: true,
				dotsClass: 'grandBanner-dots'
			}
		});
		if(autoPlay == true){
			profile.autoplay = autoPlay;
			profile.autoplaySpeed = playSpeed;
			profile.responsive[0].autoplay = autoPlay;
			profile.responsive[0].autoplaySpeed = playSpeed;
		}
		$('.grandBanner .slickPlugIn').on('init' , profileInit);
		$('.grandBanner .slickPlugIn').on('beforeChange' , profileBeforeChange);
		$('.grandBanner .slickPlugIn').on('afterChange' , profileAfterChange);
		$('.grandBanner .slickPlugIn').slick(profile);
		//
		

	}
	,
	initSetToBuy : function (){
		var _ary = $('.actions .setToBuy');
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
	,
	/**
	在LI間加入<br>確保LI 能在指定的數量後折行
	*/
	insertListFix : function (parentNode){
		if($(parentNode).find('.toBreakChildren').length == 0) return;
		var _ary = $(parentNode).find('.toBreakChildren');
		var breakParent , breakProp , li_ary , _li;
		var count;
		for(var i = 0;i<_ary.length;i++){
			count = 0;
			breakParent = _ary[i];
			breakProp = $(breakParent).attr('class').split(' ');
			breakProp = breakProp[breakProp.length - 1].split('-');
			breakProp.shift();//移除第一個無用元素
			//console.log(breakProp)
			li_ary = $(breakParent).find('> *');//取第一層所有子元素
			for(var j = 0;j<li_ary.length;j++){
				count += 1;
				_li = li_ary[j];
				for(var k = 0;k<breakProp.length;k++){
					if(count % Number(breakProp[k]) == 0) $($(document.createElement('BR')).attr('class' , 'clearFloat break-' + breakProp[k])).insertAfter(_li);
				}
			}
		}
	}
	,
	playVideoKv : function (_t , videoKey){
		var _video = $(_t.parentElement).find('.video')[0];
		var currentId = DDK.findYouTubeIdByUrl($(_t).attr('href'));
		var _ctx , _youId;
		var isPlay = true;
		//if(Boolean(Number($('.grandBanner').attr('data-slick-pause'))) == true) isPlay = false;
		//console.log(Boolean(Number($('.grandBanner').attr('data-slick-pause'))) + ' , ' + isPlay)
		if(DDK.mutual.ytPlayer(videoKey , currentId) == null){//尚未產生實體的youTube 影片
			DDK.mutual.ytPlayer(
				videoKey , 
				currentId , 
				DDK.mutual.buildYouTubeVideo(
					_video , 
					{id:currentId , width:'100%' , height:'100%' , autoplay:isPlay/*由slick 是否停止決定自動撥放*/ , loop:false}
				)
			);//儲存youTube API 產生的player 參照
			
		} else {//產生實體的youTube 影片
			DDK.mutual.ytPlayer(videoKey , currentId).stopVideo();
			DDK.mutual.ytPlayer(videoKey , currentId).playVideo();			
		}
		_ctx = _t.parentElement;//取得當下的容器
		$(_ctx).addClass('videoOpen');//影片封面,影片預覽,影片開始按鈕關閉
	}
	,
	pauseVideoKv : function (_t , videoKey){
		var _video = $(_t.parentElement).find('.video')[0];
		var currentId = DDK.findYouTubeIdByUrl($(_t).attr('href'));
		//console.log(DDK.mutual.ytPlayers_obj[videoKey + currentId])
		if(DDK.mutual.ytPlayer(videoKey , currentId) != null) {
			DDK.mutual.ytPlayer(videoKey , currentId).pauseVideo();//暫停已經產生且可能撥放中的影片,其餘不予理會
		}
	}
	,
	youTubePlayerStateChange : function(e){
		//-1 (unstarted) , 0 (ended) , 1 (playing) , 2 (paused) , 3 (buffering) , 5 (video cued)
		//console.log(e.target.getIframe().parentElement);
		var code = e.data;
		var _video = e.target.getIframe().parentElement;
		var tmp;
		/*
		if(code == 3 && Boolean(Number($('.grandBanner').attr('data-slick-pause'))) == true){
			$(_video).attr('data-is-pause' , '1');
			$(_video).attr('data-is-end' , '0');
			return;
		}
		if(code == 1 || code == 3 || code == 2){
			tmp = '暫停slick';
			$(DDK.mutual.grandBannerPath).slick('slickPause');//暫停slick
		} else if(code == 0){
			tmp = '繼續slick';
			$(_video.parentElement).removeClass('videoOpen');
			$(DDK.mutual.grandBannerPath).slick('slickPlay');//繼續slick
		}
		if(code == 0){
			$(_video).attr('data-is-end' , '1');
			$(_video).attr('data-is-pause' , '0');
		}
		if(code == 1){
			$(_video).attr('data-is-pause' , '0');
			$(_video).attr('data-is-end' , '0');
		}
		if(code == 2){
			$(_video).attr('data-is-pause' , '1');
			$(_video).attr('data-is-end' , '0');
		}
		*/
		//console.log(new Date().toString() + ' code = ' + code + ' , slick = ' + tmp);
	}
	,
	/**
	一次只產生一個
	*/
	buildYouTubeVideo : function (_contenter , setting){//seeting
		var _div = $(_contenter).find('div')[0];
		var yProp = {
			width:setting.width , 
			height:setting.heigth , 
			videoId:setting.id , 
			events:{
				'onReady': function (e){
					if(setting.autoplay == true) {
						e.target.playVideo();
					} else {//初始化後強制暫停,用於grand banner 第一則是影片且此時往頁需自動向下捲動時
						//console.log('ok');
						//$(e.target.getIframe().parentElement).attr('data-is-pause' , '1');
						e.target.pauseVideo();
					}
				}
				,
				'onStateChange': DDK.mutual.youTubePlayerStateChange
			}
			,
			playerVars: {'rel': 0 , 'controls':1}//playlist
		};
		//if(setting.autoplay == true) yProp.playerVars.autoplay = 1;
		if(setting.loop == true) {
			yProp.playerVars.loop = 1;
			yProp.playerVars.playlist = setting.id;
		}
		var ok = new YT.Player(_div, yProp);
		return ok;
	}
	,
	/**
	key_str:任意的辨識字串,避免一個網頁內有相同的影片透過youTube API 產生後,只以youTube Id 無法找回正確的影片reference
	_id:youTube Video Id 字串
	ytReference:透過youTube API 產生的youTube Video 實體參照
	*/
	ytPlayer : function (key_str , _id , ytReference){
		if(!ytReference){//取出有註冊的youTube API 產生的player
			//console.log(key_str + _id + ' = ' + DDK.mutual.ytPlayers_obj[key_str + _id]);
			//console.log(DDK.mutual.ytPlayers_obj[key_str + _id] == undefined);
			if(DDK.mutual.ytPlayers_obj[key_str + _id]){// && DDK.mutual.ytPlayers_obj[key_str + _id] != 'undefined'
				return DDK.mutual.ytPlayers_obj[key_str + _id];
			} else {
				return null;
			}
			
		} else {//註冊youTube API 產生的player
			if(!DDK.mutual.ytPlayers_obj[key_str + _id]){
				DDK.mutual.ytPlayers_obj[key_str + _id] = ytReference;
			} else {
				return null;
			}
		}
		//ytPlayers_obj
	}
	,
	initSearchTool : function (){//功能只於手持裝置時作動
		//'.search .openSearch' '.search .doSearch' '.links .rwdMenuBtn'
		FxAddEventListener($('.search .openSearch')[0] , 'click' , function (e){
			if($(e.currentTarget).hasClass('close') == false){
				DDK.mutual.useSearchTool(true);
			} else {
				DDK.mutual.useSearchTool(false);
			}
		} , false);
	}
	,
	useSearchTool : function (_cmd){//功能只於手持裝置時作動
		if(_cmd == true){
			$('.search , .search .doSearch').addClass('open');
			$('.search .openSearch , .links .rwdMenuBtn').addClass('close');
			$('.search input[type="text"]')[0].focus();
			$('body').addClass('ui-flow-stopper-locked');
			DDK.mutual.uiWindowOverlap.overlap('forRwdSearch');
		} else {
			$('.search , .search .doSearch').removeClass('open');
			$('.search .openSearch , .links .rwdMenuBtn').removeClass('close');
			$('body').removeClass('ui-flow-stopper-locked');
			DDK.mutual.uiWindowOverlap.nonOverlap('forRwdSearch');
		}
		//$('body').addClass('ui-flow-stopper-locked');
		//DDK.mutual.uiWindowOverlap.overlap('forRwdSearch');
	}
	,
	initRwdMenu : function (){
		var onFadeEnd = function (){
			$(this).removeAttr('style');
		};
		var useRwdMenu = function (e){
			if($('header nav.rwd').hasClass('open') == false){
				$('header nav.rwd').addClass('open').hide().fadeIn({duration: 250,easing :'',complete:onFadeEnd});
			} else {
				$('header nav.rwd').removeClass('open').show().fadeOut({duration: 250,easing :'',complete:onFadeEnd});
			}
		};
		FxAddEventListener($('.links .rwdMenuBtn')[0] , 'click' , useRwdMenu , false);
		FxAddEventListener($('header nav.rwd .closeBtn')[0] , 'click' , useRwdMenu , false);
	}
	,
	/**
	管理將考試剩餘天數動畫
	*/
	initExamsFly : function (){
		$('.examsFly ul li .number').removeAttr('style').removeAttr('data-start');
		var onFadeIn = {
			duration : 2000,
			easing : 'easeOutBack',
			complete : function (){
				$(this).removeAttr('style');
				DDK.mutual.runExamsFly();
			}
		};
		if($('.examsFly ul li.open').length == 0){
			$('.examsFly ul li').eq(0).addClass('open');
			DDK.mutual.runExamsFly();
		} else if($('.examsFly ul li.open').length > 0 && $('.examsFly ul li.open').index() != $('.examsFly ul li').last().index()){
			$('.examsFly ul li.open').removeClass('open').next().addClass('open').hide().fadeIn(onFadeIn);
		} else if($('.examsFly ul li.open').length > 0 && $('.examsFly ul li.open').index() == $('.examsFly ul li').last().index()){
			$('.examsFly ul li.open').removeClass('open');
			$('.examsFly ul li').eq(0).addClass('open').hide().fadeIn(onFadeIn);
		}
		
	}
	,
	/**
	將考試剩餘天數動畫跑出
	*/
	runExamsFly : function (){
		var _li = $('.examsFly ul li.open')[0];
		var num_ary = $('.examsFly ul li.open .number');
		var excute_ary = [];
		var realNum;
		var run_stepNumber , stepNumber , stepIndex;
		var moveHeight = 57;
		for(var i = 0;i<num_ary.length;i++){
			$(num_ary[i]).attr('data-start' , '0');
			excute_ary.push({instance:num_ary[i] , times:Number(FxReplace($(num_ary[i]).attr('class').split(' ')[1] , 'd-' , '' , 'all'))});
		}
		stepIndex = excute_ary.length - 1;
		stepNumber = function (){
			var obj = excute_ary[stepIndex]
			var target = obj.instance;
			var times = obj.times
			var moveTimes = Number($(target).attr('data-start')) , chk = 0;
			if(moveTimes <= times){
				$(target).css({'background-position':'left ' + (moveTimes*moveHeight*-1) + 'px'});
				$(target).attr('data-start' , moveTimes + 1);
			} else {
				stepIndex -= 1;
			}
			if(stepIndex == -1) {
				clearInterval(run_stepNumber);
				setTimeout(DDK.mutual.initExamsFly , 1000 * 8);//重複啟動
			}
		}
		run_stepNumber = setInterval(stepNumber , 25);
	}
	,
	initAccordionContent : function (selector_str){
		var acc_ary = $(selector_str);
		var acc_ele = $(acc_ary).eq(0).prop('tagName');
		var groups_ary = [];
		var chk , groupName;
		for(var i = 0;i<acc_ary.length;i++){
			chk = false;
			groupName = $(acc_ary[i]).attr('data-group');
			//console.log(groupName);
			for(var j = 0;j<groups_ary.length;j++){
				if(groups_ary[j] == groupName){
					chk = true;//重複
					break;
				}
			}
			if(chk == false) groups_ary.push(groupName);
		}
		//console.log(groups_ary);
		var accLabelDo = function (e){
			var _t = e.currentTarget;
			var wrapper_ele = DDK.parentElement(_t , $(e.currentTarget).attr('data-wrapper'));
			var label_ele = $(wrapper_ele).find($(e.currentTarget).attr('data-label'))[0];
			var ctx_ele = $(wrapper_ele).find($(e.currentTarget).attr('data-ctx'))[0];
			var all_ary = $($(e.currentTarget).prop('tagName') + '[data-group="' + $(e.currentTarget).attr('data-group') + '"]');
			var groupOthers_ele;
			var slideUp_options = {
				duration : 300,
				easing:'easeInQuart',
				complete:function (){
					$(this).removeAttr('style');
				}
			};
			var slideDown_options = {
				easing:'easeOutQuart',
				complete:function (){
					$(this).removeAttr('style');
				}
			};
			if($(label_ele).hasClass('open') == true) {
				$(wrapper_ele).find($(e.currentTarget).attr('data-label')).removeClass('open');
				$(wrapper_ele).find($(e.currentTarget).attr('data-ctx')).removeClass('open').show().slideUp(slideUp_options);;				
			} else {
				for(var i = 0;i<all_ary.length;i++){
					groupOthers_ele = DDK.parentElement(all_ary[i] , $(e.currentTarget).attr('data-wrapper'));
					if($(groupOthers_ele).find('.accordionTrigger')[0] != e.currentTarget){//不是目前這個項目
						//console.log(groupOthers_ele);
						if($(groupOthers_ele).find($(e.currentTarget).attr('data-label')).hasClass('open') == true){
							$(groupOthers_ele).find($(e.currentTarget).attr('data-label')).removeClass('open');
						}
						if($(groupOthers_ele).find($(e.currentTarget).attr('data-ctx')).hasClass('open') == true) {
							$(groupOthers_ele).find($(e.currentTarget).attr('data-ctx')).removeClass('open').show().slideUp(slideUp_options);
						}
					}
				}
				$(label_ele).addClass('open');
				$(ctx_ele).addClass('open').hide().slideDown(slideDown_options);
			}
			//console.log(wrapper_ele);
			//console.log(label_ele);
			//console.log(ctx_ele);
		};
		for(var i = 0;i<groups_ary.length;i++){
			groupName = groups_ary[i];
			acc_ary = $(acc_ele + '[data-group="' + groupName + '"]');
			//console.log(acc_ary[0]);
			for(var j = 0;j<acc_ary.length;j++){
				//console.log(acc_ary[j]);
				FxAddEventListener(acc_ary[j] , 'click' , accLabelDo , false);
			}
			
			//label_ele = 
		}
	}
	,
	/**
	初始化網頁常見社群網站分享按鈕功能
	*/
	initSocialShare : function (_target){
		var openOut = function (url,name,iWidth,iHeight){
			var iTop = (window.screen.availHeight-30-iHeight)/2;
			var iLeft = (window.screen.availWidth-10-iWidth)/2;
			window.open(url,name,'height='+iHeight+',width='+iWidth+',top='+iTop+',left='+iLeft+',status=no,location=no,status=no,menubar=no,toolbar=no,resizable=no,scrollbars=no');
		};
		var shareOut = function (_site , _url){
			var popWin = _site + '_go';
			switch(_site){
				case 'facebook':
					openOut('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(_url),popWin,580,400);
				break;
				case 'google+':
					openOut('https://plus.google.com/share?url='+encodeURIComponent(_url),popWin,580,400);
				break;
				case 'twitter':
					openOut('http://www.twitter.com/share?url='+encodeURIComponent(_url)+'&text='+encodeURIComponent(document.title),popWin,580,400);
				break;
				case 'plurk':
					openOut('http://www.plurk.com/?qualifier=shares&amp;status=' .concat(encodeURIComponent(_url)) .concat(' ') .concat('(') .concat(encodeURIComponent(document.title)) .concat(')'),popWin,580,400);
				break;
				case 'sina':
					openOut('http://v.t.sina.com.cn/share/share.php?url='+encodeURIComponent(_url)+'&title='+encodeURIComponent(document.title),popWin,580,400);
				break;
				case 'line':
					openOut('https://lineit.line.me/share/ui?url='+encodeURIComponent(_url),popWin,580,400);
				break;
			}
		}
		
		var _ary = $(_target).find('.facebook , .google+ , .twitter , .plurk , .sina , .line');//<A>
		for(var i = 0;i<_ary.length;i++){
			FxAddEventListener(_ary[i] , 'click' , function (e){FxEventObject(e).overwriteDefault();shareOut($(e.currentTarget).attr('class').split(' ')[1] , $(e.currentTarget).attr('href'));} , false);
		}
		
	}
};
/**
處理需要預載與載入後以及視窗變形旋轉時需更新尺寸的圖檔
*/
DDK.mutual.fotoCaptain = {
	isActive : false,
	queue_ary : [],
	/**
	{
		preload : true/false,
		update : true/false,
		contenter : '',
		imageList : []/jq,
		formatter : function/String:shrink/scale
	}
	*/
	add : function (prop){
		prop.contenterPath = DDK.mutual.fotoCaptain.findContenter(prop.imageList[0] , prop.contenter);
		if(prop.formatter == 'shrink'){
			prop.formatter = DDK.mutual.fotoCaptain.shrinkFormatter;
		} else if(prop.formatter == 'scale'){
			prop.formatter = DDK.mutual.fotoCaptain.scaleFormatter;
		} else {
			//使用傳入的原始資料作為formatter
		}
		if(prop.preload == true){//執行預載
			FxCheckMultiImgLoad({
				img_ary : prop.imageList , 
				interval : 'on load call ' + prop.contenter , 
				delay : 50 /* 檢查頻率建議50毫秒,預設也是50毫秒 */, 
				eachEnd : function (img){
					var ctx = img[prop.contenterPath];
					prop.formatter(img , ctx);
					if($(ctx).hasClass('preloadImg') == true) $(ctx).removeClass('preloadImg');//移除預載畫面
				} , 
				end : function (){
					//alert('檢查完成');
				}
			})();
		}
		if(prop.update == true){//保存為更新項目
			DDK.mutual.fotoCaptain.queue_ary.push(prop);
		}
		
		if(DDK.mutual.fotoCaptain.isActive == false){
			if(DDK.isRwd == true || DDK.isMobile == true){
				FxAddEventListener(window , DDK.orientationEvent.u , DDK.mutual.fotoCaptain.updateAllSizeFix , false);
			} else {
				FxAddEventListener(window , 'resize' , DDK.mutual.fotoCaptain.updateAllSizeFix , false);
			}
			DDK.mutual.fotoCaptain.updateAllSizeFix();
			DDK.mutual.fotoCaptain.isActive = true;
		}
		//console.log(prop);
	}
	,
	/**
	持續更新
	*/
	updateAllSizeFix : function (){
		var run_ok;
		var ok = function (){//略為延後處理
			clearInterval(run_ok);
			//更新各類尺寸的函數
			var img_ary , formatter , contenterPath , img , ctx;
			for(var i = 0;i<DDK.mutual.fotoCaptain.queue_ary.length;i++){
				formatter = DDK.mutual.fotoCaptain.queue_ary[i].formatter;
				img_ary = DDK.mutual.fotoCaptain.queue_ary[i].imageList;
				contenterPath = DDK.mutual.fotoCaptain.queue_ary[i].contenterPath;
				//console.log(DDK.mutual.fotoCaptain.queue_ary[i])
				for(var j = 0;j<img_ary.length;j++){
					img = img_ary[j];
					ctx = img[contenterPath];
					if(img.complete == true) {//確認圖檔有下載,執行圖檔變更尺寸
						$(img).css({'margin-top':'auto' , 'margin-left':'auto' , 'width':'auto' , 'height':'auto'});//先重設尺寸
						formatter(img , ctx);//圖檔變更尺寸
					}
				}
			}
		};
		run_ok = setInterval(ok , 100);
	}
	,
	/**
	以標籤名稱或Class 名稱往圖檔的上層尋找作為指定容器的參考節點,最終回傳一個自圖檔往上尋找到容器的路徑字串.
	currentElement : DOM Element|img 參照
	target : String|標籤名稱或Class 名稱
	*/
	findContenter : function (currentElement , target){
		var path = '';
		var _p = currentElement;
		var refer = {type:'' , clue:''};
		if(target.charAt(0) == '.'){
			refer.type = 'CLASS';
			refer.clue = target.substring(1 , target.length);
		} else {
			refer.type = 'TAG';
			refer.clue = target.toUpperCase();
		}
		for(var i = 0;;i++){
			if(refer.type == 'CLASS'){
				if($(_p).hasClass(refer.clue) == true){
					break;
				} else {
					_p = _p['parentElement'];//參照往上一層尋找
					path += '.parentElement';
				}
				if(_p.tagName.toUpperCase() == 'HTML'){
					//視為尋找失敗
					path = 'undefined';
					break;
				}
			} else if(refer.type == 'TAG'){
				if(_p.tagName.toUpperCase() == refer.clue){
					break;
				} else {
					_p = _p['parentElement'];//參照往上一層尋找
					path += '.parentElement';
				}
				if(_p.tagName.toUpperCase() == 'HTML'){
					//視為尋找失敗
					path = 'undefined';
					break;
				}
			}
		}
		if(path.charAt(0) == '.') path = path.substring(1 , path.length);//找到後移除第一個"."
		return path;
	}
	,
	/**
	預設格式化公式,等比縮放填滿
	*/
	shrinkFormatter : function (img , ctx){
		var _adj = FxImgShrinkToRect($(ctx).width() , $(ctx).height() , $(img).width() , $(img).height());
		$(img).css({'margin-top': + _adj[0] + 'px' , 'margin-left': + _adj[1] + 'px' , 'width': + _adj[2] + 'px' , 'height': + _adj[3] + 'px'});
	}
	,
	/**
	預設格式化公式,等比內縮填滿
	*/
	scaleFormatter : function (img , ctx){
		var _adj = FxImgScaleToRect($(ctx).width() , $(ctx).height() , $(img).width() , $(img).height());
		$(img).css({'margin-top': + _adj[0] + 'px' , 'margin-left': + _adj[1] + 'px' , 'width': + _adj[2] + 'px' , 'height': + _adj[3] + 'px'});
	}
};
$(document).ready(DDK.mutual.init);


DDK.mutual.uiWindowOverlap = {
	/**
	覆蓋網頁的黑色半透明組件
	*/
	lapName : '.blackCover'/*黑色半透明組件的CSS 名稱*/,
	lapedHandler : {}/*當覆蓋時的滑鼠/手勢觸碰事件暫存器*/,
	isBindEvent : false/*是否已經執行事件綁定*/,
	/**
	啟動覆蓋
	behaviorClass : String 覆蓋任務的CSS Class 名稱
	*/
	overlap : function (behaviorClass){
		if($(DDK.mutual.uiWindowOverlap.lapName).hasClass(behaviorClass) == false) {
			$(DDK.mutual.uiWindowOverlap.lapName).addClass(behaviorClass);
			if(DDK.mutual.uiWindowOverlap.isBindEvent == false){
				FxAddEventListener($(DDK.mutual.uiWindowOverlap.lapName)[0] , 'click' , DDK.mutual.uiWindowOverlap.lapClickEvent , false);
				DDK.mutual.uiWindowOverlap.isBindEvent = true;
			}
		}
	}
	,
	/**
	關閉覆蓋
	behaviorClass : String 覆蓋任務的CSS Class 名稱
	*/
	nonOverlap : function (behaviorClass){
		if($(DDK.mutual.uiWindowOverlap.lapName).hasClass(behaviorClass) == true) {
			$(DDK.mutual.uiWindowOverlap.lapName).removeClass(behaviorClass);
			if($(DDK.mutual.uiWindowOverlap.lapName).attr('class').split(' ').length == 1 && DDK.mutual.uiWindowOverlap.isBindEvent == true){//沒有殘留任何待觸發的事件時
				FxRemoveEventListener($(DDK.mutual.uiWindowOverlap.lapName)[0] , 'click' , DDK.mutual.uiWindowOverlap.lapClickEvent , false);
				DDK.mutual.uiWindowOverlap.isBindEvent = false;
			}
		}
	}
	,
	/**
	註冊覆蓋時需要觸發的事件
	eObj : Object 事件包裹{behaviorName:String 事件名稱 , replaced:Boolean 是否取代已經註冊的同名事件 , work:Function 事件函數,引數e : Event Object window 事件物件}
	*/
	registLapClickEvent : function (eObj){
		var _name = eObj.behaviorName;
		if(eObj.replaced && eObj.replaced == true){
			if(DDK.mutual.uiWindowOverlap.lapedHandler[_name]) DDK.mutual.uiWindowOverlap.lapedHandler[_name] = eObj;//覆蓋動態建立子物件
		} else {
			if(!DDK.mutual.uiWindowOverlap.lapedHandler[_name]) DDK.mutual.uiWindowOverlap.lapedHandler[_name] = eObj;//動態建立子物件
		}
		//console.log(DDK.mutual.uiWindowOverlap.lapedHandler);
	}
	,
	/**
	當黑色半透明出現時，觸發"click" 事件時的事件
	*/
	lapClickEvent : function (e){
		FxEventObject(e).overwriteDefault();
		var helper = $(e.currentTarget).attr('class').split(' ');
		helper = helper[helper.length - 1];//取最後一個class 字串作為辨識命令 clas="forCart forFlowStopper" << 視為執行forFlowStopper
		if(DDK.mutual.uiWindowOverlap.lapedHandler[helper]){//如果有吻合字串的事件
			DDK.mutual.uiWindowOverlap.lapedHandler[helper].work(e);
		}
	}
};
//ddk_uiapi_flow_stopper.src.js
DDK.mutual.uiFlowStopper = {
	eventHolder : {}/*事件暫存器 , 以uiId 作為子物件名稱*/,
	init : function (_name , arg){
		var stopper/*stopper 的實體*/ , stopperCtx/*stopper 的容器實體*/ , btns , _uiId , _holder , throwBack/*擲回物件*/;
		_uiId = 'FlowStopper_' + String(new Date().getTime());
		stopper = DDK.mutual.uiFlowStopper.getStopperInstance(_name);
		stopperCtx = $('.ui-flow-stopper');
		$(stopper).attr('data-ui-id' , _uiId).hide();
		if(arg.firstText) {
			if(arg.firstText.text) $(stopper).find('h3 span').html(arg.firstText.text);
			if(arg.firstText.style) $(stopper).find('h3 span').attr('style' , arg.firstText.style);
		}
		if(arg.secondText) {
			if(arg.secondText.text) $(stopper).find('h4 span').html(arg.secondText.text);
			if(arg.secondText.style) $(stopper).find('h4 span').attr('style' , arg.secondText.style);
		} else {
			$(stopper).find('h4').remove();
		}
		if(arg.doneLabel) $(stopper).find('button.doneBtn span').text(arg.doneLabel);
		if(arg.deniedLabel) $(stopper).find('button.deniedBtn span').text(arg.deniedLabel);
		if(arg.thumbnail) $(stopper).find('figure').append(arg.thumbnail);
		throwBack = {//doneBtn 與deniedBtn 的click 事件擲回給DDK.uiAPI 的擲回值
			uiId : _uiId
		};
		_holder = DDK.mutual.uiFlowStopper.eventHolder[_uiId] = {
			uiId : _uiId,
			onAfterDone : function (e){//確定,關閉,回答是
				arg.uiAfterDone(throwBack);
			}
			,
			onAfterDenied : function (e){//回答拒絕
				arg.uiAfterDenied(throwBack);
			}
			,
			onBeforeAppear : function (){//出現前
				arg.uiBeforeAppear();
			}
			,
			onAfterAppear : function (){//出現後
				$(this).attr('style' , '');
				arg.uiAfterAppear();
			}
			,
			onBeforeRemove : function (){//出現前
				arg.uiBeforeRemove();
			}
			,
			onAfterRemove : function (){//出現後
				$(this).attr('style' , '');
				arg.uiAfterRemove();
			}
		};
		
		if(_name != 'Please Wait' && _name != 'Simple Confirm'){
			btns = $(stopper).find('button.doneBtn , button.closeBtn');
			FxAddEventListener(btns[0] , 'click' , _holder.onAfterDone , false);
			FxAddEventListener(btns[1] , 'click' , _holder.onAfterDone , false);
		} else if(_name == 'Simple Confirm'){
			btns = $(stopper).find('button.doneBtn , button.deniedBtn');
			FxAddEventListener(btns[0] , 'click' , _holder.onAfterDone , false);
			FxAddEventListener(btns[1] , 'click' , _holder.onAfterDenied , false);
		}
		
		_holder.onBeforeAppear();
		if($(stopperCtx).hasClass('open') == false){//畫面上未有現存的flow-stopper
			$('body').addClass('ui-flow-stopper-locked');
			$(stopperCtx).append(stopper).addClass('open').find('[data-ui-id="' + _uiId + '"]').fadeIn({complete : _holder.onAfterAppear});//stopper 實體fadeIn
			DDK.mutual.uiWindowOverlap.overlap('forFlowStopper');
		} else {
			$(stopperCtx).append(stopper).find('[data-ui-id="' + _uiId + '"]').delay(450).fadeIn({complete : _holder.onAfterAppear});
		}
		
		//console.log(DDK.mutual.uiFlowStopper.eventHolder);
	}
	,
	getStopperInstance : function (_name){
		var e = null;
		var path = '.UIComponent .copy';
		var obj = ' > article';
		switch(_name) {
			case 'Simple Alert':
				e = $(path + '.ui-alert' + obj).clone()[0];
				break;
			case 'Cart Alert':
				e = $(path + '.ui-alert-cart' + obj).clone()[0];
				break;
			case 'Gift Alert':
				e = $(path + '.ui-alert-gift' + obj).clone()[0];
				break;
			case 'Please Wait':
				e = $(path + '.ui-wait' + obj).clone()[0];
				break;
			case 'Simple Confirm':
				e = $(path + '.ui-confirm' + obj).clone()[0];
				break;
		}
		return e;
	}
	,
	currentStopperId : function (){
		return $($('.ui-flow-stopper').find('article')[0]).attr('data-ui-id');
	}
	,
	removeStopperInstance : function (uiId){
		var _holder = DDK.mutual.uiFlowStopper.eventHolder[uiId];
		var _target = $('.ui-flow-stopper article[data-ui-id="' + uiId + '"]');
		//_holder.onBeforeRemove();
		$(_target).fadeOut({
			duration : 400,
			/*easing: 'easeInQuad',*/
			complete : function(){
				$(_target).remove();
				_holder.onAfterRemove();
				if($('.ui-flow-stopper').find('article').length == 0){
					$('body').removeClass('ui-flow-stopper-locked');
					$('.ui-flow-stopper').removeClass('open');
					DDK.mutual.uiWindowOverlap.nonOverlap('forFlowStopper');
				}
			}
		});
		
	}
};

DDK.uiAPI = {
	queue_ary : [/*{beforeRemove:function(){console.log('殺以前');} , afterRemove:function(){console.log('殺以後');}}*/]/*等候執行序列*/,
	work : function (apiName , opts){
		var res_str = null;
		if(!apiName){
			res_str = '沒有給ui name 喔';
			return res_str;//中斷
		}
		if(!opts){
			res_str = '沒有給ui options 喔';
			return res_str;//中斷
		}
		var chk = false;
		var existing_ary = ['Simple Alert' , 'Cart Alert' , 'Gift Alert' , 'Please Wait' , 'Simple Confirm'];
		for(var i = 0;i<existing_ary.length;i++){
			if(apiName == existing_ary[i]){
				chk = true;
				res_str = '朕要給的﹐你不能逃 , ' + existing_ary[i] + ' 驅動';
				DDK.blert(res_str);
				break;
			}	
		}
		if(chk == false){
			res_str = '朕不給﹐你不能搶 , 檢查ui name 有無拼錯';
			return res_str;//中斷
		}
		
		return DDK.uiAPI.formatOptions(apiName , opts);
	}
	,
	formatOptions : function (apiName , opts){
		var res_str = null;
		if(apiName == 'Simple Alert' || apiName == 'Cart Alert' || apiName == 'Gift Alert' || apiName == 'Please Wait' || apiName == 'Simple Confirm'){
			if(apiName == 'Cart Alert' || apiName == 'Gift Alert'){
				if(!opts.thumbnail){
					res_str = opts.excute + ' 中斷 , 缺少商品照片原始碼或HTML DOM element';
					return res_str;
				} else {
					if(!opts.thumbnail.tagName){
						var tmp = document.createElement('IMG');
						tmp.src = opts.thumbnail;//建構為HTML DOM Object
						opts.thumbnail = $(tmp).clone();
					}
				}
			}
			if(!opts.action) {
				res_str = '中斷 ,  沒有action 指令';
				return res_str;
			}

			if(opts.action != 'appear' && opts.action != 'remove'){
				res_str = opts.action + ' 中斷 ,  不支援的參數';
				return res_str;
			}
			if(!opts.replaced) {
				opts.replaced = false;//預設值
			} else {
				if(typeof(opts.replaced) != 'boolean'){
					res_str = opts.replaced + ' 中斷 ,  必須是Boolean 值';
					return res_str;
				}
			}
			res_str = DDK.uiAPI.workWithFlowStopper(apiName , opts);//執行Flow Stopper 組件API
		}
		return res_str;//中斷
	}
	,
	workWithFlowStopper : function (name , opts){
		var res_str = null;
		var removeCurrentStopper = function (){
			var _uiId = DDK.mutual.uiFlowStopper.currentStopperId();
			DDK.mutual.uiFlowStopper.removeStopperInstance(_uiId);//刪除目前的FlowStopper
		};
		var removeCurrentStopperQueue = {
			function_ary : [
				[
					'replaced',
					function (){
						return true;
					}
				]
				,
				[
					'suicide',
					function (){
						return true;
					}
				]
			]
		};
		if(opts.action == 'appear'){//註冊顯示用的序列
			var uiAfterDone = opts.uiAfterDone = function (e){//由FlowStopper 內的組件的doneBtn 與closeBtn 呼叫
				if(opts.afterDone) opts.afterDone();
				var _uiId = e.uiId;
				DDK.uiAPI.apiAddNewQueue(function(){
					DDK.mutual.uiFlowStopper.removeStopperInstance(_uiId);//刪除吻合的FlowStopper
				} , removeCurrentStopperQueue);
				DDK.uiAPI.apiExcute();//執行
			};
			var uiAfterDenied = opts.uiAfterDenied = function (e){//由FlowStopper 內的組件的deniedBtn 呼叫
				if(opts.afterDenied) opts.afterDenied();
				var _uiId = e.uiId;
				DDK.uiAPI.apiAddNewQueue(function(){
					DDK.mutual.uiFlowStopper.removeStopperInstance(_uiId);//刪除吻合的FlowStopper
				} , removeCurrentStopperQueue);
				DDK.uiAPI.apiExcute();//執行
			};
			var uiBeforeAppear = opts.uiBeforeAppear = function (){//出現前
				if(opts.events) if(opts.events.beforeAppear) opts.events.beforeAppear();
			};
			var uiAfterAppear = opts.uiAfterAppear = function (){//出現後
				if(opts.events) if(opts.events.afterAppear) opts.events.afterAppear();
			};
			var uiBeforeRemove = opts.uiBeforeRemove = function (){//移除前
				if(opts.events) if(opts.events.beforeRemove) opts.events.beforeRemove();
			};
			var uiAfterRemove = opts.uiAfterRemove = function (){//移除後
				if(opts.events) if(opts.events.afterRemove) opts.events.afterRemove();
			};
			var funcObj = {
				function_ary : [
					['idd',{n : opts.firstText}]
					,
					['replaced',function (){return opts.replaced;}]
					,
					['suicide',function (){return false;}]
					,
					['beforeAppear',function (){uiBeforeAppear();}]
					,
					['afterAppear',function (){uiAfterAppear();}]
					,
					['beforeRemove',function (){uiBeforeRemove();}]
					,
					['afterRemove',function (){uiAfterRemove();}]
				]
			}
			if(opts.replaced && opts.replaced == true && DDK.uiAPI.queue_ary.length > 0){//當有指定移除前者並且不是第一個序列時
				//先刪除前一個序列 begin
				res_str = DDK.uiAPI.apiAddNewQueue(removeCurrentStopper , removeCurrentStopperQueue);
				DDK.blert(res_str);
				res_str = DDK.uiAPI.apiExcute();//執行新加入的序列
				//先刪除前一個序列 end
				//加入新的序列 begin
				res_str = DDK.uiAPI.apiAddNewQueue(function (){
					DDK.mutual.uiFlowStopper.init(name , opts);
				}
				,
				funcObj);
				DDK.blert(res_str);
				res_str = DDK.uiAPI.apiExcute();//執行新加入的序列
				//加入新的序列 end
			} else {
				//console.log(opts.replaced + ' , ' + opts.firstText);
				//加入新的序列 begin
				res_str = DDK.uiAPI.apiAddNewQueue(function (){
					DDK.mutual.uiFlowStopper.init(name , opts);
				}
				,
				funcObj);
				DDK.blert(res_str);
				res_str = DDK.uiAPI.apiExcute();//執行新加入的序列
				//加入新的序列 end
			}
		} else if(opts.action == 'remove'){//註冊移除用的序列
			res_str = DDK.uiAPI.apiAddNewQueue(removeCurrentStopper , removeCurrentStopperQueue);
			DDK.blert(res_str);
			res_str = DDK.uiAPI.apiExcute();//執行新加入的序列
		}
		
		return res_str;
	}
	,
	apiAddNewQueue : function (main_func , funcObj){
		var newQueue = {};
		if(main_func) newQueue.run = main_func;
		if(funcObj){//加入附加的函數
			for(var i = 0;i<funcObj.function_ary.length ; i++){
				newQueue[funcObj.function_ary[i][0]] = funcObj.function_ary[i][1];
			}
		}
		//console.log(newQueue);
		DDK.uiAPI.queue_ary.push(newQueue);
		return 'add new queue , existing queues = ' + DDK.uiAPI.queue_ary.length;
	}
	,
	apiExcute : function (){
		var funcObj , prevFuncObj;
		if(DDK.uiAPI.queue_ary.length == 1){
			funcObj = DDK.uiAPI.queue_ary[0];//目前要執行的第一個序列
			funcObj.run();
			if(!funcObj.replaced){//沒有取代設定時
				DDK.uiAPI.queue_ary.shift();//移除執行完的第一個序列
			} else if(funcObj.replaced && funcObj.replaced() == true){//有取代設定時且為true(取代)
				DDK.uiAPI.queue_ary.shift();//移除執行完的第一個序列
			} else if(funcObj.replaced && funcObj.replaced() == false){
				//不作任何事情
			}
		} else if(DDK.uiAPI.queue_ary.length > 1){
			funcObj = DDK.uiAPI.queue_ary[DDK.uiAPI.queue_ary.length - 1];//目前要執行的最後一個序列
			
			if(!funcObj.replaced){//沒有取代設定時
				funcObj.run();
				DDK.uiAPI.queue_ary.pop();//移除最後一個序列
			} else if(funcObj.replaced && funcObj.replaced() == true){//有取代設定時且為true(取代)
			
				prevFuncObj = DDK.uiAPI.queue_ary[DDK.uiAPI.queue_ary.length - 2];//取得目前的元素的前一個
				if(prevFuncObj.beforeRemove) prevFuncObj.beforeRemove();
				/*if(prevFuncObj.afterRemove){
					var whileRemove = function (){//暫存移除事件
						prevFuncObj.afterRemove();
					};
				}*/
				DDK.uiAPI.queue_ary.splice(DDK.uiAPI.queue_ary.length[DDK.uiAPI.queue_ary.length - 2] , 1);//移除目前的元素的前一個
				//whileRemove();//由flow-stopper 內的事件呼叫
				funcObj.run();
				if(funcObj.suicide && funcObj.suicide() == true){//是刪除指令
					DDK.uiAPI.queue_ary.pop();//移除最後一個序列
					if(DDK.uiAPI.queue_ary.length > 0) {//若序列中仍有可執行的序列
						DDK.uiAPI.queue_ary[0].run();//執行第一個序列
					}
				}
			} else if(funcObj.replaced && funcObj.replaced() == false){
				//不作任何事情
			}
		}
		//console.log(DDK.uiAPI.queue_ary);
		return 'a queue excute , rest queues = ' + DDK.uiAPI.queue_ary.length;
	}
};