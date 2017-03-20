/**
 * 处理 数字 相关的函数集
 * Created by jess on 16/1/28.
 */


'use strict';


var utils = {};



//保留两位小数
utils.fixFloat2 =  function (floatNumber) {
    if (typeof floatNumber == 'string') {
        floatNumber = parseFloat(floatNumber, 10);
    }
    return parseFloat(Math.round(floatNumber * 100) / 100, 10).toFixed(2);
};
//保留4位小数
utils.fixFloat4 =  function (floatNumber) {
    if (typeof floatNumber == 'string') {
        floatNumber = parseFloat(floatNumber, 10);
    }
    return parseFloat(Math.round(floatNumber * 10000) / 10000, 10).toFixed(4);
};
//整数添加,
utils.commaInteger = function(number){
    number = parseInt(number, 10);
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
//浮点数添加,
utils.commaFloat = function(number){
    return utils.fixFloat2(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


//是否数字或浮点数
utils.isNumber = function(str){
    str = str || '';
    return /^\d+(\.\d+)?$/.test(str);
};


module.exports = utils;
