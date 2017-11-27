function ajaxInputCheckbox(url, para1, para2, para3, idVal) {
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        dataType: "json",
        data: {
            "para1": para1,
            "para2": para2,
            "para3": para3
        },
        success: function (data) {
            var checkBox = "";
            checkBox += "<input type='hidden' id='dataCount' name='dataCount' value='" + data.length + "'></input>";
            $.each(data, function (index, value) {
                checkBox += "<li><label class='checkTypeTrigger'>";
                checkBox += "<input type='checkbox' name='data" + (index + 1) + "' value='" + data[index][0] + "'></input>";
                checkBox += "<span>" + data[index][1] + "</span>";
                checkBox += "</label></li>";
            });
            $("#" + idVal).html(checkBox);
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
    $("#interest").change(function () {
        $("#sideOptions").html("");
        if ($("#interest").val() != "")
            ajaxInputCheckbox("/models/MemberServiceCourse.php", $("#interest").val(), "", "", "sideOptions");
    });
    $("#securityCode").click(function () {
        $('#verification').val("");
        $('#securityCode').attr("src", "/models/GetCaptcha.php")
    });
    $(".sending button").click(function () {
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
        if ($("#password1").val() === '') {
            callddkUIComponent1($("#password1"), "密碼欄位為空", "請輸入密碼");
            return;
        }
        if ($("#password2").val() === '') {
            callddkUIComponent1($("#password2"), "確認密碼欄位為空", "請輸入確認密碼");
            return;
        }
        if ($("#password1").val() != $("#password2").val()) {
            callddkUIComponent1($("#password2"), "確認密碼與密碼不符", "請重新輸入確認密碼");
            return;
        }
        if ($("#address").val() === '') {
            callddkUIComponent1($("#address"), "地址欄位為空", "請輸入地址");
            return;
        }
        if ($("#verification").val() === '') {
            callddkUIComponent1($("#verification"), "驗證碼欄位為空", "請輸入驗證碼");
            return;
        } else {
            var isReturn = false;
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
                    }
                    if (data === "incorrect") {
                        isReturn = true;
                        callddkUIComponent1($("#verification"), "驗證碼有誤", "請重新輸入驗證碼");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var errorMsg = "STATUS:" + jqXHR.status;
                    errorMsg += "-" + jqXHR.readyState;
                    errorMsg += "-" + textStatus;
                    alert(errorMsg);
                }
            });
            if (isReturn) {
                return;
            }
        }
        callddkUIComponent2("會員資料修改中", "三秒後將自動跳轉會員中心", 3);
        $.post(
                "/models/MemberService.php",
                $("#MemberService").serialize(),
                function (data) {
                    window.location.href = "/member.php";
                }
        );
    })
})

