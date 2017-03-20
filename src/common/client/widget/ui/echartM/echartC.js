/**
 * daifei
 *雷达图
 */

'use strict';

const $ = require('common:widget/lib/jquery/jquery.js');
//var echarts = require('echarts');
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图和折线图
require('echarts/lib/chart/radar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');




/**
 * 走势图构造函数
 * @param id dom的ID
 * @param options 个性化的option
 * @constructor
 */
var EchartC = function(id, options){

    var chartOptions  = {
        radar: {
            // shape: 'circle',
            indicator: [
              { name: '盈利能力', max: 100},
              { name: '公司实力', max: 100},
              { name: '经理能力', max: 100},
              { name: '风格稳定性', max: 100},
              { name: '风控能力', max: 100},

            ]
        },
        series: [{
            name: 'heh',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [

            ]
        }]
    };

    if(id){
        var chartDom = document.getElementById(id);
        // var chartDom = id;

        if(chartDom){
            let chart = echarts.init(chartDom);
            let newChartOptions = $.extend(true,chartOptions,options);
            try{
                chart.setOption(newChartOptions);
            }catch(err){
                alert(err);
            }

        }else{
            throw new Error("Echart 构造函数:id对应的Dom不存在");
        }
    }else{
        throw new Error("Echart 构造函数必须传递dom id参数");
    }
};

$.extend(EchartC.prototype, {
    destroy : function(){

    }
});

module.exports = EchartC;
