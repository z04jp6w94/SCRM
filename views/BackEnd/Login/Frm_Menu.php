<?php
header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('date.timezone', 'Asia/Taipei');
ini_set('session.save_path', $_SERVER['DOCUMENT_ROOT'] . '/assets_rear/session/');
session_start();
//函式庫
include_once($_SERVER['DOCUMENT_ROOT'] . "/config/chiliman_config.php");
//判斷是否登入
if (!isset($_SESSION["user_id"])) {
    header("Location:https://" . $_SERVER['HTTP_HOST'] . "/views/BackEnd/Login/Member_Login.php");
}
//取得固定參數
$user_id = !empty($_SESSION["user_id"]) ? $_SESSION["user_id"] : NULL;
$programPath = explode(".php", $_SERVER['REQUEST_URI'])[0] . ".php";
$fileName = basename(__FILE__, '.php');
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
$sql = "SELECT user_name FROM sysuser WHERE user_id = ?";
$rsVal = $mysqli->readValuePreSTMT($sql, "s", array($user_id));
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title><?php echo HEADTITLE; ?>維護介面</title>
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/views/BackEnd/CommonHeader.php"); ?>
    </head>
    <body>
        <div id="DivMain">
            <div id="FrameTop">
                <span id="FrameTopLeft">目前使用者為：<?php echo $rsVal; ?></span>
                <span id="FrameTopRight"><img src="/assets_rear/images/Icon_01.png" align="absmiddle"><a href="Member_Logout_Action.php" target="_parent" class="LFFFFFF" onFocus="this.blur();">登出系統</a></span>
            </div>
            <div id="FrameLeft"><iframe frameborder="0" width="208" src="User_Menu.php" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="no" name="Left" id="Left"></iframe></div>
            <div id="FrameLine"></div>
            <div id="FrameLineImg" align="center"><a href="#" class="FrameLineImgLink" onFocus="this.blur();"><img src="/assets_rear/images/icon_25.gif" width="3" height="45" border="0"></a></div>
            <div id="FrameRight"><iframe frameborder="0" src="Menu_Welcome.php" marginheight="0" marginwidth="0" scrolling="auto" allowtransparency="no" name="main" id="main"></iframe></div>
        </div>
    </body>
</html>


