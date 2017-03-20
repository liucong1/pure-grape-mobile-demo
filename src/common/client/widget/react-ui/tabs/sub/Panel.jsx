/**
 * Tabs 内容区域的容器
 * Created by jess on 16/3/24.
 */


'use strict';


const React = require('react');


class Panel extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return React.createElement( this.props.tagName, this.props, this.props.children);
    }
}

Panel.defaultProps = {
    tagName : 'div'
};


module.exports = Panel;