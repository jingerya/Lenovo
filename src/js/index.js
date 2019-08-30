//导航栏的移入移出效果
$('#nav ul li a').mouseenter(function(){
	$(this).css({
		'color' : '#395782',
	});
	$('.per-and-hou').css('display','block');
})
$('#nav ul li a').mouseleave(function(){
	$(this).css({
		'color' : '',
	})
	$('.per-and-hou').css('display','none');
})

//banner轮播
	$.getJSON('json/bigSlide.json',(data)=>{
		let width = $(window).width();
		let $ul = $('#banner ul');
		for(let i = 0,len = data.length;i < len;i ++){
			$ul.append(`<img src="img/${data[i]}.jpg" width=${width}px height="600px">`);
		}
		// 自动轮播
		let key = 0, len = data.length,timer = null,index = 0;
		//左按钮
		$('#banner .leftBtn').click(function(){
			key --;
			index --;
			if(key < 0){
				key = len - 2;
				$('#banner ul').css('left' ,- width * (key + 1));
			}
			slide();
			if(index < 0){
				index = len - 2;
			}
			circleSlide();
		})
		//调用自动轮播
		autoPlay();
		//右按钮
		$('#banner .rightBtn').click(function(){
			key ++;
			index ++;
			//大图轮播
			if(key >= len){
				key = 1;
				$('#banner ul').css('left' ,0);
			}
			slide();
			//小图轮播
			if(index > len - 2){
				index = 0;
			}
			circleSlide();
		})
		
		 // 小图移入
		 $('#banner dl dd').each(function(i){
		 	$(this).mouseenter(function(){
		 		index = i;
		 		key = i;
				slide();
				circleSlide();
		 	})
		 })
		 function autoPlay(){
		 	clearInterval(timer);
		 	timer = setInterval(function(){
		 		key ++;
		 		if(key >= len){
		 			$('#banner ul').css('left',0);
		 			key = 1;
		 		}
		 		$('#banner ul').animate({
		 			left : - width * key
		 		 },300);
		 		 index ++;
		 		 if(index >= len - 1){
		 			 index = 0;
		 		 }
		 		 $('#banner dl dd').each(function(){
		 		 	$(this).removeAttr('class');
		 		 })
		 		 $('#banner dl dd').eq(index).attr('class','circle')	 
		 	},3000)
		 	$('#banner').mouseenter(function(){
		 		clearInterval(timer);
		 	})
		 	$('#banner').mouseleave(function(){
		 		autoPlay();
		 	})
		 }
		 
		 //大图轮播
		  function slide(){
		 	 $('#banner ul').animate({
		 		 left : - width * key
		 	 },300)
		  }
		 //小图轮播
		function circleSlide(){
			$('#banner dl dd').each(function(){
				$(this).removeAttr('class');
			})
			$('#banner dl dd').eq(index).attr('class','circle')
		}
	})



//热门板块推荐轮播

$.getJSON('json/hot.json',(data)=>{
	// console.log($('#hot hot-con ul li'));
	$('#hot .hot-con ul li').each(function(i){
		$(this).append(`<img src="img/${data[i]}" width="338px" height="298px">`)
	})
	//左按钮移入事件
	$('#hot .hot-con .lBtn').mouseenter(function(){
		$(this).css({
			'cursor':'pointer',
			'opacity' : 0.8
		});
	})
	//右按钮移入事件
	$('#hot .hot-con .rtBtn').mouseenter(function(){
		$(this).css({
			'cursor':'pointer',
			'opacity' : 0.8
		});
	})
	//左按钮移出事件
	$('#hot .hot-con .lBtn').mouseleave(function(){
		$(this).css({
			'opacity' : 0.5
		});
	})
	//右按钮移出事件
	$('#hot .hot-con .rtBtn').mouseleave(function(){
		$(this).css({
			'opacity' : 0.5
		});
	})
	
	//右按钮点击事件
	$('#hot .hot-con .rtBtn').click(function(){
		// console.log($('#hot .hot-con ul').css('left'));
		$('#hot .hot-con ul').animate({left: '-358px'},"slow");
		$('#hot .hot-con ul').children().first().appendTo($('#hot .hot-con ul'));
	})
	$('#hot .hot-con .lBtn').click(function(){
		$('#hot .hot-con ul').animate({right: '-358px'},"slow");
		$('#hot .hot-con ul').children().last().prependTo($('#hot .hot-con ul'));
	})
})


