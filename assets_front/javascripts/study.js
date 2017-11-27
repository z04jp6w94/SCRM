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
function initMember() {
    $.ajax({
        type: "POST",
        url: "/models/GetStudyMember.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            $(".sideColumn .columnCtx").empty();
            var div = "";
            div += "<div class='info'>";
            div += "<div class='inLeft'>";
            div += "<h2><span class='dart'></span><span>歡迎<strong>" + data[0][0] + "</strong>同學</span></h2>";
            div += "<span>這是您第" + data[0][1] + "次登入</span>";
            div += "</div>";
            div += "<div class='inRight'>";
            if (data[0][1] === "1") {
                div += "<h4><span>歡迎！！！</span></h4>";
            }
            if (data[0][1] !== "1") {
                div += "<h4><span>上次登入時間為</span></h4>";
                div += "<span>" + data[0][2] + "</span>";
            }
            div += "</div>";
            div += "<div class='clearFloat'></div>";
            div += "</div>";
            $(".sideColumn .columnCtx").html(div);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
function initStudyContent() {
    $.ajax({
        type: "POST",
        url: "/models/GetStudyContent.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            $(".master").empty();
            var div = "";
            if (data[0] === "Empty") {
                div += "<div class='courseEmpty'>";
                div += "<p>親愛的同學您好，您目前尚未購買任何課程。</p>";
                div += "</div>";
                div += "<div class='final'>";
                div += "<button type='button' class='buyBtn'><span>我想購買課程</span></button>";
                div += "<button type='button' class='tryBtn'><span>我想試聽課程</span></button>";
                div += "</div>";
            }
            if (data[0] === "NotEmpty") {
                div += "<dl class='studyInfo'>";
                div += "<dt class='inLeft open'><button type='button' class='courseBtn'><span>購買的課程</span></button></dt>";
                div += "<dd class='open'>";
                div += "<div class='contentTable'>";
                div += "<table>";
                div += "<thead>";
                div += "<tr>";
                div += "<th class='hd name'><span>課程名稱</span></th>";
                div += "<th class='hd crew'><span>師資</span></th>";
                div += "<th class='hd importDate'><span>購買日期</span></th>";
                div += "<th class='hd expiredDate'><span>有效日期</span></th>";
                div += "<th class='hd actions'><span>我要上課</span></th>";
                div += "</tr>";
                div += "</thead>";
                div += "<tbody>";
                $.each(data[1][1], function (index, ary) {
                    div += "<tr>";
                    div += "<td class='pd name'><a href='" + ary[0] + "'><span>" + ary[1] + "</span></a></td>";
                    div += "<td class='pd crew'>";
                    div += "<strong>師資：</strong><a href='" + ary[2] + "'><span>" + ary[3] + "</span></a>";
                    div += "</td>";
                    div += "<td class='pd importDate'><strong class='secondary'>購買日期：</strong><span>" + ary[4] + "</span></td>";
                    div += "<td class='pd expiredDate'><strong class='secondary'>有效日期：</strong><span>" + ary[5] + "</span></td>";
                    div += "<td class='pd actions'>";
                    div += "<button type='button' class='goStudy'><strong></strong><span>上課去</span></button>";
                    div += "</td>";
                    div += "</tr>";
                });
                div += "</tbody>";
                div += "</table>";
                div += "</div>";
                div += "</dd>";
                div += "<dt class='inRight'><button type='button' class='tipBtn'><span>已到期課程</span></button></dt>";
                div += "<dd>";
                div += "<div class='contentTable'>";
                div += "<table>";
                div += "<thead>";
                div += "<tr>";
                div += "<th class='hd name'><span>課程名稱</span></th>";
                div += "<th class='hd crew'><span>師資</span></th>";
                div += "<th class='hd importDate'><span>購買日期</span></th>";
                div += "<th class='hd expiredDate'><span>有效日期</span></th>";
                div += "<th class='hd actions'><span>我要上課</span></th>";
                div += "</tr>";
                div += "</thead>";
                div += "<tbody>";
                $.each(data[2][1], function (index, ary) {
                    if (ary[6] !== "") {
                        div += "<tr>";
                        div += "<td class='pd name'><a href='" + ary[0] + "'><span>" + ary[1] + "</span></a></td>";
                        div += "<td class='pd crew'>";
                        div += "<strong>師資：</strong><a href='" + ary[2] + "'><span>" + ary[3] + "</span></a>";
                        div += "</td>";
                        div += "<td class='pd importDate'><strong class='secondary'>購買日期：</strong><span>" + ary[4] + "</span></td>";
                        div += "<td class='pd expiredDate'><strong class='secondary'>有效日期：</strong><span>" + ary[5] + "</span></td>";
                        div += "<td class='pd actions'>";
                        div += "<button type='button' source='" + ary[6] + "' class='ntdBuy'><strong></strong><span>前往購買</span></button>";
                        div += "</td>";
                        div += "</tr>";
                    } else {
                        div += "<tr>";
                        div += "<td class='pd name'><span>" + ary[1] + "</span></a></td>";
                        div += "<td class='pd crew'>";
                        div += "<strong>師資：</strong><a href='" + ary[2] + "'><span>" + ary[3] + "</span></a>";
                        div += "</td>";
                        div += "<td class='pd importDate'><strong class='secondary'>購買日期：</strong><span>" + ary[4] + "</span></td>";
                        div += "<td class='pd expiredDate'><strong class='secondary'>有效日期：</strong><span>" + ary[5] + "</span></td>";
                        div += "<td class='pd actions'>";
                        div += "<div class='courseEnded'><strong></strong><span>停售</span></div>";
                        div += "</td>";
                        div += "</tr>";
                    }
                });
                div += "</tbody>";
                div += "</table>";
                div += "</div>";
                div += "</dd>";
                div += "</dl>";
            }
            $(".master").html(div);
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
        initMember();
        initStudyContent();
        DDK.study.init();
    }
    if (memberStatus === false) {
        callddkUIComponent3("請先進行登入", "將自動跳轉登入頁面", 1, "/member.php");
    }
    $(document).on('click', '.final .buyBtn', function () {
        window.location.href = "/curriculum.php";
    });
    $(document).on('click', '.final .tryBtn', function () {
        window.location.href = "/experience.php";
    });
    $(document).on('click', '.pd .ntdBuy', function () {
        window.location.href = $(this).attr("source");
    });
})
