import React,{Component} from 'react';
import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';
import {Route,Link} from 'react-router-dom';
class OrderSummary extends Component {
	componentWillUpdate() {
		console.log("Order Summary updated");
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
	.map(igKey => {
		return <li key={igKey}>
		<span style={{textTransform : 'capitalize'}}>{igKey}
		</span> : {this.props.ingredients[igKey]}</li>
	});
		return (
			<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with following ingredients :</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price : ${this.props.price.toFixed(2)}</strong></p>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked={this.props.clickRemove}>CANCEL</Button>
			<Button btnType="Success" clicked={this.props.clickContinue}>CONTINUE</Button>
		</Aux>
			);
		}
	}
export default OrderSummary;