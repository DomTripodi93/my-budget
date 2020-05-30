import React from 'react';
import { Link } from 'react-router-dom';


const RecurringTransactionLine = (props) => {
    const recurringTransaction = props.recurringTransaction;
    return (
        <div className="centered recurringTransaction-grid-inner">
            <Link
                to={"/recurringTransaction/" + recurringTransaction.id}
            >
                <h5 className="grid-text">
                    {recurringTransaction.id}
                </h5>
            </Link>
            <h5 className="grid-text">
                {recurringTransaction.accountFrom}
            </h5>
            <h5 className="grid-text">
                {recurringTransaction.accountTo}
            </h5>
            <h5 className="grid-text">
                {recurringTransaction.cost}
            </h5>
            <h5 className="grid-text">
                {recurringTransaction.lastDate}
            </h5>
            <h5 className="grid-text">
                {recurringTransaction.nextDate}
            </h5>
            <h5 className="grid-text">
                {recurringTransaction.recurringInterval}
            </h5>
        </div>
    )
}

export default RecurringTransactionLine;