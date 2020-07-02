import React from 'react';
import helpers from '../../shared/helpers';



const SelectedTransaction = (props) => {
    const transaction = props.transaction;
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
                Date of Transaction: {transaction.date.substring(0,10)}
            </h5>
            <h5>
                Cost: {transaction.cost}
            </h5>
        </div>
    )
}

export default SelectedTransaction;