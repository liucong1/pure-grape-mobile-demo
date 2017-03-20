
/**
 * 奥运活动相关的后端API的封装类
 * Created by feijun on 16/7/23.
 */

'use strict';



const ServiceBase = require('../../../service-base');


const adapters = {};
const MOBILE_URL_PREFIX = '/mo';


const apiConf = {

    /* 点赞 */
    getGood: {
        url: `${MOBILE_URL_PREFIX}/event/tabletennis/good`,
        method: 'GET',
        dataType: 'json'
    },
    /* 抽奖 */
    getLottery: {
        url: `${MOBILE_URL_PREFIX}/event/tabletennis/goodLottery`,
        method: 'GET',
        dataType: 'json'
    },
    /* 抽奖数 */
    getLotteryCount: {
        url: `${MOBILE_URL_PREFIX}/event/tabletennis/lotteryCount`,
        method: 'GET',
        dataType: 'json'
    }
};


let getJoinStatus = new ServiceBase( apiConf, adapters);

module.exports = getJoinStatus;