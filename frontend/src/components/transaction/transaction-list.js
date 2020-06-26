import React from 'react';
import SelectedTransaction from './selected-transaction';
import TransactionLine from './transaction-line';
import "./transaction.scss"


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
                <div>
                    <div className="transaction-grid-outer">
                        <div className="transaction-grid-inner centered heading">
                            <h5 className="grid-header-text">
                                ID
                            </h5>
                            <h5 className="grid-header-text">
                                From
                            </h5>
                            <h5 className="grid-header-text">
                                To
                            </h5>
                            <h5 className="grid-header-text">
                                Time
                            </h5>
                            <h5 className="grid-header-text">
                                Cost
                            </h5>
                        </div>
                    </div>
                    <hr className="close" />
                    <div>
                        {props.transactions.map(transaction => (
                            <div className="transaction-grid-outer">
                                <div key={transaction.id}>
                                    <TransactionLine
                                        transaction={transaction}
                                    />
                                    <hr />
                                </div>
                                <div className="centered transaction-grid-right">
                                    <h5 className="grid-text">
                                        buttons
                                    </h5>
                                </div>
                                <hr className="close" />
                            </div>
                        ))}
                    </div>

                </div>
            }
        </div>
    )
}

export default TransactionList;