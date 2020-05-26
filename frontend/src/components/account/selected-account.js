import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { deleteAccount } from '../../reducers/account/account.actions';



const SelectedAccount = (props) => {
    const account = props.account;

    const handleDelete = (account) => {
        if (window.confirm(
            "Are you sure you want to delete this account: " + account.name + "?"
        )) {
            props.deleteAccount(account.name, account.accountType);
        }
    }

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
            <div className="grid100">
            {account.active ?
                <CustomButton
                    label="make active"
                    buttonStyle="blue large"
                />
                :
                <CustomButton
                    label="make inactive"
                    buttonStyle="large"
                />
            }
                <CustomButton
                    label="delete"
                    buttonStyle="red large"
                    action={() => { handleDelete(account) }}
                />
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteAccount: (name) => dispatch(deleteAccount(name))
    }
}

export default connect(null, mapDispatchToProps)(SelectedAccount);