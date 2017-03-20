/**
 * 负责根据CMS中配置的 产品推荐占位符, 渲染对应的产品类型
 * Created by jess on 16/6/30.
 */

'use strict';


const $ = require('common:widget/lib/jquery/jquery.js');

const FundSug = require('common:widget/cms-ui/fund-sug/fund-sug.js');


const sugProductMap = {
    fund : FundSug
};


class CmsProductSug {

    constructor( options ){

        this.$container = $( options.container );

        let text = ( this.$container.text() || '').trim();
        
        this.productList = this.parseProduct( text );
        
        this.$container.hide().empty().removeAttr('title');
    }

    /**
     * 根据小编在CMS中填写的产品推荐字段, 解析出推荐的各个产品以及对应产品渲染所需要的参数
     * @param text
     * @returns {Array}
     */
    parseProduct(text){
        let out = [];
        text = ( text || '').trim();

        let arr = text.split(',');

        arr.forEach( ( item ) => {
            item = item.trim();
            let temp = item.split('_');
            if( temp.length < 2 ){
                return;
            }
            let productType = temp.shift().trim();
            out.push({
                productType : productType,
                args : temp
            });
        });

        return out;
    }

    render(){

        let $container = this.$container;
        let list = this.productList;
        
        list.forEach( ( productConf ) => {
            
            let type = productConf.productType;
            let uiClass = sugProductMap[type];
            if( typeof uiClass !== 'function' ){
                console.warn('不支持的产品推荐类型: ', type);
                return;
            }
            
            let div = document.createElement('div');
            $container.append( div );
            let component = new uiClass({
                container : div,
                args : productConf.args
            });
            component.render();
        });

        this.$container.show();
    }
}




module.exports = CmsProductSug;
