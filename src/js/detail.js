/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-07-28 20:45:25
 * @version $Id$
 */
var detailOpt = (function() {
    function bindings(){
        $(".vote-him").click(function(){
            mengbaoTools.vote(bid);

        });
        $(".share").click(function(){
            mengbaoTools.shareTip();
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

//分享
mengbaoTools.initWxShare();
wx.ready(function() {
    wx.onMenuShareTimeline({
        title: '我是'+bid+'号'+$("#bname").text()+'，正在参加“荔枝妈妈”萌宝大赛，叔叔阿姨、哥哥姐姐帮忙投一票呀!', // 分享标题
        link: 'http://hz3.whiletime.com/mengbaoDist/html/babydetail.html?sfid=1&bid='+bid, // 分享链接
        imgUrl: 'http://hz3.whiletime.com/mengbaoDist/img/top.png', // 分享图标
        success: function() {

        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
//
        title: '我是'+bid+'号'+$("#bname").text()+'，正在参加“荔枝妈妈”萌宝大赛，叔叔阿姨、哥哥姐姐帮忙投一票呀!', // 分享标题
        desc: "荔枝妈妈萌宝大赛：万元大礼等你来拿", // 分享描述

        link: 'http://hz3.whiletime.com/mengbaoDist/html/babydetail.html?sfid=1&bid='+bid,
        imgUrl: 'http://hz3.whiletime.com/mengbaoDist/img/top.png', // 分享图标
        success: function() {


        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
