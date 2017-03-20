/**
 * Created by wangcheng on 16/3/15.
 */

'use strict';

let React = require('react');
let ReactDOM = require('react-dom');

let Indicator = require('./sub/indicator/indicator.jsx');
let List = require('./sub/list/list.jsx');


require('./carousel.scss');

const defaultProps = {
    indicator : true,
    autoPlay : true,
    speed : 500,
    currentIndex : 0
};

class Carousel extends React.Component{

    static get propsType(){
        return {
            width : React.PropTypes.number,
            height : React.PropTypes.number,
            indicator : React.PropTypes.bool,
            autoPlay : React.PropTypes.bool,
            speed : React.PropTypes.number,
            currentIndex : React.PropTypes.number,
            onCurrentChange : React.PropTypes.func,
            onSwiping : React.PropTypes.func,
            onSwipend : React.PropTypes.func
        }
    }

    constructor(props){
        super(props);

        this.state = {
            width : props.width || 0,
            height : props.height || 0,
            currentIndex : this.props.currentIndex,
            animate : true
        };
        this.onCurrentIndexChange = this.onCurrentIndexChange.bind(this);
        this.onListMove = this.onListMove.bind(this);
        //this.onListMoveEnd = this.onListMoveEnd.bind(this);
    }

    componentDidMount(){

        this.updateRect();
    }

    componentWillReceiveProps(nextProps){
        console.log('carousel willReceiveProps');
        this.setState({
            currentIndex : nextProps.currentIndex,
            animate : true
        });
    }

    //shouldComponentUpdate(nextProps){
    //
    //}

    //componentWillUpdate(){
    //    console.log('carousel componentWillUpdate');
    //}
    //
    //componentDidUpdate(){
    //    console.log('carousel componentDidUpdate');
    //}

    updateRect(){
        let el = ReactDOM.findDOMNode( this );
        let rect = el.getBoundingClientRect();
        let width = rect.width || el.offsetWidth;
        let height = rect.height || el.offsetHeight;
        this.setState({
            width : width,
            height : 0
        });
    }

    onCurrentIndexChange(changeOptions){
        this.setState({
            currentIndex : changeOptions.slideTo,
            animate : changeOptions.animate
        }, () => {

            //console.log('carousel onCurrentChange');
            //这里延迟,直接调用父组件回调,和当前setState修改的样式在一个函数里,导致父组件的修改会覆盖掉当前setState的样式!!!
            setTimeout( () => {
                if(this.props.onCurrentChange){
                    this.props.onCurrentChange( changeOptions.slideTo );
                }
            }, 0);
        });

    }

    //direction, deltaX, deltaY
    onListMove(moveOptions){
        if(this.props.onSwiping){
            this.props.onSwiping(moveOptions);
        }
    }

    //direction, deltaX, deltaY, isfMove
    //onListMoveEnd(moveOptions){
    //    if(this.props.onSwipend){
    //        this.props.onSwipend(moveOptions);
    //    }
    //}

    render(){

        console.log('carousel render');

        let self = this;

        const itemWidth = this.state.width;
        const itemHeight = this.state.height;

        let childrenCount = React.Children.count(self.props.children);

        let carouselStyle = {

        };

        if( itemWidth > 0 ){
            carouselStyle.width = itemWidth + 'px';
        }
        if( itemHeight > 0 ){
            carouselStyle.height = itemHeight + 'px';
        }

        let indicator = null;
        if( this.props.indicator ){
            indicator = <div className='ui-carousel-indicator'>
                <Indicator count={childrenCount} currentIndex={self.state.currentIndex} onItemClick={self.onCurrentIndexChange} />
            </div>;
        }

        return (
            <div className="ui-carousel" style={carouselStyle}>
                <div className="ui-carousel-container">
                    <List
                        width={ itemWidth }
                        height={ itemHeight }
                        currentIndex={self.state.currentIndex}
                        speed={self.props.speed}
                        onListChange={self.onCurrentIndexChange}
                        onListMove={self.onListMove}
                        animate={self.state.animate}
                        count={childrenCount}
                        autoPlay={self.props.autoPlay}
                    >
                        {this.props.children}
                    </List>
                </div>
                {indicator}
            </div>
        );
    }
}

Carousel.defaultProps = defaultProps;

module.exports = Carousel;