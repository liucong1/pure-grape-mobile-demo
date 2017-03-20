/**
 * Created by wangcheng on 16/3/20.
 */

let React = require('react');
let ReactDOM = require('react-dom');

require('./indicator.scss');

let Helper = require('../helper.js');

class Indicator extends React.Component{

    static get propsType(){
        return {
            count : React.PropTypes.number,
            currentIndex : React.PropTypes.number,
            onItemClick : React.PropTypes.func,
            direction : React.PropTypes.string
        };
    }

    constructor(props){
        super(props);
    }

    /**
     * 只是调用Owner的click方法,不要在这里修改props或者修改高亮的dot, 子组件应该是stateless的
     * 保持单向数据流
     */
    onItemClick(clickOptions){
        if(this.props.onItemClick){
            this.props.onItemClick(clickOptions);
        }
    }


    /**
     * 为了保持子组件的stateless,组件的展示直接利用owner传递的属性在render中重新计算,重新渲染,性能问题react会帮我们处理
     */
    render(){

        let self = this;
        let itemList = [];
        let actualIndex = Helper.getActualIndex(this.props.count, this.props.currentIndex);
        for(let index = 0; index < this.props.count; index++){
            let clickOptions = {
                slideTo : index,
                animate : true

            };
            let className = actualIndex == index ? 'item-select' : '';
            itemList[index] = (
                <li
                    key={index}
                    className={"ui-carousel-dot-item " + className}
                    onClick={self.onItemClick.bind(this, clickOptions)}
                >
                </li>
            );
        }

        return (
            <ul className='ui-carousel-dots'>
                {itemList}
            </ul>
        );
    }
}


module.exports = Indicator;