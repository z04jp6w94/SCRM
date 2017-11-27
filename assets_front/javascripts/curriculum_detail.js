function checkMemberStatus() {
    var memberStatus = false;
    $.ajax({
        type: "POST",
        url: "/models/CheckMemberStatus.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            if (data === "login") {
                memberStatus = true;
            }
            if (data === "logout") {
                memberStatus = false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
    return memberStatus;
}
function setShoppingCartBuyType(button) {
    var memberStatus = checkMemberStatus();
    if (memberStatus === true) {
        ddkUIComponent('Simple Confirm',
                {
                    action: 'appear',
                    replaced: false,
                    firstText: {text: '請選擇購買方式', style: 'color:#d21414;font-weight:bold;'},
                    secondText: {text: '', style: 'font-weight:bold;'},
                    doneLabel: '點數',
                    deniedLabel: '現金',
                    afterDone: function () {
                        setShoppingCart(button, "1");
                    },
                    afterDenied: function () {
                        setShoppingCart(button, "2");
                    },
                    events: {
                        beforeAppear: function () {
                            //console.log('EVENT events.' + ' >> beforeAppear');
                        },
                        afterAppear: function () {
                            //console.log('EVENT events.' + ' >> afterAppear');
                        },
                        beforeRemove: function () {
                            //console.log('EVENT events.' + ' >> beforeRemove');
                        },
                        afterRemove: function () {
                            //console.log('EVENT events.' + ' >> afterRemove');
                        }
                    }
                }
        );
    }
    if (memberStatus === false) {
        callddkUIComponent5("請先進行登入", "");
    }
}
function setShoppingCart(button, buyType) {
    $.ajax({
        type: "POST",
        url: "/models/SetShoppingCart.php",
        async: false,
        dataType: "json",
        data: {
            "para1": "create",
            "para2": buyType,
            "para3": $(button).attr("source"),
            "para4": $(button).val()
        },
        success: function (data) {
            $(button).attr("status", "check");
            $(button).html("<span>已加入購物車</span>");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
$(document).ready(function () {
    $(".shopping .buyBtn").click(function () {
        if ($(this).attr("status") === "check") {
            return;
        }
        if ($(this).attr("status") === "uncheck") {
            setShoppingCartBuyType(this);
            return;
        }
    });
})