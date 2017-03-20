
/**
 * 奥运活动相关的后端API的封装类
 * Created by feijun on 16/7/23.
 */

'use strict';



const ServiceBase = require('../../../service-base');


const adapters = {};
const MOBILE_URL_PREFIX = '/mo';


const apiConf = {

    /* 参加赛事 */
    getJoin: {
        url: `${MOBILE_URL_PREFIX}/event/olympic/order`,
        method: 'GET',
        dataType: 'json'
    },
    /* 获取用户信息 */
    getUserInfo: {
        url: `${MOBILE_URL_PREFIX}/event/olympic/userInfo`,
        method: 'GET',
        dataType: 'json'
    },
    /* 排行榜 */
    getList: {
        url: `${MOBILE_URL_PREFIX}/event/olympic/list`,
        method: 'GET',
        dataType: 'json'
    }
};


let getJoinStatus = new ServiceBase( apiConf, adapters);

module.exports = getJoinStatus;