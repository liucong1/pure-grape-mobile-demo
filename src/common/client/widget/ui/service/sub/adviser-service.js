/**
 * 智能顾问 相关 接口
 * daifei
 */


 "use strict";



 const ServiceBase = require('./../service-base');


 const adapters = {};

 const MOBILE_URL_PREFIX = '/mo';

 const apiConf = {

     getLineData: {
         url: `${MOBILE_URL_PREFIX}/wx/healthCheck/line`,
         method: 'GET',
         dataType: 'json',
         data : {

         }
     },
     setRiskAnswer : {
        url: `${MOBILE_URL_PREFIX}/wx/risk/answerAsync`,
        method: 'POST',
        dataType: 'json',
        data : {

        }
     },
     setDreamAsync : {
         url: `${MOBILE_URL_PREFIX}/wx/plan/setDreamAsync`,
         method: 'POST',
         dataType: 'json',
         data : {

         }
     },
     setMyDreamAsync : {
         url: `${MOBILE_URL_PREFIX}/wx/myDream/setMyDreamAsync`,
         method: 'POST',
         dataType: 'json',
         data : {

         }
     },
     setAssetViewAsync : {
         url: `${MOBILE_URL_PREFIX}/wx/view/setAssetViewAsync`,
         method: 'POST',
         dataType: 'json',
         data : {

         }
     },

     getSmsCode: {
         url: `${MOBILE_URL_PREFIX}/wx/bind-account/submitRandCode`,
         method: 'POST',
         dataType: 'json',
         data:{}
     },

     bindAccount: {
         url: `${MOBILE_URL_PREFIX}/wx/bind-account/submitBindAdvisory`,
         method: 'POST',
         dataType: 'json',
         data:{}
     },
     getJumpData:{
         url: `${MOBILE_URL_PREFIX}/wx/monthReport/jump`,
         method: 'GET',
         dataType: 'json',
         data:{}
     }



 };


 let utilService = new ServiceBase( apiConf, adapters);

 module.exports = utilService;
