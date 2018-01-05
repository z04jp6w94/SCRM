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
//SESSION
$c_id = GetEmpty($_SESSION["c_id"]);
//取得固定參數
$fileName = $_REQUEST["fileName"];
$currentPage = $_REQUEST["currentPage"];
$currentPageRecord = $_REQUEST["currentPageRecord"];
$dataKey = $_REQUEST["dataKey"];
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
$sql = "SELECT group_id, user_status, user_account, user_password, user_name, user_address, user_email, user_phone, c_id FROM sysuser WHERE user_id = ?";
$initAry = $mysqli->readArrayPreSTMT($sql, "s", array($dataKey), 9);
$sql = "SELECT group_id, group_name FROM sysgroup";
$sql .= " where c_id = ? ";
$sql .= " and group_id != '1' ";
$initAry1 = $mysqli->readArrayPreSTMT($sql, "s", array($c_id), 2);
$sql = " SELECT c_id, c_name from crm_m ";
$sql .= " WHERE c_id = ? ";
$userAry = $mysqli->readArrayPreSTMT($sql, "s", array($initAry[0][8]), 2);
$user_name = !empty($userAry[0][1]) ? trim($userAry[0][1]) : '';

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title></title>
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/views/BackEnd/CommonHeader.php"); ?>
        <script type="text/javascript">
            function chkFormField(updateForm) {
                if (isFormDataEmpty(updateForm.group_id, "系統群組名稱")) {
                } else if (isFormDataEmpty(updateForm.user_status, "帳號是否啟用")) {
                } else if (isFormDataEmpty(updateForm.user_account, "系統使用者帳號")) {
                } else if (isFormDataEmpty(updateForm.user_password, "系統使用者密碼")) {
                } else if (isFormDataEmpty(updateForm.user_name, "系統使用者姓名")) {
                } else if (isFormDataEmpty(updateForm.user_email, "系統使用者信箱")) {
                } else {
                    updateForm.submit();
                }
            }
        </script>
    </head>
    <body>
        <div id="Main">
            <form name="updateForm" id="updateForm" method="post" action="<?php echo $fileName; ?>_Update.php" enctype="multipart/form-data">
                <input type="hidden" id="fileName" name="fileName" value="<?php echo $fileName; ?>" />
                <input type="hidden" id="currentPage" name="currentPage" value="<?php echo $currentPage; ?>" />                       
                <input type="hidden" id="currentPageRecord" name="currentPageRecord" value="<?php echo $currentPageRecord; ?>" />
                <input type="hidden" id="dataKey" name="dataKey" value="<?php echo $dataKey; ?>" />
                <div id="MainTopMenu">
                    <span class="MenuLeft">
                        <ul class="Menunav">
                            <li class="red"><a onClick="chkFormField(updateForm);" class="LFFFFFF SetCursor">儲存</a></li>
                            <li class="gray"><a href="<?php echo $fileName . ".php?currentPage=" . $currentPage; ?>" class="L333333 SetCursor">取消</a></li>
                        </ul>
                    </span>
                </div>
                <div id="MainDesc">
                    <table width="100%" border="0" cellpadding="4" cellspacing="0" class="power-Font03">
                        <tr>
                            <td style="width: 200px;"><div align="right">系統群組名稱：</div></td>
                            <td>
                                <select name="group_id" id="group_id" style="width: 200px;">
                                    <option value="">請選擇</option>
                                    <?php foreach ($initAry1 as $rsAry1) { ?>
                                        <option value="<?php echo $rsAry1[0] ?>"<?php if ($rsAry1[0] == $initAry[0][0]) echo ' selected'; ?>><?php echo $rsAry1[1] ?></option>
                                    <?php } ?>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><div align="right">客戶：</div></td>
                            <td>
                                <?php echo $user_name;?>
                            </td>
                        </tr>
                        <tr>
                            <td><div align="right">帳號是否啟用：</div></td>
                            <td>
                                <input type="radio" name="user_status" id="user_status" value="Y"<?php if ($initAry[0][1] == 'Y') echo " checked"; ?> />是
                                <input type="radio" name="user_status" id="user_status" value="N"<?php if ($initAry[0][1] == 'N') echo " checked"; ?> />否
                            </td>
                        </tr>
                        <tr>
                            <td><div align="right">系統使用者帳號：</div></td>
                            <td><input  type="text" name="user_account" id="user_account" size="60" maxlength="100" value="<?php echo $initAry[0][2]; ?>" /></td>
                        </tr>
                        <tr>
                            <td><div align="right">系統使用者密碼：</div></td>
                            <td><input  type="text" name="user_password" id="user_password" size="60" maxlength="100" value="<?php echo DECCode($initAry[0][3]); ?>" /></td>
                        </tr>
                        <tr>
                            <td><div align="right">系統使用者姓名：</div></td>
                            <td><input  type="text" name="user_name" id="user_name" size="60" maxlength="100" value="<?php echo $initAry[0][4]; ?>" /></td>
                        </tr>
                        <tr>
                            <td><div align="right">系統使用者地址：</div></td>
                            <td><input  type="text" name="user_address" id="user_address" size="60" maxlength="100" value="<?php echo $initAry[0][5]; ?>" /></td>
                        </tr>
                        <tr>
                            <td><div align="right">系統使用者信箱：</div></td>
                            <td><input  type="text" name="user_email" id="user_email" size="60" maxlength="100" value="<?php echo $initAry[0][6]; ?>" /></td>
                        </tr>
                        <tr>
                            <td><div align="right">系統使用者電話：</div></td>
                            <td><input  type="text" name="user_phone" id="user_phone" size="60" maxlength="100" value="<?php echo $initAry[0][7]; ?>" /></td>
                        </tr>
                    </table>
                </div>
            </form>
        </div>
    </body>
</html>
