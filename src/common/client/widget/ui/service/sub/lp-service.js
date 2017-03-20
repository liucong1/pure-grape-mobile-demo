/**
 * lp页面请求注册相关的后端API的封装类
 * Created by feijun on 16/11/17.
 */

'use strict';
const ServiceBase = require('./../service-base');
const adapters = {};

const apiConf = {

    /* 注册 获取手机验证码 */
    register: {
        url: '/mo/lp/lp/postRegister',
        method: 'POST',
        dataType: 'json'
    },
    // 获取手机验证码
    smsCode: {
        url: '/mo/lp/lp/getPhoneSmsCode',
        method: 'POST',
        dataType: 'json'
    },
    // 校验手机验证码
    verifySmsCode: {
        url: '/mo/lp/lp/verifyPhoneSmsCode',
        method: 'GET',
        dataType: 'json'
    },
    // 品友添加转化点
    usergrowthDownload: {
        url: '/mo/lp/lp/postUsergrowthDownload',
        method: 'GET',
        dataType: 'json'
    }
};


let lpService = new ServiceBase( apiConf, adapters);

module.exports = lpService;