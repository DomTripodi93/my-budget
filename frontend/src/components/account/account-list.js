import React from 'react';
import { Link } from 'react-router-dom';

const AccountList = (props) => {
    return (
        <div>
            {props.single ?
                <div>
                    {props.accounts.map(account => (
                        <div key={account.id}>
                            {account.name}
                        </div>
                    ))}
                </div>
                :
                <div>
                    {props.accounts.map(account => (
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