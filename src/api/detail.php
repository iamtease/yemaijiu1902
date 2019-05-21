<?php
 //接收数据
 $gid = isset($_GET['gid']) ? $_GET['gid'] : '1';
 //链接数据库
 include 'conn.php';
 $sql = "SELECT * FROM goodlist WHERE gid=$gid";
 $res = $conn->query($sql);
 $content = $res->fetch_all(MYSQLI_ASSOC);
 echo json_encode($content,JSON_UNESCAPED_UNICODE);




?>
