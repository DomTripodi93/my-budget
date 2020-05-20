import React from 'react';
import { Link } from 'react-router-dom';



const SelectedAccount = (props) => {
    const account = props.account;
    return (
        <div className="centered account-grid-inner">
            <Link
                to={"/account/" + account.name}
            >
                <h5 className="grid-text">
                    selected: {account.name}
                </h5>
            </Link>
            <h5 className="grid-text">
                {account.accountType}
            </h5>
            <h5 className="grid-text">
                {account.balance}
            </h5>
        </div>
    )
}

export default SelectedAccount;