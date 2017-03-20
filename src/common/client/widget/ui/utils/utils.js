/**
 * WE 移动端通用工具函数
 * Created by jess on 16/1/28.
 */

'use strict';


var rsaCrypt = require('./sub/rsaCrypt.js');
var remUtil = require('./sub/remUtil.js');
var numberUtil = require('./sub/numberUtil.js');
var dateUtil = require('./sub/dateUtil.js');
var fundUtil = require('./sub/fundUtil.js');
var utmsourceUtil = require('./sub/utmsourceUtil.js');
var formUtil = require('./sub/formUtil.js');
var prefetchUtil = require('./sub/prefetch.js');
var exchangeUtil = require('./sub/exchange-utils.js');
var timeUtil = require('./sub/time-utils.js');

const lazyLoad = require('./sub/lazylaod.js');

var singleton = {
    rsaCrypt,
    remUtil,
    dateUtil,
    numberUtil,
    fundUtil,
    utmsourceUtil,
    formUtil,
    prefetchUtil, //提前缓存资源工具
    lazyLoad : lazyLoad,
    exchangeUtil,
    timeUtil
};

/**
 * 解析JSON的字符串, 解析出错返回 null
 * @param str {string} JSON的字符串
 * @returns {object}
 */
singleton.parseJSON = function( str ){
    try{
        return JSON.parse( str );
    }catch(e){
        return null;
    }
};

let utils = singleton;


/**
 * 解析JSON的字符串, 解析出错返回 null
 * @param str {string} JSON的字符串
 * @returns {object}
 */
utils.parseJSON = function( str ){
    try{
        return JSON.parse( str );
    }catch(e){
        return null;
    }
};

/////////////////解析URL参数///////////
utils.query2json = function( s ){
    s = s.replace(/^\?/,'');
    var out = {};
    var arr = s.split('&');
    for( var i = 0, len = arr.length; i < len; i++ ){
        var temp = arr[i];
        var tempArr = temp.split('=');
        if( tempArr.length === 2 ){
            try{
                out[ tempArr[0] ] = decodeURIComponent( tempArr[1] );
            }catch(e){}
        }
    }

    return out;
};

utils.json2query = function( data ){
    var out = '';
    if( data ){
        for( var i in data ){
            if( data.hasOwnProperty(i) ){
                out += i + '=' + encodeURIComponent( data[i] ) + '&';
            }
        }
    }

    return out;
};


utils.getSearchConf = function(){
    return utils.query2json( location.search );
};

utils.getTplConf = function(){
    return window.tplConf || {};
};


module.exports = singleton;