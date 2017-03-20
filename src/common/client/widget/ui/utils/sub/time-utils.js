/**
 * 时间处理相关函数
 * Created by jess on 16/5/12.
 */


'use strict';

const moment = require('moment');

let singleton = {};

/**
 * 输出时间差的格式化信息, 已 X天X时X分 的分支输出
 * @param timeDuration {int} 时间差 毫秒
 * @returns {string}
 */
singleton.durationDayHourMinute = function( timeDuration ){

    let out = '';

    let duration = moment.duration( timeDuration );
    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();

    if( days > 0 ){
        out += days + '天';
    }
    if( hours > 0 || out ){
        out += hours + '时';
    }
    if( minutes > 0 || out ){
        out += minutes + '分';
    }

    return out;
};

/**
 * 用于显示资产处于  倒计时 时按钮的文字, 最多显示3组时间: 比如 XX天XX时XX分; 或  XX时XX分XX秒
 * @param timeDuration {int} 时间差  毫秒
 * @return {string}
 */
singleton.durationCountdown = function( timeDuration ){

    let out = '';

    let duration = moment.duration( timeDuration );
    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();

    if( days > 0 ){
        out += days + '天';
    }
    if( hours > 0 || out ){
        out += hours + '时';
    }
    if( minutes > 0 || out ){
        out += minutes + '分';
    }

    if( days <= 0 ){
        //没有天数, 加上秒
        out += duration.seconds() + '秒';
    }

    return out;
};

/**
 * 将时间差格式化到 X
 * @param timeDuration {int} 时间差 毫秒
 * @returns {string}
 */
singleton.durationDays = function( timeDuration ){
    let out = '';

    let duration = moment.duration( timeDuration );
    //不足一天, 算一天
    let days = Math.ceil( duration.asDays() );

    out += days;

    return out;
};

/**
 * 将时间戳格式化为  YYYY-MM-DD  的日期格式
 * @param timeStamp {int}
 * @returns {string}
 */
singleton.formatYearMonthDate = function( timeStamp ){
    let out = '';
    if( timeStamp >= 0 ){
        out = moment( timeStamp ).format('YYYY-MM-DD');
    }
    return out;
};


//获取 MM-DD 格式的日期
singleton.formatMonthDate = function( date ){
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



//获取 DD天HH时 |HH时 格式的日期
singleton.formatDateHour = function( time ){
    var out = '--',DAY = 24*60*60*1000,HOUR = 60*60*1000,MIU = 60*1000,SEC = 1000;
    //计算出相差天数
    var day=Math.floor(time/DAY)

    //计算出小时数
    var leave1=time%DAY; //计算天数后剩余的毫秒数
    var hour=Math.floor(leave1/HOUR);

    //计算相差分钟数
    var leave2=leave1%HOUR;      //计算小时数后剩余的毫秒数
    var min=Math.floor(leave2/MIU);

    //计算相差秒数
    var leave3=leave2%MIU;     //计算分钟数后剩余的毫秒数
    var sec=Math.round(leave3/SEC);
    if(time>0){

        if(day >0) {
            out = day + '天' + hour + '时';
        }else if(hour>0){

            out =  hour+'时'+min+'分';
        }else if(min>0){

            out =  min+'分'+sec+'秒';

        }else if(sec>0){
            out = sec+'秒';
        }

    }

    return out;

};

module.exports = singleton;