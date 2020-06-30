import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormInput from '../../shared/elements/form-input/form-input.component';
import FormSelect from '../../shared/elements/form-select/form-select.component';
import CustomButton from '../../shared/elements/button/custom-button.component';
import helpers from '../../shared/helpers';
import {
    addTransaction,
    updateTransactionFromList,
    updateSelectedTransaction
} from '../../reducers/transaction/transaction.actions';



const TransactionForm = props => {
    const helper = new helpers();
    const today = new Date();
    const [transactionInfo, setTransactionInfo] = useState({
        accountTo: "",
        accountFrom: "",
        cost: 0.01,
        date: helper.getDateTimeStringFromDate(today)
    });
    const {
        accountTo,
        accountFrom,
        cost,
        date
    } = transactionInfo;

    useEffect(() => {
        if (props.editMode) {
            Object.keys(props.transactionInput).forEach(key => {
                if (props.transactionInput[key] !== null) {
                    setTransactionInfo({ [key]: props.transactionInput[key] });
                }
            })
            setTransactionInfo(props.transactionInput);
        }
    }, [props])

    const accounts = props.accounts;
    const [accountOptions, setAccountOptions] = useState([])

    useEffect(() => {
        if (accounts.length > 0){
            setAccountOptions(accounts.map(account => {
                return { value: account.name, label: account.name }
            }))
            setTransactionInfo(transactionInfo => {
                return {
                    ...transactionInfo,
                    accountFrom: accounts[0].name,
                    accountTo: accounts[1].name
                }
            })
        } 
    }, [accounts])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (transactionInfo !== props.transactionInput) {
                if (props.single) {
                    props.updateSelectedTransaction(
                        transactionInfo, 
                        props.callback
                    );
                } else {
                    props.updateTransactionFromList(
                        transactionInfo, 
                        props.callback
                    );
                }
            } else {
                props.callback();
            }
        } else {
            props.addTransaction(transactionInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        if (name === "accountTo" || name === "accountFrom") {
            let lastTo = transactionInfo["accountTo"]
            let lastFrom = transactionInfo["accountFrom"]
            if (value === lastFrom && name === "accountTo"){
                setTransactionInfo({ ...transactionInfo, [name]: value, accountFrom: lastTo})
            } else if (value === lastTo && name === "accountFrom"){
                setTransactionInfo({ ...transactionInfo, [name]: value, accountTo: lastFrom})
            } else {
                setTransactionInfo({ ...transactionInfo, [name]: value });
            }
        } else {
            setTransactionInfo({ ...transactionInfo, [name]: value });
        }
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Transaction
                </h3>
                :
                <h3 className='centered'>
                    Fill out the form below to update your Transaction
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <FormSelect
                    label='Account Paid To'
                    name='accountTo'
                    value={accountTo}
                    options={accountOptions}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label='Account Paid By'
                    name='accountFrom'
                    value={accountFrom}
                    options={accountOptions}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Cost of Transaction'
                    type='number'
                    step='0.01'
                    name='cost'
                    min='0.01'
                    value={cost}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Date of Transaction'
                    type='date'
                    name='date'
                    value={date}
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
    addTransaction: (transaction, callback) => {
        dispatch(addTransaction(transaction, callback))
    },
    updateTransactionFromList: (transaction, callback) => {
        dispatch(updateTransactionFromList(transaction, callback))
    },
    updateSelectedTransaction: (transaction, callback) => {
        dispatch(updateSelectedTransaction(transaction, callback))
    }
});


export default connect(null, mapDispatchToProps)(TransactionForm);