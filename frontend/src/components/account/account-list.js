import React, { useState } from 'react';
import "./account.scss"
import AccountLine from './account-line';
import CustomButton from '../../shared/elements/button/custom-button.component';



const AccountList = (props) => {
    const [detailsShown, setDetailsShown] = useState(0)
    const showDetails = (id) => {
        setDetailsShown(id);
    }
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
                    <div className="account-grid-outer">
                        <div>
                            {props.accounts.map(account => (
                                <div key={account.name}>
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
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div>
                            {props.accounts.map(account => (
                                <div key={account.name}>
                                    <div className="account-grid-right">
                                        <div className="account-grid-right" key={account.name}>
                                            <CustomButton
                                                buttonStyle="soft-green"
                                                action={showDetails}
                                                id={account.id}
                                                label="Details"
                                            />
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