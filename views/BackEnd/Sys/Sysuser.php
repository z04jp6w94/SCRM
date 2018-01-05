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
$user_id = !empty($_SESSION["user_id"]) ? $_SESSION["user_id"] : NULL;
$c_id = GetEmpty($_SESSION["c_id"]);
$programPath = explode(".php", $_SERVER['REQUEST_URI'])[0] . ".php";
$fileName = basename(__FILE__, '.php');
//取得查詢參數
$sGroup_name = !empty($_REQUEST["sGroup_name"]) ? $_REQUEST["sGroup_name"] : NULL;
$sUser_account = !empty($_REQUEST["sUser_account"]) ? $_REQUEST["sUser_account"] : NULL;
$sUser_name = !empty($_REQUEST["sUser_name"]) ? $_REQUEST["sUser_name"] : NULL;
$sUser_status = !empty($_REQUEST["sUser_status"]) ? $_REQUEST["sUser_status"] : NULL;
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
$sqlFrom = " FROM sysuser a";
$sqlFrom .= " LEFT JOIN sysgroup b ON a.group_id = b.group_id";
$sqlWhere = " WHERE 1 = 1";
if (!empty($sGroup_name))
    $sqlWhere .= " AND b.group_name = '" . $sGroup_name . "'";
if (!empty($sUser_account))
    $sqlWhere .= " AND a.user_account = '" . $sUser_account . "'";
if (!empty($sUser_name))
    $sqlWhere .= " AND a.user_name = '" . $sUser_name . "'";
if (!empty($sUser_status))
    $sqlWhere .= " AND a.user_status = '" . $sUser_status . "'";
//確認使用者權限
$create = "disabled";
$read = "disabled";
$update = "disabled";
$delete = "disabled";

chkUserFunc($mysqli, $user_id, $programPath);
//確認畫面頁數
$totalRecord = 0;
$perPageRecord = 6;
$totalPage = 0;
$currentPage = !empty($_REQUEST["currentPage"]) ? $_REQUEST["currentPage"] : 0;
$firstRecord = 0;
$currentPageRecord = 0;

