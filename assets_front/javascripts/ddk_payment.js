DDK.payment = {
	init : function (){
		//if($('.useCash').length > 0 && $('.usePoints').length > 0) DDK.payment.initCashPointsSwitch();
	}
	,
	initCashPointsSwitch : function (){
		var doSwitch = function (e){
			//data-mode
			var _t = e.currentTarget;
			var mode = $(_t).attr('data-mode');
			if(mode == 'cash'){
				if($(_t).prop('checked') == true){
					$('.useCash .sideOptions').addClass('open');
					$('.useCash .sideOptions input').prop('disabled' , false);
				}	
			} else if(mode == 'points'){
				if($(_t).prop('checked') == true){
					$('.useCash .sideOptions').removeClass('open');
					$('.useCash .sideOptions input').prop('disabled' , true);
				}
			}
		};
		var switchCreditPoints = function (e){
			var _t = e.currentTarget;
			$('.useCash .sideOptions label').removeClass('checked');
			$(_t.parentElement).addClass('checked');
		};
		FxAddEventListener($('.useCash > label > input')[0] , 'change' , doSwitch , false);
		FxAddEventListener($('.usePoints > label > input')[0] , 'change' , doSwitch , false);
		$('.useCash .sideOptions input').each(function (){
			FxAddEventListener(this , 'change' , switchCreditPoints , false);
			if($(this).prop('checked') == true) $(this.parentElement).addClass('checked');
		});

	}
};
$(document).ready(DDK.payment.init);