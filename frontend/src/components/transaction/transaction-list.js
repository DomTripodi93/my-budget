import React from 'react';
import { Link } from 'react-router-dom';
import SelectedTransaction from './selected-transaction';


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