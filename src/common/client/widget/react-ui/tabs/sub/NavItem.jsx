/**
 * Tab 组件中, 导航栏的 单个  导航
 * Created by jess on 16/3/24.
 */


'use strict';


const React = require('react');


class NavItem extends React.Component {

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind( this );
    }

    onClick(){
        this.props.onClick( this.props.index );
    }

    render(){

        const className = 'r-tab-nav-item ' +  (this.props.className || '' ) + ' ' + this.props.activeClass;

        return (
            <li onClick={this.onClick} className={className} data-nav-index={this.props.index}>{this.props.children}</li>
        );
    }

}


NavItem.propTypes = {
    activeClass : React.PropTypes.string,
    index : React.PropTypes.number,
    onClick : React.PropTypes.func
};

NavItem.defaultProps = {
    //选中时的className
    activeClass : '',
    //所在导航栏中的 位置
    index : -1,

    onClick : null
};


module.exports = NavItem;