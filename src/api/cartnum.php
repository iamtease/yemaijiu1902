<?php
    //连接数据库
    include 'conn.php';
    $gid = isset($_POST['gid']) ? $_POST['gid'] : '1';
    $tel = isset($_POST['tel']) ? $_POST['tel'] : '13294591234';
    $sql = "SELECT num FROM cartinf WHERE gid='$gid' and tel = '$tel'";
    $res = $conn->query($sql);
    $content = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($content,JSON_UNESCAPED_UNICODE);


?>