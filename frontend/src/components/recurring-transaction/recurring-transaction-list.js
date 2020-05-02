import React from 'react';
import { Link } from 'react-router-dom';


const RecurringTransactionList = (props) => {
    return (
        <div>
            {props.single ?
                <div>
                    {props.transactions.map(transaction => (
                        <div key={transaction.id}>
                            {transaction.id}
                        </div>
                    ))}
                </div>
                :
                <div>
                    {props.transactions.map(transaction => (
                        <div key={transaction.id}>
                            <Link to={"/recurringTransaction/" + transaction.id}>
                                {transaction.id}
                            </Link>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default RecurringTransactionList;