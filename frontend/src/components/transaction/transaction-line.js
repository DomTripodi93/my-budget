import React from 'react';
import { Link } from 'react-router-dom';
import helpers from '../../shared/helpers';
import './transaction.scss'


const TransactionLine = (props) => {
    const transaction = props.transaction;
    const helper = new helpers();
    const time = helper.timeForDisplay(helper.timeFromIsoDateTime(transaction.date));
    return (
        <div className="centered transaction-grid-inner">
            <Link
                to={"/transaction/" + transaction.id}
            >
                <h5>
                    {transaction.id}
                </h5>
            </Link>
            <h5>
                {transaction.accountFrom}
            </h5>
            <h5>
                {transaction.accountTo}
            </h5>
            <h5>
                {time}, {transaction.date.substring(0, 10)}
            </h5>
            <h5>
                {transaction.cost}
            </h5>
        </div>
    )
}

export default TransactionLine;