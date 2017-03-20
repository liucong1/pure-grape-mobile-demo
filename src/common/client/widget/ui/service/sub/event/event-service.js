
/**
 *event 活动相关的后端API的封装类
 * Created by liling on 16/9/1.
 */

'use strict';



const ServiceBase = require('../../service-base');


const adapters = {};
const MOBILE_URL_PREFIX = '/mo';


const apiConf = {

    /* mobile领取续期加息券 */
    drawTicket: {
        url: `${MOBILE_URL_PREFIX}/event/renewal/drawTicket`,
        method: 'GET',
        dataType: 'json'
    },
    /* mobile报名冲榜 */
    signUp: {
        url: `${MOBILE_URL_PREFIX}/event/renewal/signUp`,
        method: 'GET',
        dataType: 'json'
    },
    /* mobile 6周年抽奖 */
    sixanniversaryLottery: {
        url: `${MOBILE_URL_PREFIX}/event/sixanniversary/lottery`,
        method: 'GET',
        dataType: 'json'
    },
    /* mobile 6周年抢购保险 */
    sixanniversaryPerchaseInsurance: {
        url: `${MOBILE_URL_PREFIX}/event/sixanniversary/perchaseInsurance`,
        method: 'GET',
        dataType: 'json'
    },
    /* 双11 查看我的礼包 */
    doubleElevenQueryCoupon: {
        url: `${MOBILE_URL_PREFIX}/event/doubleeleven/queryCoupon`,
            method: 'GET',
            dataType: 'json'
    },
    /* 双11 领取优惠券 */
    doubleElevenGetCoupon: {
        url: `${MOBILE_URL_PREFIX}/event/doubleeleven/getCoupon`,
        method: 'GET',
        dataType: 'json'
    },
    /* 双11 新手投资排行榜 */
    doubleElevenRankList: {
        url: `${MOBILE_URL_PREFIX}/event/doubleeleven/rankList`,
        method: 'GET',
        dataType: 'json'
    },
    /* 双11 查看我的礼包 */
    doubleElevenShowMyGift: {
        url: `${MOBILE_URL_PREFIX}/event/doubleeleven/showMyGift`,
        method: 'GET',
        dataType: 'json'
    },
    /* 双12 点赞 */
    doubleTwelveClcikGood: {
        url: `${MOBILE_URL_PREFIX}/event/doubletwelve/clickGood`,
        method: 'GET',
        dataType: 'json'
    },
    /* 双12 领取电影票 */
    doubleTwelveGradTicket: {
        url: `${MOBILE_URL_PREFIX}/event/doubletwelve/gradTicket`,
        method: 'GET',
        dataType: 'json'
    },
    /* 双12 抢红包 */
    doubleTwelveGradRedBag: {
        url: `${MOBILE_URL_PREFIX}/event/doubletwelve/gradRedBag`,
        method: 'GET',
        dataType: 'json'
    },
    /* 双12 获取系统时间 */
    doubleTwelveServerTime: {
        url: `${MOBILE_URL_PREFIX}/event/doubletwelve/serverTime`,
        method: 'GET',
        dataType: 'json'
    },
    /* 双12 查询接口 */
    doubleTwelveQuery: {
        url: `${MOBILE_URL_PREFIX}/event/doubletwelve/userInfo`,
        method: 'GET',
        dataType: 'json'
    },
    isUserExist: {
        url: `${MOBILE_URL_PREFIX}/event/event/isUserExist`,
        method: 'GET',
        dataType: 'json'
    }
};


let getJoinStatus = new ServiceBase( apiConf, adapters);

module.exports = getJoinStatus;
