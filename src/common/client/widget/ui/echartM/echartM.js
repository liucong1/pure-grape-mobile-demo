/**
 * Created by qiangran on 16/6/21.
 */

'use strict';

const $ = require('common:widget/lib/jquery/jquery.js');
//var echarts = require('echarts');
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图和折线图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');



/**
 * 走势图构造函数
 * @param id dom的ID
 * @param options 个性化的option
 * @constructor
 */
var EchartM = function(id, options){

    var chartOptions  = {
        color : [
            "#19a9d1",
            "#f58234"
        ],
        grid : {
            left: '4%',
            right: '4%',
            bottom: '4%',
            containLabel: true
        },
        title : {
            text: ''
        },
        tooltip : {
        },
        legend :{

        },

        xAxis :{
        },

        yAxis :[

        ]
        ,

        series : [
        ],

        noDataLoadingOption : {
            text: '暂无数据',
            effect:'bubble',
            effectOption : {
                effect: {
                    n: 0
                }
            },
            textStyle: {
                fontSize: 32,
                fontWeight: 'bold'
            }
        }
    };

    if(id){
        var chartDom = document.getElementById(id);
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

$.extend(EchartM.prototype, {
    destroy : function(){

    }
});

module.exports = EchartM;
