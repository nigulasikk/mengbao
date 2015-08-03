var centerRender = (function() {
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
            '   <img class="img-response"  src="' + imgurl + '">' +
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

    function mengbaoItemHtml(imgurl, name, id, geted) {
        return '<div class="inline-block rank-item width50">' +
            '<div class="rank-img-wrap">' +
            '   <img class ="img-response"  src="'+imgurl+'">' +
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
            '    <img class="img-response" src="' + imgurl + '" >' +
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
            newListHtml += newJoinBlock(newJoiner[i].img, newJoiner[i].name, newJoiner[i].id, newJoiner[i].joinTime);
        }
        $(".new-list").append(newListHtml);

    }
    /**
     * 前50名梦宝列表
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    function renderMengbaoList(data) {
        console.log(data);
        var mengbaoList=data.mengbaoList;
        var mengbaoHtml="";
        mengbaoHtml=topMengHtml(mengbaoList[0].img, mengbaoList[0].name, mengbaoList[0].id, mengbaoList[0].geted);

        for(var i=1;i<mengbaoList.length;i++){
            mengbaoHtml+=mengbaoItemHtml(mengbaoList[i].img, mengbaoList[i].name, mengbaoList[i].id, mengbaoList[i].geted);
        }

        $(".meng-list").append(mengbaoHtml);
    }


    /**
     * 渲染页面
     * @return {[type]} [description]
     */
    function showViews() {
        $.getJSON("../js/center.json", {
            "sfid": sfid
        }, function(centerData) {

            renderVistInfo(centerData);

            renderNewList(centerData);
            renderMengbaoList(centerData);
        });


    }

    /**
     * 投票按钮
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function vote(id) {
        $.ajax({
                url: '/path/to/file',
                type: 'default GET (Other values: POST)',
                dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
                data: {
                    param1: 'value1'
                },
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    }
    /**
     * 事件的绑定
     * @return {[type]} [description]
     */
    function bindings() {


    }
    return {
        /**
         * 渲染页面
         * @return {[type]} [description]
         */
        renderViews: function() {
            showViews();
        },
        bindings: function() {
            bindings();
        }
    };
}());


centerRender.renderViews();