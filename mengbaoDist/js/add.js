$(document).ready(function(){wxImgOpt.init(),wxImgOpt.bindings()});var wxImgOpt=function(){function n(){$(".commit-info").click(function(){1==sfid?swal({title:"",showConfirmButton:!1,text:"请进入微信公众号“荔枝妈妈”点击菜单栏【萌宝大赛】进行投票<a href='http://mp.weixin.qq.com/s?__biz=MzI5ODAwNTY2MA==&mid=207512386&idx=1&sn=d2e302c89ba38c96069c96f921847921&scene=0#rd'><button>图文教程</button></a><img style='margin-top:30px;' width='220' src='"+mengbaoTools.randomPic()+"'>",html:!0},function(){}):e()})}function e(){""==$(".nickname").val()?alert("请填写名字"):11!=$(".phone").val().length?alert("请填写11位手机号码，以方便我们联系到您！"):0==l.length?alert("参赛必须要上传一张以上的宝宝图片!"):$.post("/baby",{"user.id":sfid,images:l,name:$(".nickname").val(),phone:$(".phone").val(),description:$(".description").val(),platformId:"8af5535b4ef90b7d014efb8fc3f00bec"},function(n){alert("恭喜你，报名成功!"),o()})}function o(){$.ajax({url:"/baby/joined",type:"get",data:{sfId:sfid},dataType:"json"}).done(function(n){window.location.href="mybaby.html?sfid="+sfid+"&bid="+n.bId}).fail(function(){console.log("error")})}function i(){var n=window.location.href,e="/wxpay/prepare";$.ajax({type:"post",url:e,data:{curl:n,platformId:"8af5535b4ef90b7d014efb8fc3f00bec"},success:function(n){wx.config({debug:!1,appId:n.appid,timestamp:n.timestamp,nonceStr:n.noncestr,signature:n.sign_result,jsApiList:["chooseImage","uploadImage","downloadImage","previewImage"]})},error:function(n){console.log("ERROR:",n)}})}function t(){wx.checkJsApi({jsApiList:["chooseImage"],success:function(n){n.checkResult.chooseImage||alert("请使用微信客户端6.0.2或更高版本！")}})}function c(){wx.chooseImage({count:9,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(n){u=n.localIds,s(u),$("#preview-imgs").append(f(u))}})}function a(n,e){wx.previewImage({current:n,urls:e})}function s(n){for(var e=0;e<n.length;e++)r(n[e])}function r(n){wx.uploadImage({localId:n,isShowProgressTips:1,success:function(n){l.push(n.serverId)}})}function f(n){for(var e="",o=0;o<n.length;o++)e+='<img style="width:100px;" src="'+n[o]+'">';return e}var u=[],l=[];return{init:function(){i()},check:function(){t()},chooseImage:function(){c()},previewImage:function(){a()},bindings:function(){n()}}}();wx.ready(function(){wxImgOpt.check(),$(".choose-pic").click(function(){wxImgOpt.chooseImage()})}),wx.error(function(n){console.log(n)});