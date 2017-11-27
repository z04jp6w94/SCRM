function initContactContent() {
    $.ajax({
        type: "POST",
        url: "/models/GetContactContent.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            $(".master .maps ul").empty();
            var li = "";
            $.each(data, function (index, value) {
                li += "<li>";
                li += data[index][0];
                li += "<section>";
                li += "<h3 class='subTitle'><span>" + data[index][1] + "</span></h3>";
                li += "<p>";
                li += "電話：" + data[index][2] + "<br>";
                if (data[index][3] !== "") {
                    li += "傳真：" + data[index][3] + "<br>";
                }
                li += "地址：" + data[index][4] + "<br>";
                li += "營業時間：" + data[index][5] + "<br>";
                li += "</p>";
                li += "<p>";
                li += "<span class='star'>★</span>免付費0800電話：<br>";
                li += "<strong>" + data[index][6] + "</strong>";
                li += "</p>";
                li += "</section>";
                li += "<div class='clearFloat'></div>";
                li += "</li>";
            });
            $(".master .maps ul").html(li);
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
    initContactContent();
})