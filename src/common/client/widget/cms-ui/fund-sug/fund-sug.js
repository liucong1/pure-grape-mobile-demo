/**
 * 通过CMS中配置的 单个基金 推荐卡片组件
 * Created by jess on 16/6/30.
 */


'use strict';

const $ = require('common:widget/lib/jquery/jquery.js');
const EventEmitter = require('common:widget/lib/EventEmitter/EventEmitter.js');

const service = require('common:widget/ui/service/service-factory.js');

const bridge = require('common:widget/ui/bridgeXXX/bridgeXXX.js');

const fundService = service.getService('fund');
const utilService = service.getService('util');

//渲染的不同阶段
const RENDER_INIT = 0;
const RENDER_START = 1;
const RENDER_SUCCESS = 2;
const RENDER_ERROR = 3;

class FundSug extends EventEmitter{

    constructor(options){

        super(options);
        
        this.$container = $(options.container);
        
        this.args = options.args || [];
        
        this.code = ( this.args[0] || '' ).trim();
        this.data = null;

        //初始处于渲染未开始
        this.renderState = RENDER_INIT;

        this.$container.hide().addClass('cms-ui-fund-sug');

        this.setupEvent();
    }
    
    render(){
        if( this.renderState > RENDER_INIT ){
            return;
        }
        
        this.renderState = RENDER_START;

        fundService.getFundDetail({ code : this.code })
            .then( (req) => {
                if( req.requestStatus === fundService.STATUS.SUCCESS ){
                    let out = req.data;
                    if( out.status === 0 ){
                        this._renderData( out.data );
                        return;
                    }
                    return Promise.reject( new Error(out.message) );
                }
                return Promise.reject( new Error('请求基金详情失败') );
            })
            .catch( (e) => {
                console.error( e );
            });
    }
    
    _renderData( data ){
        this.data = data;
        console.log( 'fund data: ', data );

        if( ! data ){
            this.error();
            return;
        }

        this._renderTheme2( data );
    }

    //样式皮肤 1
    _renderTheme1( data ){
        let fundName = data.fundName || '';
        if( fundName.length > 10 ){
            fundName = fundName.substr(0, 10) + '...';
        }

        let tag = data.remark || '';

        let html = `<h1 class="fund-name">${fundName}（${data.fundCode}）<span class="fund-span">${ tag }</span></h1>
                <ul class="fund-content">
                    <li class="fund-info info1">
                        <p class="year-rise">${data.rateYear}<span class="year-rise-span">%</span></p>
                        <p class="rise-text">年涨跌幅</p>
                    </li>
                    <li class="fund-info info2">
                        <p class="year-net">${data.nav}<span class="year-net-span">元</span></p>
                        <p class="rise-text">净值</p>
                    </li>
                </ul>
                <div class="fund-order">申购</div>`;

        this.$container.html( html ).addClass('cms-fund-sug-theme-1').show();

        this.renderState = RENDER_SUCCESS;
    }

    //样式皮肤 2
    _renderTheme2( data ){
        let fundName = data.fundName || '';
        if( fundName.length > 6 ){
            fundName = fundName.substr(0, 6) + '...';
        }

        let tag = data.remark || '';

        if( tag ){
            // tag = tag.substr(0, 5);
        }

        let rateYearCon = '--';
        if( data.rateYear ){
            rateYearCon = `${data.rateYear}<span class="year-rise-span">%</span>`;
        }

        let navCon = '--';
        if( data.nav ){
            navCon = `${data.nav}<span class="year-net-span">元</span>`;
        }

        let html = `<h1 class="fund-name">${fundName}（${data.fundCode}）<span class="fund-span">${ tag }</span></h1>
                <ul class="fund-content fn-clear">
                    <li class="fund-info info1">
                        <p class="year-rise">${rateYearCon}</p>
                        <p class="rise-text">年涨跌幅</p>
                    </li>
                    <li class="fund-info info2">
                        <p class="year-net">${navCon}</p>
                        <p class="rise-text">净值</p>
                    </li>
                    <li class="fund-order-wrap"><div class="fund-order" id="gio-trick-${data.fundCode}">申购</div></li>
                    <li class="split-line"></li>
                </ul>
                `;

        this.$container.html( html ).addClass('cms-fund-sug-theme-2').show();

        this.renderState = RENDER_SUCCESS;
    }

    //绑定事件
    setupEvent(){

        this.$container.on('click', '.fund-order', () => {
            this.buyFund();
        });
    }

    buyFund(){

        let fundCode = this.code;

        utilService.recordLog({
            source : 'zhinang',
            subsource : fundCode
        }).finally( () => {
            bridge.showFundDetailPage(fundCode);
        });
    }

    error(){
        this.renderState = RENDER_ERROR;
        this.$container.hide();
    }

    destroy(){

        this.$container.off();
        this.$container.remove();
        this.$container = null;
    }
}




module.exports = FundSug;

