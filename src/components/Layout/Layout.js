import React,{Component} from 'react';
import Auxx from '../../hoc/Auxx';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import {connect} from 'react-redux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
	state={
		showing:false,
	}
	removeBackDrop = () => {
		this.setState({
			showing:false
		})
	}

	showSideDrawer = () => {
		this.setState({
			showing:true
		})
	}
	render() {

	return(<Auxx>
	<div>Toolbar,SideDrawer,BackDrop</div>
	<Toolbar
	isAuth={this.props.isAuthenticated}
	 clicked={this.showSideDrawer}/>
	<SideDrawer
	 isAuth={this.props.isAuthenticated}
	 removed={this.removeBackDrop} showed={this.state.showing}/>
	<main className={classes.contents}>
		{this.props.children}
	</main>

	</Auxx>)	
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};
export default connect(mapStateToProps)(Layout);