//动态加载详情页的图片
$.getJSON('json/particular.json',function(data){
	let len = data.length;
	for(let i = 0; i < len;i ++){
		$('.pic').append(`<img src="img/${data[i]}">`);
	}
})
// 
//移入首页颜色改变
$('.connect_con p .index').mouseenter(function(){
	$(this).css('color','red');
})

//移出变回原来的颜色
$('.connect_con p .index').mouseleave(function(){
	$(this).css('color','#333333');
})
//点击跳转到主页
$('.connect_con p .index').click(function(){
	window.location = 'index.html';
})


$(function(){
	let index = 1,key = 0;
	//移入小图,大图轮播
	$('.zLeft_bottom .move').each(function(i){
		$(this).mouseenter(function(){
			key = i;
			index ++;
			$('.zLeft_top img').eq(key).css('z-index',index);
		})
	})
	
	//左按钮轮播
	$('.leftBtn').click(function(){
		key --;
		if(key < 0){
			key = 0;
		}
		slide();
	})
	//右按钮轮播
	$('.rightBtn').click(function(){
		key ++;
		if(key > 3){
			key = 3;
		}
		slide();
	})
	//轮播函数
	function slide(){
		index ++;
		$('.zLeft_top img').eq(key).css('z-index',index);
	}
})

//倒计时

$(function(){
	let day,hour,min,sec;
	let timer = setInterval(function(){
		let cha = new Date(2019,8,13,8,0,0) - new Date();
		day = Math.floor(cha / 1000 /60 /60/24);
		hour = Math.floor((cha - day * 24 *60*60*1000)/1000/60/60);
		min = Math.floor(cha/1000/60 %60);
		sec = Math.floor(cha / 1000 % 60);
		if(day === 0 && hour === 0 && min === 0 &&sec === 0){
			clearInterval(timer);
		}
		let hour1 = check(hour);
		let min1 = check(min);
		let sec1 = check(sec);
		// console.log(sec);
		$('.seckill .day').html(day + '天');
		$('.seckill .hour').html(hour1+':'+min1+':'+sec1);
	},1000)
	function check(i){
		if(i < 10){
			i = '0' + i;
		}
		return i;
	}
})

//移入手机颜色的选项框，改变边框和字体颜色
$('.phoneColor .species .five').siblings().each(function(i){
	$(this).mouseenter(function(){
		$(this).css({
			'color' : '#e1140a',
			'border-color':'#e1140a'
		})
	})
	$(this).mouseleave(function(){
		$(this).css({
			'color' : '#434242',
			'border-color' : '#dadada'
		})
	})
})

//点击购买按钮，跳转到购买页
$('.buy').mouseenter(function(){
	$(this).css('cursor','pointer');
})

$('.minus').mouseenter(function(){
	$(this).css('cursor','pointer');
})
$('.plus').mouseenter(function(){
	$(this).css('cursor','pointer');
})

$('.buy').click(function(){
	window.location = 'cart.html';
})

$('.plus').click(function(){
	let num = parseInt($('.number').html());
	num ++;
	$('.number').html(num);
})

$('.minus').click(function(){
	let num = parseInt($('.number').html());
	num --;
	if(num < 1){
		num = 1;
	}
	$('.number').html(num);
})