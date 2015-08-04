$(document).ready(function () {
    wxImgOpt.init();
    wxImgOpt.bindings();

});

var wxImgOpt = (function () {
    var localImgIds = [];
    var serverImgIds = [];

    function bindings() {
        $(".commit-info").click(function () {
            alert("serverIds:"+serverImgIds);
            $.post("/baby", {
                images: serverImgIds,
                name: $(".nickname").val(),
                phone: $(".phone").val(),
                declaration: $(".description").val()
            }, function (res) {
                alert("保存成功!");
            });
        });


    }

//初始化微信接口
    function initWx() {
        var curl = window.location.href;
        var url = "/wxpay/prepare";
        $.ajax({
            type: "post",
            url: url,
            data: {
                "curl": curl
            },
            success: function (response) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: response['appid'], // 必填，公众号的唯一标识
                    timestamp: response['timestamp'], // 必填，生成签名的时间戳
                    nonceStr: response['noncestr'], // 必填，生成签名的随机串
                    signature: response['sign_result'], // 必填，签名，见附录1
                    jsApiList: ['chooseImage', 'uploadImage', 'downloadImage', 'previewImage']

                });
            },
            error: function (response) {
                console.log("ERROR:", response)
            }
        });
    }

    function checkChooseImg() {
        wx.checkJsApi({
            jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//                alert("检查可用性结果："+res.checkResult.chooseImage);
                if (!res.checkResult.chooseImage) {
                    alert("请使用微信客户端6.0.2或更高版本！");
                }
            }
        });
    }


//拍照或从手机相册中选图接口
    function chooseImage() {
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                localImgIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//                previewImage(localImgIds[0],localImgIds);
                $("#preview-imgs").append(imgListHtml(localImgIds));
                uploadImgs(localImgIds);


            }
        });
    }

//预览图片接口
    function previewImage(current, urls) {
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        });
    }

    //上传多张
    function uploadImgs(lids){
        for(var i=0;i<lids.length;i++){
            uploadOneImage(lids[i]);
        }
    }
//上传图片接口
    function uploadOneImage(lid) {
        wx.uploadImage({
            localId: lid, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                serverImgIds.push(res.serverId); // 返回图片的服务器端ID
            }
        });
    }

//缩略图预览
    function imgListHtml(imgList) {
        var imgsHtml = "";
        for (var i = 0; i < imgList.length; i++) {
            imgsHtml += '<img style="width:100px;" src="' + imgList[i] + '">';
        }
        return imgsHtml;

    }

    return {
        init: function () {
            initWx();
        },
        check: function () {
            checkChooseImg();
        },
        chooseImage: function () {
            chooseImage();
        },
        previewImage: function () {
            previewImage();
        },
        bindings: function () {
            bindings();
        }
    }

}());


wx.ready(function () {
    wxImgOpt.check();
    $(".choose-pic").click(function () {
        wxImgOpt.chooseImage();
    });
});


wx.error(function (res) {
    console.log(res);
});

