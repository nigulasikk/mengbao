var centerRender = (function() {
    function badge2or3(num){
        if(num==1){
            return '<img src="../img/yin.png" style="width: 80px;position: absolute;left: 0;bottom: 0;">';
        }else if(num==2){
            return '<img src="../img/tong.png" style="width: 80px;position: absolute;left: 0;bottom: 0;">';

        }else{
            return "";
        }
    }
    /**
     * 最萌宝贝 模板
     * @param  {[type]} imgurl [description]
     * @param  {[type]} name   [description]
     * @param  {[type]} id     [description]
     * @param  {[type]} time   [description]
     * @return {[type]}        [description]
     */
    function topMengHtml(imgurl, name, id, geted) {
        return ' <div class="inline-block rank-item width50">' +
            '<div class="rank-img-wrap">' +
            '   <img class="img-response mengbao-entrance" mid="'+id+'"  src="' + imgurl + '">' +
            '<img src="../img/jin.png" style="width: 80px;position: absolute;left: 0;bottom: 0;">'+
            '   </div>' +
            '   </div><div class="inline-block rank-item width50">' +
            '      <img src="../img/topbg.png" class="img-response">' +
            '    <img src="../img/bestmengbaby.png" class="best-meng-baby">' +
            '     <div class="top-mengbao-info" style="padding:5px;">' +
            '       姓名:' + name + '&nbsp;&nbsp;编号:' + id +
            '      <div class="vote-num">票数:' + geted + '</div>' +
            '     <div class=" red-btn vote-btn" mid=' + id + '>投票</div>' +
            ' </div>' +
            ' </div>';
    }

    function mengbaoItemHtml(imgurl, name, id, geted,iter) {
        return '<div class="inline-block rank-item width50">' +
            '<div class="rank-img-wrap">' +
            '   <img class ="img-response mengbao-entrance" mid="'+id+'"  src="'+imgurl+'">' +
            badge2or3(iter)+
            '</div>' +
            '<div class="mengbao-info">' +
            '   姓名:'+name+'&nbsp;&nbsp;编号:' +id+
            '  <div class="vote-num">票数:'+geted+'</div>' +
            ' <div class="red-btn vote-btn" mid="'+id+'">投票</div>' +
            '</div>' +
            '</div>';
    }
    /**
     * 最新参赛
     * @param  {[type]} imgurl 图片链接
     * @param  {[type]} name   名字
     * @param  {[type]} id     id
     * @param  {[type]} time   时间
     * @return {[type]}        字符串 
     * 
     */
    function newJoinBlock(imgurl, name, id, time) {
        return '<div class="inline-block width33-base new-item">' +
            '<div class="img-wrap">' +
            '    <img class="img-response mengbao-entrance" mid="'+id+'" src="' + imgurl + '" >' +
            '</div>' +
            '<div class="joiner-info">' +
            '       姓名：' + name +
            '       <br>' +
            '         编号：' + id +
            '          <br>' +
            '           时间：' + time +
            '    </div> ' +
            ' </div>';
    }
    /**
     * 初始化 投票 参观信息
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function renderVistInfo(data) {
        $(".votePeople").text(data.votePeople);
        $(".voteNum").text(data.voteNum);
        $(".visit").text(data.visit);


    }
    /**
     * 最新梦宝
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function renderNewList(data) {
        var newJoiner = data.newJoiner;
        var newListHtml = "";
        for (var i = 0; i < newJoiner.length; i++) {
            if(i%3==0){
                newListHtml +="<li>";
            }
            newListHtml += newJoinBlock(newJoiner[i].img, newJoiner[i].name, newJoiner[i].id, newJoiner[i].joinTime);
            if(i%3==2){
                newListHtml +="</li>";
            }
        }
        newListHtml +="</li>";


        $(".new-list").append(newListHtml);
        //激活banner
        mengbaoTools.initBanner();


    }
    /**
     * 前50名梦宝列表
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function renderMengbaoList(data) {
        var mengbaoList=data.mengbaoList;
        var mengbaoHtml="";
        mengbaoHtml=topMengHtml(mengbaoList[0].img, mengbaoList[0].name, mengbaoList[0].id, mengbaoList[0].geted);

        for(var i=1;i<mengbaoList.length;i++){
            mengbaoHtml+=mengbaoItemHtml(mengbaoList[i].img, mengbaoList[i].name, mengbaoList[i].id, mengbaoList[i].geted,i);
        }

        $(".meng-list").append(mengbaoHtml);

    }
 /**
     * 前50名梦宝列表
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function renderMengbaoListBySearchResult(data) {
        console.log(data);
        var mengbaoList=data;
        var mengbaoHtml="";

     if(mengbaoList.length==0){
         mengbaoHtml+='<p style="text-align: center;">没有搜索到符合条件的用户!</p>';

     }
        for(var i=0;i<mengbaoList.length;i++){
            mengbaoHtml+=mengbaoItemHtml(mengbaoList[i].img, mengbaoList[i].name, mengbaoList[i].id, mengbaoList[i].geted);
        }

        $(".meng-list").append(mengbaoHtml);

     bindings();
    }


    /**
     * 渲染页面
     * @return {[type]} [description]
     */
    function showViews() {
        $.get("/baby ",function(centerData) {

            renderVistInfo(centerData);

            renderNewList(centerData);
            renderMengbaoList(centerData);

            bindings();
        });


    }

    /**
     * 搜索
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function search(text) {
        $.ajax({
                url: '/baby/search',
                type: 'POST',
                data: {
                    "q": text
                }
            })
            .done(function(res) {
                $(".meng-list").empty();
                renderMengbaoListBySearchResult(res);

            })
            .fail(function() {
                alert("搜索失败!");

            });

    }
    /**
     * 事件的绑定
     * @return {[type]} [description]
     */
    function bindings() {
        $(".vote-btn").click(function(){
            var babyId=$(this).attr("mid");
            mengbaoTools.vote(babyId);
        });

        $(".mengbao-entrance").click(function(){
            var babyId=$(this).attr("mid");
            window.location.href="babydetail.html?sfid="+sfid+"&bid="+babyId;
        });

        $(".search-btn").click(function(){
            var content=$(".search-content").val();
            search(content);
        });

    }


    //随机广告位
    function topRandomAd(){
        var ad1='<li> <div class="top max-width" > <a href="http://mp.weixin.qq.com/s?__biz=MzAwOTMzNzkwMQ==&mid=208574211&idx=1&sn=8f911382db59a8518b26240af5081882#rd"> <img src="../img/adv/indexAd0.jpg" class="mengbao-banner"> </a> </div> </li>';
        var ad2=' <li> <div class="top max-width" > <a href="http://wap.koudaitong.com/v2/feature/e2er2zf2"> <img src="../img/adv/indexAd1.jpg" class="mengbao-banner"> </a> </div> </li>';
        var ad3='<li> <div class="top max-width" > <a href="taobaoJump.html"> <img src="../img/adv/indexAd2.jpg" class="mengbao-banner"> </a> </div> </li>';
        var ad4='<li> <div class="top max-width" > <a href="http://mp.weixin.qq.com/s?__biz=MzAwMTEyNzI5Mg==&mid=205231980&idx=1&sn=6e7c71a3be63f4543d74e481685a441b&scene=1&key=0acd51d81cb052bc8eb309208d7498f0fff5f5f324b4956ce8965599505f92414934d1c2c5dbf4b00504967be50330ed&ascene=1&uin=MTQ5NzkwMzIyMA%3D%3D&devicetype=webwx&version=70000001&pass_ticket=DlYd7cF3JxKRIgp8L1FtELAG9DK7MokXcFHis2pIGvsoaLyWSZNv9BHpK3x1Z4%2Fd"> <img src="../img/adv/indexAd3.jpg" class="mengbao-banner"> </a> </div> </li>';
        var a=[ad1,ad2,ad3,ad4].sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});
        var out=[];
         out.push('<li><div class="top max-width" ><img src="../img/top.png" class="mengbao-banner"> </div></li>');
        var concatedArray=out.concat(a);
        var outHtml="";
        for(var i=0;i<concatedArray.length;i++){
            outHtml+=concatedArray[i];
        }

        $("#topAdv").append(outHtml);

    }
    return {
        topRandomAd:function(){
            topRandomAd();
        },
        /**
         * 渲染页面
         * @return {[type]} [description]
         */
        renderViews: function() {
            topRandomAd();
            showViews();
        },
        bindings: function() {
            bindings();
        }

    };
}());


centerRender.renderViews();

//分享
mengbaoTools.initWxShare();
wx.ready(function() {
    wx.onMenuShareTimeline({
        title: '我在参加“荔枝妈妈”首届萌宝大赛，万元大礼等你拿，只要你参加就有礼品！', // 分享标题
        link: 'http://whiletime.com/mengbaoDist/html/center.html?sfid=1', // 分享链接
        imgUrl: 'http://whiletime.com/mengbaoDist/img/top.png', // 分享图标
        success: function() {

        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
//
        title: '我在参加“荔枝妈妈”首届萌宝大赛，万元大礼等你拿，只要你参加就有礼品！', // 分享标题
        desc: "荔枝妈妈萌宝大赛：万元大礼等你来拿", // 分享描述

        link: 'http://whiletime.com/mengbaoDist/html/center.html?sfid=1', // 分享链接

        imgUrl: 'http://whiletime.com/mengbaoDist/img/top.png', // 分享图标
        success: function() {


        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
