"use strict";$("#banner ul li:first").children("a").click(function(){location.href="index.html"}),$(".btn p a").click(function(){location.href="registor.html"}),$(".btn .now").click(function(){var i=$.cookie("lenovo_lj_users"),n=void 0===i?{}:$.parseJSON(i),t=$(".user").val(),l=$(".pwd").val();t in n&&l===n[t]?(alert("登录成功！"),window.location="index.html"):$(".tishi").css("display","block")});for(var $input=$("input"),i=0,len=$input.length;i<len;i++)$input.eq(i).focus(function(){$(this).css("border","1px solid black")}),$input.eq(i).blur(function(){$(this).css("border","1px solid #d6d6d6")});