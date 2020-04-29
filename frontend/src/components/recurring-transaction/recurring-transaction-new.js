import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';


const RecurringTransactionNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div className='border'>
                    form
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