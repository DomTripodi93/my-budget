import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { deleteAccount, updateSingleAccount, updateAccountFromList } from '../../reducers/account/account.actions';
import { connect } from 'react-redux';



const SelectedAccount = (props) => {
    const account = props.account;

    const handleDelete = (account) => {
        if (window.confirm(
            "Are you sure you want to delete this account: " + account.name + "?"
        )) {
            props.deleteAccount(account.name, account.accountType);
        }
    }

    const updateAccount = (account) => {
        account.active = !account.active;
        if (props.single) {
            props.updateSingle(account, )
        } else {
            props.updateFromList(account, )
        }
    }

    const handleDeactivate = (account) => {
        if (window.confirm(
            "Are you sure you deactivate this account: " + account.name + "?"
        )) {
            updateAccount(account);
        }
    }

    const handleActivate = (account) => {
        if (window.confirm(
            "Are you sure you activate this account: " + account.name + "?"
        )) {
            updateAccount(account);
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
                    action={() => { handleActivate(account) }}
                />
                :
                <CustomButton
                    label="make inactive"
                    buttonStyle="large"
                    action={() => { handleDeactivate(account) }}
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
        deleteAccount: (name, accountType) => dispatch(deleteAccount(name, accountType)),
        updateSingle: (account, callback) => dispatch(updateSingleAccount(account, callback)),
        updateFromList: (account, callback) => dispatch(updateAccountFromList(account, callback))
    }
}

export default connect(null, mapDispatchToProps)(SelectedAccount);