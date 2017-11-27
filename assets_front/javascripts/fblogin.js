window.fbAsyncInit = function () {
    FB.init({
        appId: '1411144132308262',
        status: true,
        xfbml: true,
        version: 'v2.9'
    });
    $(".soc1").click(function () {
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('login success');
                FB.api('/me', {
                    fields: 'email,name,picture'
                }, function (response) {
                    console.log(response);
                    console.log(response.picture.data.url);
                    var email = response.email;
                    var name = response.name;
                    var pictureURL = response.picture.data.url;
                    var source = 3;
                    /*
                     var xhr = new XMLHttpRequest();
                     xhr.open("POST", "/Traveler/FBRegisterLoginController.do",
                     true);
                     xhr.setRequestHeader("Content-type",
                     "application/x-www-form-urlencoded");
                     xhr.send("email=" + email + "&name=" + name
                     + "&pictureURL=" + pictureURL + "&source="
                     + source);
                     xhr.onreadystatechange = function () {
                     if (xhr.readyState === 4) {
                     if (xhr.status === 200) {
                     location.href = "/Traveler/index.jsp";
                     }
                     }
                     }
                     */
                });
            } else {
                console.log('login fail');
            }
        }, {
            scope: 'email'
        });
    });
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));