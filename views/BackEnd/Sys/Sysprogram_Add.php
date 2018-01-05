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
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title></title>
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/views/BackEnd/CommonHeader.php"); ?>
        <script type="text/javascript">
            function chkFormField(createForm) {
                if (isFormDataEmpty(createForm.program_name, "系統程式名稱")) {
                } else if (isFormDataEmpty(createForm.program_path, "系統程式路徑")) {
                } else {
                    createForm.submit();
                }
            }
        </script>
    </head>
    <body>
        <div id="Main">
            <form name="createForm" id="createForm" method="post" action="<?php echo $fileName; ?>_Create.php" enctype="multipart/form-data">
                <input type="hidden" id="fileName" name="fileName" value="<?php echo $fileName; ?>" />
                <input type="hidden" id="currentPage" name="currentPage" value="<?php echo $currentPage; ?>" />                       
                <input type="hidden" id="currentPageRecord" name="currentPageRecord" value="<?php echo $currentPageRecord; ?>" />
                <input type="hidden" id="dataKey" name="dataKey" value="<?php echo $dataKey; ?>" />
                <div id="MainTopMenu">
                    <span class="MenuLeft">
                        <ul class="Menunav">
                            <li class="red"><a onClick="chkFormField(createForm);" class="LFFFFFF SetCursor">儲存</a></li>
                            <li class="gray"><a href="<?php echo $fileName . ".php?currentPage=" . $currentPage; ?>" class="L333333 SetCursor">取消</a></li>
                        </ul>
                    </span>
                </div>
                <div id="MainDesc">
                    <table width="100%" border="0" cellpadding="4" cellspacing="0" class="power-Font03">
                        <tr>
                            <td style="width: 200px;"><div align="right">系統程式名稱：</div></td>
                            <td><input  type="text" name="program_name" id="program_name" size="60" maxlength="100" value="" /></td>
                        </tr>
                        <tr>
                            <td><div align="right">系統程式路徑：</div></td>
                            <td><input  type="text" name="program_path" id="program_path" size="60" maxlength="100" value="" /></td>
                        </tr>
                    </table>
                </div>
            </form>
        </div>
    </body>
</html>
