"use strict"
import React from 'react';
import Menu from './components/menu';
import {connect} from 'react-redux';

class Main extends React.Component{
    render(){
        return(
            <div>
                <Menu cartItemsNumber={this.props.totalQty}/>
                {this.props.children}
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        totalQty: state.cart.totalQty
    }
}
export default connect(mapStateToProps)(Main);