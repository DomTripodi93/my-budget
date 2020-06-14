import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllAccounts } from '../../reducers/account/account.actions';



const Dashboard = () => {
    
    return (
        <div className="border centered">
            <h2>Welcome to Your Dashboard!</h2>
            <Link to="/account/All">All Accounts</Link>
            <br />
            <Link to="/account/Income">Income Accounts</Link>
            <br />
            <Link to="/account/Expense">Expense Accounts</Link>
            <br />
            <Link to="/transaction/notReconciled">Not Reconciled Transactions</Link>
            <br />
            <Link to="/recurringTransaction/All">Recurring Transactions</Link>
            <br />
            <br />
        </div>
    );
};



const mapDispatchToProps = dispatch => {
    return {
        fetchAllAccounts: () => dispatch(fetchAllAccounts())
    }
}

const mapStateToProps = state => ({
    allAccounts: state.account.allAccounts,
    accountCalled: state.account.called
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);