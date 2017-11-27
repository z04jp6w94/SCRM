function ajaxSelectOption(url, para1, para2, para3, idVal, obj) {
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
            $("#" + idVal).empty();
            var option = "";
            for (key in obj) {
                option += "<option value='" + obj[key] + "'>" + key + "</option>";
            }
            $.each(data, function (index, value) {
                option += "<option value='" + data[index][0] + "'>" + data[index][1] + "</option>";
            });
            $("#" + idVal).append(option);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
function initCurriculumContent(para1, para2, para3) {
    $.ajax({
        type: "POST",
        url: "/models/GetCurriculumContent.php",
        async: false,
        dataType: "json",
        data: {
            "para1": para1,
            "para2": para2,
            "para3": para3
        },
        success: function (data) {
            $("#curriculumContent").empty();
            var li = "";
            if (data.length === 0) {
                callddkUIComponent5("請先選擇搜尋條件", "");
                return;
            } else {
                switch (para1) {
                    case "1":
                        $.each(data, function (index, value) {
                            li += "<li><a href='" + data[index][0] + "' class='group license'><strong>&nbsp;</strong><span>" + data[index][1] + "</span></a></li>";
                        });
                        break;
                    case "2":
                        $.each(data, function (index, value) {
                            li += "<li><a href='" + data[index][0] + "' class='group elementery'><strong>&nbsp;</strong><span>" + data[index][1] + "</span></a></li>";
                        });
                        break;
                    case "3":
                        $.each(data, function (index, value) {
                            li += "<li><a href='" + data[index][0] + "' class='group junior'><strong>&nbsp;</strong><span>" + data[index][1] + "</span></a></li>";
                        });
                        break;
                    case "4":
                        $.each(data, function (index, value) {
                            li += "<li><a href='" + data[index][0] + "' class='group senior'><strong>&nbsp;</strong><span>" + data[index][1] + "</span></a></li>";
                        });
                        break;
                    case "5":
                        $.each(data, function (index, value) {
                            li += "<li><a href='" + data[index][0] + "' class='group insdustry'><strong>&nbsp;</strong><span>" + data[index][1] + "</span></a></li>";
                        });
                        break;
                    default:
                        break;
                }
            }
            $("#curriculumContent").html(li);
            DDK.mutual.insertListFix($('.sellItems'));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
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
function setShoppingCart(checkbox) {
    var memberStatus = checkMemberStatus();
    if (memberStatus === true) {
        $.ajax({
            type: "POST",
            url: "/models/SetShoppingCart.php",
            async: false,
            dataType: "json",
            data: {
                "para1": $(checkbox).prop("checked") ? "create" : "delete",
                "para2": $(checkbox).attr("source"),
                "para3": $(checkbox).val()
            },
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var errorMsg = "STATUS:" + jqXHR.status;
                errorMsg += "-" + jqXHR.readyState;
                errorMsg += "-" + textStatus;
                alert(errorMsg);
            }
        });
    }
    if (memberStatus === false) {
        $(checkbox).prop("checked", false);
        callddkUIComponent5("請先進行登入", "");
    }
}
$(document).ready(function () {
    $("#category").change(function () {
        $("#course").html("<option value=''>請選擇您的科目</option>");
        $("#grade").html("<option value=''>請選擇您的級別</option>");
        if ($("#category").val() != "")
            ajaxSelectOption("/models/GetCurriculumOption.php", $("#category").val(), "", "", "course", {"請選擇您的科目": ""});
    });
    $("#course").change(function () {
        $("#grade").html("<option value=''>請選擇您的級別</option>");
        if ($("#course").val() != "")
            ajaxSelectOption("/models/GetCurriculumOption.php", $("#category").val(), $("#course").val(), "", "grade", {"請選擇您的級別": ""});
    });
    $("#search").click(function () {
        initCurriculumContent($("#category").val(), $("#course").val(), $("#grade").val());
    });
    $(".final .resetBtn").click(function () {
        var memberStatus = checkMemberStatus();
        if (memberStatus === true) {
            $("input[type=checkbox]").each(function () {
                $(this).parent().removeClass('checked');
                $(this).prop("checked", false);
                setShoppingCart(this);
            });
        }
        if (memberStatus === false) {
            callddkUIComponent5("請先進行登入", "");
        }
    });
    $(".final .buyBtn").click(function () {
        var memberStatus = checkMemberStatus();
        if (memberStatus === true) {
            callddkUIComponent6('是否前往檢視您選購的項目並查看產品細節?', '(這個步驟不會直接導向到結帳付款)', '/curriculum_confirm.php');
        }
        if (memberStatus === false) {
            callddkUIComponent5("請先進行登入", "");
        }
    });
})
