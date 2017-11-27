function memberLogin() {
    $.post(
            "/models/MemberLogin.php",
            {
                account: $("#account").val(),
                password: $("#password").val(),
                remember: $("#remember").val()
            },
            function (data) {
                if (data === "success") {
                    window.location.href = "/index.php";
                }
                if (data === "failure") {
                    callddkUIComponent1($("#account"), "帳號或密碼有誤", "請重新輸入");
                }
            },
            "json");
}
$(document).ready(function () {
    $("#showpwd").click(function () {
        var type = $("#password").attr("type");
        if (type === "text")
            $("#password").attr("type", "password");
        if (type === "password")
            $("#password").attr("type", "text");
    });
    $("#login").click(function () {
        if ($("#account").val() === '') {
            callddkUIComponent1($("#account"), "帳號欄位為空", "請輸入帳號");
            return;
        }
        if ($("#password").val() === '') {
            callddkUIComponent1($("#password"), "密碼欄位為空", "請輸入密碼");
            return;
        }
        $.ajax({
            type: "POST",
            url: "/models/CheckMemberPosition.php",
            async: false,
            dataType: "json",
            data: {
                account: $("#account").val(),
                password: $("#password").val()
            },
            success: function (data) {
                console.log(data);
                if (data === "status1") {
                    callddkUIComponent1($("#account"), "帳號或密碼有誤", "請重新輸入");
                }
                if (data === "status2") {
                    memberLogin();
                }
                if (data === "status3") {
                    ddkUIComponent('Simple Confirm',
                            {
                                action: 'appear',
                                replaced: false,
                                firstText: {text: '您目前正在別的地方登入中, 是否在此重新登入', style: 'color:#d21414;font-weight:bold;'},
                                secondText: {text: '(登入後將會踢除其他地方的登入帳號)', style: 'font-weight:bold;'},
                                doneLabel: '是',
                                deniedLabel: '否',
                                afterDone: function () {
                                    memberLogin();
                                },
                                afterDenied: function () {
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
                if (data === "status4") {
                    memberLogin();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var errorMsg = "STATUS:" + jqXHR.status;
                errorMsg += "-" + jqXHR.readyState;
                errorMsg += "-" + textStatus;
                alert(errorMsg);
            }
        });
    });
    $("#registration").click(function () {
        window.location.href = "/member_registration.php";
    });
    $("#service").click(function () {
        window.location.href = "/member_service.php";
    });
    $("#logout").click(function () {
        $.post(
                "/models/MemberLogout.php",
                {},
                function (data) {
                    if (data === "success") {
                        window.location.href = "/index.php";
                    }
                },
                "json");
    });
})

