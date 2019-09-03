$.getJSON('json/particular.json',function(data){
	let len = data.length;
	for(let i = 0; i < len;i ++){
		$('.pic').append(`<img src="img/${data[i]}">`);
	}
})