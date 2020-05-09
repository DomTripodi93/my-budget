import React from 'react';
import { Link } from 'react-router-dom';
import "./account.scss"

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
                        </div>
                    </div>
                    <hr />
                    <div className="account-grid-outer">
                        <div>
                            {props.accounts.map(account => (
                                <div className="account-grid-inner" key={account.id}>
                                    <Link to={"/account/" + account.id}>
                                        {account.id}
                                    </Link>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div>
                            {props.accounts.map(account => (
                                <div>
                                    <div className="account-grid-right" key={account.id}>
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