var centerRender=function(){function n(n,i,e,t){return' <div class="inline-block rank-item width50"><div class="rank-img-wrap">   <img class="img-response mengbao-entrance" mid="'+e+'"  src="'+n+'">   </div>   </div><div class="inline-block rank-item width50">      <img src="../img/topbg.png" class="img-response">    <img src="../img/bestmengbaby.png" class="best-meng-baby">     <div class="top-mengbao-info" style="padding:5px;">       姓名:'+i+"&nbsp;&nbsp;编号:"+e+'      <div class="vote-num">票数:'+t+'</div>     <div class=" red-btn vote-btn" mid='+e+">投票</div> </div> </div>"}function i(n,i,e,t){return'<div class="inline-block rank-item width50"><div class="rank-img-wrap">   <img class ="img-response mengbao-entrance" mid="'+e+'"  src="'+n+'"></div><div class="mengbao-info">   姓名:'+i+"&nbsp;&nbsp;编号:"+e+'  <div class="vote-num">票数:'+t+'</div> <div class="red-btn vote-btn" mid="'+e+'">投票</div></div></div>'}function e(n,i,e,t){return'<div class="inline-block width33-base new-item"><div class="img-wrap">    <img class="img-response" src="'+n+'" ></div><div class="joiner-info">       姓名：'+i+"       <br>         编号："+e+"          <br>           时间："+t+"    </div>  </div>"}function t(n){$(".votePeople").text(n.votePeople),$(".voteNum").text(n.voteNum),$(".visit").text(n.visit)}function s(n){for(var i=n.newJoiner,t="",s=0;s<i.length;s++)s%3==0&&(t+="<li>"),t+=e(i[s].img,i[s].name,i[s].id,i[s].joinTime),s%3==2&&(t+="</li>");t+="</li>",$(".new-list").append(t),mengbaoTools.initBanner()}function a(e){console.log(e);var t=e.mengbaoList,s="";s=n(t[0].img,t[0].name,t[0].id,t[0].geted);for(var a=1;a<t.length;a++)s+=i(t[a].img,t[a].name,t[a].id,t[a].geted);$(".meng-list").append(s)}function o(n){console.log(n);for(var e=n,t="",s=0;s<e.length;s++)t+=i(e[s].img,e[s].name,e[s].id,e[s].geted);$(".meng-list").append(t)}function c(){$.get("/baby ",function(n){t(n),s(n),a(n),r()})}function d(n){$.ajax({url:"\b/baby/search",type:"POST",data:{q:n}}).done(function(n){$(".meng-list").empty(),o(n)}).fail(function(){alert("搜索失败!")})}function r(){$(".vote-btn").click(function(){var n=$(this).attr("mid");mengbaoTools.vote(n)}),$(".mengbao-entrance").click(function(){var n=$(this).attr("mid");window.location.href="babydetail.html?sfid="+sfid+"&bid="+n}),$(".search-btn").click(function(){var n=$(".search-content").val();d(n)})}return{renderViews:function(){c()},bindings:function(){r()}}}();centerRender.renderViews();