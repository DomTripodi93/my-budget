import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './App.scss';
import { checkUser } from './reducers/user/user.actions';


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
