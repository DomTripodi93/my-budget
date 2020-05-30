import React from 'react';



const SelectedRecurringTransaction = (props) => {
    return (
        <div className="border centered split">
            <div>
                <h5>
                    Id: {recurringTransaction.id}
                </h5>
                <h5>
                    {recurringTransaction.accountFrom}
                </h5>
                <h5>
                    {recurringTransaction.accountTo}
                </h5>
                <h5>
                    {recurringTransaction.cost}
                </h5>
                <h5>
                    {recurringTransaction.lastDate.substring(0,9)}
                </h5>
                <h5>
                    {recurringTransaction.nextDate.substring(0,9)}
                </h5>
                <h5>
                    {recurringTransaction.recurringInterval}
                </h5>
            </div>
            <div className="grid100">
                buttons
            </div>
        </div>
    )
}


export default SelectedRecurringTransaction;