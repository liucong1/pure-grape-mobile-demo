
/**
 * 资讯关的后端API的封装类
 * Created by qiangran on 16/7/02.
 */

'use strict';



const ServiceBase = require('../../service-base');


const adapters = {};

const MOBILE_URL_PREFIX = '/mo';

const apiConf = {

    /* 柱状图数据*/
    getBarDatas: {
        url: '/mo/advisory/adv/getBarDatas',
        method: 'GET',
        dataType: 'json'
    },
    /* 折线图图数据*/
    getLineDatas: {
        url: '/mo/advisory/adv/getLineDatas',
        method: 'GET',
        dataType: 'json'
    },

    // 获取we观数据
    getWeGuanData: {
        url: `${MOBILE_URL_PREFIX}/advisory/adv/listData`,
        method: 'GET',
        dataType: 'json',
        data:{}
    }
};


let singleton = new ServiceBase( apiConf, adapters);

module.exports = singleton;