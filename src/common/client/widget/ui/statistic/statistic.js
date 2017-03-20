/**
 * 页面的各种埋点统计, 屏蔽掉第三方服务的细节
 * Created by jess on 2016/12/22.
 */


const $ = require('common:widget/lib/jquery/jquery.js');
const utils = require('common:widget/ui/utils/utils.js');


///////////////////  页面定义部分   ////////////
const commonPage = require('./pages/common.js');
const homePage = require('./pages/home.js');
const exchangePage = require('./pages/exchange.js');
const lpPage = require('./pages/lp.js');


///////////////////   事件定义部分  /////////////
const formEvents = require('./events/form.js');




let pageList = [ commonPage, homePage, exchangePage, lpPage ];
let eventList = [ formEvents ];

//注册过的所有页面ID对应的中文名配置
let pageConf = {

};

//注册过的所有的事件ID对应的中文名
let eventConf = {};


for( var i = 0, len = pageList.length; i < len; i++ ){
    $.extend( pageConf, pageList[i] );
}

for( var j = 0, eventLen = eventList.length; j < eventLen; j++ ){
    $.extend( eventConf, eventList[j] );
}


function callbackGenerator(callback){
    let cbWrap;
    let autoCallbackTimer = null;
    let isCalled = false;
    if( typeof callback === 'function' ){
        cbWrap = function(){
            if( isCalled ){
                return;
            }
            isCalled = true;
            clearTimeout( autoCallbackTimer );
            callback();
        };
        autoCallbackTimer = setTimeout(cbWrap, 2000);
    }
    return cbWrap;
}

function track(eventName, data, callback){
    //这里需要对callback封装下, 保证诸葛IO出bug的时候,自动延迟回调 callback. 目前在PC版的 chrome 53 上,发现诸葛IO的JS加载失败, 导致callback没有调用
    let cbWrap = callbackGenerator(callback);
    try{
        zhuge.track( eventName, data, cbWrap);
    }catch(e){
        if( typeof cbWrap === 'function' ){
            cbWrap(e);
        }
    }

}

function identify(userId, extra, callback){
    let cbWrap = callbackGenerator(callback);
    try{
        zhuge.identify( userId, extra, cbWrap);
    }catch(e){
        if( typeof cbWrap === 'function' ){
            cbWrap(e);
        }
    }
}


function getTextForKey(key){
    if( ! key ){
        return '';
    }
    if( pageConf.hasOwnProperty(key) ){
        key = pageConf[key];
    }
    return key;
}

/**
 * 根据 事件ID 获取已经注册过的事件中文名
 * @param key {string} 事件ID
 * @returns {*}
 */
function getTextForEvent(key){
    if( ! key ){
        return '';
    }
    if( eventConf.hasOwnProperty(key) ){
        key = eventConf[key];
    }
    return key;
}

let singleton = {


    _getDefaultParams : function(){
        let searchConf = utils.getSearchConf();
        let data = {
            promotion : searchConf.promotion || '',
            utmSource : searchConf.utmSource || '',
            wpFromPos : searchConf.wpFromPos || ''
        };
        return data;
    },

    /**
     * 统计页面PV, 自动带上当前query参数中的utmSource/promotion/wpFromPos 等参数
     * @param args {object}
     * @param args.pageKey {string} 当前页面的page key
     * @param args.extra {object} 额外的一些参数
     * @param args.callback {function} 回调函数, 可以为空
     */
    pv : function( args ){

        let data = singleton._getDefaultParams();
        let fromPagePosition = getTextForKey( data.wpFromPos );
        let currentPage = getTextForKey( args.pageKey );
        if( ! currentPage ){
            console.warn('[statistic.pv] 缺少 key 参数!!');
            return;
        }

        let eventName = 'PV-' + currentPage + '-' + fromPagePosition;
        if( args.extra ){
            $.extend( data, args.extra );
        }
        track(eventName, data, args.callback);
    },

    /**
     * 统计页面action, 自动带上当前query参数中的utmSource/promotion/wpFromPos 等参数
     * @param args {object}
     * @param args.pageKey {string} 当前页面的page key
     * @param args.eventId {string} 当前事件的名字, 可以是系统中提供的, 或者用中文也可以
     * @param args.extra {object} 额外的一些参数
     * @param args.callback {function} 回调函数, 可以为空
     */
    event : function( args ){

        let data = singleton._getDefaultParams();
        let actionName = getTextForEvent( args.eventId );
        let currentPage = getTextForKey( args.pageKey );
        if( ! currentPage ){
            console.warn('[statistic.event] 缺少 key 参数!!');
            return;
        }

        let eventName = 'EVENT-' + currentPage + '-' + actionName;
        if( args.extra ){
            $.extend( data, args.extra );
        }
        track(eventName, data, args.callback);
    },

    /**
     * 识别当前的用户,保持对用户的跟踪
     * @param args {object}
     * @param args.userId {string} 用户的ID
     * @param args.extra {object} 额外的一些参数
     * @param args.callback {function} 回调函数, 可以为空
     */
    identify : function( args ){

        identify(args.userId, args.extra, args.callback);

    }
};


//暴露到全局, 需要在 page builder 组件里访问
window.weStatistic = singleton;

module.exports = singleton;


