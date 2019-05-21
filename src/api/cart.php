<?php
    //链接数据库
    include 'conn.php';
    $tel = isset($_POST['tel']) ? $_POST['tel'] : '13294591234';
    $sql = "SELECT * FROM cartinf WHERE tel='$tel'";
    $res = $conn->query($sql);
    if($res->num_rows>0){
        $content = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($content,JSON_UNESCAPED_UNICODE);
    }else{
        echo 'no';
    }
?>