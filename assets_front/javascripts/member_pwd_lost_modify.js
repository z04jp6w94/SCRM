$(document).ready(function () {
    $(".sending button").click(function () {
        if ($("#password1").val() === '') {
            callddkUIComponent1($("#password1"), "新密碼欄位為空", "請輸入新密碼");
            return;
        }
        if ($("#password2").val() === '') {
            callddkUIComponent1($("#password2"), "確認新密碼欄位為空", "請輸入確認新密碼");
            return;
        }
        if ($("#password1").val() != $("#password2").val()) {
            callddkUIComponent1($("#password2"), "確認新密碼與新密碼不符", "請重新輸入確認新密碼");
            return;
        }
        $.post(
                "/models/MemberPwdLostModify.php",
                {
                    account: $("#account").val(),
                    email: $("#email").val(),
                    temppassword: $("#temppassword").val(),
                    password1: $("#password1").val(),
                    password2: $("#password2").val()
                },
                function (data) {
                    console.log(data);
                    if (data === "correct") {
                        window.location.href = "/member_pwd_lost_modify_transfer.php";
                    }
                    if (data === "incorrect") {
                        callddkUIComponent1($("#account"), "重設密碼連結失效", "請重新取得");
                    }
                },
                "json");
    })
})

