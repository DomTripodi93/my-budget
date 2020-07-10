import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../assets/favicon.png';
import './header.styles.scss';
import { toggleDropDown } from '../../reducers/drop-down/drop-down.reducer';

const Header = props => {
    const [authValue, setAuthValue] = useState(props.isAuthenticated);
    const [hidden, setHidden] = useState(props.hidden);

    const toggleDropDown = () => {
        if (hidden) {
            setTimeout(() => { props.toggleDropDown() }, 1);
        } else {
            props.toggleDropDown();
        }
    };

    useEffect(() => {
        setAuthValue(props.isAuthenticated);
        setHidden(props.hidden);
    }, [props]);

    const accountItems = [
        (<Link to="/account/list/All" className='drop-down-item' key='1'>All</Link>),
        (<Link to="/account/list/Income" className='drop-down-item' key='2'>Income</Link>),
        (<Link to="/account/list/Expense" className='drop-down-item' key='3'>Expense</Link>),
        (<Link to="/account/list/Asset" className='drop-down-item' key='4'>Asset</Link>),
        (<Link to="/account/list/Liability" className='drop-down-item' key='5'>Liability</Link>)
    ]

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
                        <ul onClick={toggleDropDown}>
                            Accounts &#x21af;
                            {!hidden ?
                                <div className='drop-down grid100'>{accountItems}</div>
                                :
                                null
                            }
                        </ul>
                        <Link to="/transaction/notReconciled">Transactions</Link>
                        <Link to="/recurringTransaction/All">Recurring</Link>
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

const mapDispatchToProps = dispatch => ({
    toggleDropDown: () => dispatch(toggleDropDown())
})

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    hidden: state.dropDown.hidden
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);