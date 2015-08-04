/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-07-26 13:53:29
 * @version $Id$
 */


var mengbaoTools = (function() {

    function getJoinInfo() {
        $.ajax({
                url: '../json/ifJoin.json',
                type: 'get',
                dataType: 'json',

            })
            .done(function(data) {
                showTab(data.ifJoin);
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
            window.location.href = "babydetail.html?sfid=" + sfid + "&bid="+sfid;
        });

        $(document).on("click", ".prize", function() {
            window.location.href = "prize.html?sfid=" + sfid;
        });

        $(document).on("click", ".activity-rule", function() {
            window.location.href = "activity.html?sfid=" + sfid;
        });
    }
    return {
        RequestParameter: function() {
            return RequestParameter();
        },

        init: function() {
            tabsBindings();
            getJoinInfo();

        }
    };

}());


var sfid = mengbaoTools.RequestParameter()['sfid'];
var bid = mengbaoTools.RequestParameter()['bid'];

mengbaoTools.init();
