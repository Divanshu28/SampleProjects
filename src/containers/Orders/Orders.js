import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
 
   state = {
       isClicked : false,

   };
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    sumarryHandler = (id) => {
            console.log(id);
            this.props.history.push(`/orders/${id}`);
            this.setState({isClicked :true});

    }
    render() {
        let orders = <Spinner/>;
        if(!this.props.loading) {
            orders =  this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} totalPrice={order.totalPrice} click={() => this.sumarryHandler(order.id)} />
                    ) )     
        }
        if(this.state.isClicked) {
            orders = <p>hello</p>
        }
        return (
            <div>
               {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};
const mapDispatchToprops = dispatch => {
    return {
            onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    };
}
export default connect(mapStateToProps,mapDispatchToprops)(Orders);