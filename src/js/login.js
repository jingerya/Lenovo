$('#banner ul li:first').children('a').click(function(){
	location.href = 'index.html';
})

$('.btn p a').click(function(){
	location.href = 'registor.html';
})

$('.btn .now').click(function(){
	let cookieStr = $.cookie('users');
	let cookieObj = cookieStr === undefined ? {} : $.parseJSON(cookieStr);
	let use = $('.user').val();
	let pwd = $('.pwd').val();
	console.log(use);
	if(!(use in cookieObj)){
		$('.tishi').css('display','block');
		return;
	}else if(pwd !== cookieObj[use]){
		$('.tishi').css('display','block');
		return;
	}else{
		alert('登录成功！');
		window.location = 'index.html';
	}
})


let $input = $('input');
for(let i = 0,len = $input.length;i < len;i ++){
	$input.eq(i).focus(function(){
		$(this).css('border','1px solid black');
	})
	$input.eq(i).blur(function(){
		$(this).css('border','1px solid #d6d6d6')
	})
}