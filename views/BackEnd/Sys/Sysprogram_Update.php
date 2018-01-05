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
//取得更新參數
$program_name = $_REQUEST["program_name"];
$program_path = $_REQUEST["program_path"];
//定義時間參數
$excuteDate = date("Ymd"); //操作日期
$excuteTime = date("His"); //操作時間
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
$sql = "UPDATE sysprogram SET program_name = ?, program_path = ? WHERE program_id = ?";
$mysqli->updatePreSTMT($sql, "sss", array($program_name, $program_path, $dataKey));
//回原本畫面
header("Location:$fileName.php?currentPage=$currentPage");
?>
