function initSponsorContent() {
    $.ajax({
        type: "POST",
        url: "/models/GetSponsorContent.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            $(".master .partnerList ul").empty();
            var li = "";
            $.each(data, function (index, value) {
                li += "<li>";
                li += "<div class='pseudoTable'>";
                li += "<div class='Thead'><div></div></div>";
                li += "<div class='Tbody'>";
                li += "<div>";
                li += "<a href='" + data[index][0] + "' title='" + data[index][1] + "' target='_blank'><img src='" + data[index][2] + "'><br><span>" + data[index][1] + "</span></a>";
                li += "</div>";
                li += "</div>";
                li += "<div class='Tfooter'><div></div></div>";
                li += "</div>";
                li += "</li>";
            });
            $(".master .partnerList ul").html(li);
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
    initSponsorContent();
})