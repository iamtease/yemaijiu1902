$(function(){
    $('#tel').focus(function(){
        $('#tel-inf').css('display','block');
        $('#inf1').html('请输入手机号');
    })
    var isok1 = false;
    var isok2 = false;
    var isok3 = false;
    var isok4 = false;
    $('#tel').blur(function(){
        
        var tel = $('#tel').val();
        var reg1= /^1[3-9]\d{9}$/;
        if(reg1.test(tel)){
            $.ajax({
                type:'post',
                url : '../api/multiple.php',
                data : {
                    'tel' : tel
                },
                success : function(str){
                    if(str == 'no'){
                        alert('您已注册过')
                        isok1 = false;
                    }else{
                        $('#tel-inf').css('display','none');
                        isok1 = true;
                    }
                }
            })
            
        }else{
            $('#inf1').html('请输入正确的手机号');
            isok1 = false;
        }
        
    })
    //随机验证码
    function randomCode() { 
        var html = '0987654321qwertyuioplkjhgfdsazxcvbnmZXCVBNMLKJHGFDSAQWERTYUIOP';
        var res = '';
        for(var i = 0; i < 4; i++) {
            var now = parseInt(Math.random() * html.length); //0-str.length-1
            res += html[now];
        }
        return res; 
    }
    //随机数
    function randomNum(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min; 
    }
    //随机色
    function randomColor() {
            var str = '0123456789abcdef';
            var color = '#';
            for(var i = 0; i < 6; i++) {
                var num = randomNum(0, 15);
                color += str[num];
            }
            return color;
        }
    $('#verification').val(randomCode()).css('color',randomColor());
    $('#verification').click(function(){
        $('#verification').val(randomCode()).css('color',randomColor());
    })
    $('#ver-inf').focus(function(){
        if($('#tel').val() == ''){
            $('#tel-inf').css('display','block');
            $('#inf1').html('请输入手机号'); 
        }else{
            $('#tel-inf').css('display','none');
        }
    })
    $('#ver-inf').blur(function(){
        if($('#ver-inf').val().toLowerCase()==$('#verification').val().toLowerCase()){
            $('#verif').css('display','none');
          isok2 = true;
        }else{
            $('#verif').css('display','block')
            $('#inf2').html('请输入正确的验证码'); 
          isok2 =false;
        }

    })
    // 密码正则
    var reg2=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    $('#psw').focus(function(){
        if($('#tel').val() == ''){
            $('#tel-inf').css('display','block');
            $('#inf1').html('请输入手机号'); 
        }else{
            $('#tel-inf').css('display','none');
        }
    })
    $('#psw').blur(function(){
        var psw=$('#psw').val();
        if(reg2.test(psw)){
            $('#psw-inf').css('display','none');
          isok3 = true;
        }else{
            $('#psw-inf').css('display','block');
            $('#inf4').html('请输入6-16位字母或数字');
          isok3= false;
        }
    })
    // 二次密码
    $('#repsw').focus(function(){
        if($('#tel').val() == ''){
            $('#tel-inf').css('display','block');
            $('#inf1').html('请输入手机号'); 
        }else{
            $('#tel-inf').css('display','none');
        }
    })
    $('#repsw').blur(function(){
        if($('#repsw').val() == $('#psw').val()){
            $('#repsw-inf').css('display','none');
            isok4 = true;
          
        }else{
            $('#repsw-inf').css('display','block');
            $('#inf5').html('请保持密码一致');
          isok4 = false;
        }
    })
    $('.btn-register').click(function(){
        
        if($('#tel').val()==''){
            $('#tel-inf').css('display','block');
            $('#inf1').html('请输入手机号');
        }
        if($('#ver-inf').val() == ''){
            $('#verif').css('display','block')
            $('#inf2').html('请输入验证码'); 
        }
        if($('#psw').val() == ''){
            $('#psw-inf').css('display','block');
            $('#inf4').html('请输入6-16位字母或数字')
        }
        if($('#repsw').val() == ''){
            $('#repsw-inf').css('display','block');
            $('#inf5').html('请再次输入密码')
        }
        if(isok1 == true && isok2 == true && isok3 == true && isok4 == true ){
            console.log(1234)
            $.ajax({
                type : 'post',
                url : '../api/register.php',
                data : {
                    'tel': $('#tel').val(),
                    'psw': $('#psw').val(),
                },
                success : function(str){
                    if(str == 'no'){
                        alert('注册失败')
                    }else{
                       location.href = 'login.html';
                    }
                }
            })
        }
        
    })

})