import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllAccounts } from '../../reducers/account/account.actions';



const Dashboard = (props) => {
    const called = props.accountCalled;
    const fetchAll = props.fetchAllAccounts;
    const accounts = props.allAccounts;
    const [hasAccount, setHasAccount] = useState(false);

    useEffect(() => {
        if (!called["All"]) {
            fetchAll();
        } else if (accounts.length > 0) {
            setHasAccount(true)
        }
    }, [
        fetchAll,
        called, 
        accounts
    ])

    return (
        <div>
            <h2 className="centered">Welcome to Your Dashboard!</h2>
            
            {hasAccount ?
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
                :
                <div className="border centered">
                    <h4>
                        You don't have any accounts yet, to get started add 
                        your first <Link to="account/All">account</Link>
                    </h4>
                </div>
            }
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