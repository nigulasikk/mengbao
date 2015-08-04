/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-07-28 20:45:25
 * @version $Id$
 */
var detailOpt = (function() {
    function bindings(){
        $(".vote-him").click(function(){
            vote();

        });
    }
    /**
     * 投票按钮
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function vote() {
        $.ajax({
            url: '/baby/vote',
            type: 'POST',
            data: {
                "sfId": sfid,
                "bId": bid
            }
        })
            .done(function(res) {
                alert("投票成功!");
            })
            .fail(function() {
                console.log("error");
                alert("投票失败!");

            });

    }
    function init() {
        $.ajax({
                url: '/baby/'+bid,
                type: 'get',
                dataType: 'json'

            })
            .done(function(mengbao) {

                $("#bid").text(mengbao.id);
                $("#bname").text(mengbao.name);
                $("#detail-infp").text(mengbao.description);
                $("#rank-num").text(mengbao.ranking);
                $("#less-than-before").text(mengbao.afterBefore);

                var imgList = mengbao.imgList;
                var imgListHtml="";
                for(var i=0;i<imgList.length;i++){
                    imgListHtml+='<img class="img-response detail-img-item" src="'+imgList[i]+'">';
                }
                $(".detail-img-list").append(imgListHtml);
                //按钮事件绑定
                bindings();
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    }
    return {
        init: function() {
            init();
        }
    };
}());

detailOpt.init();