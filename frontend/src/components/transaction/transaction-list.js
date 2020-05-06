import React from 'react';
import SelectedTransaction from './selected-transaction';
import TransactionLine from './transaction-line';


const TransactionList = (props) => {
    return (
        <div>
            {props.single ?
                <div>
                    {props.transactions.map(transaction => (
                        <SelectedTransaction
                            transaction={transaction}
                            key={transaction.id}
                        />
                    ))}
                </div>
                :
                <div className="transaction-grid-outer">
                    <div>
                        <div className="transaction-grid-inner centered">
                            <h5>
                                ID
                            </h5>
                            <h5>
                                From
                            </h5>
                            <h5>
                                To
                            </h5>
                            <h5>
                                Time
                            </h5>
                            <h5>
                                Cost
                            </h5>
                        </div>
                        <hr />
                        {props.transactions.map(transaction => (
                            <div key={transaction.id}>
                                <TransactionLine
                                    transaction={transaction}
                                />
                                <hr />
                            </div>
                        ))}
                    </div>

                </div>
            }
        </div>
    )
}

export default TransactionList;