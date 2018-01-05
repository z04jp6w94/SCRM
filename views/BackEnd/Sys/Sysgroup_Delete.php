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
//取得刪除參數
$deletePara = "";
$count = 0;
for ($i = 1; $i <= $currentPageRecord; $i++) {
    if (!empty($_REQUEST["rowNum" . $i])) {
        if ($count == 0) {
            $deletePara .= $_REQUEST["rowNum" . $i];
        } else {
            $deletePara .= ", " . $_REQUEST["rowNum" . $i];
        }
        $count++;
    }
}
//定義時間參數
$excuteDate = date("Ymd"); //操作日期
$excuteTime = date("His"); //操作時間
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
$sql = "SELECT count(user_id) FROM sysuser WHERE group_id IN (" . $deletePara . ")";
$rsVal = $mysqli->readValueSTMT($sql);
if ($rsVal > 0) {
    echo '<script>';
    echo 'alert("請先刪除此系統群組對應的系統使用者資料，避免造成程式錯誤");';
    echo 'window.history.back();';
    echo '</script>';
    exit();
}
$sql = "DELETE FROM sysauthority WHERE group_id IN (" . $deletePara . ")";
$mysqli->deleteSTMT($sql);
$sql = "DELETE FROM sysmenu WHERE group_id IN (" . $deletePara . ")";
$mysqli->deleteSTMT($sql);
$sql = "DELETE FROM sysgroup WHERE group_id IN (" . $deletePara . ")";
$mysqli->deleteSTMT($sql);
//回原本畫面
header("Location:$fileName.php?currentPage=$currentPage");
?>
