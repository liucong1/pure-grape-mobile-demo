/**
 * 针对UE出的按照 750px 宽度的PSD,自动设置 html 元素的 fontSize, 来达到宽高自适应
 * Created by jess on 16/1/28.
 */


'use strict';

var remFlexible = window.remFlexible;

var doc = window.document;
var docEl = document.documentElement;
var win = window;
var dpr = 0;
var scale = 0;
var tid;

var inited = false;

function refreshRem(){
    var winWidth = docEl.clientWidth;

    docEl.style.fontSize = winWidth / 7.5 + 'px';
}

var singleton = {

    init : function(){

        if( inited ){
            return;
        }

        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;

        if( remFlexible ){
            //如果全局已经设置过了,不再重复设置
            return;
        }

        //设置 meta
        var metaEl = doc.querySelector('meta[name="viewport"]');
        if( metaEl ){
            //对于已经存在 meta 标签的情况,报错并删除!!!
            //alert('页面中 [不能] 写 meta[name="viewport"] 标签!!! 必须使用 rem 自适应方案!!');
            metaEl.parentNode.removeChild( metaEl );

        }


        docEl.setAttribute('data-dpr', dpr);

        metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }

        inited = true;

        win.addEventListener('resize', function() {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        win.addEventListener('pageshow', function(e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        }, false);

        if (doc.readyState === 'complete') {
            refreshRem();
        } else {
            doc.addEventListener('DOMContentLoaded', function(e) {
                refreshRem();
            }, false);
        }

        refreshRem();

    },

    //像素转换成 rem
    px2rem : function( pxNumber ){
        return pxNumber / 100;
    },
    //rem 转换成 px
    rem2px : function( remNumber ){
        return remNumber * 100;
    },

    //传入在 750宽度的PSD上量出的字体大小，返回当前手机上对应的字体大小
    //这个函数 **有问题** ,已经  **废弃**  了!!!!, 使用下面的  calcSize
    calcFontSize : function( sizeOnIphone6){
        return sizeOnIphone6 * dpr / 2;
    },

    /**
     * 传入750的dpr=2的设计稿上,量出来的尺寸, 返回当前屏幕上对应的等比例尺寸
     * @param sizeOnIphone6 {number} 750的设计稿上量的尺寸
     * @returns {number}
     */
    calcSize : function(sizeOnIphone6 ){
        return sizeOnIphone6 * singleton.getRatioOfIphone750();
    },

    getRatioOfIphone750 : function(){
        return ( document.documentElement.clientWidth || window.innerWidth ) / 750;
    },

    //获取当前页面里使用的  dpr
    getDPR : function(){
        return dpr;
    }

};


module.exports = singleton;
