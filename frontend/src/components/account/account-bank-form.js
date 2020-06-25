import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormSelect from '../../shared/elements/form-select/form-select.component';
import CustomButton from '../../shared/elements/button/custom-button.component';
import {
    updateBank
} from '../../reducers/account/account.actions';



const AccountBankForm = props => {
    const [account, setAccount] = useState("");
    const [accountList, setAccountList] = useState([]);
    const [accountsForSubmission, setAccountsForSubmission] = useState({});
    
    useEffect(() => {
        if ( props.accountList.length > 0 ) {
            let accountsForList = [];
            let accountsForSubmissionList = {};
            props.accountList.forEach(account => {
                if (
                    !account.isBank && 
                    account.active &&
                    account.accountType === "Asset"
                ) {
                    accountsForList.push({value: account.name, label: account.name})
                    accountsForSubmissionList[account.name] = account;
                    setAccountList([...accountsForList]);
                    setAccount(account.name);
                    setAccountsForSubmission(accountsForSubmissionList);
                }
            })
        }
    }, [props])

    const handleSubmit = async event => {
        event.preventDefault();
        if (account !== props.accountInput) {
            props.updateBank(accountsForSubmission[account], props.callback)
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
            {accountList.length > 0 ?
                <div>
                    <h5 className='centered'>
                        Fill out the form below to update your bank account
                    </h5>
                    <form onSubmit={handleSubmit}>
                        <FormSelect
                            label='New Bank Account'
                            name='account'
                            value={account}
                            options={accountList}
                            onChange={handleChange}
                            required
                        />
                        <div className="grid100">
                            <CustomButton
                                buttonStyle="blue"
                                type="submit"
                                label="Update"
                            />
                        </div>
                    </form>
                </div>
                :
                <h5>
                    Please add another active income account to replace your bank 
                    account before using this form.
                </h5>
            }
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    updateBank: (account, callback) => {
        dispatch(updateBank(account, callback))
    }
});

export default connect(null, mapDispatchToProps)(AccountBankForm);