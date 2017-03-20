/**
 * 负责从DOM中解析出CMS配置的占位符组件, 并初始化成对应的UI组件
 * Created by jess on 16/6/30.
 */


'use strict';


const $ = require('common:widget/lib/jquery/jquery.js');

const CmsProductSug = require('common:widget/cms-ui/cms-product-sug/cms-product-sug.js');

//DOM中CMS配置自定义标签的选择器
const WE_TAG_CSS_SELECTOR = 'p[data-tag]';


let singleton = {

    /**
     * 解析某个DOM元素内部的子孙元素, 找到CMS中配置的自定义标签, 并实例化成对应的组件
     * @param rootElement {Element} 要解析的容器DOM
     */
    parse : function( rootElement ){

        let $con = $( rootElement );

        $con.find(WE_TAG_CSS_SELECTOR).each( function(){
            var $p = $(this);
            let tag = ( $p.attr('data-tag') || '').trim();
            
            switch( tag ){
                case 'we-product-sug':
                    let component = new CmsProductSug({
                        container : $p
                    });
                    component.render();
                    break;
                default:
                    console.log(`未识别的自定义标签:`, tag);
            }
        } );
    }

};




module.exports = singleton;