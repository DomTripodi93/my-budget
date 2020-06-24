import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormInput from '../../shared/elements/form-input/form-input.component';
import FormSelect from '../../shared/elements/form-select/form-select.component';
import CustomButton from '../../shared/elements/button/custom-button.component';
import {
    addAccount,
    addFirstAccount,
    updateAccountFromList,
    updateSelectedAccount
} from '../../reducers/account/account.actions';



const AccountForm = props => {
    const [account, setAccount] = useState("");
    const [accountList, setAccountList] = useState(props.accountList);

    useEffect(() => {
        Object.keys(props.accountsList).forEach(key => {
            if (props.accountsList[key] !== null) {
                setTransactionInfo({ [key]: props.props.accountsList[key] });
            }
        })
        setAccountList(props.props.accountsList.filter((act)=> {return act.name !== props.bank.name}));
    }, [props])

    const [account, setAccount] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();
        if (accountInfo !== props.accountInput) {
            props.updateBank(props.bank, account, props.callback)
        } else {
            props.callback();
        }
    };

    const handleChange = event => {
        const { value } = event.target;

        setAccount(value);
    };

    return (
        <div className='middle'>
            <h3 className='centered'>
                Fill out the form below to update your bank account
            </h3>
            <form onSubmit={handleSubmit}>
                <FormSelect
                    label='New Bank Account'
                    name='account'
                    value={account}
                    options={accountOptions}
                    onChange={handleChange}
                    required
                />
                <div className="grid50">
                    <CustomButton
                        buttonStyle="blue"
                        type="submit"
                        label="Update"
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
    updateBank: (bank, account, callback) => {
        dispatch(updateBank(bank, account, callback))
    }
});


export default connect(null, mapDispatchToProps)(AccountForm);