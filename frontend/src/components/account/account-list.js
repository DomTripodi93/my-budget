import React, { useState } from 'react';
import "./account.scss"
import AccountLine from './account-line';
import SelectedAccount from './selected-account';
import CustomButton from '../../shared/elements/button/custom-button.component';



const AccountList = (props) => {
    const [detailsShown, setDetailsShown] = useState({})
    
    const detailsVisible = (name) => {
        let detailHold = {...detailsShown};
        detailHold[name] = !detailHold[name];
        setDetailsShown(detailHold);
    }

    return (
        <div>
            {props.single ?
                <div>
                    {props.accounts.map(account => (
                        <SelectedAccount
                            account={account}
                            key={account.name}
                            single={true}
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
                                            {detailsShown[account.name] ?
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
                                        <div className="account-grid-right center">
                                            {detailsShown[account.name] ?
                                                <CustomButton
                                                    action={()=> detailsVisible(account.name)}
                                                    label="&#x25B3;"
                                                    buttonStyle="mini"
                                                />
                                                :
                                                <CustomButton
                                                    action={()=> detailsVisible(account.name)}
                                                    label="&#x25BD;"
                                                    buttonStyle="mini"
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