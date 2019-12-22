import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { purchaseBurgerStart } from '../../../store/actions';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state= {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
            }
        },
        formValid: false,
        }

    checkValidity(value,rules) {
        let isValid =true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        let formData ={};
        for(let element in this.state.orderForm)
        {
            formData[element] = this.state.orderForm[element].value;
        }
      
 	const order = {
 		ingredients: this.props.ings,
         totalPrice: this.props.pp,
         orderdata: formData,
     }
     this.props.onOrderBurger(order,this.props.token);
     console.log(order);
 	
    }
    inputChangedHandler = (event,elementIdentifier) => {
           // console.log(event.target.value);
           const updatedForm = {
               ...this.state.orderForm
           }
           const udatedFrmElmnt = {
               ...updatedForm[elementIdentifier]
           }
           udatedFrmElmnt.value = event.target.value;
           udatedFrmElmnt.valid = this.checkValidity(udatedFrmElmnt.value,udatedFrmElmnt.validation);
           udatedFrmElmnt.touched = true;
           updatedForm[elementIdentifier] = udatedFrmElmnt;
           console.log(udatedFrmElmnt);
           this.setState({
               orderForm : updatedForm
           });
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = ( <form onSubmit={this.orderHandler}> 
         {
             formElementsArray.map(formElement => (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event,formElement.id)}
                    invalid= {!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    isTouched={formElement.config.touched}
                    />
             ))
         }
        <Button  btnType="Success" >ORDER NOW</Button>
                    </form>
    );
    if(this.props.loading){
        form = <Spinner/>
    }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact details</h4>
                {form}
            </div>     
        )
    }
}
const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
        pp: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
	}
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ContactData);