<?php
header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('date.timezone', 'Asia/Taipei');
ini_set('session.save_path', $_SERVER['DOCUMENT_ROOT'] . '/assets_rear/session/');
session_start();
//函式庫
include_once($_SERVER['DOCUMENT_ROOT'] . "/config/chiliman_config.php");
//取得固定參數
$user_id = !empty($_SESSION["user_id"]) ? $_SESSION["user_id"] : NULL;
$programPath = explode(".php", $_SERVER['REQUEST_URI'])[0] . ".php";
$fileName = basename(__FILE__, '.php');
//取得登入訊息
$msg = !empty($_REQUEST["msg"]) ? $_REQUEST["msg"] : NULL;
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title><?php echo HEADTITLE; ?>維護系統</title>
        <link rel="stylesheet" type="text/css" href="/assets_rear/stylesheets/Maintain.css" />
        <link rel="stylesheet" type="text/css" href="/assets_rear/stylesheets/Power.css" />
        <link rel="stylesheet" type="text/css" href="/assets_rear/stylesheets/tipsy.css" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/javascript" src="/assets_rear/javascripts/jquery.tipsy.js"></script>
        <style>
            body{
                background-color: #F1F1F1;
            }
            #outer{
                width: 100%;
                border-top-width: 4px;
                border-top-style: solid;
                border-top-color: #ff6406;
            }
            #loginskin{
                background-color: #FFF;
                width: 270px;
                border: 1px solid #b1b1b1;
                border-radius: 6px;
                -webkit-box-shadow: 0 1px 20px rgba(0,0,0,0.25);
                -moz-box-shadow: 0 1px 20px rgba(0,0,0,0.25);
                box-shadow: 0 1px 20px rgba(0,0,0,0.25);
                margin: 0px auto 0px auto;
                position: absolute;
                display: none;
            }
            #pwchg{

            }
            #loginskin ul{
                list-style-type: none;
                padding: 0;
            }
            #sys-logo{
                margin: 0px auto 0px auto;
                padding-top: 15px;
                text-align: center;
            }
            #sys-name{
                text-align: center;
                font-size: 95%;
                padding: 12px 0 30px 0;
            }
            #sys-account, #sys-c-id, #sys-password, #sys-com, #sys-submit{
                width: 218px;
                margin: 0px auto 0px auto;
                padding-bottom: 15px;
            }
            #sys-account{
                position: relative;
            }
            #sys-loading{
                position: absolute;
                top: 259px;
                left: 80px;
                display: none;
            }
            #sys-account input{
                width: 218px;
                height: 45px;
                border: 1px solid #c9cbd0;
                text-indent: 37px;
                background: url("/assets_rear/images/Icon_account.png") no-repeat scroll 14px 12px #fff;
                border-radius: 3px;
                font-family: Verdana, Arial, "微軟正黑體", "新細明體";
            }
            #sys-c-id input{
                width: 218px;
                height: 45px;
                border: 1px solid #c9cbd0;
                text-indent: 37px;
                background: url("/assets_rear/images/Icon_account.png") no-repeat scroll 14px 12px #fff;
                border-radius: 3px;
                font-family: Verdana, Arial, "微軟正黑體", "新細明體";
            }

            #sys-password input{
                width: 218px;
                height: 45px;
                border: 1px solid #c9cbd0;
                text-indent: 37px;
                background: url("/assets_rear/images/Icon_password.png") no-repeat scroll 14px 12px #fff;
                border-radius: 3px;
                font-family: Verdana, Arial, "微軟正黑體", "新細明體";
            }
            #sys-account input.redline, #sys-c-id input.redline,#sys-password input.redline, #sys-com input.redline{
                border: 1px solid #ff6406;
            }
            #sys-submit input{
                width: 218px;
                height: 45px;
                border: 0px;
                border-radius: 3px;
                background-color: #000000;
                color: #FFF;
                cursor: pointer;
            }
            #sys-submit input:hover{
                background-color: #444444;
                color: #FFF;
            }
            #sys-pwchg a{
                position: absolute;
                bottom: -35px;
                left: 25px;
                font-family: Verdana, Arial, "微軟正黑體", "新細明體";
                font-size: 12px;
                color:#CE0000;
                text-decoration: none;
            }
            #sys-pwchg a:hover{
                color:#000;
            }
        </style>
        <script type="text/javascript">
            var _UsDocWidth;
            var _UsDocHeight;
            $(document).ready(function () {
                _UsDocWidth = $(document).width();												//Html 寬
                _UsDocHeight = $(document).height();												//Html 高
            });
            //window load
            $(window).load(function () {
                SetPosition();
                $("#loginskin [title]").tipsy({trigger: 'manual', gravity: 'w'});
                $("#loginskin").tipsy({trigger: 'manual', gravity: 's'}).tipsy("show");
                $("#Account").focus();
                $("#BtnSubmit").click(function () {
                    var rtnType = true;
                    if ($("#Account").val() == "") {
                        $("#Account").tipsy("show");
                        $("#Account").addClass("redline").focus();
                        rtnType = false;
                        return false;
                    }
                    if ($("#Password").val() == "") {
                        $("#Password").tipsy("show");
                        $("#Password").addClass("redline").focus();
                        rtnType = false;
                        return false;
                    }
                    if (rtnType) {
                        $(this).css({background: "#cecfd0"}).attr("value", "驗證中").attr("disabled", true);
                        $("#sys-submit input, #sys-submit input:hover").css({color: "#585858"});
                        $("#sys-loading").show();
                        $("#form1").submit();
                    }
                });
                $("#Account, #Password").keyup(function () {
                    $(this).removeClass("redline");
                    $(this).tipsy("hide");
                    return false;
                });
            });
            //document keydown
            $(document).keydown(function (event) {
                switch (event.keyCode) {
                    //Enter
                    case 13:
                        $("#BtnSubmit").click();
                        break;
                }
            });
            //window resize
            $(window).resize(function () {
                _UsDocWidth = $(document).width();													//Html 寬
                _UsDocHeight = $(document).height();												//Html 高
                SetPosition();
            });
            //function zone
            function SetPosition() {
                var loginskinHeight = $("#loginskin").height();
                $("#loginskin").css({
                    top: (_UsDocHeight / 2) - (loginskinHeight / 2),
                    left: (_UsDocWidth / 2) - 135
                });
                $("#loginskin").fadeIn();
            }
        </script>
    </head>
    <body>
        <form name="form1" id="form1" method="post" action="<?php echo $fileName; ?>_Action.php" autocomplete="off">
            <div id="outer">
                <div id="rtnMsg" title="<?php echo $msg; ?>"></div>
                <div id="loginskin" title="<?php echo $msg; ?>">
                    <ul>
                        <li id="sys-logo"><img src="/assets_rear/images/Logo.png" height="30" border="0"></li>
                        <li id="sys-name"><?php echo HEADTITLE; ?></li>
                        <li id="sys-c-id"><input id="C_ID" name="user_c_id" autocomplete="off" type="text" maxlength="20" tabindex="2" value="0000000000" placeholder="客戶號" title="請輸入客戶號"></li>
                        <li id="sys-account"><input id="Account" name="user_account" autocomplete="off" type="text" maxlength="20" tabindex="2" placeholder="帳號" title="請輸入帳號"></li>
                        <li id="sys-password"><input id="Password" name="user_password" autocomplete="off" type="password" maxlength="20" tabindex="3" placeholder="密碼" title="請輸入密碼"></li>
                        <li id="sys-loading"><img src="/assets_rear/images/loading.gif" width="16" height="16"></li>
                        <li id="sys-submit"><input id="BtnSubmit" name="BtnSubmit" type="button" value="登　入" tabindex="4"></li>
                    </ul>
                </div>
            </div>
        </form>
    </body>
</html>
