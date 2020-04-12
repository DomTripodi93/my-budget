import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import { checkUser } from './reducers/user/user.actions';

import Register from './containers/registration/registration';
import Signin from './containers/registration/signin';
import Signout from './containers/registration/signout';
import Home from './containers/home/home';


const App = (props) => {
    const [authValue, setAuthValue] = useState(props.isAuthenticated);

    useEffect(() => {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('id');
        if (!props.isAuthenticated) {
            props.checkUser(userId, token);
        }
        setAuthValue(props.isAuthenticated)
    }, [props]);

    return (
        <div id="page">
            <div>
                <h1>
                    Welcome to My Budget!
        </h1>
                {authValue ?
                    <Switch>
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
