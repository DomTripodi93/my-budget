import React, { useState } from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { deleteAccount, updateSelectedAccount, updateAccountFromList } from '../../reducers/account/account.actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



const SelectedAccount = (props) => {
    const account = props.account;
    const [changeBank, setChangeBank] = useState(false);

    const handleDelete = (account) => {
        if (window.confirm(
            "Are you sure you want to delete this account: " + account.name + "?"
        )) {
            props.deleteAccount(account.name, account.accountType);
        }
    }

    const updateAccount = (account) => {
        let accountHold = {...account};
        accountHold.active = !accountHold.active;
        if (props.single) {
            props.updateSelected(accountHold);
        } else {
            props.updateFromList(accountHold);
        }
    }

    const handleChangeActive = (account) => {
        if (window.confirm(
            "Are you sure you " + 
            (account.active ? "deactivate" : "activate") + 
            " this account: " + account.name + "?"
        )) {
            updateAccount(account);
        }
    }

    const selectNewBank = () => {
        setChangeBank(!changeBank)
    }

    return (
        <div className="border centered split">
            {changeBank ?
                <div>
                </div>
                :
                <div className="grid50">
                    <h5 className="grid-text">
                        Account: {account.name}
                    </h5>
                    <h5 className="grid-text">
                        Type: {account.accountType}
                    </h5>
                    <h5 className="grid-text">
                        Balance: ${account.balance.toFixed(2)}
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
            }
            <div className="grid100">
                <Link className="grid100" to={"/transaction/" + account.name}>
                    <CustomButton 
                        label="transactions"
                        buttonStyle="soft-green large"
                    />
                </Link>
                {account.isBank ?
                    <div className="grid100">
                        {changeBank?
                            <CustomButton
                                label="cancel"
                                buttonStyle="red large"
                                action={() => { selectNewBank() }}
                            />
                            :
                            <CustomButton
                                label="change bank"
                                buttonStyle="blue large"
                                action={() => { selectNewBank() }}
                            />
                        }
                    </div>
                    :
                    <div className="grid100">
                        {!account.active ?
                            <CustomButton
                                label="make active"
                                buttonStyle="blue large"
                                action={() => { handleChangeActive(account) }}
                            />
                            :
                            <CustomButton
                                label="make inactive"
                                buttonStyle="large"
                                action={() => { handleChangeActive(account) }}
                            />
                        }
                    </div>
                }
                {changeBank ?
                    null
                    :
                    <CustomButton
                        label="delete"
                        buttonStyle="red large"
                        action={() => { handleDelete(account) }}
                    />
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteAccount: (name, accountType) => dispatch(deleteAccount(name, accountType)),
        updateSelected: (account) => dispatch(updateSelectedAccount(account)),
        updateFromList: (account) => dispatch(updateAccountFromList(account))
    }
}

export default connect(null, mapDispatchToProps)(SelectedAccount);