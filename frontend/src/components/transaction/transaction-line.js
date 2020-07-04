import React from 'react';
import { Link } from 'react-router-dom';


const TransactionLine = (props) => {
    const transaction = props.transaction;
    return (
        <div className="centered transaction-grid-inner">
            <Link
                to={"/transaction/" + transaction.id}
            >
                <h5 className="grid-text">
                    {transaction.id}
                </h5>
            </Link>
            <h5 className="grid-text">
                {transaction.accountFrom}
            </h5>
            <h5 className="grid-text">
                {transaction.accountTo}
            </h5>
            <h5 className="grid-text">
                {transaction.date.substring(0, 10)}
            </h5>
            <h5 className="grid-text">
                ${transaction.cost.toFixed(2)}
            </h5>
        </div>
    )
}

export default TransactionLine;