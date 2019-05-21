<?php
 //链接数据库
 include 'conn.php';
 $num=isset($_POST['num']) ? $_POST['num'] : '1';
 $gid = isset($_POST['gid']) ? $_POST['gid'] : '1';
 $tel = isset($_POST['tel']) ? $_POST['tel'] : '13294591234';
 $sql = "SELECT * FROM cartinf WHERE gid='$gid' and tel = '$tel'"; 
 $res = $conn->query($sql);

 $res2 = null;
 if($res->num_rows>0) {
     //有数据
     $data=$res->fetch_all(MYSQLI_ASSOC);
     echo json_encode($data,JSON_UNESCAPED_UNICODE);
     $num1 = $data[0]['num']; // 购物车原有数量
     $num2 = $num + $num1;
     $price = $data[0]['price'];
     $allprice = $price * $num2;
    //  $data = $res->fetch_all(MYSQLI_ASSOC);
     $sql2 = "UPDATE cartinf SET num=$num2,allprice=$allprice WHERE gid='$gid'and tel='$tel'";
     $res2 = $conn->query($sql2);
    
 }else{
     //没有数据
     $sql3 = "SELECT * FROM goodlist WHERE gid='$gid'";
     $res3 = $conn->query($sql3);
     if($res3->num_rows>0){
        $data3=$res3->fetch_all(MYSQLI_ASSOC);
        $introduce = $data3[0]['introduce'];
        $url = $data3[0]['imgurl'];
        $price = $data3[0]['price'];
        $kucun = $data3[0]['inventory'];
        $allprice = $price * $num;
        $sql4 = "INSERT INTO cartinf(tel,gid,goodsinf,price,num,url,kucun,allprice) VALUES ('$tel','$gid','$introduce','$price','$num','$url','$kucun','$allprice')";
        $res4 = $conn->query($sql4);
     }
 }

?>