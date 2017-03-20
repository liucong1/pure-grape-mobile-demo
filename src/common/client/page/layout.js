/**
 * 在页面JS入口执行前, 执行这个JS, 依赖 各种 shim, JS hack等库来解决不同环境问题
 * Created by jess on 16/5/13.
 */


'use strict';
require('es5-shim');
require('es5-shim/es5-sham');
require('es6-collections');
const Promise = require('bluebird');
const $ = require('common:widget/lib/jquery/jquery.js');

//改写全局的Promise
window.Promise = Promise;

const statistic = require('common:widget/ui/statistic/statistic.js');

const tplConf = window.tplConf;

//自动发送当前页面的PV统计/identify统计到 诸葛IO
try{

    if( tplConf.autoPV && tplConf.pageKey ){
        statistic.pv({ pageKey : tplConf.pageKey });
    }
    var userId = tplConf.user.userId;
    if( tplConf.autoIdentify ){
        statistic.identify({ userId : userId });
    }

}catch(e){

}

