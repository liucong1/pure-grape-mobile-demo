
/**
 * 保险预热活动相关的后端API的封装类
 * Created by feijun on 16/9/18.
 */

'use strict';



const ServiceBase = require('../../../service-base');


const adapters = {};
const MOBILE_URL_PREFIX = '/mo';


const apiConf = {
    /* 点灯第几盏灯 */
    getClickNum: {
        url: `${MOBILE_URL_PREFIX}/event/insurance/clickNum`,
        method: 'GET',
        dataType: 'json'
    },

    /* 抽奖 */
    getLottery: {
        url: `${MOBILE_URL_PREFIX}/event/insurance/lottery`,
        method: 'GET',
        dataType: 'json'
    }
};


let getLotteryInfoStatus = new ServiceBase( apiConf, adapters);

module.exports = getLotteryInfoStatus;