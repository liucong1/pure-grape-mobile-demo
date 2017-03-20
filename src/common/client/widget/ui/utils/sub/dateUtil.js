/**
 * Created by jess on 15/9/28.
 */


'use strict';
var utils = {};

var utils = {};

//获取 YYYY-MM-DD 格式的日期
utils.formatYearMonthDate = function( date ){
    var out = '';

    if( date && date instanceof  Date){
        var month = date.getMonth() + 1;
        var day = date.getDate() ;

        var year = date.getFullYear();

        if( month < 10 ){
            month = '0' + month;
        }

        if( day < 10 ){
            day = '0' + day;
        }

        out = year + '-' + month + '-' + day;
    }

    return out;

};

//获取 MM-DD 格式的日期
utils.formatMonthDate = function( date ){
    var out = '';

    if( date && date instanceof  Date){
        var month = date.getMonth() + 1;
        var day = date.getDate() ;

        if( month < 10 ){
            month = '0' + month;
        }

        if( day < 10 ){
            day = '0' + day;
        }

        out = month + '-' + day;
    }

    return out;

};

//获取 MM 格式的日期
utils.formatDate = function( date ){
    var out = '';

    if( date && date instanceof  Date){
        var month = date.getMonth() + 1;

        if( month < 10 ){
            month = '0' + month;
        }
        out = month;
    }

    return out;

};



module.exports = utils;











