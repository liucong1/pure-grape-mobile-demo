'use strict';

var _ = require('underscore');

class WXShareDataConfig {
    static mergeShareDate (defineShareDate = {}){
        return  _.extend(WXShareDataConfig.WXDefaultShareData, defineShareDate);
    }

    static  _trigger(res){}

    static _complete(res){}

    static _success(res){}

    static _cancel(res){}

    static _fail(res){}
}


WXShareDataConfig.WXDefaultShareData = {
    title: '这是分享的标题', // 分享标题
    desc: '这是分享的描述', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空

    trigger : function(res) {
        WXShareDataConfig._trigger(res);
    },
    complete : function(res) {
        WXShareDataConfig._complete(res);
    },
    success : function(res) {
        WXShareDataConfig._success(res);
    },
    cancel : function(res) {
        WXShareDataConfig._cancel(res);
    },
    fail : function(res) {
        WXShareDataConfig._fail(res);
    }
};
module.exports = WXShareDataConfig;