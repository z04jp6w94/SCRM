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
function initExperienceContent(para1, para2, para3, para4) {
    $.ajax({
        type: "POST",
        url: "/models/GetExperienceContent.php",
        async: false,
        dataType: "json",
        data: {
            "para1": para1,
            "para2": para2,
            "para3": para3,
            "para4": para4
        },
        success: function (data) {
            if (data.length === 0) {
                $('.expList ul li').remove();
                $('.expList ul').hide();
                //$('.expList .noItem').show();
                $('.expList .final').html("沒有找到任何影片。");
                return;
            } else {
                $('.expList ul li').remove();
                $('.expList ul').hide();
                //$('.expList .noItem').show();
                var o_ary = [];
                $.each(data, function (index, value) {
                    var audition = {key: data[index][0], text: data[index][1]};
                    o_ary.push(audition);
                });
                var startAt = $('.expList ul li').length;//置入前LI 的數量
                var fotoCaptain_ary = [];//儲存要被resize 的圖檔參照的陣列
                var listScode = '<a href="https://www.youtube.com/watch?v=##key##"><strong class="preloadImg"><img src="http://img.youtube.com/vi/##key##/mqdefault.jpg"></strong><span>##text##</span></a>';//新增內容的模板
                var tmpCode, tmpE;
                for (var i = 0; i < o_ary.length; i++) {
                    tmpE = document.createElement('LI');
                    tmpCode = listScode;
                    tmpCode = FxReplace(tmpCode, '##key##', o_ary[i].key, 'all');
                    tmpCode = FxReplace(tmpCode, '##text##', o_ary[i].text, 'all');
                    tmpE.innerHTML = tmpCode;//生成為DOM 物件
                    fotoCaptain_ary.push($(tmpE).find('img')[0]);//取得新產生的項目內的IMG 參照 , [0] = 跳脫jQuery 物件
                    $('.expList ul').append(tmpE);
                }
                $('.expList ul').show();
                $('.expList .noItem').hide();
                DDK.mutual.fotoCaptain.add({
                    preload: true,
                    update: true,
                    contenter: 'strong',
                    imageList: fotoCaptain_ary,
                    formatter: 'shrink'
                });//對於新加入到畫面上的LI 內的圖檔產生預載效果與監控resize
                $('.expList .final').html("<button type='button' class='moreBtn' count='" + (parseInt(para4) + 10) + "'><span>載入更多影片</span></button>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
function moreExperienceContent(para1, para2, para3, para4) {
    $.ajax({
        type: "POST",
        url: "/models/GetExperienceContent.php",
        async: false,
        dataType: "json",
        data: {
            "para1": para1,
            "para2": para2,
            "para3": para3,
            "para4": para4
        },
        success: function (data) {
            if (data.length === 0) {
                $('.expList .final').html("沒有找到任何影片。");
                return;
            } else {
                var o_ary = [];
                $.each(data, function (index, value) {
                    var audition = {key: data[index][0], text: data[index][1]};
                    o_ary.push(audition);
                });
                var startAt = $('.expList ul li').length;//置入前LI 的數量
                var fotoCaptain_ary = [];//儲存要被resize 的圖檔參照的陣列
                var listScode = '<a href="https://www.youtube.com/watch?v=##key##"><strong class="preloadImg"><img src="http://img.youtube.com/vi/##key##/mqdefault.jpg"></strong><span>##text##</span></a>';//新增內容的模板
                var tmpCode, tmpE;
                for (var i = 0; i < o_ary.length; i++) {
                    tmpE = document.createElement('LI');
                    tmpCode = listScode;
                    tmpCode = FxReplace(tmpCode, '##key##', o_ary[i].key, 'all');
                    tmpCode = FxReplace(tmpCode, '##text##', o_ary[i].text, 'all');
                    tmpE.innerHTML = tmpCode;//生成為DOM 物件
                    fotoCaptain_ary.push($(tmpE).find('img')[0]);//取得新產生的項目內的IMG 參照 , [0] = 跳脫jQuery 物件
                    $('.expList ul').append(tmpE);
                }
                $('.expList ul').show();
                $('.expList .noItem').hide();
                DDK.mutual.fotoCaptain.add({
                    preload: true,
                    update: true,
                    contenter: 'strong',
                    imageList: fotoCaptain_ary,
                    formatter: 'shrink'
                });//對於新加入到畫面上的LI 內的圖檔產生預載效果與監控resize
                $('.expList .final').html("<button type='button' class='moreBtn' count='" + (parseInt(para4) + 10) + "'><span>載入更多影片</span></button>");
            }
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
    $("#category").change(function () {
        $("#course").html("<option value=''>請選擇您的科目</option>");
        $("#grade").html("<option value=''>請選擇您的級別</option>");
        if ($("#category").val() != "")
            ajaxSelectOption("/models/GetExperienceOption.php", $("#category").val(), "", "", "course", {"請選擇您的科目": ""});
    });
    $("#course").change(function () {
        $("#grade").html("<option value=''>請選擇您的級別</option>");
        if ($("#course").val() != "")
            ajaxSelectOption("/models/GetExperienceOption.php", $("#category").val(), $("#course").val(), "", "grade", {"請選擇您的級別": ""});
    });
    $("#search").click(function () {
        initExperienceContent($("#category").val(), $("#course").val(), $("#grade").val(), 0);
    });
    $(document).on('click', '.final .moreBtn', function (event) {
        moreExperienceContent($("#category").val(), $("#course").val(), $("#grade").val(), $(this).attr("count"));
    });
})
