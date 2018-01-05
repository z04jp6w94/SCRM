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
//定義時間參數
$excuteDate = date("Ymd"); //操作日期
$excuteTime = date("His"); //操作時間
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
for ($i = 1; $i <= $currentPageRecord; $i++) {
    if (!empty($_REQUEST["rowNum" . $i])) {
        $group_id = $_REQUEST["rowNum" . $i];
        $group_name = $_REQUEST["group_name" . $i];
        $sql = "UPDATE group SET group_name = ? WHERE group_id = ?";
        $mysqli->updatePreSTMT($sql, "ss", array($group_name, $group_id));
    }
}
//回原本畫面
header("Location:$fileName.php?currentPage=$currentPage");
?>
