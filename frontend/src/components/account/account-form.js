import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../../shared/elements/form-input/form-input.component';
import FormSelect from '../../shared/elements/form-select/form-select.component';
import CustomButton from '../../shared/elements/button/custom-button.component';
import {
    addAccount,
    addFirstAccount
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

    const accountTypes = [
        { value: "Income", label: "Income" },
        { value: "Expense", label: "Expense" },
        { value: "Asset", label: "Asset" },
        { value: "Liability", label: "Liability" },
        { value: "Equity", label: "Equity" }
    ]

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.first){
            props.addFirstAccount(accountInfo, props.callback);
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
            <h3 className='centered'>
                Fill out the form below to add a New Account
            </h3>
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
                    <CustomButton
                        buttonStyle="blue"
                        type="submit"
                        label="Add"
                    />
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
    addFirstAccount: (account, callback) => {
        dispatch(addFirstAccount(account, callback))
    }
});


export default connect(null, mapDispatchToProps)(AccountForm);