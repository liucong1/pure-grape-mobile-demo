
/**
 * 奥运活动相关的后端API的封装类
 * Created by feijun on 16/7/23.
 */

'use strict';



const ServiceBase = require('../../../service-base');


const adapters = {};
const MOBILE_URL_PREFIX = '/mo';


const apiConf = {

    /* 报名 */
    getJoin: {
        url: `${MOBILE_URL_PREFIX}/event/marathon/join`,
        method: 'GET',
        dataType: 'json'
    }
};


let getJoinStatus = new ServiceBase( apiConf, adapters);

module.exports = getJoinStatus;