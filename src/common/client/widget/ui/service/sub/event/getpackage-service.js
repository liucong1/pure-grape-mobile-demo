
/**
 * 请求注册相关的后端API的封装类
 * Created by 王半仙 on 16/6/13.
 */

'use strict';



const ServiceBase = require('../../service-base');


const adapters = {};


const apiConf = {

    /* 迎新领取红包*/
    getPackage: {
        url: '/mo/event/welcome/getDrawPackage',
        method: 'GET',
        dataType: 'json'
    }
};


let singleton = new ServiceBase( apiConf, adapters);

module.exports = singleton;