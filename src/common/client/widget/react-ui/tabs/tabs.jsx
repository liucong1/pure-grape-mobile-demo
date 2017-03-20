/**
 * 基于 React 的 Tab 组件
 * Created by jess on 16/3/24.
 */


'use strict';

const $ = require('common:widget/lib/jquery/jquery.js');
const React = require('react');
const Nav = require('./sub/Nav.jsx');
const NavItem = require('./sub/NavItem.jsx');
const Panel = require('./sub/Panel.jsx');
const Carousel = require('common:widget/react-ui/carousel/carousel.jsx');


require('./Tabs.scss');


function noop(){}


class Tabs extends React.Component {

    constructor(props){
        super(props);

        this.onIndexChange = this.onIndexChange.bind( this );

        this.state = {
            currentIndex : props.currentIndex || 0
        };
    }

    onIndexChange(index){
        this.setState({
            currentIndex : index
        });

        this.props.onTabChange(index);
    }

    render(){

        const currentIndex = this.state.currentIndex;

        let nav;
        let carouselContent;

        let childArray = React.Children.toArray( this.props.children );

        let navSetting = {
            currentIndex : currentIndex,
            onNavItemClick : this.onIndexChange
        };
        nav = React.cloneElement(childArray[0], navSetting);

        carouselContent = childArray[1].props.children;

        let carouselSetting = {
            onCurrentChange : this.onIndexChange,
            autoPlay : false,
            indicator : false,
            currentIndex : currentIndex
        };


        return (
            <div {...this.props}>
                {nav}
                <Panel {...childArray[1].props}>
                    <Carousel {...carouselSetting}>
                        {carouselContent}
                    </Carousel>
                </Panel>
            </div>
        );
    }
}


Tabs.defaultProps = {
    onTabChange : noop
};


Tabs.Nav = Nav;
Tabs.NavItem = NavItem;
Tabs.Panel = Panel;


module.exports = Tabs;