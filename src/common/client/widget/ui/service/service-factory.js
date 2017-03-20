/**
 * 维护所有的service的工厂
 * Created by 王半仙 on 16/6/13.
 */



const passportService = require('./passport-service');
const utilService = require('./sub/util-service');

const fundService = require('./sub/fund-service.js');
const exchangeService = require('./sub/exchange-service.js');

const getpackageService = require('./sub/event/getpackage-service');
const advChartsService = require('./sub/adv/adv-service');

const getOlympicIndexService = require('./sub/event/olympic/index-service');
const getOlympicTabletennisService = require('./sub/event/olympic/tabletennis-service');
const getOlympicMarathonService = require('./sub/event/olympic/marathon-service');


const getInsuranceIndexService = require('./sub/event/insurance/index-service');
const getInsuranceSucService = require('./sub/event/insurance/success-service');
const adviserService = require('./sub/adviser-service.js');

const eventService = require('./sub/event/event-service');
const lpService = require('./sub/lp-service');


let serviceMap = {
    passport : passportService,
    util : utilService,

    fund : fundService,
    exchange : exchangeService,
    getpackage:getpackageService,

    advCharts:advChartsService,

    getOlympicIndex: getOlympicIndexService,
    getOlympicTabletennis: getOlympicTabletennisService,
    getOlympicMarathon: getOlympicMarathonService,
    event: eventService,
    getInsuranceIndex: getInsuranceIndexService,
    getInsuranceSuc: getInsuranceSucService,
    adviser : adviserService,
    lp : lpService
};

let singleton = {

    getService : function(name){
        return serviceMap[name];
    }

};



module.exports = singleton;
