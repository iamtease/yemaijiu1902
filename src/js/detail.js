$(function(){
   var hei = $(document).height();
   console.log(hei)
   $('#right').css('height',hei);

   $('#area-selector').click(function(){
       $('#listDown').css('display','block')
   })

   var data = decodeURI(location.search);
   var gid = data.slice(1);
   var kucun = 1;
   //数据渲染
   $.ajax({
       type : 'get',
       url : '../api/detail.php',
       data : {
           'gid': gid,
       },
       success : function(str){
        var arr = JSON.parse(str)
        var arr1 = arr[0].bbigimg.split('&');
        var res = arr1.map(function(item){
            return `<li>
            <div class="small-img">
                <img src="${item}" />
            </div>
        </li>`
        }).join('');
        $('.animation03').html(res);
        //放大镜插件
        var magnifierConfig = {
            magnifier: "#magnifier1", //最外层的大容器
            width: 378, //承载容器宽
            height: 438, //承载容器高
            moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
            zoom: 1.5 //缩放比例
        };
        var _magnifier = magnifier(magnifierConfig);
        // 右半部分
        var res1 = arr.map(function(item){
            return `<div class="promotionMiddleTop" good-id="${item.gid}">
            <ul class="pro-name">
                <li>
                    <h1>${item.introduce}</h1>
                </li>
            </ul>
            <ul class="pro-info">
                <li class="mt10">
                    <dl class="comment-score">
                        <dt>商品评分:</dt>
                        <dd>
                            <img src="../img/pingfn.jpg" alt="">
                        </dd>
                    </dl>
                    <div class="pro-data">
                        <span>评论数:
                            <a href="###">0</a>
                        </span>
                        <span>近期售出数 ${item.sell}</span>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="promotionMiddleCenter clearfix">
            <li class="w560 explain">
                <span class="ml_memberLevel ml_MEMBER_LEVEL_NORMAL" style="">
                    也买价:
                    <b class="myPrice currentFont red">¥
                        <em>${item.price}.00</em>
                    </b>
                </span>
            </li>
        </ul>`
        }).join('');
        $('#part').html(res1);
        kucun = arr[0].inventory;
       
       }
   })

//    选择城市
   $('#listDown').on('click','.choose-areaName',function(){
       $('#area-selector span').html($(this).html());
       $('#delivery-tip b').html($('#area-selector span').html());
       $('#listDown').css('display','none');
   })
   $('#delivery-tip b').html($('#area-selector span').html());
//    数量加减
var num = 1;
    $('#sub').click(function(){
        num = $('#num').val();
        num --;

        if(num <= 1){
            num = 1;
        }
        $('#num').val(num)
    })
    $('#add').click(function(){
        num = $('#num').val();
        num++;
        if(num >= kucun){
            num = kucun;
        }
        $('#num').val(num)
    })
    var cookie = getCookie('tel');
    $.ajax({
        type : 'post',
        url : '../api/cartnum.php',
        data :{
            'tel' : cookie,
            'gid' : gid,
        },
        success : function(str){
          var arr=JSON.parse(str);
        var val = arr[0].num
          $('#cartnum').html(val)
        }
    })
    $('#addCart').click(function(){
        if(cookie == undefined){
            location.href = 'login.html';
        }else{
            $.ajax({
                type : 'post',
                url : '../api/addcart.php',
                data : {
                    'gid' : gid,
                    'num' : num,
                    'tel' : cookie,
                },
                success : function(){
                    $.ajax({
                        type : 'post',
                        url : '../api/cartnum.php',
                        data :{
                            'tel' : cookie,
                            'gid' : gid,
                        },
                        success : function(str){
                          var arr=JSON.parse(str);
                          $('#cartnum').html(arr[0].num)
                            
                        }
                    })
                }

            })
        }
    })
})