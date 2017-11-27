function initTeacherContentDown(para1, para2, para3) {
    $.ajax({
        type: "POST",
        url: "/models/GetTeacherContentDown.php",
        async: false,
        dataType: "json",
        data: {
            "para1": para1,
            "para2": para2,
            "para3": para3
        },
        success: function (data) {
            $(".contentTable table tbody").empty();
            var tr = "";
            $.each(data, function (index, value) {
                tr += "<tr>";
                tr += "<td class='pd name'><a href='/curriculum_detail.php?source=1&source_id=" + data[index][0] + "'><span>" + data[index][1] + "</span></a></td>"
                tr += "<td class='pd crew'>";
                tr += "<strong>師資：</strong><a href='#'><span>" + data[index][2] + "</span></a>";
                tr += "<br>";
                tr += "<strong class='secondary'>課堂：</strong><span class='secondary'>共1堂</span><!-- rwd only -->";
                tr += "</td>";
                tr += "<td class='pd units'><span>共1堂</span></td>";
                if (data[index][5] === "Y") {
                    tr += "<td class='pd price'>";
                    tr += "<strong class='ignored'>原價：</strong><span class='ignored'>NT$" + data[index][3] + "</span>";
                    tr += "<br class='show'>";
                    tr += "<strong class='special'>特價：</strong><span class='special'>NT$" + data[index][6] + "</span>";
                    tr += "<br>";
                    tr += "<strong class='secondary ignored'>點數價：</strong><span class='secondary ignored'>" + data[index][4] + "點</span><!-- rwd only -->";
                    tr += "<br class='show secondary'><!-- rwd only -->";
                    tr += "<strong class='secondary special'>點數特價：</strong><span class='secondary special'>" + data[index][7] + "點</span><!-- rwd only -->";
                    tr += "</td>";
                    tr += "<td class='pd points'>";
                    tr += "<strong class='ignored'>原價：</strong><span class='ignored'>" + data[index][4] + "點</span>";
                    tr += "<br class='show'>";
                    tr += "<strong class='special'>特價：</strong><span class='special'>" + data[index][7] + "點</span>";
                    tr += "</td>";
                }
                if (data[index][5] === "N") {
                    tr += "<td class='pd price'>";
                    tr += "<strong>原價：</strong><span>NT$" + data[index][3] + "</span>";
                    tr += "<br>";
                    tr += "<strong class='secondary'>點數價：</strong><span class='secondary'>" + data[index][4] + "點</span><!-- rwd only -->";
                    tr += "</td>";
                    tr += "<td class='pd points'>";
                    tr += "<strong>原價：</strong><span>" + data[index][4] + "點</span>";
                    tr += "</td>";
                }
                tr += "<td class='pd actions'>";
                tr += "<label class='setToBuy'><input type='checkbox' source='class' value='" + data[index][0] + "' " + data[index][9] + " onclick='setShoppingCartBuyType(this)'><strong></strong><span>購買</span></label>";
                tr += "<br>";
                tr += "<span style='display: inline-block;padding-left: 40px;'></span>";
                if (data[index][8] !== "") {
                    tr += "<a href='" + data[index][8] + "' class='video' target='_blank'><strong></strong><span>影片</span></a>";
                }
                tr += "</td>";
                tr += "</tr>";
            });
            $(".contentTable table tbody").html(tr);
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
function setShoppingCartBuyType(checkbox) {
    var memberStatus = checkMemberStatus();
    if (memberStatus === true) {
        if ($(checkbox).prop("checked")) {
            ddkUIComponent('Simple Confirm',
                    {
                        action: 'appear',
                        replaced: false,
                        firstText: {text: '請選擇購買方式', style: 'color:#d21414;font-weight:bold;'},
                        secondText: {text: '', style: 'font-weight:bold;'},
                        doneLabel: '點數',
                        deniedLabel: '現金',
                        afterDone: function () {
                            //console.log('CLICK events' + ' >> afterDone');
                            setShoppingCart(checkbox, "1");
                        },
                        afterDenied: function () {
                            //console.log('CLICK EVENT events.' + ' >> afterDenied');
                            setShoppingCart(checkbox, "2");
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
        } else {
            setShoppingCart(checkbox, "0");
        }
    }
    if (memberStatus === false) {
        $(checkbox).prop("checked", false);
        callddkUIComponent5("請先進行登入", "");
    }
}
function setShoppingCart(checkbox, buyType) {
    $.ajax({
        type: "POST",
        url: "/models/SetShoppingCart.php",
        async: false,
        dataType: "json",
        data: {
            "para1": $(checkbox).prop("checked") ? "create" : "delete",
            "para2": buyType,
            "para3": $(checkbox).attr("source"),
            "para4": $(checkbox).val()
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
