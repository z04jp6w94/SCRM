$(document).ready(function () {
    $(".sending button").click(function () {
        if ($("#phone").val() === '') {
            callddkUIComponent1($("#phone"), "會員手機欄位為空", "請輸入會員手機");
            return;
        }
        if ($("#email").val() === '') {
            callddkUIComponent1($("#email"), "Email欄位為空", "請輸入Email");
            return;
        } else {
            emailRegExp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/g;
            if (emailRegExp.test($("#email").val()) === false) {
                callddkUIComponent1($("#email"), "Email格式有誤", "請重新輸入Email");
                return;
            }
        }
        $.post(
                "/models/MemberAcctLost.php",
                {
                    phone: $("#phone").val(),
                    email: $("#email").val()
                },
                function (data) {
                    if (data === "correct") {
                        window.location.href = "/member_acct_lost_transfer.php";
                    }
                    if (data === "incorrect1") {
                        callddkUIComponent1($("#phone"), "會員電話或Email有誤", "請重新輸入");
                    }
                    if (data === "incorrect2") {
                        callddkUIComponent1($("#phone"), "信件發送失敗", "請洽詢管理員");
                    }
                },
                "json");
    })
})

