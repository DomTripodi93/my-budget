import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import { checkUser } from './reducers/user/user.actions';


import Header from './shared/header/header';
import Spinner from './shared/elements/spinner/spinner';


const Register = lazy(() => import('./containers/registration/registration.component'));
const Signin = lazy(() => import('./containers/registration/signin.component'));
const Signout = lazy(() => import('./containers/registration/signout.component'));
const Home = lazy(() => import('./containers/home/home.component'));
const AccountContainer = lazy(() => import('./containers/transaction/account-container.component'));
const Dashboard = lazy(() => import('./containers/home/dashboard.component'));
const TransactionContainer = lazy(() => import('./containers/transaction/transaction-container.component'));
const RecurringTransactionContainer = lazy(() => import('./containers/transaction/recurring-transaction-container.component'));

const App = (props) => {
    const [authValue, setAuthValue] = useState(props.isAuthenticated);

    useEffect(() => {
        console.log('called')
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
                {
                    authValue ?
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route exact path='/' component={Dashboard} />
                            <Route exact path='/account/:page' component={AccountContainer} />
                            <Route exact path='/transaction/:page' component={TransactionContainer} />
                            <Route exact path='/recurringTransaction/:page' component={RecurringTransactionContainer} />
                            <Route exact path='/signout' component={Signout} />
                        </Switch>
                    </Suspense>
                    :
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/signin' component={Signin} />
                        </Switch>
                    </Suspense>
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