setScreenPage($mysqli, $sqlFrom, $sqlWhere);
//取得畫面內容
$sql = "SELECT a.user_id, a.user_status, b.group_name, a.user_account, a.user_password, a.user_name, a.user_email, a.user_phone";
$sql .= $sqlFrom;
$sql .= $sqlWhere;
$sql .= " LIMIT ?, ?";
$initAry = $mysqli->readArrayPreSTMT($sql, "ss", array($firstRecord, $currentPageRecord), 8);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title></title>
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/views/BackEnd/CommonHeader.php"); ?>
        <script type="text/javascript">
            function changePage(action) {
                var url = "<?php echo $fileName . ".php?"; ?>";
                var currentPage = "";
                switch (action) {
                    case "first":
                        currentPage = 1;
                        break;
                    case "previous":
                        currentPage = <?php echo $currentPage - 1; ?>;
                        break;
                    case "next":
                        currentPage = <?php echo $currentPage + 1; ?>;
                        break;
                    case "last":
                        currentPage = <?php echo $totalPage; ?>;
                        break;
                    default:
                        currentPage = action;
                        break;
                }
                url += 'currentPage=' + currentPage;
                url += '&sGroup_name=<?php echo $sGroup_name; ?>';
                url += '&sUser_account=<?php echo $sUser_account; ?>';
                url += '&sUser_name=<?php echo $sUser_name; ?>';
                url += '&sUser_status=<?php echo $sUser_status; ?>';
                window.location.href = url;
            }
            function excute(action) {
                switch (action) {
                    case "add":
                        Form2.action = '<?php echo $fileName; ?>_Add.php';
                        Form2.submit();
                        break;
                    case "search":
                        Form1.actoin = '<?php echo $fileName; ?>.php';
                        Form1.submit();
                        break;
                    case "updateBatch":
                        Form2.action = '<?php echo $fileName; ?>_UpdateBatch.php';
                        for (var i = 0; i < <?php echo $currentPageRecord; ?>; i++) {
                            if (document.getElementById("rowNum" + (i + 1)).checked) {
                                if (isFormDataEmpty(document.getElementById("user_name" + (i + 1)), "系統使用者帳號")) {
                                    return;
                                } else if (isFormDataEmpty(document.getElementById("user_name" + (i + 1)), "系統使用者姓名")) {
                                    return;
                                } else if (isFormDataEmpty(document.getElementById("user_email" + (i + 1)), "系統使用者信箱")) {
                                    return;
                                }
                            }
                        }
                        checkBeforeSubmit(Form2, "rowNum", "更新")
                        break;
                    case "delete":
                        Form2.action = '<?php echo $fileName; ?>_Delete.php';
                        checkBeforeSubmit(Form2, "rowNum", "刪除")
                        break;
                    case "update":
                        Form2.action = '<?php echo $fileName; ?>_Modify.php';
                        Form2.submit();
                        break;
                    case "change":
                        Form2.action = '<?php echo $fileName; ?>_Change.php';
                        Form2.submit();
                        break;
                }
            }
            function setKey(dataKey, dspKey) {
                Form2.dataKey.value = dataKey;
                Form2.dspKey.value = dspKey;
            }
        </script>
    </head>
    <body>
        <div id="MainTip">
            <form id="Form1" name="Form1" method="post">
                <ul class="TipMenunav">
                    <li class="TipIpt">
                        <ul>
                            <li>系統群組名稱：<input type="text" name="sGroup_name" id="sGroup_name" value="" maxlength="50" style="width: 300px;" /></li>
                        </ul>
                        <ul>
                            <li>系統使用者帳號：<input type="text" name="sUser_account" id="sUser_account" value="" maxlength="50" style="width: 300px;"></li>
                        </ul>
                        <ul>
                            <li>系統使用者姓名：<input type="text" name="sUser_name" id="sUser_name" value="" maxlength="50" style="width: 300px;"></li>
                        </ul>
                        <ul>
                            <li>帳號是否啟用：
                                <input type="radio" name="sUser_status" id="sUser_status" value="Y" />是
                                <input type="radio" name="sUser_status" id="sUser_status" value="N" />否
                            </li>
                        </ul>
                    </li>
                    <li class="TipBtn">
                        <ul>
                            <li class="ble" id="TxtTipBtnSrh"><a href="#" onClick="excute('search');"><img src="/assets_rear/images/Icon_02.png" width="28" height="28" border="0" align="absmiddle"></a></li>
                            <li class="gray" id="TxtTipBtnCnl"><a class="L333333 SetCursor">取消</a></li>
                        </ul>
                    </li>
                </ul>
            </form>
        </div>
        <div id="Main">
            <div id="MainTopMenu">
                <span class="MenuLeft">
                    <ul class="Menunav">
                        <?php if ($create == "abled") { ?><li class="red"><a class="LFFFFFF SetCursor" onClick="excute('add');">建立</a></li><?php } ?>
                        <?php if ($read == "abled") { ?><li class="ble" id="CmBtnSearch"><a class="LFFFFFF SetCursor">查詢</a></li><?php } ?>
                        <?php if ($update == "abled") { ?><li class="gray" id="CmBtnSave" style="display: none;"><a class="L333333 SetCursor" onClick="excute('updateBatch');">儲存</a></li><?php } ?>                     
                        <?php if ($delete == "abled") { ?><li class="gray" id="CmBtnDel" style="display: none;"><a class="L333333 SetCursor" onClick="excute('delete');">刪除</a></li><?php } ?>
                        <li class="gray"><a class="SetCursor" onClick="changePage('first');" title="第一頁" id="tipBtnF"><img src="/assets_rear/images/Icon_05.png" width="28" height="28" border="0" align="absmiddle"></a></li>
                        <li class="gray"><a class="SetCursor" onClick="changePage('previous');" title="上一頁" id="tipBtnP"><img src="/assets_rear/images/Icon_06.png" width="28" height="28" border="0" align="absmiddle"></a></li>
                        <li class="gray"><a class="SetCursor" onClick="changePage('next');" title="下一頁" id="tipBtnN"><img src="/assets_rear/images/Icon_07.png" width="28" height="28" border="0" align="absmiddle"></a></li>
                        <li class="gray"><a class="SetCursor" onClick="changePage('last');" title="最後頁" id="tipBtnE"><img src="/assets_rear/images/Icon_08.png" width="28" height="28" border="0" align="absmiddle"></a></li>          
                    </ul>
                </span>
                <span class="MenuRight">
                    到第
                    <select id="PageNum" name="PageNum" onChange="changePage(this.value);">
                        <?php for ($i = 1; $i <= $totalPage; $i++) { ?>
                            <option value="<?php echo $i; ?>"<?php if ($i == $currentPage) echo " selected"; ?>><?php echo $i; ?></option>
                        <?php } ?>
                    </select> 
                    頁
                </span>
            </div>
            <div id="MainTitle">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" background="/assets_rear/images/TdBg01.gif">
                    <tr class="power-Font03" height="29">
                        <td width="50" class="TRMM-td03 TRMM-align">編號</td>
                        <td width="50" class="TRMM-td01 TRMM-align"><input type="checkbox" id="checkAll" name="checkAll" onClick="checkAll(Form2);"></td>
                        <?php if ($update == "abled") { ?><td width="50" class="TRMM-td01 TRMM-align">修改</td><?php } ?>
                        <td width="50" class="TRMM-td01 TRMM-align">啟用</td>  
                        <td width="100" class="TRMM-td01 TRMM-alignLeft">系統群組名稱</td>      
                        <td width="150" class="TRMM-td01 TRMM-alignLeft">系統使用者帳號</td>     
                        <td width="150" class="TRMM-td01 TRMM-alignLeft">系統使用者姓名</td>   
                        <td width="250" class="TRMM-td01 TRMM-alignLeft">系統使用者信箱</td>   
                        <td width="" class="TRMM-td01 TRMM-alignLeft">系統使用者電話</td>   
                    </tr>
                    <tr>
                        <td height="1" colspan="14" bgcolor="#E2E2E2"></td>
                    </tr>
                </table>
            </div>    
            <div id="MainDesc">
                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="power-Font03">
                    <form name="Form2" id="Form2" method="post">
                        <input type="hidden" id="fileName" name="fileName" value="<?php echo $fileName; ?>" />
                        <input type="hidden" id="currentPage" name="currentPage" value="<?php echo $currentPage; ?>" />                       
                        <input type="hidden" id="currentPageRecord" name="currentPageRecord" value="<?php echo $currentPageRecord; ?>" />
                        <input type="hidden" id="dataKey" name="dataKey" value="0" />
                        <input type="hidden" id="dspKey" name="dspKey" value="0" />
                        <?php $rowNum = 0; ?>
                        <?php foreach ($initAry as $rsAry) { ?>    
                            <?php $rowNum++; ?>
                            <tr<?php if ($rowNum % 2 == 1) echo ' bgcolor="#F1F5FA"'; ?> onMouseOut="cbar(this)" onMouseOver="sbar(this)">
                                <td width="50" class="TRMM-td03 TRMM-align"><?php echo $rowNum; ?></td>
                                <td width="50" height="28" class="TRMM-td01 TRMM-align"><input type="checkbox" name="rowNum<?php echo $rowNum ?>" id="rowNum<?php echo $rowNum ?>" value="<?php echo $rsAry[0]; ?>" onClick="checkSingle(Form2);" /></td>
                                <?php if ($update == "abled") { ?>
                                    <td width="50" class="TRMM-td01 TRMM-align">
                                        <a href="#" onClick="setKey('<?php echo $rsAry[0]; ?>');excute('update');">
                                            <img src="/assets_rear/images/editicon.gif" width="16" height="15" border="0">
                                        </a>
                                    </td>
                                <?php } ?>   
                                <td width="50" class="TRMM-td01 TRMM-align">
                                    <div align="center">
                                        <?php if ($rsAry[1] == "Y") { ?>
                                            <span id="DSPOff"><a onClick="setKey('<?php echo $rsAry[0]; ?>', 'N');excute('change');" title="關閉"></a></span>
                                        <?php } ?>
                                        <?php if ($rsAry[1] == "N") { ?>
                                            <span id="DSPOn"><a onClick="setKey('<?php echo $rsAry[0]; ?>', 'Y');excute('change');" title="開啟"></a></span>
                                        <?php } ?>
                                    </div>
                                </td>
                                <td width="100" class="TRMM-td01 TRMM-alignLeft"><?php echo $rsAry[2]; ?></td>
                                <td width="150" class="TRMM-td01 TRMM-alignLeft"><input type="text" name="user_account<?php echo $rowNum ?>" id="user_account<?php echo $rowNum ?>" size="60" maxlength="100" value="<?php echo $rsAry[3]; ?>" style="width: 130px;" /></td>  
                                <td width="150" class="TRMM-td01 TRMM-alignLeft"><input type="text" name="user_name<?php echo $rowNum ?>" id="user_name<?php echo $rowNum ?>" size="60" maxlength="100" value="<?php echo $rsAry[5]; ?>" style="width: 130px;" /></td>   
                                <td width="250" class="TRMM-td01 TRMM-alignLeft"><input type="text" name="user_email<?php echo $rowNum ?>" id="user_email<?php echo $rowNum ?>" size="60" maxlength="100" value="<?php echo $rsAry[6]; ?>" style="width: 230px;" /></td>   
                                <td width="" class="TRMM-td01 TRMM-alignLeft"><input type="text" name="user_phone<?php echo $rowNum ?>" id="user_phone<?php echo $rowNum ?>" size="60" maxlength="100" value="<?php echo $rsAry[7]; ?>" style="width: 130px;" /></td>   
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
