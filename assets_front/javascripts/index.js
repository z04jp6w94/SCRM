function initIndexNews() {
    $.ajax({
        type: "POST",
        url: "/models/GetIndexNews.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            $(".pressList dd ul").empty();
            var li = "";
            $.each(data, function (index, value) {
                li += "<li>";
                li += "<strong><span>HOT</span></strong><time datetime='" + data[index][0] + "'>" + data[index][0] + "</time>";
                li += "<p><a>" + data[index][1] + "</a></p>";
                li += "<div class='clearFloat'></div>";
                li += "</li>";
            })
            $(".pressList dd ul").html(li);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var errorMsg = "STATUS:" + jqXHR.status;
            errorMsg += "-" + jqXHR.readyState;
            errorMsg += "-" + textStatus;
            alert(errorMsg);
        }
    });
}
function initIndexVideo() {
    $.ajax({
        type: "POST",
        url: "/models/GetIndexVideo.php",
        async: false,
        dataType: "json",
        data: {
        },
        success: function (data) {
            $(".contentBrief .slickPlugIn").empty();
            var li = "";
            $.each(data, function (index, value) {
                li += "<li>";
                li += "<div class='ctx'>";
                li += "<a href='https://www.youtube.com/watch?v=" + data[index][0] + "' target='_blank' data-video-key='contentbrief_'><span>" + data[index][1] + "</span><strong>&nbsp;</strong></a>";
                li += "<figure class='preloadImg'><img src='http://img.youtube.com/vi/" + data[index][0] + "/maxresdefault.jpg'></figure>";
                li += "<div class='video'><div><!-- youtube iframe --></div></div>";
                li += "</div>";
                li += "</li>";
            })
            $(".contentBrief .slickPlugIn").html(li);
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
    onYouTubeIframeAPIReady = DDK.index.initYoutubeVideo;//set youTube API default ready call function to custom object function.
    //include youTube API core file begin
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //include youTube API core file end

    initIndexNews();
    initIndexVideo();
    DDK.index.initShowcaseVideos();
});