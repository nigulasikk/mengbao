var mengbaoTools=function(){function n(n){$.ajax({url:"/baby/vote",type:"POST",data:{sfId:sfid,bId:n}}).done(function(n){n.flag?(alert("感谢您投出宝贵的一票!"),window.location.reload()):"未关注"==n.msg?swal({title:"",showConfirmButton:!1,text:"请进入微信公众号“荔枝妈妈”点击菜单栏【萌宝大赛】进行投票<br><a href='http://mp.weixin.qq.com/s?__biz=MzI5ODAwNTY2MA==&mid=207512386&idx=1&sn=d2e302c89ba38c96069c96f921847921&scene=0#rd'><button>点我投票</button></a>"+mengbaoTools.randomPic(),html:!0},function(){}):alert(n.msg)}).fail(function(){console.log("error"),alert("投票失败!")})}function i(){var n=Math.floor(5*Math.random()),i="http://mp.weixin.qq.com/s?__biz=MzAwOTMzNzkwMQ==&mid=208574211&idx=1&sn=8f911382db59a8518b26240af5081882#rd",t="http://wap.koudaitong.com/v2/feature/e2er2zf2",e="http://mp.weixin.qq.com/s?__biz=MzA3MzQ4OTk2OQ==&mid=208464299&idx=1&sn=8770f5494abe9fe32ba1e447f4f475f7#rd",o="http://mp.weixin.qq.com/s?__biz=MzAwMTEyNzI5Mg==&mid=205231980&idx=1&sn=6e7c71a3be63f4543d74e481685a441b&scene=1&key=0acd51d81cb052bc8eb309208d7498f0fff5f5f324b4956ce8965599505f92414934d1c2c5dbf4b00504967be50330ed&ascene=1&uin=MTQ5NzkwMzIyMA%3D%3D&devicetype=webwx&version=70000001&pass_ticket=DlYd7cF3JxKRIgp8L1FtELAG9DK7MokXcFHis2pIGvsoaLyWSZNv9BHpK3x1Z4%2Fd",a="http://mp.weixin.qq.com/s?__biz=MzI4NTAwNzI4MA==&mid=211328080&idx=1&sn=ed4a0076c1472e0ecbbba19dbfeb791c&scene=0#rd",c=[i,t,e,o,a];return"<a href='"+c[n]+"'><img style='margin-top:30px;' width='220' src='../img/adv/ad"+n+".jpg'></a>"}function t(){$.ajax({url:"/baby/joined",type:"get",data:{sfId:sfid},dataType:"json"}).done(function(n){e(n.ifJoin),$("#my-baby-tab").attr("bid",n.bId)}).fail(function(){console.log("error")})}function e(n){n?$("#want-join-tab").hide():$("#my-baby-tab").hide()}function o(){var n=window.location.search,i=new Object;if(-1!=n.indexOf("?"))for(var t=n.substr(1),e=t.split("&"),o=0;o<e.length;o++)i[e[o].split("=")[0]]=e[o].split("=")[1];return i}function a(){$(document).on("click",".index",function(){window.location.href="center.html?sfid="+sfid}),$(document).on("click",".add",function(){window.location.href="add.html?sfid="+sfid}),$(document).on("click",".mybaby",function(){var n=$(this).attr("bid");window.location.href="mybaby.html?sfid="+sfid+"&bid="+n}),$(document).on("click",".prize",function(){window.location.href="prize.html?sfid="+sfid}),$(document).on("click",".activity-rule",function(){window.location.href="activity.html?sfid="+sfid})}function c(){var n=$(".banner").unslider({speed:500,delay:3e3,complete:function(){},keys:!0,dots:!1,fluid:!1}),i=n.data("unslider");$(".banner").on("swipeleft",function(n){i.next()}),$(".banner").on("swiperight",function(n){i.prev()})}function d(){var n=window.location.href,i="/wxpay/prepare";$.ajax({type:"post",url:i,data:{curl:n,platformId:"8af5535b4ef90b7d014efb8fc3f00bec"},success:function(n){wx.config({debug:!1,appId:n.appid,timestamp:n.timestamp,nonceStr:n.noncestr,signature:n.sign_result,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},error:function(n){console.log("ERROR:",n)}})}function r(){var n=' <div id="mask" style="z-index:9999;background-color: black;opacity: 0.8;position:fixed;top:0;bottom:0;left:0;right:0;"><img style="float: right;" src="../img/share.png"></div>';$("body").prepend(n),$("#mask").click(function(){f()})}function f(){$("#mask").remove()}return{RequestParameter:function(){return o()},init:function(){a(),t()},initBanner:function(){c()},initWxShare:function(){d()},vote:function(i){n(i)},shareTip:function(){r()},randomPic:function(){return i()}}}(),sfid=mengbaoTools.RequestParameter().sfid,bid=mengbaoTools.RequestParameter().bid;mengbaoTools.init();