/**
 * 提前请求资源的helper
 * Created by jess on 16/3/22.
 */


'use strict';

let Promise = require('bluebird');


/**
 * 加载图片资源
 * @param src {String} 图片的URL
 * @return {Promise}
 */
function loadImage(src){
    let isLoad = false;
    return new Promise(function(resolve, reject){
        let img = new Image;
        img.onload = function(){
            if( isLoad ){
                return;
            }
            isLoad = true;
            img.onload = img.onerror = null;
            resolve();
        };
        img.onerror = function(){
            img.onload = img.onerror = null;
            reject();
        };
        img.src = src;
    });
}

/**
 * 异步加载 文本文件
 * @param src {String} 资源的URL
 * @return {Promise}
 */
function cacheJS(src){
    //let s = document.createElement('script');
    //s.type = 'text/cache';
    //s.src = src;
    //document.getElementsByTagName('head')[0].appendChild(s);
    cacheObject( src );
}

function cacheCSS(src){
    cacheObject( src );
}

/**
 * 测试,在 ios 9.3 下, Safari不支持 CSS 文件的提前缓存
 * @param src
 */
function cacheObject(src){
    let ob = document.createElement('object');
    ob.data = src;
    ob.width = ob.height = 0;
    document.body.appendChild( ob );
}

/**
 * 批量缓存资源,包括 图片/JS/CSS
 * @param resourceArray {Array} 资源的URL数组
 *
 */
function cacheAll( resourceArray ){
    resourceArray = resourceArray || [];
    let imgReg = /.+\.[jpg|jpeg|png|gif|webp]$/;
    for( let i = 0, len = resourceArray.length; i < len; i++ ){
        let url = resourceArray[i];
        imgReg.lastIndex = 0;
        if( imgReg.test( url ) ){
            loadImage( url );
        }else{
            cacheObject( url );
        }
    }
}

let utils = {

    loadImage : loadImage,

    cacheJS : cacheJS,

    cacheCSS : cacheCSS,

    cacheAll : cacheAll

};


module.exports = utils;