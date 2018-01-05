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
    header("Location:http://" . $_SERVER['HTTP_HOST'] . "/views/BackEnd/Login/Member_Login.php");
}
//取得固定參數
$fileName = $_REQUEST["fileName"];
$currentPage = $_REQUEST["currentPage"];
$currentPageRecord = $_REQUEST["currentPageRecord"];
$dataKey = $_REQUEST["dataKey"];
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
$sql = "SELECT group_name FROM sysgroup WHERE group_id = ?";
$rsVal = $mysqli->readValuePreSTMT($sql, "s", array($dataKey));
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title><?php echo HEADTITLE; ?></title>
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/views/BackEnd/CommonHeader.php"); ?>
        <script type="text/javascript">
            $(document).ready(function () {
                var options = {
                    axis: "y",
                    delay: 0
                };
                $("#sysmenu").sortable(options);
            });
            function submit() {
                var sysmeunPara = $("#sysmenu").sortable("toArray", {attribute: "sysmeunPara"});
                var url = "Sysmenu_Order_Update.php?fileName=<?php echo $fileName; ?>&currentPage=<?php echo $currentPage; ?>";
                url += "&currentPageRecord=<?php echo $currentPageRecord; ?>&dataKey=<?php echo $dataKey; ?>&sysmeunPara=" + sysmeunPara
                window.location.href = url;
            }
        </script>
    </head>
    <body>
        <form name="updateForm" id="updateForm" method="post" action="Sysmenu_Order_Update.php" enctype="multipart/form-data">
            <input type="hidden" id="fileName" name="fileName" value="<?php echo $fileName; ?>" />
            <input type="hidden" id="currentPage" name="currentPage" value="<?php echo $currentPage; ?>" />                       
            <input type="hidden" id="currentPageRecord" name="currentPageRecord" value="<?php echo $currentPageRecord; ?>" />
            <input type="hidden" id="dataKey" name="dataKey" value="<?php echo $dataKey; ?>" />
            <div id="MainTopMenu">
                <span class="MenuLeft">
                    <ul class="Menunav">
                        <li class="red"><a onClick="submit();" class="LFFFFFF SetCursor">儲存</a></li>
                        <li class="gray"><a href="<?php echo $fileName . ".php?currentPage=" . $currentPage; ?>" class="L333333 SetCursor">取消</a></li>
                    </ul>
                </span>
            </div>
            <div id="MainDesc">
                <table width="100%" border="0" cellpadding="4" cellspacing="0" class="power-Font03">	
                    <tr>
                        <td style="width: 200px;"><div align="right"><?php echo $rsVal; ?>系統選單：</div></td>
                        <td>
                            <ul id="sysmenu" >
                                <?php getCurrentMenu($dataKey, 0); ?>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
        </form>
    </body>
</html>
