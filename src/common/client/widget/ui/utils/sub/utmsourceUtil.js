/**
 * utmsource
 * Created by zhaojie.
 */


'use strict';


var utils = {};

utils.getutmSource = function( type ){
    var reg = new RegExp("(^|\\?|&)utmSource=([^&]*)(\\s|&|$)", "i");
    var utmSource = utils.getQryStrRegExp(location.href,reg);
    if (utmSource) {
        utils.setCookie("utmSource", utmSource, 365);
    }else{
        reg = new RegExp("(^|\\s|;)utmSource=([^;]*)(\\s|;|$)", "i");
        utmSource = utils.getQryStrRegExp(document.cookie,reg);
    }
    return utmSource;
};


utils.getchannelUserId = function( type ){
    var reg = new RegExp("(^|\\?|&)userid=([^&]*)(\\s|&|$)", "i");
    var userid = utils.getQryStrRegExp(location.href,reg);
    if (userid) {
        utils.setCookie("userid", userid, 365);
    }else{
        reg = new RegExp("(^|\\s|;)userid=([^;]*)(\\s|;|$)", "i");
        userid = utils.getQryStrRegExp(document.cookie,reg);
    }
    return userid;
};


utils.getextra = function( type ){
    var reg = new RegExp("(^|\\?|&)extra=([^&]*)(\\s|&|$)", "i");
    var extra = utils.getQryStrRegExp(location.href,reg);
    if (extra) {
        utils.setCookie("extra", extra, 365);
    }else{
        reg = new RegExp("(^|\\s|;)extra=([^;]*)(\\s|;|$)", "i");
        extra = utils.getQryStrRegExp(document.cookie,reg);
    }
    return extra;
};

utils.getxlUserId = function( type ){
    var reg = /(^|\\?|&)xluserid=([^&]*)(\\s|&|$)/i;
    var xluserid = utils.getQryStrRegExp(location.href,reg);
    if (xluserid) {
        utils.setCookie("xluserid", xluserid, 365);
    }else{
        reg = /(^|\\s|;)xluserid=([^;]*)(\\s|;|$)/i;
        xluserid = utils.getQryStrRegExp(document.cookie,reg);
    }
    return xluserid;
};


utils.getQryStrRegExp = function(testsrc,reg) {  
    if (reg.test(testsrc)) {
        return decodeURIComponent(RegExp.$2.replace(/\+/g, " "));
    } else {
        return null;
    }
};

utils.setCookie = function (c_name, value, expireTime) {
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expireTime);
    document.cookie = c_name + "=" + encodeURIComponent(value) + ((expireTime == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/");
};


module.exports = utils;