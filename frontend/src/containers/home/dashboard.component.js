import React from 'react';
import { Link } from 'react-router-dom';

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

export default Dashboard;