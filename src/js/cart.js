$(function(){
	let index = 1,key = 0,timer = null;;
	//手动轮播
	//左按钮点击事件
	$('.slide_bottom_left a').click(function(){
		clearInterval(timer);
		key --;
		if(key < 0){
			key = 2;
		}
		slide();
		autoPlay();
	})
	//右按钮点击事件
	$('.slide_bottom_right a').click(function(){
		clearInterval(timer);
		key ++;
		if(key > 2){
			key = 0;
		}
		slide();
		autoPlay();
	})
	//轮播函数
	function slide(){
		index ++;
		$('.slide_bottom_center ul').eq(key).css('z-index',index);
	}
	
	autoPlay();
	//自动轮播
	function autoPlay(){
		clearInterval(timer);
		timer = setInterval(function(){
			key ++;
			if(key > 2){
				key = 0;
			}
			slide();
			$('.slide_bottom_center').mouseenter(function(){
				// console.log(1);
				clearInterval(timer);
			})
			$('.slide_bottom_center').mouseleave(function(){
				autoPlay();
			})
		},2000)
	}
	
})

//点击轮播中的商品加入localstorage
$(function(){
	$('.slide_bottom_center ul').each(function(){
		$(this).children('li').each(function(){
			$(this).children('a').click(function(){
				//获取信息
				this.src = $(this).siblings('img').attr('src');
				this.id = $(this).parent('li').attr('data-good-id');
				this.descripe = $(this).siblings('p').html();
				this.price = parseInt($(this).siblings('h6').children('span').html());
				//存取
				let storage = window.localStorage;
				let storageStr = storage.lenovo_lj_product;
				let storageObj = storageStr === undefined ? {} : $.parseJSON(storageStr);
				if(this.id in storageObj){
					storageObj[this.id].num ++;
				}else{
					storageObj[this.id] = {
						"src" : this.src,
						"descripe" : this.descripe,
						"price" : this.price,
						"num" : 1
					}
				}
				storage.lenovo_lj_product = JSON.stringify(storageObj);
				location.reload();
			})
		})
	})
})

//将localstorage中的商品读取出来放在页面中
$(function(){
	let storage = window.localStorage;
	let storageStr = storage.lenovo_lj_product;
	let storageObj = storageStr === undefined ? {} : $.parseJSON(storageStr);
	for(let attr in storageObj){
		let value = storageObj[attr];
		$('.yes_con').append(`
			<dl good-data-id="${attr}">
			<dt></dt>
			<img src="${value.src}" alt="">
			<dd>
				<a href="javascript:;">${value.descripe}</a><br>
			</dd>
			<dd></dd>
			<dd>${value.price}</dd>
			<dd><p class="minus">-</p><input type="text"  class="num" value="${value.num}" /><p class="plus">+</p></dd>
			<dd>${value.num * value.price}</dd>
			<dd>
				<a href="javascript:;" class="del">删除</a><br>
				<a href="javascript:;">移入收藏夹</a>
			</dd>
			</dl>
		`)
	}
})

//点击 + ,购物车数量增加
$(function(){
	$('.yes_con .plus').click(function(){
		let count = $(this).siblings('input').val();
		++ count;
		$(this).siblings('input').val(count);
		let storage = window.localStorage;
		let storageStr = storage.lenovo_lj_product;
		let storageObj = storageStr === undefined ? {} : $.parseJSON(storageStr);
		let id = $(this).parent('dd').parent('dl').attr('good-data-id');
		$(this).parent('dd').next().html(`${count * storageObj[id].price}`);
		storageObj[id].num ++;
		storage.lenovo_lj_product = JSON.stringify(storageObj);
	})
})

//点击 - ，购物车数量减少
$(function(){
	$('.yes_con .minus').click(function(){
		let count = $(this).siblings('input').val();
		-- count;
		if(count < 1){
			count = 1;
		}
		$(this).siblings('input').val(count);
		let storage = window.localStorage;
		let storageStr = storage.lenovo_lj_product;
		let storageObj = storageStr === undefined ? {} : $.parseJSON(storageStr);
		let id = $(this).parent('dd').parent('dl').attr('good-data-id');
		$(this).parent('dd').next().html(`${count * storageObj[id].price}`);
		storageObj[id].num = count;
		storage.lenovo_lj_product = JSON.stringify(storageObj);
	})
})

//更改input框中的值，改变数量
$(function(){
	$('.yes_con .num').blur(function(){
		let count = $(this).val();
		if(isNaN(count) || count < 1){
			count = 1;
		}
		$(this).val(count);
		let storage = window.localStorage;
		let storageStr = storage.lenovo_lj_product;
		let storageObj = storageStr === undefined ? {} : $.parseJSON(storageStr);
		let id = $(this).parent('dd').parent('dl').attr('good-data-id');
		$(this).parent('dd').next().html(`${count * storageObj[id].price}`);
		storageObj[id].num = count;
		storage.lenovo_lj_product = JSON.stringify(storageObj);
	})
})

//删除商品
$(function(){
	$('.yes_con .del').click(function(){
		$(this).parent('dd').parent('dl').remove();
		let storage = window.localStorage;
		let storageStr = storage.lenovo_lj_product;
		let storageObj = storageStr === undefined ? {} : $.parseJSON(storageStr);
		let id = $(this).parent('dd').parent('dl').attr('good-data-id');
		delete storageObj[id];
		storage.lenovo_lj_product = JSON.stringify(storageObj);
	})
})


$(function(){
	//点击返回首页
	$('.index').click(function(){
		window.location = 'index.html';
	})
	//点击登录
	$('.login').click(function(){
		window.location = 'login.html';
	})
})



