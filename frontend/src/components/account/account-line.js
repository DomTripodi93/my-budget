import React from 'react';
import { Link } from 'react-router-dom';


const AccountLine = (props) => {
    const account = props.account;
    return (
        <div>
            {props.page === "Income" ?
                <div>
                    {account.active ?
                        <div className="centered account-grid-income">
                            <Link
                                to={"/account/" + account.name}
                            >
                                <h5 className="grid-text">
                                    {account.name}
                                </h5>
                            </Link>
                            <h5 className="grid-text">
                                {account.accountType}
                            </h5>
                            <h5 className="grid-text">
                                {account.balance}
                            </h5>
                        </div>
                        :
                        <div className="centered account-grid-income gray-back">
                            <Link
                                to={"/account/" + account.name}
                            >
                                <h5 className="grid-text">
                                    {account.name}
                                </h5>
                            </Link>
                            <h5 className="grid-text">
                                {account.accountType}
                            </h5>
                            <h5 className="grid-text">
                                {account.balance}
                            </h5>
                        </div>
                    }
                </div>
                :
                <div>
                    {account.active ?
                        <div className="centered account-grid-inner">
                            <Link
                                to={"/account/" + account.name}
                            >
                                <h5 className="grid-text">
                                    {account.name}
                                </h5>
                            </Link>
                            <h5 className="grid-text">
                                {account.accountType}
                            </h5>
                            <h5 className="grid-text">
                                {account.balance}
                            </h5>
                        </div>
                        :
                        <div className="centered account-grid-inner gray-back">
                            <Link
                                to={"/account/" + account.name}
                            >
                                <h5 className="grid-text">
                                    {account.name}
                                </h5>
                            </Link>
                            <h5 className="grid-text">
                                {account.accountType}
                            </h5>
                            <h5 className="grid-text">
                                {account.balance}
                            </h5>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default AccountLine;