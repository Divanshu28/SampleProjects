import React, {Component} from 'react';
import Auxx from '../hoc/Auxx';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../store/actions/index';
import { connect } from 'react-redux';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
 state = {
 			purchasable: false,
			 purchasing: false,
			 loading: false
 }

 componentDidMount() {
	this.props.onInitIngredients();
//	 console.log(this.props);
//	axios.get('https://react-my-burger-8c838.firebaseio.com/ingredients.json')
//	.then(response => {
//		this.setState({
//			ingredients: response.data
//		})
//	})
//	.catch(error => console.log(error))
 }
 updatePurchaseState (ingredients) {
 	
 	 const sum = Object.keys(ingredients)
 	 .map(igKey => {
 	 	return ingredients[igKey];
 	 	})
 	 	.reduce((sum,el) => {
 	 		return sum+el;
 	 	},0); 
 	 	return sum>0;
 	 
 }

/* addIngredientHandler = (type) => {
 		const oldCount = this.state.ingredients[type];
 		const updatedCount = oldCount + 1;
 		const updatedIngredients = {
 			...this.state.ingredients
 		}
 		updatedIngredients[type]=updatedCount;
 		const priceAddition = INGREDIENT_PRICES[type];
 		const oldPrice = this.state.totalPrice;
 		const updatedPrice = priceAddition + oldPrice;
 		this.setState({
 			totalPrice : updatedPrice,
 			ingredients : updatedIngredients
 		})
 		this.updatePurchaseState(updatedIngredients);
 }

 removeIngredientHandler = (type) => {
 		const oldCount = this.state.ingredients[type];
 		if(oldCount<=0)
 			return;
 		const updatedCount = oldCount - 1;
 		const updatedIngredients = {
 			...this.state.ingredients
 		}
 		updatedIngredients[type]=updatedCount;
 		const priceDeduction = INGREDIENT_PRICES[type];
 		const oldPrice = this.state.totalPrice;
 		const updatedPrice = oldPrice - priceDeduction;
 		this.setState({
 			totalPrice : updatedPrice,
 			ingredients : updatedIngredients
 		})
 		this.updatePurchaseState(updatedIngredients);
 }*/

 purchaseHandler () {
 	this.setState({
 		purchasing : true
 	})
 }
 removePurchase = () => {
 	this.setState({
 		purchasing : false
 	})
 }

 continuePurchase = () => {
	 //alert('You continue!');
		 /*const queryParams= [];
		 for(let key in this.state.ingredients){
			 queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]));
		 }
		 queryParams.push('price='+ this.state.totalPrice);
		 const queryString = queryParams.join('&');
		 this.props.history.push({
			 pathname: '/checkout',
			 search: '?' + queryString,
		 });*/
		 this.props.onInitPurchase();
		 this.props.history.push('/checkout');
 }
	render() {
		const disabledInfo = {
			...this.props.ings
		}
		for(let Key in disabledInfo) {
			disabledInfo[Key] = disabledInfo[Key]<=0;
		}
		let orderSummary =null;
		let burger = <Spinner/>;
		if(this.props.ings){
			burger = (<Auxx>
			<Burger ingredients={this.props.ings}/>
			<BuildControls ingredientAdded={this.props.onIngredientAdded}
							ingredientRemoved={this.props.onIngredientRemoved}
							disabled={disabledInfo}
							price={this.props.pp}
							purchasable={this.updatePurchaseState(this.props.ings)}
							ordered={() => this.purchaseHandler()}/>
					</Auxx>
			);
			orderSummary = <OrderSummary ingredients={this.props.ings} 
			clickRemove={this.removePurchase} 
			clickContinue={this.continuePurchase}
			price={this.props.pp}/>
			if(this.state.loading) {
				orderSummary = <Spinner/>;
			}
	
		}
		return (
				<Auxx>
					<Modal show={this.state.purchasing}
							click={this.removePurchase}>
						{orderSummary}
					</Modal> 
					{burger}
				</Auxx>

			);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		pp: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
	}
}
const mapDispatchToProps = dispatch => {
		return {
				onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
				onIngredientRemoved:  (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
				onInitIngredients: () => dispatch(actionCreators.initIngredients()),
				onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
		};
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));