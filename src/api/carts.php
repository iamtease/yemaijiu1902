<?php
//连接数据库
include 'conn.php';
$atype = isset($_GET['atype']) ? $_GET['atype'] : 'add';
if($atype == 'add'){
    $id = isset($_GET['id']) ? $_GET['id'] : '24';
    $num = isset($_GET['num']) ? $_GET['num'] : '14';
    $xiaoji = isset($_GET['xiaoji']) ? $_GET['xiaoji'] : '1800';
    
    $sql = "UPDATE cartinf SET num='$num',allprice='$xiaoji' WHERE id='$id'";
    $res = $conn->query($sql);
    // var_dump($res);
    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
};
if($atype == 'del'){
    $id = isset($_GET['id']) ? $_GET['id'] : '';
    $sql = "DELETE FROM cartinf WHERE id='$id'";
    $res = $conn->query($sql);
    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
}

?>