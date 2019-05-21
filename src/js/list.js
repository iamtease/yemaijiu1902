$(function(){
  

//  数据渲染
    var ipage = 1;//第几页
    var num =9//每页9条数据
    var type = '';//排序
    var order = '';//升序降序
    var numb = 1;
    //做数据渲染，初始化
    function init(ipage){
        $.ajax({
            type :'get',
            url : '../api/list.php',
            data : {
                'page' : ipage,
                'num' : num,
                'type' : type,
                'order' : order,
            },
            success : function(str){
                create(str);
            }
        })
    }
    init(1);
    
    function create(str){
        var arr= JSON.parse(str);
        var res = arr.data.map(function(item){
            return `<li good-id="${item.gid}">
            <img src="${item.imgurl}" alt="">
            <ul>
                    <li>
                    <p>${item.introduce}</p>
                    <p></p>
                    </li>
                    <li><p>好评：100%</p></li>
                    <li><p>近期销量：${item.sell}</p></li>
                    <li><p>￥<span>${item.price}.00</span></p></li>
                </ul>
                <div class="btnWrap">
                    <input type="button" name="" id="shop" value="立即购买">
                </div>
        </li>`
        }).join('');
        $('#goodslist').html(res);
        //页数
       numb = Math.ceil(arr.total / arr.num);
        var html = '';
        for (var i = 0 ; i < numb ; i++){
            html += '<a href="###">'+(i+1)+'</a>';
        }
        $('#pages').html(html);
        $('#pages a').eq(arr.page -1).attr('class','on');
       
    }
    var page = 1;
    $('#pages').on('click', 'a',function(){
         page = $(this).html();
        $(this).attr('class','on').siblings().attr('class','')
        init(page);
    });

    //上一页
    $('#pre').click(function(){
        --page;
        if(page >0){
            init(page)
        }   
    })
    $('#next').click(function(){  
        ++page;
        if(page <= numb){
            init(page)
        }  
    })
    $('#last').click(function(){
        init(numb);
        page = numb;
    })
    $('#first').click(function(){
        init(1);
        page = 1;
    })
 
  //  销量，价格排序
var isok=true;
$('#sales').click(function(){
 // console.log($('#sales p'))
 type = 'sell'
    if(isok){
        $('#sales b').attr('class','down');
        order = 'ASC';
    }else{
     $('#sales b').attr('class','up');
     order = 'DESC';
    }
    isok = !isok;
    init(1)
})
var isok1 = true;
$('#price').click(function(){
    type = 'price';
    if(isok1){
        $('#price b').attr('class','down');
        order = 'ASC';
    }else{
        $('#price b').attr('class','up');
        order = 'DESC';
    }
    isok1 = !isok1;
    init(1);
})
$('#default').click(function(){
    init(1)
})
   $('#goodslist').on('click','#shop',function(){
       gid = $(this).parent().parent().attr('good-id')
      
       location.href = 'detail.html?'+gid
   })
    




})