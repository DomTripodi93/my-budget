import React, { useState } from 'react';
import "./account.scss"
import AccountLine from './account-line';
import AccountButtonHandle from './account-button-handle';
import SelectedAccount from './selected-account';



const AccountList = (props) => {
    const [detailsShown, setDetailsShown] = useState(0)
    const showDetails = (name) => {
        setDetailsShown(name);
    }
    const hideDetails = () => {
        setDetailsShown(0);
    }
    return (
        <div>
            {props.single ?
                <div>
                    {props.accounts.map(account => (
                        <SelectedAccount
                            account={account}
                            key={account.name}
                        />
                    ))}
                </div>
                :
                <div>
                    <div className="account-grid-outer">
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
                    </div>
                    <hr />
                    <div>
                        <div>
                            {props.accounts.map(account => (
                                <div key={account.name}>
                                    <div className="account-grid-outer">
                                        <div>
                                            {account.name === detailsShown ?
                                                <div>
                                                    <SelectedAccount
                                                        account={account}
                                                    />
                                                </div>
                                                :
                                                <div>
                                                    {account.active ?
                                                        <div>
                                                            <AccountLine
                                                                account={account}
                                                                page={props.page}
                                                            />
                                                        </div>
                                                        :
                                                        <div className="gray-back">
                                                            <AccountLine
                                                                account={account}
                                                                page={props.page}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div className="account-grid-right">
                                            {account.name === detailsShown ?
                                                <AccountButtonHandle
                                                    action={hideDetails}
                                                    name={account.name}
                                                    label="&#x25B3;"
                                                />
                                                :
                                                <AccountButtonHandle
                                                    action={showDetails}
                                                    name={account.name}
                                                    label="&#x25BD;"
                                                />
                                            }
                                        </div>
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