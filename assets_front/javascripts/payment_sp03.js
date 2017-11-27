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
function checkShoppingCart() {
    var shoppingCart = false;
    $.ajax({
        type: "POST",
        url: "/models/CheckShoppingCart.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            if (data === "checked") {
                shoppingCart = true;
            }
            if (data === "unchecked") {
                shoppingCart = false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
    return shoppingCart;
}
function checkCaptcha() {
    var captcha = false;
    $.ajax({
        type: "POST",
        url: "/models/CheckCaptcha.php",
        async: false,
        dataType: "json",
        data: {
            "verification": $("#verification").val()
        },
        success: function (data) {
            if (data === "correct") {
                captcha = true;
            }
            if (data === "incorrect") {
                captcha = false;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
    return captcha;
}
function initShoppingCartDetail() {
    $.ajax({
        type: "POST",
        url: "/models/GetPaymentSp03ShoppingCartDetail.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            $("#shoppingCartDetail").empty();
            var divContent = "";
            divContent += "<table class='total'>";
            divContent += "<tr>";
            divContent += "<th>";
            divContent += "<strong>合計</strong>";
            divContent += "</th>";
            divContent += "<td>";
            divContent += "<span class='cash'>NT$" + data[0] + "</span><!-- 現金價 -->";
            divContent += "<br class='secondary'>";
            divContent += "<strong class='plusComma'>＋</strong>";
            divContent += "<br class='secondary'>";
            divContent += "<span class='points'>" + data[1] + "點</span><!-- 點數 -->";
            divContent += "</td>";
            divContent += "</tr>";
            divContent += "</table>";
            divContent += "<div class='clearFloat'></div>";
            divContent += "<table class='pay'>";
            divContent += "<tr>";
            divContent += "<th>";
            divContent += "<strong>實際支付金額</strong>";
            divContent += "</th>";
            divContent += "<td>";
            divContent += "<span class='cash'>NT$" + data[2] + "</span>";
            divContent += "<br class='secondary'>";
            divContent += "<strong class='plusComma'>＋</strong>";
            divContent += "<br class='secondary'>";
            divContent += "<span class='points'>" + data[3] + "點</span>";
            divContent += "</td>";
            divContent += "</tr>";
            divContent += "</table>";
            divContent += "<div class='clearFloat'></div>";
            $("#shoppingCartDetail").html(divContent);
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
    var memberStatus = checkMemberStatus();
    if (memberStatus === true) {
        initShoppingCartDetail();
    }
    if (memberStatus === false) {
        callddkUIComponent3("請先進行登入", "將自動跳轉登入頁面", 1, "/member.php");
    }
    $("#securityCode").click(function () {
        $('#verification').val("");
        $('#securityCode').attr("src", "/models/GetCaptcha.php")
    });
    $(".final .prevBtn").click(function () {
        window.location.href = "/payment_sp02.php";
    });
    $(".final .nextBtn").click(function () {
        var shoppingCart = checkShoppingCart();
        if (shoppingCart === true) {
            if ($("#name").val() === '') {
                callddkUIComponent1($("#name"), "姓名欄位為空", "請輸入姓名");
                return;
            }
            if ($("#phone").val() === '') {
                callddkUIComponent1($("#phone"), "手機號碼欄位為空", "請輸入手機號碼");
                return;
            } else {
                phoneRegExp = /[^0-9-]/g;
                if (phoneRegExp.test($("#phone").val()) === true) {
                    callddkUIComponent1($("#phone"), "手機號碼格式有誤", "請重新輸入手機號碼");
                    return;
                }
            }
            if ($("#address").val() === '') {
                callddkUIComponent1($("#address"), "地址欄位為空", "請輸入收件地址");
                return;
            }
            if ($("#verification").val() === '') {
                callddkUIComponent1($("#verification"), "驗證碼欄位為空", "請輸入驗證碼");
                return;
            } else {
                var captcha = checkCaptcha();
                if (captcha === false) {
                    callddkUIComponent1($("#verification"), "驗證碼有誤", "請重新輸入驗證碼");
                    return;
                }
            }
        } else {
            callddkUIComponent5("請先選購友欣升學網產品", "");
            return;
        }
        callddkUIComponent2("商品內容確認與訂單建立中", "請稍後", 3);
        $.post("/models/PaymentSp03.php", $("#PaymentSp03").serialize(), function (data) {
            console.log(data);
            if (data[0] === "shoppingCart") {
                setTimeout(callddkUIComponent5("目前" + data[1] + "已無庫存", "建議您選購其他相關產品"), 3000);
            }
            if (data[0] === "memberPoint") {
                setTimeout(callddkUIComponent5("目前您的點數不足", "請點選上方購點優惠方案儲值, 或請您刪除該課程, 並以現金重新購買"), 3000);
            }
            if (data[0] === "successPoint") {
                var hrefUrl = "/payment_sp05_success.php";
                setTimeout(callddkUIComponent4("您選購的商品已扣去" + data[1] + "點, 您目前還剩下" + data[2] + "點", "", hrefUrl), 3000);
            }
            if (data[0] === "successMoney") {
                var hrefUrl = "/models/PaymentSp03AllPay.php?para1=" + data[3] + "&para2=" + data[4] + "&para3=" + data[5] + "&para4=" + data[6];
                setTimeout(callddkUIComponent4("您選購的商品已扣去" + data[1] + "點, 您目前還剩下" + data[2] + "點", "", hrefUrl), 3000);
            }
            if (data[0] === "successPointMoney") {
                var hrefUrl = "/models/PaymentSp03AllPay.php?para1=" + data[3] + "&para2=" + data[4] + "&para3=" + data[5] + "&para4=" + data[6];
                setTimeout(callddkUIComponent4("您選購的商品已扣去" + data[1] + "點, 您目前還剩下" + data[2] + "點", "", hrefUrl), 3000);
            }
        }, "json");
    });
})

