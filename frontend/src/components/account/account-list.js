import React from 'react';

const AccountList = (props) => {
    const accounts = props.accounts

    return (
        <div>
            {accounts.map(account => (
                <div>
                    {account.name}
                </div>
            ))}
        </div>
    )
}

export default AccountList;