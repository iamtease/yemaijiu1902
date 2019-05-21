<?php
    include 'conn.php';
    $tel = $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
    $sql = "SELECT * FROM userinf WHERE tel='$tel'";
    //执行sql语句
    $res = $conn->query($sql);
    if($res->num_rows){
        echo 'no';
    }else{
        echo 'yes';
    }
?>