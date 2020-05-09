import React from 'react';
import { Link } from 'react-router-dom';


const AccountLine = (props) => {
    const account = props.account;
    return (
        <div>
            <div className="centered account-grid-inner">
                <Link
                    to={"/account/" + account.id}
                >
                    <h5 className="grid-text">
                        {account.id}
                    </h5>
                </Link>
                <h5 className="grid-text">
                    {account.name}
                </h5>
                <h5 className="grid-text">
                    {account.type}
                </h5>
            </div>
        </div>
    )
}

export default AccountLine;