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
$programPath = explode(".php", $_SERVER['REQUEST_URI'])[0] . ".php";
$fileName = basename(__FILE__, '.php');
//取得查詢參數
$group_id = !empty($_REQUEST["dataKey"]) ? $_REQUEST["dataKey"] : NULL;
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
$sqlFrom = " FROM sysmenu s ";
$sqlWhere = " WHERE 1 = 1";
$sqlWhere .= " AND group_id = '" . $group_id . "'";
$sqlWhere .= " AND menu_type = 'P' ";
//確認使用者權限
$create = "abled";
$read = "abled";
$update = "abled";
$delete = "abled";

//確認畫面頁數
$totalRecord = 0;
$perPageRecord = 20;
$totalPage = 0;
$currentPage = !empty($_REQUEST["currentPage"]) ? $_REQUEST["currentPage"] : 0;
$firstRecord = 0;
$currentPageRecord = 0;

setScreenPage($mysqli, $sqlFrom, $sqlWhere);
//取得畫面內容
$sql = "SELECT menu_id, menu_folder, (select count(*) from sysmenu s2 where s2.menu_prev_id = s.menu_id) ";
$sql .= $sqlFrom;
$sql .= $sqlWhere;
$sql .= " LIMIT ?, ?";
$initAry = $mysqli->readArrayPreSTMT($sql, "ss", array($firstRecord, $currentPageRecord), 3);
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
                window.location.href = url;
            }
            function excute(action) {
                switch (action) {
                    case "add":
                        Form2.action = '<?php echo $fileName; ?>_Add.php';
                        Form2.submit();
                        break;
                    case "delete":
                        Form2.action = '<?php echo $fileName; ?>_Delete.php';
                        checkBeforeSubmit(Form2, "rowNum", "刪除")
                        break;
                    case "update":
                        Form2.action = '<?php echo $fileName; ?>_Modify.php';
                        Form2.submit();
                        break;
                }
            }
            function setKey(dataKey) {
                Form2.dataKey.value = dataKey;
            }
        </script>
    </head>
    <body>
        <div id="Main">
            <div id="MainTopMenu">
                <span class="MenuLeft">
                    <ul class="Menunav">
                        <li class="gray"><a class="SetCursor" onClick="javascript:location.href = 'Sysmenu.php'"  title="返回"><img src="/assets_rear/images/Icon_04.png" width="28" height="28" border="0" align="absmiddle"></a></li>
                        <?php if ($create == "abled") { ?><li class="red"><a class="LFFFFFF SetCursor" onClick="excute('add');">建立</a></li><?php } ?>
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
                        <td width="200" class="TRMM-td01 TRMM-alignLeft">資料夾名稱</td>  
                        <td width="" class="TRMM-td01 TRMM-alignLeft"></td>    
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
                        <input type="hidden" id="dataKey" name="dataKey" value= "0" />
                        <input type="hidden" id="group_id" name="group_id" value="<?php echo $group_id; ?>" />
                        <?php $rowNum = 0; ?>
                        <?php foreach ($initAry as $rsAry) { ?>    
                            <?php $rowNum++; ?>
                            <tr<?php if ($rowNum % 2 == 1) echo ' bgcolor="#F1F5FA"'; ?> onMouseOut="cbar(this)" onMouseOver="sbar(this)">
                                <td width="50" class="TRMM-td03 TRMM-align"><?php echo $rowNum; ?></td>
                                <td width="50" height="28" class="TRMM-td01 TRMM-align"><?php if ($rsAry[2] == '0') { ?><input type="checkbox" name="rowNum<?php echo $rowNum ?>" id="rowNum<?php echo $rowNum ?>" value="<?php echo $rsAry[0]; ?>" onClick="checkSingle(Form2);" /><?php } ?></td>
                                <?php if ($update == "abled") { ?>
                                    <td width="50" class="TRMM-td01 TRMM-align">
                                        <a href="#" onClick="setKey('<?php echo $rsAry[0]; ?>');
                                                        excute('update');">
                                            <img src="/assets_rear/images/editicon.gif" width="16" height="15" border="0">
                                        </a>
                                    </td>
                                <?php } ?>    
                                <td width="200" class="TRMM-td01 TRMM-alignLeft"><?php echo $rsAry[1]; ?></td>  
                                <td width="" class="TRMM-td01 TRMM-alignLeft"></td>     
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
