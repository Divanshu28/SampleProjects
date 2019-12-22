import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
class Checkout extends Component {
   
    state = {
        ingredients: null,
        totalPrice: 0
    }
 
   /* componentWillMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price= 0;
        for(let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price,
        })
    }*/
    clickBack = () => {
        this.props.history.goBack();
    }
    clickContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }
        render() {
            let summary = <Redirect to='/'/>;
            if(this.props.ings) {
                const purchaseRedirect = this.props.purchased ? <Redirect to='/'/> : null;

                summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.clickBack}
                checkoutContinued={this.clickContinue} />
                <Route path={this.props.match.url + "/contact-data"} component={ContactData}/>
                </div>
                );
            }
                return summary;
        }
}
const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
	};
};


export default connect(mapStateToProps) (Checkout);