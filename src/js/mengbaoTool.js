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
                            text: "请进入微信公众号“荔枝妈妈”点击菜单栏【萌宝大赛】进行投票<br><a href='http://mp.weixin.qq.com/s?__biz=MzI5ODAwNTY2MA==&mid=207512386&idx=1&sn=d2e302c89ba38c96069c96f921847921&scene=0#rd'><button>点我投票</button></a>"+mengbaoTools.randomPic(),
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
        var randomNum=Math.floor(Math.random()*5);
        var url1="http://mp.weixin.qq.com/s?__biz=MzAwOTMzNzkwMQ==&mid=208574211&idx=1&sn=8f911382db59a8518b26240af5081882#rd";
        var url2="http://wap.koudaitong.com/v2/feature/e2er2zf2";
        var url3="http://mp.weixin.qq.com/s?__biz=MzA3MzQ4OTk2OQ==&mid=208464299&idx=1&sn=8770f5494abe9fe32ba1e447f4f475f7#rd";
        var url4="http://mp.weixin.qq.com/s?__biz=MzAwMTEyNzI5Mg==&mid=205231980&idx=1&sn=6e7c71a3be63f4543d74e481685a441b&scene=1&key=0acd51d81cb052bc8eb309208d7498f0fff5f5f324b4956ce8965599505f92414934d1c2c5dbf4b00504967be50330ed&ascene=1&uin=MTQ5NzkwMzIyMA%3D%3D&devicetype=webwx&version=70000001&pass_ticket=DlYd7cF3JxKRIgp8L1FtELAG9DK7MokXcFHis2pIGvsoaLyWSZNv9BHpK3x1Z4%2Fd";
        var url5="http://mp.weixin.qq.com/s?__biz=MzI4NTAwNzI4MA==&mid=211328080&idx=1&sn=ed4a0076c1472e0ecbbba19dbfeb791c&scene=0#rd";
        var advUrls=[url1,url2,url3,url4,url5];

//        return "../img/adv/ad"+randomNum+".jpg";

        return "<a href='"+advUrls[0]+"'><img style='margin-top:30px;' width='220' src='../img/adv/ad"+0+".jpg'>"+"</a>";

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

        var slidey =  $('.banner').unslider({
            speed: 500,               //  The speed to animate each slide (in milliseconds)
            delay: 3000,              //  The delay between slide animations (in milliseconds)
            complete: function() {},  //  A function that gets called after every slide animation
            keys: true,               //  Enable keyboard (left, right) arrow shortcuts
            dots: false,               //  Display dot navigation
            fluid: false              //  Support responsive design. May break non-responsive designs
        }),
            slideData = slidey.data('unslider');


         $(".banner").on('swipeleft', function(e) {
             slideData.next();


         });
         $(".banner").on('swiperight', function(e) {
             slideData.prev();


         });


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


