import React from 'react';



const SelectedTransaction = (props) => {
    const transaction = props.transaction;
    return (
        <div className="centered border grid50">
            <h5>
                Account From:
                <br />
                {transaction.accountFrom}
                <br />
                <br />
                Account To:
                <br />
                {transaction.accountTo}
            </h5>
            <h5>
                Date of Transaction:
                <br />
                {transaction.date.substring(0,10)}
                <br />
                <br />
                Cost:
                <br />
                ${transaction.cost.toFixed(2)}
            </h5>
        </div>
    )
}

export default SelectedTransaction;