var mengbaoTools=function(){function n(n){$.ajax({url:"/baby/vote",type:"POST",data:{sfId:sfid,bId:n}}).done(function(n){n.flag?(alert("投票成功!"),window.location.reload()):"未关注"==n.msg?swal({title:"",text:"投票要先关注荔枝妈妈.",imageUrl:t(),showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"图文教程",cancelButtonText:"取消",closeOnConfirm:!1},function(){window.location.href="http://www.baidu.com"}):alert(n.msg)}).fail(function(){console.log("error"),alert("投票失败!")})}function t(){var n=Math.floor(3*Math.random());return"../img/adv/ad"+n+".jpg"}function o(){$.ajax({url:"/baby/joined",type:"get",data:{sfId:sfid},dataType:"json"}).done(function(n){i(n.ifJoin),$("#my-baby-tab").attr("bid",n.bId)}).fail(function(){console.log("error")})}function i(n){n?$("#want-join-tab").hide():$("#my-baby-tab").hide()}function e(){var n=window.location.search,t=new Object;if(-1!=n.indexOf("?"))for(var o=n.substr(1),i=o.split("&"),e=0;e<i.length;e++)t[i[e].split("=")[0]]=i[e].split("=")[1];return t}function a(){$(document).on("click",".index",function(){window.location.href="center.html?sfid="+sfid}),$(document).on("click",".add",function(){window.location.href="add.html?sfid="+sfid}),$(document).on("click",".mybaby",function(){var n=$(this).attr("bid");window.location.href="mybaby.html?sfid="+sfid+"&bid="+n}),$(document).on("click",".prize",function(){window.location.href="prize.html?sfid="+sfid}),$(document).on("click",".activity-rule",function(){window.location.href="activity.html?sfid="+sfid})}function c(){$(".banner").unslider()}function r(){var n=window.location.href,t="/wxpay/prepare";$.ajax({type:"post",url:t,data:{curl:n,platformId:"8af5535b4ef90b7d014efb8fc3f00bec"},success:function(n){wx.config({debug:!1,appId:n.appid,timestamp:n.timestamp,nonceStr:n.noncestr,signature:n.sign_result,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})},error:function(n){console.log("ERROR:",n)}})}function f(){var n=' <div id="mask" style="z-index:9999;background-color: black;opacity: 0.8;position:fixed;top:0;bottom:0;left:0;right:0;"><img style="float: right;" src="../img/share.png"></div>';$("body").prepend(n),$("#mask").click(function(){d()})}function d(){$("#mask").remove()}return{RequestParameter:function(){return e()},init:function(){a(),o()},initBanner:function(){c()},initWxShare:function(){r()},vote:function(t){n(t)},shareTip:function(){f()}}}(),sfid=mengbaoTools.RequestParameter().sfid,bid=mengbaoTools.RequestParameter().bid;mengbaoTools.init();