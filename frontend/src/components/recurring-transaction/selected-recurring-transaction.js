import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';



const SelectedRecurringTransaction = (props) => {
    const transaction = props.transaction;
    return (
        <div className="border centered split">
            <div>
                <h5>
                    Id: {transaction.id}
                </h5>
                <h5>
                    From: {transaction.accountFrom}
                </h5>
                <h5>
                    To: {transaction.accountTo}
                </h5>
                <h5>
                    Cost: {transaction.cost}
                </h5>
                {transaction.lastDate ?
                    <h5>
                        Last: {transaction.lastDate.substring(0,9)}
                    </h5>
                    :
                    <h5>
                        Last: loading...
                    </h5>
                }
                {transaction.nextDate ?
                    <h5>
                        Next: {transaction.nextDate.substring(0,9)}
                    </h5>
                    :
                    <h5>
                        Next: loading...
                    </h5>
                }
                <h5>
                    Frequency: {transaction.recurringInterval}
                </h5>
            </div>
            <div className="grid100">
                <CustomButton
                    label="Update"
                    buttonStyle="blue large"
                    action={() => { props.callback(transaction.id) }}
                />
                <CustomButton
                    label="Delete"
                    buttonStyle="red large"
                    action={() => { }}
                />
            </div>
        </div>
    )
}


export default SelectedRecurringTransaction;