import React from 'react';
import classes from './Order.css';
const order = (props) => {

    const ingredients = [];
    for(let ingredientname in props.ingredients) {
        ingredients.push( {
            name: ingredientname,
            amount: props.ingredients[ingredientname]
        })
    }
    const igoutput = ingredients.map(ig => {
       return <span key={ig.name} style={{textTransform: 'capitalize',display: 'inline-block',padding: '5px',margin:'0 8px',border: "1px solid #ccc"}}>{ig.name} ({ig.amount})</span>;
    });
    return(
    <div onClick={props.click} className={classes.Order}>
        <p>Ingredients: {igoutput}</p>
        <p>Price: <strong>USD ${props.totalPrice}</strong></p>
    </div>
);
}
export default order;