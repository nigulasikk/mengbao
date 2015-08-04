/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-07-28 20:45:25
 * @version $Id$
 */
var detailOpt = (function() {
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