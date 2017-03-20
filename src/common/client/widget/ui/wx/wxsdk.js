/**
 * 微信SDK
 * Created by 王半仙 on 16/6/16.
 */


'use strict';
const $ = require('common:widget/lib/jquery/jquery.js');
let WXShareDataConfig = require('common:widget/ui/wx/wxShareDataConfig.js');
var service = require('common:widget/ui/service/service-factory.js');
const signatureService = service.getService('passport');

class WXSdk {
      getWXSdkPromise(url, type){
          return signatureService.getWxSignature({
              refererUrl : url,
              type : type
          });
      }

     getWXSdkPromiseFromServer(params){
         return signatureService.getWxSignatureFromServer(params);
     }


    hideOptionMenu(signaturePackage){
        //signaturePackage["debug"] = true;
        wx.config(signaturePackage);
        wx.ready(function (){
            wx.hideOptionMenu();
        });
        wx.error(function(error){
            console.log(error);
        });
    }


    closeShare(signaturePackage){
        //signaturePackage["debug"] = true;
        wx.config(signaturePackage);
        wx.ready(function (){
            wx.hideMenuItems({
                menuList:["menuItem:share:appMessage",
                    "menuItem:share:timeline",
                    "menuItem:share:qq",
                    "menuItem:share:weiboApp",
                    "menuItem:share:facebook",
                    "menuItem:openWithQQBrowser",
                    "menuItem:openWithSafari",
                    "menuItem:copyUrl",
                    "menuItem:share:QZone"


                ]
            });

        });
        wx.error(function(error){
            console.log(error);
        });
    }

    share(signaturePackage, wxShareData, readyCallback){
        wx.config(signaturePackage);
        wx.ready(function (){
            wxShareData = WXShareDataConfig.mergeShareDate(wxShareData);
            wx.onMenuShareAppMessage(wxShareData);
            wx.onMenuShareTimeline(wxShareData);
            wx.onMenuShareQQ(wxShareData);
            wx.onMenuShareWeibo(wxShareData);
            if( typeof readyCallback === 'function' ){
                readyCallback( wx, wxShareData );
            }

        });

        wx.error(function(error){

            console.log(error);
        });
    }
}

WXSdk.wx = wx;
let  single = new WXSdk();
module.exports =   single;