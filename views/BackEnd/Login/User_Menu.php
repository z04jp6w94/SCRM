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
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>選單</title>
        <base target="main">
        <?php include_once($_SERVER['DOCUMENT_ROOT'] . "/views/BackEnd/CommonHeader.php"); ?>
        <style type="text/css">
            <!--
            .style1 {color: #8DC63F}
            #TreeView {
                position:relative;
                width:200px;
                text-overflow: ellipsis;
                overflow: auto;
                overflow-x:hidden;
                font-family: Verdana, Arial, "新細明體", "標楷體";
                font-size: 9pt;
                vertical-align: baseline;
                border: 1px dotted #CCC;
            }
            .TreeviewSysFile, .TreeviewFncFile{
                cursor: pointer;
            } 
            .TreeviewSpan{
                cursor:pointer;
                width:200px;
                text-overflow: ellipsis;
                overflow: hidden;
            } 
            #Space{
                padding-top: 5px;
            }
            A.black9:link   {color: #000000; font-size: 9pt; font-family:"arial";text-decoration:none;}
            A.black9:visited{color: #000000; font-size: 9pt; font-family:"arial";text-decoration:none;}
            A.black9:hover  {color: #CC3333; font-size: 9pt; font-family:"arial";text-decoration:underline;}
            A.black9:active {color: #000000; font-size: 9pt; font-family:"arial";text-decoration:none;}
            .TableLine {
                border-right-width: 1px;
                border-right-style: solid;
                border-right-color: #CCCCCC;
            }
            -->
        </style>
    </head>
    <body ondragstart="window.event.returnValue=false" oncontextmenu="window.event.returnValue=true" onselectstart="event.returnValue=false">
        <table width="208" height="100%"  border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" class="TableLine">
            <tr>
                <td height="30"><a href="Menu_Welcome.php" target="main" onFocus="this.blur()"><img src="/assets_rear/images/Logo.png"  height="30" border="0"></a></td>
            </tr>
            <tr>
                <td valign="top">
                    <!-- 選單開始 -->
                    <div id="TreeView">
                        <div id="Space"></div>
                        <nobr>
                            <?php echo initSysMenu(); ?>
                        </nobr>
                    </div>
                </td>
            </tr>
            <tr>
                <td height="8"></td>
            </tr>
        </table>
    </body>
</html>

