import React from 'react';
import { Link } from 'react-router-dom';


const AccountLine = (props) => {
    const account = props.account;
    return (
        <div className="centered account-grid-inner">
            <Link
                to={"/account/single/" + account.name}
            >
                <h5 className="grid-text">
                    {account.name}
                </h5>
            </Link>
            <h5 className="grid-text">
                {account.accountType}
            </h5>
            <h5 className="grid-text">
                ${account.balance.toFixed(2)}
            </h5>
        </div>
    )
}

export default AccountLine;