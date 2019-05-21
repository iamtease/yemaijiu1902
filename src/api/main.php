<?php
// 接收数据
$kid = isset($_GET['kid']) ? $_GET['kid'] : '1';

//连接书库
include 'conn.php';
$sql = "SELECT * FROM mainlist WHERE kid=$kid";
$res = $conn->query($sql);
$arr = $res ->fetch_all(MYSQLI_ASSOC);
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>