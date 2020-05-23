import React from 'react';
import { Link } from 'react-router-dom';



const SelectedAccount = (props) => {
    const account = props.account;
    return (
        <div className="centered border">
            <h5 className="grid-text">
                Account: {account.name}
            </h5>
            <h5 className="grid-text">
                Type: {account.accountType}
            </h5>
            <h5 className="grid-text">
                Balance: {account.balance}
            </h5>
        </div>
    )
}

export default SelectedAccount;