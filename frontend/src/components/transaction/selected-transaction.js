import React from 'react';
import helpers from '../../shared/helpers';



const SelectedTransaction = (props) => {
    const transaction = props.transaction;
    const helper = new helpers();
    const time = helper.timeForDisplay(helper.timeFromIsoDateTime(transaction.date));
    return (
        <div className="centered border">
            <h5>
                Transaction ID: {transaction.id}
            </h5>
            <h5>
                Account From: {transaction.accountFrom}
            </h5>
            <h5>
                Account To: {transaction.accountTo}
            </h5>
            <h5>
                Time of Transaction: {time}, {transaction.date.substring(0,10)}
            </h5>
            <h5>
                Cost: {transaction.cost}
            </h5>
        </div>
    )
}

export default SelectedTransaction;