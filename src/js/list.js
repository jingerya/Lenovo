//添加列表页的图片
$.getJSON('json/list.json',function(data){
	let len = data.length;
	for(let i = 0;i < len;i ++){
		$('.pic').append(`<img src="img/${data[i]}" >`);
	}
	$('.pic img').eq(1).click(function(){
		window.location = 'detail.html';
	})
})

//侧边栏移入效果
$('#aside ul li').each(function(i){
	$(this).children('a').mouseenter(function(){
		$(this).parent('li').attr('class','enter');
		$(this).children('p').css('display','block');
		$(this).children('p').animate({right: '48px'},300);
		$(this).children('p').mouseenter(function(){
			$(this).attr('class','enter_p');
		})
		$(this).children('p').mouseleave(function(){
			$(this).removeClass('enter_p');
		})
	})
	$(this).children('a').mouseleave(function(){
		$(this).parent('li').removeClass('enter');
		$(this).children('p').css('display','none');
		$(this).children('p').animate({
			'right':'80px'
		},300);
	})
})


//页面超过一定高度显示侧边栏
$(document).scroll(function(){
	let scrollHeight = $(document).scrollTop();
	if(scrollHeight >= 50){
		$('#aside').css('display','block');
	}else{
		$('#aside').css('display','none');
	}
})

//点击侧边栏的最下边的按钮，回到顶部。
$('#aside ul li').eq(6).click(function(){
	$("html,body").animate({scrollTop:0},0);
})

