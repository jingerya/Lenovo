//iput框得焦时边框颜色改变，失焦变回去
let $input = $('input');
for(let i = 0,len = $input.length;i < len;i ++){
	$input.eq(i).focus(function(){
		$(this).css('border','1px solid black');
	})
	$input.eq(i).blur(function(){
		$(this).css('border','1px solid #d6d6d6')
	})
}
//首页跳转
$('#banner ul li').eq(0).click(function(){
	window.location = 'index.html';
})




//设置随机数
function random(min,max){
	if(min > max){
		[min,max] = [max,min];
	}
	return Math.floor(Math.random() * (max - min +1) + min);
}

// 设计随机验证码
function yzm(){
	let letter = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890';
	let str = '';
	for(let i = 0;i < 6;i++){
		let key = random(0,61);
		str += letter.charAt(key);
	}
	$(this).children('a').html(str);
	$(this).children('a').css('color','#999');
	return str;
}

$('.random .right a').click(function(){
	$(this).html(yzm());
})

$('.submit').click(function(){
	let flag = true;
	//验证手机号
	let $call = $('.call').val(),$caRe = /^1[^(2|4|6)]\d{9}$/;
	// console.log(typeof $call);
	if($call.length <= 0){
		flag = false;
		$('.tishi').css('display','block');
		$('.tishi').html('账号不能为空');
		return;
	}else if(!($caRe.test($call))){
		flag = false;
		$('.tishi').css('display','block');
		$('.tishi').html('请输入正确的手机号！');
		return;
	}
	// 验证码是否正确
	let $valL = $('.random .left').val(),$valRig = $('.random .right a').html();
	if($valL !== $valRig){
		flag = false;
		$('.tishi').css('display','block');
		$('.tishi').html('验证码不正确！');
		return;
	}
	
	//验证密码
	let $pwd = $('.pwd').val();
	console.log($pwd);
	let $pwdRe = /^\w{8,20}$/;
	if($pwd.length < 8 || $pwd.length > 20 || !($pwdRe.test($pwd))){
		flag = false;
		$('.tishi').css('display','block');
		$('.tishi').html('请输入正确的密码！');
		return;
	}
	
	//请再次确认密码
	let $pwdA = $('.again').val();
	if($pwdA !== $pwd){
		flag = false;
		$('.tishi').css('display','block');
		$('.tishi').html('两次的密码不一致！');
	}
	
	
	//将用户名和密码存入cookie
	let cookieStr = $.cookie('users');
	let cookieObj = cookieStr === undefined ? {} : $.parseJSON(cookieStr);
	if(flag){
		if($call in cookieObj){
			$('.tishi').css('display','block');
			$('.tishi').html('用户名已存在！');
		}else{
			cookieObj[$call] = $pwd;
			$.cookie('users',JSON.stringify(cookieObj),{
				expires : 7
			});
			window.location = 'login.html';
			alert('注册成功！');
		}
	}   
})

$('.login a').click(function(){
	window.location = 'login.html';
})