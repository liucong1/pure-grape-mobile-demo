
/**
 * Created by wangcheng on 16/3/22.
 */

'use strict';

let $ = require('common:widget/lib/jquery/jquery.js');
let React = require('react');
let ReactDOM = require('react-dom');
let _ = require('underscore');

let Helper = require('../helper.js');
let Swipe = require('common:widget/react-ui/swipe/swipe.jsx');

const defaultProps = {
    speed : 500,
    animate : true,
    autoPlay : true,
    autoplaySpeed : 5000
};

class List extends React.Component{

    static get propsType(){
        return {
            width : React.PropTypes.number.isRequired,
            height : React.PropTypes.number.isRequired,
            currentIndex : React.PropTypes.number.isRequired,
            speed : React.PropTypes.number,
            onListChange : React.PropTypes.func.isRequired,
            onListMove : React.PropTypes.func,
            onListMoveEnd : React.PropTypes.func,
            animate : React.PropTypes.bool,
            autoPlay : React.PropTypes.bool,
            autoplaySpeed : React.PropTypes.number
        }
    }

    static getInitialState(){
        return {
            style : {},
            swiping : false,
            autoPlayTimer : null
        };
    }

    constructor(props){
        super(props);
        this.onSwiping = this.onSwiping.bind(this);
        this.onSwipend = this.onSwipend.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.slideNext = this.slideNext.bind(this);
        this.state = List.getInitialState();
    }

    componentDidMount(){
        let self = this;
        let dom = ReactDOM.findDOMNode(this);
        $(dom).on('transitionend', this.onTransitionEnd);

        if( this.props.autoPlay ){
            this.state.autoPlayTimer = setInterval(self.slideNext, this.props.autoplaySpeed);
        }
    }

    componentWillUnmount(){
        let dom = ReactDOM.findDOMNode(this);
        $(dom).off('transitionend', this.onTransitionEnd);
        if( this.props.autoPlay ){
            clearInterval(this.state.autoPlayTimer);
        }
    }


    slideNext(){
        if(this.state.swiping === false){
            this.props.onListChange({
                slideTo : this.props.currentIndex + 1,
                animate : true
            });
        }
    }

    //onSwipeStart(startX, startY){
    //    console.log('onSwipeStart fn');
    //    if(this.state.autoPlayTimer){
    //        clearTimeout(this.state.autoPlayTimer);
    //        this.state.autoPlayTimer = null;
    //    }
    //}

    onSwiping(direction, deltaX, deltaY){
        if( true || direction == 'left' || direction == 'right'){
            let currentPosition = - (this.props.width * (this.props.currentIndex + 1));
            this.setState({
                style : {
                    transition : 'transform 0ms ease-out',
                    WebkitTransition : 'transform 0ms ease-out',
                    transform : `translate3d(${currentPosition + deltaX}px, 0px, 0px)`,
                    WebkitTransform : `translate3d(${currentPosition + deltaX}px, 0px, 0px)`
                },
                swiping : true
            });
            if(this.props.onListMove){
                this.props.onListMove({
                    direction,
                    deltaX,
                    deltaY
                });
            }
        }
    }

    onSwipend(direction, deltaX, deltaY, isfMove){
        //console.log( 'onSwipe end, direction: ' + direction);
        if( true ){
            let absX = Math.abs(deltaX);
            let slideTo = this.props.currentIndex;
            if( (direction == 'left' || direction == 'right')
                && (absX * 3 > this.props.width || isfMove ) ){
                if(direction == 'left'){
                    slideTo++;
                }else{
                    slideTo--;
                }
            }
            this.state = List.getInitialState();
            //console.log('onSwipend', slideTo, this.props.currentIndex);
            this.props.onListChange({
                slideTo,
                animate : true
            });
            //this.props.onListMoveEnd({
            //    direction,
            //    deltaX,
            //    deltaY,
            //    isfMove
            //});
        }
    }

    onTransitionEnd(){
        if(this.props.currentIndex < 0 || this.props.currentIndex >= this.props.count){
            let actualIndex = Helper.getActualIndex(this.props.count, this.props.currentIndex);
            this.props.onListChange({
                slideTo : actualIndex,
                animate : false
            });
        }else{
            return false;
        }
    }

    getSlideStyle(slideTo, animate = true){
        return {

        };
    }

    render(){

        let self = this;

        let itemStyle = {
            width : self.props.width + 'px'
        };

        if( this.props.height > 0 ){
            itemStyle.height = this.props.height + 'px';
        }

        let childrenCount = React.Children.count(self.props.children);
        let childrenArray = React.Children.toArray(self.props.children);

        childrenArray.unshift(React.cloneElement(childrenArray[childrenCount-1]));
        childrenArray.push(React.cloneElement(childrenArray[1]));

        const realCurrentIndex = this.props.currentIndex + 1;

        let itemsHtml = childrenArray.map( (child, index) => {
            let appendClass = '';
            let activeClass= ' ';
            if(index == 0 || index == (childrenArray.length - 1)){
                appendClass = 'item-clone';
            }
            if(index == realCurrentIndex){
                activeClass = ' realCurrentClass';
            }
            child = React.cloneElement(child, { currentIndex: realCurrentIndex, index : index} );
            return (
                <li key={index} className={"ui-carousel-item " + appendClass + activeClass} style={itemStyle}>
                    {child}
                </li>
            );
        });

        let listStyle = {
            width : (itemsHtml.length * self.props.width + 20) + 'px',
            transition : `transform ${ this.props.animate ? self.props.speed : 0}ms ease-out`,
            WebkitTransition : `-webkit-transform ${ this.props.animate ? self.props.speed : 0}ms ease-out`,
            transform : `translate3d(${-self.props.width * (self.props.currentIndex + 1)}px, 0px, 0px)`,
            WebkitTransform : `translate3d(${-self.props.width * (self.props.currentIndex + 1)}px, 0px, 0px)`
        };

        listStyle = _.extend(listStyle, self.state.style);

        return (
            <Swipe onSwipeStart={this.onSwipeStart} onSwiping={this.onSwiping} onSwipend={this.onSwipend}>
                <ul className="ui-carousel-list" style={listStyle}>
                    {itemsHtml}
                </ul>
            </Swipe>
        );
    }

}

List.defaultProps = defaultProps;

module.exports = List;