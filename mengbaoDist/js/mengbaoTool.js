var mengbaoTools=function(){function i(){$.ajax({url:"/baby/joined",type:"get",data:{sfId:sfid},dataType:"json"}).done(function(i){n(i.ifJoin)}).fail(function(){console.log("error")})}function n(i){i?$("#want-join-tab").hide():$("#my-baby-tab").hide()}function o(){var i=window.location.search,n=new Object;if(-1!=i.indexOf("?"))for(var o=i.substr(1),t=o.split("&"),e=0;e<t.length;e++)n[t[e].split("=")[0]]=t[e].split("=")[1];return n}function t(){$(document).on("click",".index",function(){window.location.href="center.html?sfid="+sfid}),$(document).on("click",".add",function(){window.location.href="add.html?sfid="+sfid}),$(document).on("click",".mybaby",function(){window.location.href="babydetail.html?sfid="+sfid+"&bid="+sfid}),$(document).on("click",".prize",function(){window.location.href="prize.html?sfid="+sfid}),$(document).on("click",".activity-rule",function(){window.location.href="activity.html?sfid="+sfid})}return{RequestParameter:function(){return o()},init:function(){t(),i()}}}(),sfid=mengbaoTools.RequestParameter().sfid,bid=mengbaoTools.RequestParameter().bid;mengbaoTools.init();