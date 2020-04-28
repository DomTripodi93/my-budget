import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import { checkUser } from './reducers/user/user.actions';

import Register from './containers/registration/registration';
import Signin from './containers/registration/signin';
import Signout from './containers/registration/signout';
import Home from './containers/home/home';
import AccountContainer from './containers/transaction/account-container';
import Header from './shared/header/header';
import Dashboard from './containers/home/dashboard';
import TransactionContainer from './containers/transaction/transaction-container';
import RecurringTransactionContainer from './containers/transaction/recurring-transaction-container';



const App = (props) => {
    const [authValue, setAuthValue] = useState(props.isAuthenticated);

    useEffect(() => {
        let token = localStorage.getItem('accessToken');
        let userId = localStorage.getItem('id');
        if (!props.isAuthenticated) {
            props.checkUser(userId, token);
        }
        setAuthValue(props.isAuthenticated)
    }, [props]);

    return (
        <div id="page">
            <Header />
            <div>
                {authValue ?
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route exact path='/account/:page' component={AccountContainer} />
                        <Route exact path='/transaction/:page' component={TransactionContainer} />
                        <Route exact path='/recurringTransaction/:page' component={RecurringTransactionContainer} />
                        <Route exact path='/signout' component={Signout} />
                    </Switch>
                    :
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/signin' component={Signin} />
                    </Switch>
                }
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        checkUser: (userId, token) => dispatch(checkUser(userId, token))
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
