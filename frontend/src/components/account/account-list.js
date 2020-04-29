import React from 'react';
import { Link } from 'react-router-dom';

const AccountList = (props) => {
    const accounts = props.accounts

    return (
        <div>
            {props.single ?
                <div>
                    {accounts.map(account => (
                        <div key={account.id}>
                            {account.name}
                        </div>
                    ))}
                </div>
                :
                <div>
                    {accounts.map(account => (
                        <div key={account.id}>
                            <Link to={"/account/" + account.id}>
                                {account.name}
                            </Link>
                        </div>
                    ))}
                </div>
            }

        </div>
    )
}

export default AccountList;