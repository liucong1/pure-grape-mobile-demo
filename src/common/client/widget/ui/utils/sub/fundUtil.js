/**
 * 基金  相关的工具函数
 * Created by jess on 16/1/28.
 */


'use strict';


var utils = {};


//获取可读的基金类型
utils.getFundTypeString = function( type ){

    var typeString = '';
    //是否是货币基金
    var isMoneyFund = false;

    switch( type ){
        case 'FUND_STOCK':
            typeString = '股票型';
            break;
        case 'FUND_BOND':
            typeString = '债券型';
            break;
        case 'FUND_MONEY':
            typeString = '货币型';
            isMoneyFund = true;
            break;
        case 'FUND_MIX':
            typeString = '混合型';
            break;
        case 'FUND_INDEX':
            typeString = '指数型';
            break;
        case 'FUND_PRESERV':
            typeString = '';
            break;
        case 'FUND_ETF':
            typeString = '指数型';
            break;
        case 'FUND_QDII':
            typeString = '';
            break;
        case 'FUND_OTHER':
            typeString = '';
            break;
        default:
            typeString = '';

    }

    return {
        typeString : typeString,
        isMoneyFund : isMoneyFund
    };
};

//获取基金的风险等级
utils.getFundRiskString = function(obj){
    //风险等级
    var level = '';
    var riskLevelText = '';
    switch( obj.riskLevel ){
        case '0':
            riskLevelText = '低';
            level = 'low';
            break;
        case '1':
            riskLevelText = '中';
            level = 'middle';
            break;
        case '2':
            riskLevelText = '高';
            level = 'high';
            break;
        default:
    }

    return {
        riskLevelText : riskLevelText,
        level : level
    };
};

module.exports = utils;