/**
 * daifei
 */

'use strict';

const $ = require('common:widget/lib/jquery/jquery.js');
//var echarts = require('echarts');
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图和折线图
require('echarts/lib/chart/pie');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/title');


/**
 * 占比 饼图 环形图
 * @param id dom的ID
 * @param options 个性化的option
 * @constructor
 */
var EchartP = function(id, options){

    var chartOptions = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title:{
            show: true,
            text: '',
            subtext : '',

            left: 'center',
            top: 'center',
            textStyle:{
                color: '#ff721f',
                fontSize: '30'
            }
        },
        text : {
            text: '没有数据',
            textAlign: 'middle',
            textBaseline: 'middle',
            left: '30%',
            top: '30%',
            textStyle:{
                color: '#848484',
                fontWeight: 'normal',
                fontSize: '30'
            }
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[

                ]
            }
        ]
    };



    if(id){
        var chartDom = id;
        
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

$.extend(EchartP.prototype, {
    destroy : function(){

    }
});

module.exports = EchartP;
