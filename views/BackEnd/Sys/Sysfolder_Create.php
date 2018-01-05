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
//取得新增參數
$group_id = $_REQUEST["group_id"];
$menu_folder = $_REQUEST["menu_folder"];
//定義時間參數
$excuteDate = date("Ymd"); //操作日期
$excuteTime = date("His"); //操作時間
//資料庫連線
$mysqli = new DatabaseProcessorForChiliman();
//資料夾排序
$sql = " select max(menu_order)+1 from sysmenu ";
$sql .= " where group_id = ? ";
$sql .= " and menu_type = 'P' ";
$menu_order = $mysqli->readValuePreSTMT($sql, "s", array($group_id));
//建立資料夾
$sql = "INSERT INTO sysmenu(group_id, program_id, menu_type, menu_folder, menu_prev_id, menu_order, c_id) VALUES(?, '0', 'P', ?, '0', ?, '')";
$mysqli->createPreSTMT($sql, "sss", array($group_id, $menu_folder, $menu_order));
//回原本畫面
header("Location:$fileName.php?currentPage=$currentPage&dataKey=$group_id");
?>
