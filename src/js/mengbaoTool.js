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
    return {
        RequestParameter: function() {
            return RequestParameter();
        },

        init: function() {
//            checkWxBrowser();
            tabsBindings();
            getJoinInfo();


        },
        vote:function(){
            vote();
        }
    };

}());


var sfid = mengbaoTools.RequestParameter()['sfid'];
var bid = mengbaoTools.RequestParameter()['bid'];

mengbaoTools.init();
