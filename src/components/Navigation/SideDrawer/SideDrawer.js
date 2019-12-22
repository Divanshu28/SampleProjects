import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxx';
const sideDrawer = (props) => {
	let attachedClasses=[classes.SideDrawer,classes.Close];
	if(props.showed)
		attachedClasses=[classes.SideDrawer,classes.Open];
	return (
		<Aux>
			<Backdrop show={props.showed} clicked={props.removed}/>
			<div className={attachedClasses.join(' ')}>
			<div className={classes.Logo}>
				<Logo/>
			</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth}/>
				</nav>
			</div>
		</Aux>
		);
}
export default sideDrawer;