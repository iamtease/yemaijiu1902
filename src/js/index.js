$(function () {
    $('#account').mouseover(function () {
        $('.acc-inf').css('display', 'block')
    })
    $('#account').mouseleave(function () {
        $('.acc-inf').css('display', 'none')
    })
    $('.acc-inf').mouseover(function () {
        $('.acc-inf').css('display', 'block')
    })
    $('.acc-inf').mouseleave(function () {
        $('.acc-inf').css('display', 'none')
    })
    $('#phone').mouseover(function () {
        $('.app').css('display', 'block')
    })
    $('#phone').mouseleave(function () {
        $('.app').css('display', 'none')
    })
    $('.app').mouseover(function () {
        $('.app').css('display', 'block')
    })
    $('.app').mouseleave(function () {
        $('.app').css('display', 'none')
    })
    /* 第一部分选项卡*/
    $('#notices span').mouseover(function(){
        $(this).attr('class','on').siblings().attr('class', '');
        // console.log($(this).index());
        $('#notices').find('.con')
        .eq($(this)
        .index())
        .css('display','block')
        .siblings()
        .css('display','none');
    })
    var endtime = document.getElementById('endtime')
    var endTime = '2019-5-19 09:00:00';
    var end = Date.parse(endTime);//时间对象;
    //不断获取时间
    function showtime(){
        var nowtime = Date.now();
        var dix = parseInt((end-nowtime)/1000);
        if(dix <= 0){
            clearInterval(timer);
           endtime.innerHTML = '';
        }else{
            var time = setTime(dix);
           endtime.innerHTML=  `还剩
           <strong class="tcd-d">${time.days}</strong>天
           <strong class="tcd-h">${time.hours}</strong>时
           <strong class="tcd-m">${time.mins}</strong>分`
           
        }
    }
    var timer = setInterval(showtime,1000)
    function setTime(time) {
        //xx天xx小时xx分xx秒 
        var min = parseInt(time / 60) % 60;
        var hour = parseInt(time / 60 / 60) % 24;
        var day = parseInt(time / 60 / 60 / 24);
					
        return {
            mins : min,
            hours : hour,
            days : day
        }
    };
    //右边的选项卡
    $('#m1_right li').mouseover(function(){
        $(this).attr('class','active').siblings().attr('class', '');
       
        var num = $(this).index();
        
        var nums = -360*num;
     
        $('#goodslist').css({
            'position':'relative',
            'top': nums+'px'
        });
    });
    //数据渲染
    var p = new Promise(function(succ){
        $.ajax({
            type : 'get',
            url : 'api/main.php',
            data : "kid=1",
            success : function(str){
                succ(str);
            }
        });
    });
    p.then(function(data){
        var arr = JSON.parse(data);
        xuanran(arr)
        $('#good-l1').html(res);
    });
    var p = new Promise(function(succ){
        $.ajax({
            type : 'get',
            url : 'api/main.php',
            data : "kid=2",
            success : function(str){
                succ(str);
            }
        });
    });
    p.then(function(data){
        var arr = JSON.parse(data);
        xuanran(arr)
        $('#good-l2').html(res);
    });
    var p = new Promise(function(succ){
        $.ajax({
            type : 'get',
            url : 'api/main.php',
            data : "kid=3",
            success : function(str){
                succ(str);
            }
        });
    });
    p.then(function(data){
        var arr = JSON.parse(data);
        xuanran(arr)
        $('#good-l3').html(res);
    });
    function xuanran(arr){
       return res = arr.map(function(item){
            return `<li goods-id="${item.id}">
            <dl>
                <dt>
                    <a href="" class="pimg">
                        <img src="${item.url}" alt="">
                    </a>
                </dt>
                <dd class="base">
                    <a class="pname" href="">
                    ${item.int}
                        <span class="en">${item.eglish}</span>
                    </a>
                    <p class="price">
                        <span class="minprice">¥
                            <strong>${item.price}.0</strong>
                        </span>
                    </p>
                </dd>
                <dd class="sum">
                    <span class="soldnum">售出
                        <strong>${item.wo}</strong>
                    </span>
                    <span class="ratepercent">好评
                        <strong>${item.gr}</strong>
                    </span>
                </dd>
            </dl>
        </li>`
        }).join('');
    };
    $('#right-list li:gt(1)').mouseover(function(){
     $(this).attr('class','on').siblings('#right-list li:gt(1)').attr('class', 'item');
    });
    $('#right-list2 li').mouseover(function(){
        $(this).attr('class','on').siblings().attr('class', 'item');
       });
// 点击选项卡 
    $('#like-left li').on('click',function(){
        $('#like-right').find('ul')
        .eq($(this).index()).css('display','block').siblings().css('display','none');
    });
    // 手风琴效果
    var imgCounter = 6; //当前轮播图序号
    var timer = null;

    //初始化，将所有照片有序地放入img盒子里
    $('#shoufengqin li').each(function(index) {
        $(this).css('left', index * 150);
    })

    function rotation(counter) {
        $('#shoufengqin li').eq(counter).stop().animate({
            left: counter * 150 + 'px' //将点击的图片位置放入到初始化的位置 
        }, 400);
        $('#shoufengqin li').eq(counter).nextAll().each(function(index) { //对当前图片的往后的所有图片进行重新定位
            $(this).stop().animate({
                left: 450 + counter * 150 + index * 150 + 'px' //具体的位置定位，
            }, 400)
        })

        $('#shoufengqin li').eq(counter).prevAll().each(function(index) { //对当前图片的往前的所有图片进行重新定位
            $(this).stop().animate({
                left: (counter - index - 1) * 150 + 'px' //具体的位置定位
            }, 400);
        })
    }
    //手风琴轮播主要功能的实现
    $('#shoufengqin li').mouseover(function() {

        var idx = $('#shoufengqin li').index(this); //获取当前点击的图片序号
        imgCounter = idx;
        rotation(idx);
        clearTimeout(timer);
        autoRotation();

    });
    //自动轮播
    function autoRotation() {
        timer = setTimeout(function() {
            if (imgCounter >= 6) {
                imgCounter = 0;
            } else {
                imgCounter++;
            }
            rotation(imgCounter);
            autoRotation();

        },2000);
    }
    autoRotation();
    // 酒友品鉴
    var iw=$('#jiuyou li').width()*3;
    $('#jiuyou ul').css({
        left: 0
    })
    var now=0;
    
    $('.btn-next').click(function(){
        now++;
       if(now>=2){
        now=1;
       }
       
        $('#jiuyou').animate({
            left : -iw+'px'
        },300)  
        $('.txt-page').html(`${now+1}/2`) 
        // console.log($('#jiuyou').css('left').slice(0,-2))
    })
   
    $('.btn-prev').click(function(){
        now--;
        if(now<=0){
            now=0;  
        }
            $('#jiuyou').animate({
                left : 0
            },300)
        $('.txt-page').html(`${now+1}/2`) 
       
       
    })
   





   $(window).scroll(function(){
       if($(window).scrollTop()>=100){
           $('.foot-shopcart').css('display','block')
       }else{
        $('.foot-shopcart').css('display','none')
       }
   })
// 登录后
   var cookie = getCookie('tel')
  
   if(cookie != undefined){
    $('#span1').html('您好，').css('color','#333');

    $('#span2').html(`${cookie}`);
    $('#span2').mouseover(function(){
        $('#span2').css({
            'color': '#cc3f4c',
            'text-decoration' : 'underline',
            'cursor' : 'pointer'
        })
    })
    $('#span2').mouseleave(function(){
        $('#span2').css({
            'color': '#85726c',
            'text-decoration' : 'none',
        })
    })
    $('#login').css('display','none');
    $('#inf').css('display','inline');
    $('#reg').css('display','none');
    $('#return').css('display','inline');
   }
   $('#return').click(function(){
       location.href = 'html/login.html';
       removeCookie('tel')
   })
    //购物车
   var cookie = getCookie('tel');
   var num1 = 0;
   var allprice = 0;
  
//  function show(){
    $.ajax({
        type : 'post',
        url : 'api/cart.php',
        data : {
            'tel' : cookie,
        },
        success : function(str){
           var arr = JSON.parse(str);
            for(var i = 0 ;i < arr.length ; i++){
                num1 += arr[i].num * 1;
                allprice += arr[i].allprice *1
            }
            if(num1 >= 0){
                $('.txt-cartcount').css('display','block');
                $('.txt-cartcount').html(`${num1}`)
            }else{
                $('.txt-cartcount').css('display','none');
            }
            $('.shopcart-num b').html(`${num1}`);
            $('.shopcart-num strong').html(`${allprice}.0`);
           var res = arr.map(function(item){
             return ` <li data-goodsid="${item.id}">
             <a href="">
                 <img src="${item.url.slice(3)}" alt="" width="60" height="98">
                 <span class="name">${item.goodsinf}</span>
                 <span class="nameEn">CHAMPAGNE CHARLES DU ROY BRUT 750ml</span>
                 <span class="price">
                     <strong>¥ ${item.price}</strong>
                     ×
                     <b>${item.num}</b>
                 </span>
             </a>
            
         </li>`
           }).join('');
           $('.cart1').html(res);
        }
    })


})