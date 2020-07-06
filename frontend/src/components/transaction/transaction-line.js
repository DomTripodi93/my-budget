import React from 'react';
import { Link } from 'react-router-dom';
import helpers from '../../shared/helpers';


const TransactionLine = (props) => {
    const transaction = props.transaction;
    const helper = new helpers();
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
                {helper.getJsDateStringFromIsoDateString(transaction.date.substring(0, 10))}
            </h5>
            {props.inAccount ?
                <div>
                    {props.green ?
                        <h5 className="grid-text">
                            ${transaction.cost.toFixed(2)}
                        </h5>
                        :
                        <h5 className="grid-text">
                            $-{transaction.cost.toFixed(2)}
                        </h5>
                    }
                </div>
                :
                <h5 className="grid-text">
                    ${transaction.cost.toFixed(2)}
                </h5>
            }
        </div>
    )
}

export default TransactionLine;