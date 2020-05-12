import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormInput from '../../shared/elements/form-input/form-input.component';
import FormSelect from '../../shared/elements/form-select/form-select.component';
import CustomButton from '../../shared/elements/button/custom-button.component';
import {
    addAccount,
    updateAccountFromList,
    updateSingleAccount
} from '../../reducers/account/account.actions';



const AccountForm = props => {
    const [accountInfo, setAccountInfo] = useState({
        name: "",
        accountType: "Income"
    });

    const {
        name,
        accountType
    } = accountInfo;

    useEffect(() => {
        if (props.editMode) {
            Object.keys(props.accountInput).forEach(key => {
                if (props.accountInput[key] !== null) {
                    setAccountInfo({ [key]: props.accountInput[key] });
                }
            })
            setAccountInfo(props.accountInput);
        }
    }, [props])

    const accountTypes = [
        { value: "Income", label: "Income" },
        { value: "Expense", label: "Expense" },
        { value: "Asset", label: "Asset" },
        { value: "Liability", label: "Liability" }
    ]

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (accountInfo !== props.accountInput) {
                if (props.single) {
                    props.updateSingleAccount(
                        accountInfo,
                        props.callback
                    );
                } else {
                    props.updateAccountFromList(
                        accountInfo,
                        props.callback
                    );
                }
            } else {
                props.callback();
            }
        } else {
            props.addAccount(accountInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setAccountInfo({ ...accountInfo, [name]: value });
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a New Account
                </h3>
                :
                <h3 className='centered'>
                    Fill out the form below to update your Account
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Account Name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label='Account Type'
                    name='accountType'
                    value={accountType}
                    options={accountTypes}
                    onChange={handleChange}
                    required
                />
                <div className="grid50">
                    {!props.editMode ?
                        <CustomButton
                            buttonStyle="blue"
                            type="submit"
                            label="Add"
                        />
                        :
                        <CustomButton
                            buttonStyle="blue"
                            type="submit"
                            label="Update"
                        />
                    }
                    <CustomButton
                        buttonStyle="red"
                        action={props.callback}
                        label="Cancel"
                    />
                </div>
            </form>
        </div>
    );
}



const mapDispatchToProps = dispatch => ({
    addAccount: (account, callback) => {
        dispatch(addAccount(account, callback))
    },
    updateAccountFromList: (account, callback) => {
        dispatch(updateAccountFromList(account, callback))
    },
    updateSingleAccount: (account, callback) => {
        dispatch(updateSingleAccount(account, callback))
    }
});


export default connect(null, mapDispatchToProps)(AccountForm);