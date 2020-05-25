import React from 'react';



const SelectedAccount = (props) => {
    const account = props.account;
    return (
        <div className="border centered split">
            <div>
                <h5 className="grid-text">
                    Account: {account.name}
                </h5>
                <h5 className="grid-text">
                    Type: {account.accountType}
                </h5>
                <h5 className="grid-text">
                    Balance: {account.balance}
                </h5>
                {account.active ?
                    <h5 className="grid-text">
                        Active: Yes
                    </h5>
                    :
                    <h5 className="grid-text">
                        Active: No
                    </h5>
                }
            </div>
            <div>
                buttons
            </div>
        </div>
    )
}

export default SelectedAccount;