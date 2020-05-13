import React from 'react';
import "./account.scss"
import AccountLine from './account-line';



const AccountList = (props) => {
    return (
        <div>
            {props.single ?
                <div>
                    {props.accounts.map(account => (
                        <div key={account.name}>
                            {account.name}
                        </div>
                    ))}
                </div>
                :
                <div>
                    <div className="account-grid-outer">
                        {props.page === "Income" ?
                            <div className="account-grid-income centered heading">
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
                        :
                            <div className="account-grid-inner centered heading">
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
                        }
                    </div>
                    <hr />
                    <div className="account-grid-outer">
                        <div>
                            {props.accounts.map(account => (
                                <div key={account.name}>
                                    <AccountLine 
                                        account={account}
                                        page={props.page}
                                    />
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div>
                            {props.accounts.map(account => (
                                <div key={account.name}>
                                    <div className="account-grid-right">
                                        {account.active ?
                                            <div className="account-grid-right" key={account.name}>
                                                <h5 className="grid-text centered">
                                                    buttons
                                                </h5>
                                            </div>
                                            :
                                            <div className="account-grid-right gray-back" key={account.name}>
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