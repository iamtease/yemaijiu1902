<?php
    //链接数据库
    include 'conn.php';
    //接收数据
    $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';
    $sql = "INSERT INTO userinf(tel,psw) VALUES('$tel','$psw')";
    $res = $conn->query($sql);

    if($res){
    echo 'yes';
    } else{
    echo 'no';
    }

?>