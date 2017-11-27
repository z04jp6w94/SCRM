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
function initKeywords(easy100search) {
    $(".keywords").empty();
    var dd = "";
    if (easy100search === "") {
        dd += "<dt><h3><span>搜尋關鍵字</span></h3></dt>";
        dd += "";
        dd += "<br class='clearFloat'>";
    } else {
        dd += "<dt><h3><span>搜尋關鍵字</span></h3></dt>";
        dd += "<dd><p><span>" + easy100search + "</span></p></dd>";
        dd += "<br class='clearFloat'>";
    }
    $(".keywords").html(dd);
}
function initResults(easy100search) {
    $.ajax({
        type: "POST",
        url: "/models/GetSearchResult.php",
        async: false,
        dataType: "json",
        data: {
            "easy100search": easy100search
        },
        success: function (data) {
            $(".resault").empty();
            var dd = "";
            if (data.length === 0) {
                dd += "<dt><h3><span>搜尋到的結果</span></h3></dt>";
                dd += "<dd><p>";
                dd += "<span>抱歉找不到您要的資料，建議您選擇其他的搜尋條件。</span>";
                dd += "</p></dd>";
                dd += "<br class='clearFloat'>";
            } else {
                dd += "<dt><h3><span>搜尋到的結果</span></h3></dt>";
                dd += "<dd><p>";
                $.each(data, function (index, value) {
                    dd += "<a href='" + data[index][0] + "'>" + data[index][1] + "</a>";
                });
                dd += "</p></dd>";
                dd += "<br class='clearFloat'>";
            }
            $(".resault").html(dd);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
function initSearchContent(easy100search) {
    $.ajax({
        type: "POST",
        url: "/models/GetSearchContent.php",
        async: false,
        dataType: "json",
        data: {
            "easy100search": easy100search
        },
        success: function (data) {
            console.log(data);
            $(".contentTable table tbody").empty();
            var tbody = "";
            if (data.length === 0) {

            } else {
                $.each(data, function (index, value) {
                    tbody += "<tr>";
                    tbody += "<td class='pd name'><a href='" + data[index][2] + "'><span>" + data[index][3] + "</span></a></td>";
                    tbody += "<td class='pd crew'>";
                    tbody += "<strong>師資：</strong><a href='" + data[index][4] + "'><span>" + data[index][5] + "</span></a>";
                    tbody += "<br>";
                    tbody += "<strong class='secondary'>課堂：</strong><span class='secondary'>共" + data[index][6] + "堂</span><!-- rwd only -->";
                    tbody += "</td>";
                    tbody += "<td class='pd units'><span>共" + data[index][6] + "堂</span></td>";
                    if (data[index][9] === "Y") {
                        tbody += "<td class='pd price'>";
                        tbody += "<strong class='ignored'>原價：</strong><span class='ignored'>NT$" + data[index][7] + "</span>";
                        tbody += "<br class='show'>";
                        tbody += "<strong class='special'>特價：</strong><span class='special'>NT$" + data[index][10] + "</span>";
                        tbody += "<br>";
                        tbody += "<strong class='secondary ignored'>點數價：</strong><span class='secondary ignored'>" + data[index][8] + "點</span><!-- rwd only -->";
                        tbody += "<br class='show secondary'><!-- rwd only -->";
                        tbody += "<strong class='secondary special'>點數特價：</strong><span class='secondary special'>" + data[index][11] + "點</span><!-- rwd only -->";
                        tbody += "</td>";
                        tbody += "<td class='pd points'>";
                        tbody += "<strong class='ignored'>原價：</strong><span class='ignored'>" + data[index][8] + "點</span>";
                        tbody += "<br class='show'>";
                        tbody += "<strong class='special'>特價：</strong><span class='special'>" + data[index][11] + "點</span>";
                        tbody += "</td>";
                    }
                    if (data[index][9] === "N") {
                        tbody += "<td class='pd price'>";
                        tbody += "<strong>原價：</strong><span>NT$" + data[index][7] + "</span>";
                        tbody += "<br>";
                        tbody += "<strong class='secondary'>點數價：</strong><span class='secondary'>" + data[index][8] + "點</span><!-- rwd only -->";
                        tbody += "</td>";
                        tbody += "<td class='pd points'>";
                        tbody += "<strong>原價：</strong><span>" + data[index][8] + "點</span>";
                        tbody += "</td>";
                    }
                    tbody += "<td class='pd actions'>";
                    tbody += "<label class='setToBuy'><input type='checkbox' source='" + data[index][0] + "' value='" + data[index][1] + "' " + data[index][13] + " onclick='setShoppingCartBuyType(this)'><strong></strong><span>購買</span></label>";
                    tbody += "<br>";
                    tbody += "<span style='display: inline-block;padding-left: 20px;'></span>";
                    if (data[index][12] !== "") {
                        tbody += "<a href='" + data[index][12] + "' class='video' target='_blank'><strong></strong><span>影片</span></a>";
                    }
                    tbody += "</td>";
                    tbody += "</tr>";
                });
            }
            $(".contentTable table tbody").html(tbody);
            DDK.mutual.initSetToBuy();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}