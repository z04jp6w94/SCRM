DDK.expe = {
	init : function (){
		if($('.expList ul li').length > 0) {
			//DDK.mutual.insertListFix($('.expList'));
			DDK.mutual.fotoCaptain.add({
				preload : true,
				update : true,
				contenter : 'strong',
				imageList : $('.expList ul li a strong img'),
				formatter : 'shrink'
			});//若圖檔包含在任何套件內,則在套件初始化之後呼叫
		}
	}
};
$(document).ready(DDK.expe.init);