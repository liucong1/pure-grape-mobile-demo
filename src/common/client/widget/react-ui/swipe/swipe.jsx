/**
 * Created by wangcheng on 16/3/15.
 */

'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
const _ = require('underscore');

//可以滑动的方向,水平或垂直
const SWIPE_DIRECTION = {
    HORIZONTAL : 'horizontal',
    VERTICAL : 'vertical'
};

const defaultProps = {
    delta : 30,
    fmove : 0.5,
    //默认的标签名
    tagName : 'div',
    //滑动的方向: horizontal | vertical
    direction : SWIPE_DIRECTION.HORIZONTAL
};

const DIRECTION = {
    UP : 'up',
    DOWN : 'down',
    LEFT : 'left',
    RIGHT : 'right'
};

class Swipe extends React.Component{

    static getInitialState(){
        return {
            startTime : 0,
            startX : null,
            startY : null,
            swiping : false,
            fSwiping : false
        };
    }

    static get propTypes(){
        return {
            onSwipeStart : React.PropTypes.func,
            onSwiping : React.PropTypes.func,
            onSwipend : React.PropTypes.func,
            delta : React.PropTypes.number
        };
    }

    constructor(props){

        super(props);

        this.isSwiping = false;
        this.ignoreTouchID = null;
        this.state = Swipe.getInitialState();

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    /**
     * 计算手指相对原始position的位置信息
     * @param event
     * @returns {{deltaX: number, deltaY: number, absX: number, absY: number, direction: *}}
     * @private
     */
    _calculatePos(event){
        let touches = event.changedTouches,
            deltaX = touches[0].pageX - this.state.startX,
            absX = Math.abs(deltaX),
            deltaY = touches[0].pageY - this.state.startY,
            absY = Math.abs(deltaY);

        let direction = null;

        if(absX >= absY){
            if(deltaX > 0){
                direction = DIRECTION.RIGHT;
            }else{
                direction = DIRECTION.LEFT;
            }
        }else{
            if(deltaY > 0){
                direction = DIRECTION.DOWN;
            }else{
                direction = DIRECTION.UP;
            }
        }

        return {
            deltaX,
            deltaY,
            absX,
            absY,
            direction
        };
    }

    onTouchStart(event){

        if( this.isSwiping ){
            return;
        }

        let touches = event.touches;
        this.state.startX = touches[0].pageX;
        this.state.startY = touches[0].pageY;
        this.state.startTime = Date.now();
        if(this.props.onSwipeStart){
            this.props.onSwipeStart(touches[0].pageX, touches[0].pageY);
        }
    }

    onTouchMove(event){

        // console.log( event.nativeEvent );

        let touch = event.nativeEvent.touches[0];

        if( touch.identifier === this.ignoreTouchID ){
            return;
        }

        /**
         * 处理逻辑 :
         *  1. 判断滑动距离是否大于delta
         *  2. 根据deltaX 和 deltaY大小决定上下还是左右滑动
         *  3. 根据deltaX 和 deltaY正负确认方向
         */
        let positionResult = this._calculatePos(event);
        let swipeDirection = this.props.direction;

        if( ! this.isSwiping ){

            if( ( swipeDirection === SWIPE_DIRECTION.HORIZONTAL && positionResult.absX >= this.props.delta )
                || ( swipeDirection === SWIPE_DIRECTION.VERTICAL && positionResult.absY >= this.props.delta )  ){
                //符合特定方向上的滚动
                this.isSwiping = true;
                event.preventDefault();
            }else if( ( swipeDirection === SWIPE_DIRECTION.VERTICAL && positionResult.absX >= this.props.delta )
                || ( swipeDirection === SWIPE_DIRECTION.HORIZONTAL && positionResult.absY >= this.props.delta ) ){

                this.ignoreTouchID = touch.identifier;
            }

        }

        if( this.isSwiping ){
            //当前已经开始跟随手指滚动
            if(this.props.onSwiping){
                this.props.onSwiping(positionResult.direction, positionResult.deltaX, positionResult.deltaY, event);
            }
        }

        //if( this.isSwiping
        //    || ( swipeDirection === SWIPE_DIRECTION.HORIZONTAL && positionResult.absX >= this.props.delta )
        //    || ( swipeDirection === SWIPE_DIRECTION.VERTICAL && positionResult.absY >= this.props.delta ) ){
        //    if( ! this.isSwiping ){
        //        this.isSwiping = true;
        //        event.preventDefault();
        //
        //    }
        //
        //    if(this.props.onSwiping){
        //        this.props.onSwiping(positionResult.direction, positionResult.deltaX, positionResult.deltaY, event);
        //    }
        //}
    }

    onTouchEnd(event){

        let touch = event.nativeEvent.changedTouches[0];

        // console.log( touch.identifier, this.ignoreTouchID );

        if( ! this.isSwiping || touch.identifier === this.ignoreTouchID ){
            return;
        }

        let positionResult = this._calculatePos(event),
            deltaTime = Date.now() - this.state.startTime;

        let moveSpeed = Math.sqrt(Math.pow(positionResult.absX, 2) + Math.pow(positionResult.absY, 2)) / deltaTime;
        if(moveSpeed >= this.props.fmove){
            this.state.fSwiping = true;
        }
        if(this.props.onSwipend){
            this.props.onSwipend(positionResult.direction, positionResult.deltaX, positionResult.deltaY, this.state.fSwiping, event);
        }

        this.isSwiping = false;
        this.ignoreTouchID = null;
        this.state = Swipe.getInitialState();
    }

    render(){

        return React.createElement( this.props.tagName,
            _.extend({}, this.props, {
                onTouchStart : this.onTouchStart,
                onTouchMove : this.onTouchMove,
                onTouchEnd : this.onTouchEnd,
                onTouchCancel : this.onTouchEnd
            } ),
            this.props.children);

    }
}

Swipe.defaultProps = defaultProps;

module.exports = Swipe;