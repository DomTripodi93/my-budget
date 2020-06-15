import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../assets/favicon.png';
import './header.styles.scss';

const Header = props => {
    const [authValue, setAuthValue] = useState(props.isAuthenticated);

    useEffect(() => {
        setAuthValue(props.isAuthenticated);
    }, [props]);

    return (
        <div className='header-cover'>
            {authValue ?
                <div className='header'>
                    <Link to='/' className='logo-holder'>
                        <img className='logo-holder' alt='logo' src={logo}></img>
                    </Link>
                    <div className='routes'>
                        <Link to='/' className='route'>
                            Home
                        </Link>
                        <Link to="/account/All">Accounts</Link>
                        <Link to="/transaction/notReconciled">Transactions</Link>
                        <Link to="/recurringTransaction/All">Recurring Transactions</Link>
                    </div>
                    <div className='edge'>
                        <Link to='/signout' className='route'>
                            Log Out
                        </Link>
                    </div>
                </div>
                :
                <div className='header'>
                    <Link to='/' className='logo-holder'>
                        <img className='logo-holder' alt='logo' src={logo}></img>
                    </Link>
                    <div className='routes'>
                        <Link to='/' className='route'>
                            Home
                        </Link>
                        <Link to='/register' className='route'>
                            Sign Up
                        </Link>
                        <Link to='/signin' className='route'>
                            Sign In
                        </Link>
                    </div>
                    <div className='edge'></div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Header);