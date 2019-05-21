<?php
    include 'conn.php';
    $tel = isset($_POST['tel']) ? $_POST['tel'] : '';
    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';

    $sql = "SELECT * FROM userinf WHERE tel='$tel' AND psw='$psw'";
    $res = $conn->query($sql);
    if($res->num_rows){
        echo 'yes';
    }else{
        echo 'no';
    }


?>