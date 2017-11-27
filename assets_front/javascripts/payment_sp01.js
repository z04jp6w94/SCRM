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
function setShoppingCart(button, buyType) {
    var memberStatus = checkMemberStatus();
    if (memberStatus === true) {
        $.ajax({
            type: "POST",
            url: "/models/SetShoppingCart.php",
            async: false,
            dataType: "json",
            data: {
                "para1": "delete",
                "para2": buyType,
                "para3": $(button).attr("source"),
                "para4": $(button).val()
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
        callddkUIComponent5("請先進行登入", "");
    }
}
function initPaymentSp01Content() {
    $.ajax({
        type: "POST",
        url: "/models/GetPaymentSp01Content.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            $("#tblPaymentSp01Content tbody").empty();
            var tbody = "";
            $.each(data, function (index, value) {
                if (data[index][0] === 1) {
                    tbody += "<tr class='theSet'>";
                    tbody += "<td class='pd set'><a href='/curriculum_detail.php?source=1&source_id=" + data[index][1] + "'><span>" + data[index][2] + "</span></a></td>";
                    tbody += "<td class='pd crew'>";
                    tbody += "<strong>師資：</strong><a href='/tutors_intro.php?category=" + data[index][3] + "&teacher=" + data[index][4] + "'><span>" + data[index][5] + "</span></a>";
                    tbody += "<br>";
                    tbody += "<strong class='secondary'>課堂：</strong><span class='secondary'>共1堂</span><!-- rwd only -->";
                    tbody += "</td>";
                    tbody += "<td class='pd units'><span>共1堂</span></td>";
                    if (data[index][8] === "Y") {
                        tbody += "<td class='pd price'>";
                        tbody += "<strong class='ignored'>原價：</strong><span class='ignored'>NT$" + data[index][6] + "</span>";
                        tbody += "<br class='show'>";
                        tbody += "<strong class='special'>特價：</strong><span class='special'>NT$" + data[index][9] + "</span>";
                        tbody += "<br>";
                        tbody += "<strong class='secondary ignored'>點數價：</strong><span class='secondary ignored'>" + data[index][7] + "點</span><!-- rwd only -->";
                        tbody += "<br class='show secondary'><!-- rwd only -->";
                        tbody += "<strong class='secondary special'>點數特價：</strong><span class='secondary special'>" + data[index][10] + "點</span><!-- rwd only -->";
                        tbody += "</td>";
                        tbody += "<td class='pd points'>";
                        tbody += "<strong class='ignored'>原價：</strong><span class='ignored'>" + data[index][7] + "點</span>";
                        tbody += "<br class='show'>";
                        tbody += "<strong class='special'>特價：</strong><span class='special'>" + data[index][10] + "點</span>";
                        tbody += "</td>";
                    }
                    if (data[index][8] === "N") {
                        tbody += "<td class='pd price'>";
                        tbody += "<strong>原價：</strong><span>NT$" + data[index][6] + "</span>";
                        tbody += "<br class='show'>";
                        tbody += "<strong class='secondary'>點數價：</strong><span class='secondary'>" + data[index][7] + "點</span><!-- rwd only -->";
                        tbody += "</td>";
                        tbody += "<td class='pd points'>";
                        tbody += "<strong>原價：</strong><span>" + data[index][7] + "點</span>";
                        tbody += "</td>";
                    }
                    tbody += "<td class='pd actions'><button type='button' source='class' value='" + data[index][1] + "' class='removeItem'><strong></strong><span>刪除</span></button></td>";
                    tbody += "</tr>";
                }
                if (data[index][0] === 2) {
                    tbody += "<tr class='theSet'>";
                    tbody += "<td class='pd set' colspan='2'><a href='/curriculum_detail.php?source=2&source_id=" + data[index][1] + "'><span>" + data[index][2] + "</span></a></td>";
                    tbody += "<td class='pd units'><span>共" + data[index][3] + "堂</span></td>";
                    if (data[index][6] === "Y") {
                        tbody += "<td class='pd price'>";
                        tbody += "<strong class='ignored'>原價：</strong><span class='ignored'>NT$" + data[index][4] + "</span>";
                        tbody += "<br class='show'>";
                        tbody += "<strong class='special'>特價：</strong><span class='special'>NT$" + data[index][7] + "</span>";
                        tbody += "<br>";
                        tbody += "<strong class='secondary ignored'>點數價：</strong><span class='secondary ignored'>" + data[index][5] + "點</span><!-- rwd only -->";
                        tbody += "<br class='show secondary'><!-- rwd only -->";
                        tbody += "<strong class='secondary special'>點數特價：</strong><span class='secondary special'>" + data[index][8] + "點</span><!-- rwd only -->";
                        tbody += "</td>";
                        tbody += "<td class='pd points'>";
                        tbody += "<strong class='ignored'>原價：</strong><span class='ignored'>" + data[index][5] + "點</span>";
                        tbody += "<br class='show'>";
                        tbody += "<strong class='special'>特價：</strong><span class='special'>" + data[index][8] + "點</span>";
                        tbody += "</td>";
                    }
                    if (data[index][6] === "N") {
                        tbody += "<td class='pd price'>";
                        tbody += "<strong>原價：</strong><span>NT$" + data[index][4] + "</span>";
                        tbody += "<br>";
                        tbody += "<strong class='secondary'>點數價：</strong><span class='secondary'>" + data[index][5] + "點</span><!-- rwd only -->";
                        tbody += "</td>";
                        tbody += "<td class='pd points'>";
                        tbody += "<strong>原價：</strong><span>" + data[index][5] + "點</span>";
                        tbody += "</td>";
                    }
                    tbody += "<td class='pd actions'><button type='button' source='productm' value='" + data[index][1] + "' class='removeItem'><strong></strong><span>刪除</span></button></td>";
                    tbody += "</tr>";
                    $.each(data[index][9], function (index, value) {
                        tbody += "<tr class='theSetChildren'>";
                        tbody += "<td class='pd name'><a href='/curriculum_detail.php?source=1&source_id=" + value[0] + "'><span>" + value[1] + "</span></a></td>";
                        tbody += "<td class='pd crew'>";
                        tbody += "<strong>師資：</strong><a href='/tutors_intro.php?category=" + value[2] + "&teacher=" + value[3] + "'><span>" + value[4] + "</span></a>";
                        tbody += "<br>";
                        tbody += "<strong class='secondary'>課堂：</strong><span class='secondary'>共1堂</span><!-- rwd only -->";
                        tbody += "</td>";
                        tbody += "<td class='pd units'><span>共1堂</span></td>";
                        tbody += "<td class='pd price'></td>";
                        tbody += "<td class='pd points'></td>";
                        tbody += "<td class='pd actions'></td>";
                        tbody += "</tr>";
                    });
                }
            });
            $("#tblPaymentSp01Content tbody").html(tbody);
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
        initPaymentSp01Content();
    }
    if (memberStatus === false) {
        callddkUIComponent3("請先進行登入", "將自動跳轉登入頁面", 1, "/member.php");
    }
    $(document).on('click', '.pd .removeItem', function () {
        setShoppingCart(this, "0");
        initPaymentSp01Content();
    });
    $(".final .nextBtn").click(function () {
        window.location.href = "/payment_sp02.php";
    });
})
