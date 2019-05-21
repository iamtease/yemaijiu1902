<?php
    include 'conn.php';
    $page = isset($_GET['page']) ? $_GET['page'] : '1';
	$num = isset($_GET['num']) ? $_GET['num'] : '9';
	$type = isset($_GET['type']) ? $_GET['type'] : 'sell';//这个变量用于判断是否排序，根据什么规则排序
	$order = isset($_GET['order']) ? $_GET['order'] : 'ASC';//判断是升序还是降序
    $index = ($page - 1) *$num; 
    if($type){
        $sql = "SELECT * FROM goodlist ORDER BY $type $order LIMIT $index,$num";
    }else{
        $sql = "SELECT * FROM goodlist LIMIT  $index,$num";
    }
    //执行语句
    $res = $conn->query($sql);
    //需求：要数据
    $content = $res->fetch_all(MYSQLI_ASSOC);
    // echo json_encode($content,JSON_UNESCAPED_UNICODE);
    $sql2 = 'SELECT * FROM goodlist';
    //执行语句
    $res2 = $conn->query($sql2);
    //如果要传输多个数据，可以做成关联数组
	$datalist = array(
		'data' => $content,
		'total' => $res2->num_rows,
		'page' => $page,
		'num' => $num
	);
	
	echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
?>