function initBanner(){$(".banner").unslider()}var centerRender=function(){function n(n,i,e,t){return' <div class="inline-block rank-item width50"><div class="rank-img-wrap">   <img class="img-response mengbao-entrance" mid="'+e+'"  src="'+n+'">   </div>   </div><div class="inline-block rank-item width50">      <img src="../img/topbg.png" class="img-response">    <img src="../img/bestmengbaby.png" class="best-meng-baby">     <div class="top-mengbao-info" style="padding:5px;">       姓名:'+i+"&nbsp;&nbsp;编号:"+e+'      <div class="vote-num">票数:'+t+'</div>     <div class=" red-btn vote-btn" mid='+e+">投票</div> </div> </div>"}function i(n,i,e,t){return'<div class="inline-block rank-item width50"><div class="rank-img-wrap">   <img class ="img-response mengbao-entrance" mid="'+e+'"  src="'+n+'"></div><div class="mengbao-info">   姓名:'+i+"&nbsp;&nbsp;编号:"+e+'  <div class="vote-num">票数:'+t+'</div> <div class="red-btn vote-btn" mid="'+e+'">投票</div></div></div>'}function e(n,i,e,t){return'<div class="inline-block width33-base new-item"><div class="img-wrap">    <img class="img-response" src="'+n+'" ></div><div class="joiner-info">       姓名：'+i+"       <br>         编号："+e+"          <br>           时间："+t+"    </div>  </div>"}function t(n){$(".votePeople").text(n.votePeople),$(".voteNum").text(n.voteNum),$(".visit").text(n.visit)}function a(n){for(var i=n.newJoiner,t="",a=0;a<i.length;a++)a%3==0&&(t+="<li>"),t+=e(i[a].img,i[a].name,i[a].id,i[a].joinTime),a%3==2&&(t+="</li>");t+="</li>",$(".new-list").append(t),initBanner()}function s(e){console.log(e);var t=e.mengbaoList,a="";a=n(t[0].img,t[0].name,t[0].id,t[0].geted);for(var s=1;s<t.length;s++)a+=i(t[s].img,t[s].name,t[s].id,t[s].geted);$(".meng-list").append(a)}function o(n){console.log(n);for(var e=n.mengbaoList,t="",a=0;a<e.length;a++)t+=i(e[a].img,e[a].name,e[a].id,e[a].geted);$(".meng-list").append(t)}function r(){$.get("/baby ",function(n){t(n),a(n),s(n),l()})}function d(n){$.ajax({url:"/baby/vote",type:"POST",data:{sfId:sfid,bId:n}}).done(function(n){n.flag?(alert("投票成功!"),window.location.reload()):alert(n.msg)}).fail(function(){console.log("error"),alert("投票失败!")})}function c(n){$.ajax({url:"\b/baby/search",type:"POST",data:{q:n}}).done(function(n){$(".meng-list").empty(),o(n)}).fail(function(){alert("搜索失败!")})}function l(){$(".vote-btn").click(function(){var n=$(this).attr("mid");d(n)}),$(".mengbao-entrance").click(function(){var n=$(this).attr("mid");window.location.href="babydetail.html?sfid="+sfid+"&bid="+n}),$(".search-btn").click(function(){var n=$(".search-content").val();c(n)})}return{renderViews:function(){r()},bindings:function(){l()}}}();centerRender.renderViews();