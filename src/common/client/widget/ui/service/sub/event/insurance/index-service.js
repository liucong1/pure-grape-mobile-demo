
/**
 * 保险预热活动相关的后端API的封装类
 * Created by feijun on 16/9/18.
 */

'use strict';



const ServiceBase = require('../../../service-base');


const adapters = {};
const MOBILE_URL_PREFIX = '/mo';


const apiConf = {

    /* 点亮启明灯 */
    getPersonalInfo: {
        url: `${MOBILE_URL_PREFIX}/event/insurance/personalInfo`,
        method: 'GET',
        dataType: 'json'
    }
};


let getPersonalInfoStatus = new ServiceBase( apiConf, adapters);

module.exports = getPersonalInfoStatus;