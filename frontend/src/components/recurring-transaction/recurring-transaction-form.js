import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormInput from '../../shared/elements/form-input/form-input.component';
import FormSelect from '../../shared/elements/form-select/form-select.component';
import CustomButton from '../../shared/elements/button/custom-button.component';
import helpers from '../../shared/helpers';
import {
    addRecurringTransaction,
    updateRecurringTransactionFromList,
    updateSingleRecurringTransaction
} from '../../reducers/recurring-transaction/recurring-transaction.actions';



const RecurringTransactionForm = props => {
    const helper = new helpers();
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [transactionInfo, setTransactionInfo] = useState({
        accountTo: "",
        accountFrom: "",
        cost: 0.01,
        recurringInterval: 1,
        lastDate: helper.getStringFromDate(today),
        nextDate: helper.getStringFromDate(tomorrow)
    });

    const {
        accountTo,
        accountFrom,
        cost,
        recurringInterval,
        lastDate,
        nextDate
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
        setAccountOptions(accounts.map(account => {
            return { value: account.name, label: account.name }
        }))
        setTransactionInfo(transactionInfo => {
            return {
                ...transactionInfo,
                accountFrom: accounts[0].name,
                accountTo: accounts[0].name
            }
        })
    }, [accounts])

    const handleSubmit = async event => {
        event.preventDefault();
        if (props.editMode) {
            if (transactionInfo !== props.transactionInput) {
                if (props.single) {
                    props.updateSingleRecurringTransaction(
                        transactionInfo, 
                        props.callback
                    );
                } else {
                    props.updateRecurringTransactionFromList(
                        transactionInfo, 
                        props.callback
                    );
                }
            } else {
                props.callback();
            }
        } else {
            // console.log(transactionInfo)
            props.addRecurringTransaction(transactionInfo, props.callback);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;

        if (name === "lastDate") {
            let dateHold = new Date(helper.getJsDateStringFromIsoDateString(value));
            dateHold.setDate(dateHold.getDate() + +transactionInfo.recurringInterval);
            setTransactionInfo({
                ...transactionInfo,
                nextDate: helper.getStringFromDate(dateHold),
                [name]: value
            })
        } else if (name === "recurringInterval") {
            let dateHold = new Date(
                helper.getJsDateStringFromIsoDateString(transactionInfo.lastDate)
            );
            dateHold.setDate(dateHold.getDate() + +value);
            setTransactionInfo({
                ...transactionInfo,
                nextDate: helper.getStringFromDate(dateHold),
                [name]: value
            })
        } else {
            setTransactionInfo({ ...transactionInfo, [name]: value });
        }
    };

    return (
        <div className='middle'>
            {!props.editMode ?
                <h3 className='centered'>
                    Fill out the form below to add a Recurring Transaction
                </h3>
                :
                <h3 className='centered'>
                    Fill out the form below to update your Recurring Transaction
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
                    min="0.01"
                    value={cost}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Interval of Recurrence (days)'
                    type='number'
                    name='recurringInterval'
                    min="1"
                    value={recurringInterval}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label='Last Date of Transaction'
                    type='date'
                    name='lastDate'
                    value={lastDate}
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
    addRecurringTransaction: (transaction, callback) => {
        dispatch(addRecurringTransaction(transaction, callback))
    },
    updateRecurringTransactionFromList: (transaction, callback) => {
        dispatch(updateRecurringTransactionFromList(transaction, callback))
    },
    updateSingleRecurringTransaction: (transaction, callback) => {
        dispatch(updateSingleRecurringTransaction(transaction, callback))
    }
});


export default connect(null, mapDispatchToProps)(RecurringTransactionForm);