/**
 * Tab 组件的 导航栏
 * Created by jess on 16/3/24.
 */


'use strict';


const React = require('react');


require('./Nav.scss');

function noop(){}

class Nav extends React.Component {

    constructor(props){
        super(props);

        this.onItemClick = this.onItemClick.bind( this );
    }

    onItemClick(index){
        this.props.onNavItemClick( index );
    }

    render(){

        const className = 'r-tab-nav ' + (this.props.className || '');

        const currentIndex = this.props.currentIndex;
        const ACTIVE_CLASS = this.props.activeClass;

        const children = this.props.children.map( (child, index) => {
            let activeClass = currentIndex === index ? ACTIVE_CLASS : '';
            return React.cloneElement(child, {
                index : index,
                key : `nav-item-${index}`,
                activeClass : activeClass,
                onClick : this.onItemClick
            });
        } );

        let list = <ul className={className}>{children}</ul>;

        if( this.props.scrollable ){
            list = <div className="r-tab-nav-scrollable-wrap fn-clear">{ list }</div>;
        }

        return list;
    }
}


Nav.defaultProps = {

    className : '',

    currentIndex : 0,

    //是否允许横向滚动
    scrollable : false,

    //当前选中的 NavItem 的 className
    activeClass : 'r-tab-nav-item-active',

    onNavItemClick : noop
};


module.exports = Nav;