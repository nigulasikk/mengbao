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
                    alert("感谢您投出宝贵的一票!");
                    window.location.reload();

                }else{
                    if(res.msg=="未关注"){
                        swal({
                            title: "",
                            showConfirmButton: false,
                            text: "请进入微信公众号“荔枝妈妈”点击菜单栏【萌宝大赛】进行投票<br><a href='http://mp.weixin.qq.com/s?__biz=MzI5ODAwNTY2MA==&mid=207512386&idx=1&sn=d2e302c89ba38c96069c96f921847921&scene=0#rd'><button>点我投票</button></a><img style='margin-top:30px;' width='220' src='"+mengbaoTools.randomPic()+"'>",
                            html: true
                        },function(){
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
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']

                });
            },
            error: function (response) {
                console.log("ERROR:", response)
            }
        });
    }
    //加载中效果
    function shareTip() {

        var mask = ' <div id="mask" style="z-index:9999;background-color: black;opacity: 0.8;position:fixed;top:0;bottom:0;left:0;right:0;">' +
            '<img style="float: right;" src="../img/share.png">'+
            '</div>';

        $("body").prepend(mask);
        $("#mask").click(function(){
            closeShareTip();
        });
    }

    function closeShareTip() {
        $("#mask").remove();
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
        initWxShare:function(){
            initWxShare();
        },
        vote:function(babyid){
            vote(babyid);
        },
        shareTip:function(){
            shareTip();
        },
        randomPic:function(){
            return randomPic();
        }
    };

}());


var sfid = mengbaoTools.RequestParameter()['sfid'];
var bid = mengbaoTools.RequestParameter()['bid'];

mengbaoTools.init();


