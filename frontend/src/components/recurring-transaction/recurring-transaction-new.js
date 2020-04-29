import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import RecurringTransactionForm from './recurring-transaction-form';


const RecurringTransactionNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div className='border'>
                    <RecurringTransactionForm 
                        callback={props.action}
                    />
                </div>
                :
                <div className='top'>
                    <CustomButton
                        buttonStyle="blue"
                        label="Add Recurring Transaction"
                        action={props.action}
                    />
                </div>
            }
        </div>
    )
}

export default RecurringTransactionNew;