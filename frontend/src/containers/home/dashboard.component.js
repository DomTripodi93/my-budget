import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllAccounts } from '../../reducers/account/account.actions';



const Dashboard = () => {

    return (
        <div>
            <h2 className="centered">Welcome to Your Dashboard!</h2>
            <div className="border centered">
                <br />
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