import React from 'react';

const AccountList = (props) => {
    const accounts = props.accounts

    return (
        <div>
            {accounts.map(account => (
                <div key={account.id}>
                    {account.name}
                </div>
            ))}
        </div>
    )
}

export default AccountList;