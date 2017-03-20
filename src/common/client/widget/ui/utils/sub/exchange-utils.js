/**
 * 交易所相关的工具方法
 * Created by jess on 16/5/11.
 */


'use strict';

let singleton = {};


/**
 * 适配账户外的交易所详情数据
 * @param exchangeData {object}
 * @return {object}
 */
singleton.adaptDetail = function( exchangeData ){}
 /**
 *  交易所 列表和详情页按钮状态判断  其中涉及到的按钮的样式可在自己模块的css中自己覆盖扩展（参考layout.scss L290）
 * status 按钮状态
 * @return  buttonClassName  按钮样式  这里只涉及到样式 不涉及大小需要在自己页面自行添加
            counterClassName :counterClassName, 倒计时是否显示 
            buttonName : buttonName 按钮展示的文案
 */   
 singleton.btnType = function(status){   
        let  buttonClassName ,counterClassName , buttonName;
            switch(status){
                  case 1 :
                    buttonName ="投资";
                    buttonClassName ="button-orange";
                    counterClassName ="hide";
                  break;
                  case 2 :
                    buttonName ="投资";
                    buttonClassName ="button-gray";
                    counterClassName ="show";
                  break;
                 case 3 :
                    buttonName ="已满额";
                    buttonClassName ="button-gray";
                    counterClassName ="hide";
                  break;
                  case 4 :
                    buttonName ="确认中";
                    buttonClassName ="button-gray";
                    counterClassName ="hide";
                  break;
                 case 5 :
                    buttonName ="收益中";
                    buttonClassName ="button-gray";
                    counterClassName ="hide";
                  break;
                  case 6 :
                    buttonName ="已退出";
                    buttonClassName ="button-gray";
                    counterClassName ="hide";
                  break;
                   case 8 :
                    buttonName ="募集失败";
                    buttonClassName ="button-gray";
                    counterClassName ="hide";
                  break;
                  default: break;                   
                  
            }
         
            return{
                buttonClassName : buttonClassName,
                counterClassName :counterClassName,
                buttonName : buttonName
            };
};

/**
 * 返回交易所资产, 不同的风险等级对应的中文
 * @param riskLevel {string} L/ML/M/MH/H
 * @return {string}
 */
singleton.getRiskLevelText = function( riskLevel ){
    if( riskLevel ){
        riskLevel = riskLevel.toUpperCase();
    }
    let out = '';
    switch( riskLevel ){
        case 'L':
            out = '低风险';
            break;
        case 'ML':
            out = '中低风险';
            break;
        case 'M':
            out = '中风险';
            break;
        case 'MH':
            out = '中高风险';
            break;
        case 'H':
            out = '高风险';
            break;
        default:
            ;
    }

    return out;
};

singleton.bankShortName   = {
    'CMBC' : '民生银行',
    'ICBC' : '工商银行',
    'BOC' : '中国银行',
    'CCB' : '建设银行',
    'ABC' : '农业银行',
    'BCOM' : '交通银行',
    'CMB' : '招商银行',
    'CIB' : '兴业银行',
    'CEB' : '光大银行',
    'PAB' : '平安银行',
    'HXB' : '华夏银行',
    'CITIC' : '中信银行',
    'GDB' : '广发银行',
    'SPDB' : '浦发银行'
};


module.exports = singleton;