//detail

$.getJSON('json/detail.json',(data)=>{
	let lf = data.left,rt = data.right,len = lf.length;
	for(let i = 0;i < len;i ++){
		$('#detail .detail-con .left').append(`<img src="img/${lf[i]}" width="292px" height="384px">`)
		$('#detail .detail-con .right').append(`<img src="img/${rt[i]}" width="898px" height="384px">`)
	}
	let index = 1,key = -1,timer = null;
	//自动轮播
	function auPlay(){
		clearInterval(timer);
		timer = setInterval(function(){
			key ++;
			// console.log(key);
			index ++;
			$('#detail .detail-con .right').children().eq(key).css('z-index',index);
			$('#detail .detail-con .left').children().eq(key).css('z-index',index);
			
			//移入事件
			$('#detail .detail-con .right').children().eq(key).mouseenter(function(){
				clearInterval(timer);
				$(this).animate({
					width : 948,
					height : 414,
					left : -25,
					top : -15
				},100)
			})
			$('#detail .detail-con .right').children().eq(key).mouseleave(function(){
				auPlay();
				$(this).animate({
					width : 898,
					height : 384,
					left : 0,
					top : 0
				},100)
			})
			$('#detail .detail-con .left').children().eq(key).mouseenter(function(){
				clearInterval(timer);
				$(this).animate({
					width : 322,
					height : 414,
					left : -15,
					top : -15
				},100)
			})
			$('#detail .detail-con .left').children().eq(key).mouseleave(function(){
				auPlay();
				$(this).animate({
					width : 292,
					height : 384,
					left : 0,
					top : 0
				},100)
			})
			if(key == len - 1){
				key = -1;
			}
		},3000)
	}
	auPlay();
})

//三个模块移入后图片改变
$.getJSON('json/littlepic.json',(data)=>{
	let one = data.one,two = data.two,three = data.three,level = 1,levelEn = 1,levelBig = 1;
	//个人与家庭
	$('#person-and-family #little-pic ul li').each(function(i){
		let loca = null;
		$(this).mouseenter(function(){
			loca = $(this).children('a').children('span').children('img').attr('src');
			$(this).children('a').children('span').children('img').attr('src','img/'+one[i]);
			$(this).children('a').children('i').css('color','#395782');
		level ++;
		$('.pic ul').eq(i).css('z-index',level);
		})
		$(this).mouseleave(function(){
			$(this).children('a').children('span').children('img').attr('src',loca);
			$(this).children('a').children('i').css('color','#616161');
		})
	});
	//中小企业采购及服务
	$('#enp .sel ul li').each(function(i){
		let loca = null;
		$(this).mouseenter(function(){
			loca = $(this).children('a').children('span').children('img').attr('src');
			$(this).children('a').children('span').children('img').attr('src','img/'+two[i]);
			$(this).children('a').children('i').css('color','#395782');
			levelEn ++;
			$('.en-pic ul').eq(i).css('z-index',levelEn);
		})
		$(this).mouseleave(function(){
			$(this).children('a').children('span').children('img').attr('src',loca);
			$(this).children('a').children('i').css('color','#616161');
		})
	});
	//政企大客户采购及服务
	$('#bigCustom .bc-slide-pic ul li').each(function(i){
		let loca = null;
		$(this).mouseenter(function(){
			loca = $(this).children('a').children('span').children('img').attr('src');
			$(this).children('a').children('span').children('img').attr('src','img/'+three[i]);
			$(this).children('a').children('i').css('color','#395782');
			levelBig ++;
			$('.bc-silde-img ul').eq(i).css('z-index',levelBig);
		})
		$('.bc-silde-img ul li').mouseenter(function(){
			$(this).css({
				'shadow' : '#ccc 0px 10px10px',
				'cursor' : 'pointer'
			});
		})
		$(this).mouseleave(function(){
			$(this).children('a').children('span').children('img').attr('src',loca);
			$(this).children('a').children('i').css('color','#616161');
		})
	});
})





