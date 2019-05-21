$(function(){
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
    $('.categroup').mouseover(function(){
        $('.jiuxuan b').css('background-position','-160px -184px');
        $('.jiuxuan').css('background','#4a3931');
    })
    $('.categroup').mouseleave(function(){
        $('.jiuxuan b').css('background-position','-160px -175px');
        $('.jiuxuan').css('background','#624b40');
    })
    $('.jiuxuan').mouseover(function(){
        $('.jiuxuan b').css('background-position','-160px -184px');
        $('.jiuxuan').css('background','#4a3931');
    })
    $('.jiuxuan').mouseleave(function(){
        $('.jiuxuan b').css('background-position','-160px -175px');
        $('.jiuxuan').css('background','#624b40');
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
       location.href = 'login.html';
       removeCookie('tel')
   });
   var cookie = getCookie('tel');
   var num1 = 0;
   var allprice = 0;
   $.ajax({
    type : 'post',
    url : '../api/cart.php',
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
             <img src="${item.url}" alt="" width="60" height="98">
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