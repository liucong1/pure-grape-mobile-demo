/**
 * 图片延迟加载
 * Created by jess on 16/7/6.
 */


'use strict';


const $ = require('common:widget/lib/jquery/jquery.js');
const LazyLoad = require('vanilla-lazyload');

const remUtil = require('./remUtil.js');


let utils = {};


/**
 * 将传入的HTML字符串, 内的 <img /> 标签, 替换 src, 为延迟加载做准备
 * @param htmlString {string} 原始HTML字符串
 * @returns {string} 处理之后的HTML字符串
 */
utils.prepareLazyLoad = function( htmlString ){

    if( typeof htmlString !== 'string' ){
        return htmlString;
    }

    let winWidth = 750;

    let winWidthRem = remUtil.px2rem( winWidth ) + 'rem';

    let $temp = $('<div></div>').hide();

    $temp.html( htmlString );

    $temp.find('img').each( function( index, img){
        let $img = $(this);
        let src = this.src;

        //图片 原始的 高/宽 比
        let ratio = -1;

        let naturalWidth = parseInt( this.getAttribute('data-natural-width'), 10 );
        let naturalHeight = parseInt( this.getAttribute('data-natural-height'), 10 );
        let styleWidth = this.style.width;
        let styleHeight  = this.style.height;
        if( styleWidth && styleWidth.indexOf('%') === -1 && styleWidth.indexOf('px') > 0 ){
            styleWidth = parseInt( styleWidth, 10 );
        }else{
            styleWidth = naturalWidth;
        }
        if( styleHeight && styleHeight.indexOf('%') === -1 && styleHeight.indexOf('px') > 0 ){
            styleHeight = parseInt( styleHeight, 10 );
        }else{
            styleHeight = naturalHeight;
        }

        if( naturalWidth > 0 && naturalHeight > 0 ){
            ratio = naturalHeight / naturalWidth;
        }

        $img.attr('data-src', src).removeAttr('src').addClass('wait-load');
        if( styleWidth > 0 && styleHeight > 0 ){

            styleWidth = remUtil.px2rem( styleWidth ) + 'rem';
            styleHeight = remUtil.px2rem( styleHeight ) + 'rem';
            $img.css({
                width : styleWidth,
                'height' : styleHeight,
                'min-height' : 'auto'
            });
        }

        if( this.getAttribute('data-block-img') === '1' ){
            //如果在CMS中设置了图片100%宽,根据浏览器窗口宽度,计算图片显示的宽高
            $img.css({
                display : 'block',
                width : winWidthRem
            });
            if( ratio > 0 ){
                styleHeight = winWidth * ratio;
                $img.css({
                    height : remUtil.px2rem( styleHeight) + 'rem',
                    'min-height' : 'auto'
                });
            }
        }
    } );

    let out = $temp.html();

    $temp.remove();

    return out;

};

utils.doLazyLoad = function( conf ){
    let config = $.extend( {
        threshold: 100,
        container: window,
        elements_selector: "img[data-src]",
        throttle: 30,
        data_src: "src",
        data_srcset: "srcset",
        class_loaded : 'img-lazy-loaded',
        show_while_loading: true
    }, conf || {});

    return new LazyLoad( config );
};



module.exports = utils;