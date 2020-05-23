import React from 'react';
import { Link } from 'react-router-dom';



const SelectedAccount = (props) => {
    const account = props.account;
    console.log(account)
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
            {account.active ?
                <h5 className="grid-text">
                    Active: Yes
                </h5>
                :
                <h5 className="grid-text">
                    Active: No
                </h5>
            }
        </div>
    )
}

export default SelectedAccount;