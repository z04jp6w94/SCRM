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
$c_group_id = GetEmpty($_SESSION["group_id"]);
//取得固定參數
$fileName = $_REQUEST["fileName"];
$currentPage = $_REQUEST["currentPage"];
$currentPageRecord = $_REQUEST["currentPageRecord"];
$dataKey = $_REQUEST["dataKey"];
//資料庫連線  
$mysqli = new DatabaseProcessorForChiliman();
/*
$sql = "SELECT a.program_id, a.program_name, IFNULL(b.authority_create,'N') AS 'authority_create', IFNULL(b.authority_read,'N') AS 'authority_read', IFNULL(b.authority_update,'N') AS 'authority_update', IFNULL(b.authority_delete,'N') AS 'authority_delete', IFNULL(b.authority_dsp,'N') AS 'authority_dsp'";
$sql .= " FROM sysprogram a";
$sql .= " LEFT JOIN sysauthority b ON a.program_id = b.program_id AND b.group_id = ? ";
$initAry = $mysqli->readArrayPreSTMT($sql, "s", array($dataKey), 7);
$programCount = count($initAry);
 * 
 */
$sql = "SELECT a.program_id, a.program_name, IFNULL(b.authority_create,'N') AS 'authority_create', IFNULL(b.authority_read,'N') AS 'authority_read', IFNULL(b.authority_update,'N') AS 'authority_update', IFNULL(b.authority_delete,'N') AS 'authority_delete', IFNULL(b.authority_dsp,'N') AS 'authority_dsp'";
$sql .= " FROM sysprogram a";
$sql .= " LEFT JOIN sysauthority b ON a.program_id = b.program_id AND b.group_id = ? ";
$sql .= " WHERE 1 = 1 ";
$sql .= " AND a.program_id in (select program_id from sysmenu where group_id = ? ) ";
$initAry = $mysqli->readArrayPreSTMT($sql, "ss", array($dataKey, $c_group_id), 7);
$programCount = count($initAry);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title></title>
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/views/BackEnd/CommonHeader.php"); ?>
        <script type="text/javascript">
            function authorityAll(rowNum) {
                if ($("#authority_dsp" + rowNum).prop("checked")) {
                    $("#authority_create" + rowNum).prop("checked", true);
                    $("#authority_read" + rowNum).prop("checked", true);
                    $("#authority_update" + rowNum).prop("checked", true);
                    $("#authority_delete" + rowNum).prop("checked", true);
                } else {
                    $("#authority_create" + rowNum).prop("checked", false);
                    $("#authority_read" + rowNum).prop("checked", false);
                    $("#authority_update" + rowNum).prop("checked", false);
                    $("#authority_delete" + rowNum).prop("checked", false);
                }
            }
            function chkFormField(updateForm) {
                updateForm.submit();
            }
        </script>
    </head>
    <body>
        <div id="Main">
            <div id="MainTopMenu">
                <span class="MenuLeft">
                    <ul class="Menunav">
                        <li class="red"><a onClick="chkFormField(updateForm);" class="LFFFFFF SetCursor">儲存</a></li>
                        <li class="gray"><a href="<?php echo $fileName . ".php?currentPage=" . $currentPage; ?>" class="L333333 SetCursor">取消</a></li>
                    </ul>
                </span>
            </div>
            <div id="MainTitle">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" background="/assets_rear/images/TdBg01.gif">
                    <tr class="power-Font03" height="29">
                        <td width="50" class="TRMM-td03 TRMM-align">編號</td>
                        <td width="200" class="TRMM-td01 TRMM-alignLeft">系統程式名稱</td>  
                        <td width="80" class="TRMM-td01 TRMM-align">新增權限</td>   
                        <td width="80" class="TRMM-td01 TRMM-align">查詢權限</td>   
                        <td width="80" class="TRMM-td01 TRMM-align">修改權限</td>    
                        <td width="80" class="TRMM-td01 TRMM-align">刪除權限</td> 
                        <td width="100" class="TRMM-td01 TRMM-align">後台是否顯示</td> 
                        <td width="" class="TRMM-td01 TRMM-align">備註</td> 
                    </tr>
                    <tr>
                        <td height="1" colspan="14" bgcolor="#E2E2E2"></td>
                    </tr>
                </table>
            </div>    
            <div id="MainDesc">
                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="power-Font03">
                    <form name="updateForm" id="updateForm" method="post" action="Sysauthority_Update.php" enctype="multipart/form-data">
                        <input type="hidden" id="fileName" name="fileName" value="<?php echo $fileName; ?>" />
                        <input type="hidden" id="currentPage" name="currentPage" value="<?php echo $currentPage; ?>" />                       
                        <input type="hidden" id="currentPageRecord" name="currentPageRecord" value="<?php echo $currentPageRecord; ?>" />
                        <input type="hidden" id="dataKey" name="dataKey" value="<?php echo $dataKey; ?>" />
                        <input type="hidden" id="programCount" name="programCount" value="<?php echo $programCount; ?>" />
                        <?php $rowNum = 0; ?>
                        <?php foreach ($initAry as $rsAry) { ?>    
                            <?php $rowNum++; ?>
                            <tr style="height: 30px;"<?php if ($rowNum % 2 == 1) echo ' bgcolor="#F1F5FA"'; ?> onMouseOut="cbar(this)" onMouseOver="sbar(this)">
                                <td width="50" class="TRMM-td03 TRMM-align"><?php echo $rowNum; ?></td> 
                                <td width="200" class="TRMM-td01 TRMM-alignLeft"><input type="hidden" id="program_id<?php echo $rowNum ?>" name="program_id<?php echo $rowNum ?>" value="<?php echo $rsAry[0]; ?>" /><?php echo $rsAry[1]; ?></td>   
                                <td width="80" class="TRMM-td01 TRMM-align"><input type="checkbox" name="authority_create<?php echo $rowNum ?>" id="authority_create<?php echo $rowNum ?>" value="Y"<?php if ($rsAry[2] == 'Y') echo " checked"; ?> /></td>   
                                <td width="80" class="TRMM-td01 TRMM-align"><input type="checkbox" name="authority_read<?php echo $rowNum ?>" id="authority_read<?php echo $rowNum ?>" value="Y"<?php if ($rsAry[3] == 'Y') echo " checked"; ?> /></td>   
                                <td width="80" class="TRMM-td01 TRMM-align"><input type="checkbox" name="authority_update<?php echo $rowNum ?>" id="authority_update<?php echo $rowNum ?>" value="Y"<?php if ($rsAry[4] == 'Y') echo " checked"; ?> /></td>   
                                <td width="80" class="TRMM-td01 TRMM-align"><input type="checkbox" name="authority_delete<?php echo $rowNum ?>" id="authority_delete<?php echo $rowNum ?>" value="Y"<?php if ($rsAry[5] == 'Y') echo " checked"; ?> /></td>  
                                <td width="100" class="TRMM-td01 TRMM-align"><input type="checkbox" name="authority_dsp<?php echo $rowNum ?>" id="authority_dsp<?php echo $rowNum ?>" value="Y"<?php if ($rsAry[6] == 'Y') echo " checked"; ?> onclick="authorityAll(<?php echo $rowNum ?>)"/></td>  
                                <td width="" class="TRMM-td01 TRMM-align">備註</td> 
                            </tr>
                        <?php } ?>
                        <tr>
                            <td height="1" colspan="14" bgcolor="#E2E2E2"></td>
                        </tr>
                    </form>
                </table>
            </div>
        </div>
    </body>
</html>
