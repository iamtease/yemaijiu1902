$(function(){
    var cookie = getCookie('tel');
    var kucun = 1;
    $.ajax({
        type : 'post',
        url : '../api/cart.php',
        data : {
            'tel' : cookie,
        },
        success :function(str){
            if(str == 'no'){
                $('.list').css('display','none');
            }else{
                $('.list').css('display','block');
                var arr = JSON.parse(str);
               
                var res = arr.map(function(item){
                    return ` <tr class="border" data-key="681d173e-9522-4fbf-9559-dfdff9245615" cart-id="${item.id}">
                    <td width="8%" class="btn_fx">
                        <input type="checkbox" name="goodsSelect" value="6228323" class="goodsSelect">
                    </td>
                    <td width="8%" class="left">
                        <a href="/goods/6228323.html" target="_blank" class="prod-img">
                            <img src="${item.url}" style="width: 60px;height: 98px;">
                        </a>
                    </td>
                    <td class="left">

                        <a href="###" target="_blank" class="title">${item.goodsinf} </a>
                        <br>
                        <br>
                        <span class="red"></span>
                        <br>
                        <ins id="error_5152044"></ins>
                    </td>
                    <td width="13%" class="dj_price">
                        ¥
                        <b class="price">${item.price}</b>
                        <br>
                    </td>
                    <td width="13%">
                        <span class="jj_box" id="cartnum">
                            <a title="减少" i class="sub left left_jy subAmount cartSubAmount">-</a>
                            <input name="input"  class="editAmount cartEditAmount num" type="text" value="${item.num}">
                            <a title="增加" class="add right addAmount cartAddAmount" kucun="${item.kucun}">+</a>
                        </span>
                    </td>
                    <td class="xj_price" width="13%">¥
                        <b class="allprice">${item.allprice}</b>
                    </td>
                    <td width="13%" class="btn_edit">
                        <div class="tip_fram col-blue addFavoriteSuccess" style="display:none">
                            <div class="tip_content">
                                <p>
                                    <i class="suc-icon"></i>加入收藏夹成功！</p>
                            </div>
                            <b class="tip_icon"></b>
                        </div>
                        <div class="tip_fram col-red addFavoriteFail" style="display:none">
                            <div class="tip_content">
                                <p>
                                    <i class="ero-icon"></i>已经收藏过本商品！</p>
                            </div>
                            <b class="tip_icon"></b>
                        </div>
                        <a data-goodsid="6228323" class="addFavorite"> 加入收藏夹 </a>
                        <br>
                        <a class="btn-remove removeGoods del" data-goodsnum="1">删除</a>
                    </td>
                </tr>`
                }).join('');
                // 数量加减
                $('#cartlist').html(res);
               
            }
        }
      
    });
    // 数量加减
    $('#cartlist').on('click','.sub',function(){
       var num = $(this).next().val();
            num--;
            if(num <= 1){
                num = 1;
            }
            $(this).next().val(num);
            total($(this));
            shuju($(this));
            all();
    });
    $('#cartlist').on('click','.add',function(){
        var num = $(this).prev().val();
        kucun = $(this).attr('kucun');
        num++;
            if(num >= kucun){
                num = kucun;
            }
            $(this).prev().val(num);
            total($(this))
            shuju($(this));
            all();
    });
    // 手动改变
    $('#cartlist').on('input','.num',function(){
       var num = $(this).val();
       kucun = $(this).next().attr('kucun')*1;
        if(num <= 1){
            num = 1;
        }else if(num >= kucun){
            num = kucun;
        }
        $(this).val(num);
        total($(this))
        shuju($(this));
        all()
    })
    // 小计的计算
    function total(now){
       var num = $(now).parent().find('.num').val();
        var price = $(now).parent().parent().prev().children('.price').html();
        var xiaoji = (num*price).toFixed(1);
        $(now).parent().parent().next().children('.allprice').html(xiaoji);
    }
    // // 删除一行
    $('#cartlist').on('click','.del',function(){
        alert('您确定删除吗');
        del($(this));
        $(this).parent().parent().remove();
        
    })
    // // 存储数据
    function shuju(now){
        var id = $(now).parent().parent().parent().attr('cart-id');
        var num = $(now).parent().find('.num').val(); 
        var xiaoji = $(now).parent().parent().next().children('.allprice').html();
        $.ajax({
            type : 'get',
            url : '../api/carts.php',
            data : {
                'id':id,
              'num': num,
              'xiaoji' : xiaoji,
              'atype' : 'add',
            },
            success : function(str){
                // if(str == 'yes'){
                //     alert('添加成功')
                // }else{
                //     alert('失败')
                // }

            }
        })
    }
    // 删除
    function del(now){
        var id = $(now).parent().parent().attr('cart-id');
        $.ajax({
            type : 'get',
            url : '../api/carts.php',
            data : {
                'id':id,
              'atype' : 'del',
            },
            success : function(){
                
            }
        });
    }
    // 选择
    function show(){
        if($('#dispatching').prop('checked')){
            $('#floatNav_buy').css('display','block');
        }else{
            $('#floatNav_buy').css('display','none');
        }
    }
    $('#dispatching').click(function(){
       show()
    });
    //全选
    $('#allcheck').click(function(){
        
        var istrue = $('#allcheck').prop('checked');
        $('#cartlist .btn_fx input').prop('checked',istrue);
        $('#bar input').prop('checked',istrue);
        $('#dispatching').prop('checked',istrue);
        show();
        all()
    });
    $('#bar input').click(function(){
        var istrue = $('#bar input').prop('checked');
        $('#cartlist .btn_fx input').prop('checked',istrue);
        $('#allcheck').prop('checked',istrue);
        $('#dispatching').prop('checked',istrue);
        show();
        all()
    });
    // 计算总数量和总价钱
    var arr1 = [];
    function all(){
        arr1 = [];
        $('#cartlist .btn_fx input').each(function(i,item){
            if($(item).prop('checked')){
                // 被勾选就把下标存起来
                arr1.push(i);
            }
        });
        // 总数量
        var num1 = 0;
        //总价格
        var tatolPrice = 0;
        arr1.forEach(function(item){
            num1 +=$('#cartlist .jj_box input').eq(item).val() * 1;
            tatolPrice += $('#cartlist .allprice').eq(item).html()* 1;
            
        });
        $('#floatNav_buy b').eq(0).html(num1);
        $('#floatNav_buy b').eq(1).html(tatolPrice.toFixed(1));
    }
    // 控制全选按钮
    $('#cartlist').on('click','.goodsSelect',function(){
        var istrue = $('#cartlist .goodsSelect').prop('checked');
        $('#dispatching').prop('checked',istrue);
        show();
        all();
        var len = $('#cartlist .goodsSelect:checked').size();
        var total = $('#cartlist .goodsSelect').size();
        if(len == total){
            $('#allcheck').prop('checked',true);
            $('#bar input').prop('checked',true);
        }else{
            $('#allcheck').prop('checked',false);
            $('#bar input').prop('checked',false);
        }
    })
    // 批量删除
    var arr2 = [];
    $('.removeSelectedGoods').click(function(){
        arr2 = []
        $('#cartlist .btn_fx input').each(function(i,item){
            if($(item).prop('checked')){
                // 被勾选就把下标存起来
                arr2.push(i);
            }
        });
        arr2.forEach(function(item){
            var id= $('#cartlist .border').eq(item).attr('cart-id');
            $.ajax({
                type : 'get',
                url : '../api/carts.php',
                data : {
                    'id':id,
                  'atype' : 'del',
                },
                success : function(){
                   
                }
            });
            $('#cartlist .border').eq(item).remove();
        })
        show();
        all();
        
    })
    
    
  
})