import React from 'react';
import "./account.scss"
import AccountLine from './account-line';



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
                    <div className="account-grid-outer">
                        <div className="account-grid-inner centered heading">
                            <h5 className="grid-header-text">
                                ID
                            </h5>
                            <h5 className="grid-header-text">
                                Name
                            </h5>
                            <h5 className="grid-header-text">
                                Type
                            </h5>
                            <h5 className="grid-header-text">
                                Balance
                            </h5>
                        </div>
                    </div>
                    <hr />
                    <div className="account-grid-outer">
                        <div>
                            {props.accounts.map(account => (
                                <div key={account.id}>
                                    <AccountLine 
                                        account={account}
                                    />
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div>
                            {props.accounts.map(account => (
                                <div key={account.id}>
                                    <div className="account-grid-right">
                                        {account.active ?
                                            <div className="account-grid-right" key={account.id}>
                                                <h5 className="grid-text centered">
                                                    buttons
                                                </h5>
                                            </div>
                                            :
                                            <div className="account-grid-right gray-back" key={account.id}>
                                                <h5 className="grid-text centered">
                                                    buttons
                                                </h5>
                                            </div>
                                        }
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AccountList;