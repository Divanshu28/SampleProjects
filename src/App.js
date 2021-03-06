import React , {Component} from 'react';
import './App.css';
import Layout from'./components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import {Route,Switch} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import OrderSummary from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
class App extends Component {
  render() {
    return (
      <div>
            <Layout>
              <Switch>
                <Route path="/orders/*" component={OrderSummary}/>
                <Route path="/checkout" component={Checkout}/>  
                <Route path="/orders" component={Orders}/>  
                <Route path="/auth" component={Auth}/>
                <Route path="/"  component={BurgerBuilder}/>
                </Switch>
            </Layout>
            
        </div>    
      );
  }
}

export default App;
