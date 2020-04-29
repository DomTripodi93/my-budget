import React from 'react';
import { Link } from 'react-router-dom';


const TransactionList = (props) => {
    return (
        <div>
            {props.single ?
                <div>
                    {props.transactions.map(transaction => (
                        <div key={transaction.id}>
                            {transaction.date}
                        </div>
                    ))}
                </div>
                :
                <div>
                    {props.transactions.map(transaction => (
                        <div key={transaction.id}>
                            <Link to={"/transaction/" + transaction.id}>
                                {transaction.date}
                            </Link>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default TransactionList;