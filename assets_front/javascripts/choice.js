function initChoiceSideContent(para1, para2, para3) {
    $.ajax({
        type: "POST",
        url: "/models/GetChoiceSideContent.php",
        async: false,
        dataType: "json",
        data: {
            "para1": para1,
            "para2": para2,
            "para3": para3
        },
        success: function (data) {
            $(".sideColumn .columnCtx .treeMenu ol").empty();
            var li = "";
            $.each(data, function (index, value) {
                li += "<li class='alone'>";
                li += "<a href='/choice.php?category=" + data[index][0] + "&productm_id=" + data[index][1] + "'>";
                li += "<span>" + data[index][2] + "</span>";
                li += "</a>";
                li += "</li>";
            });
            $(".sideColumn .columnCtx .treeMenu ol").html(li);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
function initChoiceMainContentUp(para1, para2, para3) {
    $.ajax({
        type: "POST",
        url: "/models/GetChoiceMainContentUp.php",
        async: false,
        dataType: "json",
        data: {
            "para1": para1,
            "para2": para2,
            "para3": para3
        },
        success: function (data) {
            $(".master .caseBrief dl").empty();
            var dl = "";
            $.each(data, function (index, value) {
                dl += "<dt>";
                dl += "<article class='" + data[index][1] + "'><strong>&nbsp;</strong><span>" + data[index][2] + "</span></article>";
                dl += "<div class='features'>";
                dl += "<ul>";
                dl += "<li><span>" + data[index][3] + "</span></li>";
                dl += "</ul>";
                dl += "<div class='clearFloat'></div>";
                dl += "</div>";
                dl += "<div class='shopping'>";
                dl += "<ul>";
                if (data[index][6] === "Y") {
                    dl += "<li class='erased'><div class='money'><strong>原價：</strong><span>NT$" + data[index][4] + "</span></div></li>";
                    dl += "<li><div class='money discounted'><strong>特價：</strong><span>NT$" + data[index][7] + "</span></div></li>";
                    dl += "<li class='erased'><div class='points'><strong>點數價：</strong><span>" + data[index][5] + "點</span></div></li>";
                    dl += "<li><div class='points discounted'><strong>點數特價：</strong><span>" + data[index][8] + "點</span></div></li>";
                }
                if (data[index][6] === "N") {
                    dl += "<li><div class='money'><strong>原價：</strong><span>NT$" + data[index][4] + "</span></div></li>";
                    dl += "<li><div class='points'><strong>點數價：</strong><span>" + data[index][5] + "點</span></div></li>";
                }
                dl += "</ul>";
                dl += "<div class='clearFloat'></div>";
                if (data[index][9] === "check") {
                    dl += "<button type='button' status='" + data[index][9] + "' source='" + data[index][10] + "' value='" + data[index][0] + "' class='buyBtn'><span>已加入購物車</span></button>";
                }
                if (data[index][9] === "uncheck") {
                    dl += "<button type='button' status='" + data[index][9] + "' source='" + data[index][10] + "' value='" + data[index][0] + "' class='buyBtn'><span>我要購買</span></button>";
                }
                dl += "</div>";
                dl += "</dt>";
                dl += "<dd>";
                dl += "<div class='video'>";
                dl += "<iframe width='560' height='315' src='https://www.youtube.com/embed/" + data[index][11] + "?rel=0' frameborder='0' allowfullscreen></iframe>";
                dl += "</div>";
                dl += "</dd>";
            });
            $(".master .caseBrief dl").html(dl);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
function initChoiceMainContentDown(para1, para2, para3) {
    $.ajax({
        type: "POST",
        url: "/models/GetChoiceMainContentDown.php",
        async: false,
        dataType: "json",
        data: {
            "para1": para1,
            "para2": para2,
            "para3": para3
        },
        success: function (data) {
            $(".master .contentTable table tbody").empty();
            var tr = "";
            $.each(data, function (index, value) {
                tr += "<tr>";
                tr += "<td class='pd name'><a href='/curriculum_detail.php?source=1&source_id=" + data[index][0] + "'><span>" + data[index][1] + "</span></a></td>"
                tr += "<td class='pd crew'>";
                tr += "<strong>師資：</strong><a href='/tutors_intro.php?category=" + data[index][2] + "&teacher=" + data[index][3] + "'><span>" + data[index][4] + "</span></a>";
                tr += "<br>";
                tr += "<strong class='secondary'>課堂：</strong><span class='secondary'>共1堂</span><!-- rwd only -->";
                tr += "</td>";
                tr += "<td class='pd units'><span>共1堂</span></td>";
                if (data[index][7] === "Y") {
                    tr += "<td class='pd price'>";
                    tr += "<strong class='ignored'>原價：</strong><span class='ignored'>NT$" + data[index][5] + "</span>";
                    tr += "<br class='show'>";
                    tr += "<strong class='special'>特價：</strong><span class='special'>NT$" + data[index][8] + "</span>";
                    tr += "<br>";
                    tr += "<strong class='secondary ignored'>點數價：</strong><span class='secondary ignored'>" + data[index][6] + "點</span><!-- rwd only -->";
                    tr += "<br class='show secondary'><!-- rwd only -->";
                    tr += "<strong class='secondary special'>點數特價：</strong><span class='secondary special'>" + data[index][9] + "點</span><!-- rwd only -->";
                    tr += "</td>";
                    tr += "<td class='pd points'>";
                    tr += "<strong class='ignored'>原價：</strong><span class='ignored'>" + data[index][6] + "點</span>";
                    tr += "<br class='show'>";
                    tr += "<strong class='special'>特價：</strong><span class='special'>" + data[index][9] + "點</span>";
                    tr += "</td>";
                }
                if (data[index][7] === "N") {
                    tr += "<td class='pd price'>";
                    tr += "<strong>原價：</strong><span>NT$" + data[index][5] + "</span>";
                    tr += "<br>";
                    tr += "<strong class='secondary'>點數價：</strong><span class='secondary'>" + data[index][6] + "點</span><!-- rwd only -->";
                    tr += "</td>";
                    tr += "<td class='pd points'>";
                    tr += "<strong>原價：</strong><span>" + data[index][6] + "點</span>";
                    tr += "</td>";
                }
                tr += "<td class='pd actions'>";
                tr += "<label class='setToBuy'><input type='checkbox' source='class' value='" + data[index][0] + "' " + data[index][11] + " onclick='setShoppingCartBuyTypeCheckbox(this)'><strong></strong><span>購買</span></label>";
                tr += "<br>";
                tr += "<span style='display: inline-block;padding-left: 10px;'></span>";
                if (data[index][10] !== "") {
                    tr += "<a href='" + data[index][10] + "' class='video' target='_blank'><strong></strong><span>影片</span></a>";
                }
                tr += "</td>";
            });
            $(".master .contentTable table tbody").html(tr);
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
function setShoppingCartBuyTypeButton(button) {
    var memberStatus = checkMemberStatus();
    if (memberStatus === true) {
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
                        setShoppingCartButton("create", "1", button);
                    },
                    afterDenied: function () {
                        //console.log('CLICK EVENT events.' + ' >> afterDenied');
                        setShoppingCartButton("create", "2", button);
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
    if (memberStatus === false) {
        callddkUIComponent5("請先進行登入", "");
    }
}
function setShoppingCartButton(isCheck, buyType, button) {
    $.ajax({
        type: "POST",
        url: "/models/SetShoppingCart.php",
        async: false,
        dataType: "json",
        data: {
            "para1": isCheck,
            "para2": buyType,
            "para3": $(button).attr("source"),
            "para4": $(button).val()
        },
        success: function (data) {
            $(button).attr("status", "check");
            $(button).html("<span>已加入購物車</span>");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
function setShoppingCartBuyTypeCheckbox(checkbox) {
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
                            setShoppingCartCheckbox("create", "1", checkbox);
                        },
                        afterDenied: function () {
                            //console.log('CLICK EVENT events.' + ' >> afterDenied');
                            setShoppingCartCheckbox("create", "2", checkbox);
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
            setShoppingCartCheckbox("delete", "0", checkbox);
        }
    }
    if (memberStatus === false) {
        $(checkbox).prop("checked", false);
        callddkUIComponent5("請先進行登入", "");
    }
}
function setShoppingCartCheckbox(isCheck, buyType, checkbox) {
    $.ajax({
        type: "POST",
        url: "/models/SetShoppingCart.php",
        async: false,
        dataType: "json",
        data: {
            "para1": isCheck,
            "para2": buyType,
            "para3": $(checkbox).attr("source"),
            "para4": $(checkbox).val()
        },
        success: function (data) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
var onYouTubeIframeAPIReady;//youTube API default ready call function name.
$(document).ready(function () {
    onYouTubeIframeAPIReady = DDK.easy.initYoutubeVideo; //set youTube API default ready call function to custom object function.
    //include youTube API core file begin
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //include youTube API core file end

    $(document).on('click', '.shopping .buyBtn', function (event) {
        if ($(this).attr("status") === "check") {
            return;
        }
        if ($(this).attr("status") === "uncheck") {
            setShoppingCartBuyTypeButton(this);
            return;
        }
    });
})
