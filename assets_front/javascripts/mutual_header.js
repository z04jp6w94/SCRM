$(document).ready(function () {
    $(".links .search button").click(function () {
        window.location.href = "/search.php?easy100search=" + $("#easy100search").val();
    });
})