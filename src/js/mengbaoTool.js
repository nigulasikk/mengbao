/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-07-26 13:53:29
 * @version $Id$
 */


var mengbaoTools = (function() {
    /**
     * 投票按钮
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function vote(babyid) {
        $.ajax({
            url: '/baby/vote',
            type: 'POST',
            data: {
                "sfId": sfid,
                "bId": babyid
            }
        })
            .done(function(res) {
                if(res.flag){
                    alert("投票成功!");
                    window.location.reload();

                }else{
                    if(res.msg=="未关注"){
                        swal({
                            title: "",
                            text: "投票要先关注荔枝妈妈.",
                            imageUrl: randomPic(),
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "图文教程",
                            cancelButtonText: "取消",
                            closeOnConfirm: false
                        },function(){
                            //TODO:图文链接
                            window.location.href="http://www.baidu.com";
                        });

                    }else{
                        alert(res.msg);
                    }
                }
            })
            .fail(function() {
                console.log("error");
                alert("投票失败!");

            });

    }

    function randomPic(){
        var randomNum=Math.floor(Math.random()*3);
        return "../img/adv/ad"+randomNum+".jpg";
    }
    function getJoinInfo() {
        $.ajax({
                url: '/baby/joined',
                type: 'get',
            data:{"sfId":sfid},
                dataType: 'json'

            })
            .done(function(data) {
                showTab(data.ifJoin);
                $("#my-baby-tab").attr("bid",data.bId);
            })
            .fail(function() {
                console.log("error");
            });
    }

    function showTab(isJoin) {
        if (isJoin) {
            $("#want-join-tab").hide();

        } else {
            $("#my-baby-tab").hide();

        }
    }

    function RequestParameter() {
        var url = window.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;

    }

    function tabsBindings() {

        $(document).on("click", ".index", function() {
            window.location.href = "center.html?sfid=" + sfid;
        });

        $(document).on("click", ".add", function() {
            window.location.href = "add.html?sfid=" + sfid;
        });

        $(document).on("click", ".mybaby", function() {
            var babyid=$(this).attr("bid");
            window.location.href = "mybaby.html?sfid=" + sfid + "&bid="+babyid;
        });

        $(document).on("click", ".prize", function() {
            window.location.href = "prize.html?sfid=" + sfid;
        });

        $(document).on("click", ".activity-rule", function() {
            window.location.href = "activity.html?sfid=" + sfid;
        });
    }
    function checkWxBrowser(){
        // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
        var useragent = navigator.userAgent;
        if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
            // 这里警告框会阻塞当前页面继续加载
            alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
            // 以下代码是用javascript强行关闭当前页面
            var opened = window.open('about:blank', '_self');
            opened.opener = null;
            opened.close();
        }
    }

    function initBanner(){
        $('.banner').unslider();

    }
    function initWxShare() {
        var curl = window.location.href;
        var url = "/wxpay/prepare";
        $.ajax({
            type: "post",
            url: url,
            data: {
                "curl": curl,
                "platformId":"8af5535b4ef90b7d014efb8fc3f00bec"
            },
            success: function (response) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: response['appid'], // 必填，公众号的唯一标识
                    timestamp: response['timestamp'], // 必填，生成签名的时间戳
                    nonceStr: response['noncestr'], // 必填，生成签名的随机串
                    signature: response['sign_result'], // 必填，签名，见附录1
                    jsApiList: []

                });
            },
            error: function (response) {
                console.log("ERROR:", response)
            }
        });
    }
    return {
        RequestParameter: function() {
            return RequestParameter();
        },

        init: function() {
//            checkWxBrowser();
            tabsBindings();
            getJoinInfo();
//            initBanner();

        },
        initBanner:function(){
            initBanner();
        },
        vote:function(babyid){
            vote(babyid);
        }
    };

}());


var sfid = mengbaoTools.RequestParameter()['sfid'];
var bid = mengbaoTools.RequestParameter()['bid'];

mengbaoTools.init();



wx.ready(function() {
    wx.onMenuShareTimeline({
        title: '在微信' + shareDay + '天，我已经记录了' + shareState + '条状态、' + sharePic + '个图片、' + shareWords + '个文字', // 分享标题
        link: 'http://whiletime.com/timemachineDist/html/timemachine.html?openId=' + RequestParameter()['openId'], // 分享链接
        imgUrl: 'http://whiletime.com/timemachineDist/img/sharepic.jpg', // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
            $.get("/marketingactivity/f89aa7644e1ea45e014e1eff343c12b6/addshare");
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
        title: '时光机', // 分享标题
        desc: '在微信' + shareDay + '天，我已经记录了' + shareState + '条状态、' + sharePic + '个图片、' + shareWords + '个文字', // 分享描述
        link: 'http://whiletime.com/timemachineDist/html/timemachine.html?openId=' + RequestParameter()['openId'], // 分享链接
        imgUrl: 'http://whiletime.com/timemachineDist/img/sharepic.jpg', // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
            $.get("/marketingactivity/f89aa7644e1ea45e014e1eff343c12b6/addshare");

        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});
