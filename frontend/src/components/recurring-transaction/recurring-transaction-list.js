import React from 'react';
import { Link } from 'react-router-dom';
import RecurringTransactionLine from './recurring-transaction-line';


const RecurringTransactionList = (props) => {
    return (
        <div>
            {props.single ?
                <div>
                    {props.transactions[0].id}
                </div>
                :
                <div>
                    {props.transactions.map(transaction => (
                        <div key={transaction.id}>
                            <RecurringTransactionLine
                                recurringTransaction={transaction}
                            />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default RecurringTransactionList;