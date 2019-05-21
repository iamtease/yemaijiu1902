$(function(){
  $('#btn-login').click(function(){
      
    $.ajax({
        type : 'post',
        url : '../api/login.php',
        data : {
            'tel' : $('#tel').val(),
            'psw' : $('#psw').val()
        },
        success: function(str){
            if(str == 'yes'){
                location.href = '../111.html'
                setCookie('tel',$('#tel').val(),7)
            }else{
                alert('账号或密码不正确')
            }
        }
    })
  })
  $('#psw').keydown(function(ev){
    if(ev.keyCode == 13){
        $.ajax({
            type : 'post',
            url : '../api/login.php',
            data : {
                'tel' : $('#tel').val(),
                'psw' : $('#psw').val()
            },
            success: function(str){
                if(str == 'yes'){
                    location.href = '../111.html'
                    setCookie('tel',$('#tel').val(),7)
                }else{
                    alert('账号或密码不正确')
                }
            }
        })
    }
  })
})