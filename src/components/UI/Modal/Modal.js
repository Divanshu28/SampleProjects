import React ,{Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxx';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component {
	shouldComponentUpdate(nextprops,nextstate) {
			return nextprops.show !==this.props.show || nextprops.children !== this.props.children;
	}
	componentWillUpdate() {
		console.log("Model updated");
	}
	render() {

		return (
			<Aux>
	<Backdrop show={this.props.show} clicked={this.props.click}/>
	<div className={classes.Modal} style={{
		transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)' ,
		opacity: this.props.show ? '1' : '0'
	}}>
	{this.props.children}
	</div>
	</Aux>
			);
	}
} 
export default Modal;
