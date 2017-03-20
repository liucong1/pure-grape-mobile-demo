/**
 * 具体APP的controller 基类
 * Created by jess on 16/4/20.
 */


'use strict';

const validate = require("validate.js");


class Base extends grape.ControllerBase {

    init(http){
        super.init(http);

        let serverConf = grape.configManager.getModuleConfig('common', 'server');
        let sdkConf = serverConf.sdk;
        this.sdkConf = {
            version : sdkConf.version,
            clientVersion : sdkConf.clientVersion,
            platform : sdkConf.platform
        };

        this.platform = 'mobile';

        this.http.assign('isProduction' ,grape.util.isProduction());
    }

    _addVersionData(options){
        if(!options.data){
            options.data = {};
        }
        options.data.version = this.sdkConf.version;
        options.data.clientVersion = this.sdkConf.clientVersion;
        options.data.platform = this.sdkConf.platform;
        return options;
    }

    _addCookie(options){

        let req = this.http.req;

        if(!options){
            options = {};
        }
        if(!options.headers){
            options.headers = {};
        }

        let cookieStr = '';
        for(let key in req.cookies){
            if( Object.prototype.hasOwnProperty.call(req.cookies, key) ){
                cookieStr += `${key}=${encodeURIComponent(req.cookies[key])};`;   
            }
        }

        options.headers.Cookie = cookieStr;

        return options;
    }

    request( apiNameMethod){
        let arr = apiNameMethod.split('.');
        let arrLastIndex = arr.length - 1;
        //最后一个是方法名
        let methodName = arr[arrLastIndex];

        let options = this._addVersionData( {} );
        options = this._addCookie(options);

        let args = [].slice.call( arguments, 1 );

        args.unshift( options );

        //add by liucong，拆分we-sdk中的api
        let obj = weSDK.api[ arr[0] ] , arrCurrentIndex = 1;
        while( arrCurrentIndex < arrLastIndex ){
            let apiName = arr[arrCurrentIndex];
            obj = obj[apiName];
            arrCurrentIndex++;
        }
        return obj[methodName].apply( obj, args );
    }
    
    json( data ){
        this.http.json( (data) );
    }

    /**
     * 客户端参数校验失败, 可以调用此方法输出
     * @param message
     */
    argumentValidateFail( message ){
        this.http.argumentValidateFail( message );
    }

    validateArgument(data, constraints){
        let validateResult = validate(data, constraints, { fullMessages : false });

        if(validateResult){
            let resultMsg = "";
            for(let key in validateResult){
                resultMsg += key + validateResult[key].join()+ "; " ;
            }
            return resultMsg;
        }

        return true;
    }

}

grape.set('controller_base', Base );

module.exports = Base;