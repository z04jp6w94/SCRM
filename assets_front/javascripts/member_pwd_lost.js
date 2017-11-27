$(document).ready(function () {
    $(".sending button").click(function () {
        if ($("#account").val() === '') {
            callddkUIComponent1($("#account"), "會員帳號欄位為空", "請輸入會員帳號");
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
                "/models/MemberPwdLost.php",
                {
                    account: $("#account").val(),
                    email: $("#email").val()
                },
                function (data) {
                    if (data === "correct") {
                        window.location.href = "/member_pwd_lost_transfer.php";
                    }
                    if (data === "incorrect1") {
                        callddkUIComponent1($("#account"), "會員帳號或Email有誤", "請重新輸入");
                    }
                    if (data === "incorrect2") {
                        callddkUIComponent1($("#account"), "信件發送失敗", "請洽詢管理員");
                    }
                },
                "json");
    })
})

