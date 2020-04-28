import React from 'react';

const TransactionList = (props) => {
    const transactions = props.transactions

    return (
        <div>
            {transactions.map(transaction => (
                <div key={transaction.id}>
                    {transaction.date}
                </div>
            ))}
        </div>
    )
}

export default TransactionList;