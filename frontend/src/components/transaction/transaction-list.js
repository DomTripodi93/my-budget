import React, { useState } from 'react';
import SelectedTransaction from './selected-transaction';
import TransactionLine from './transaction-line';
import "./transaction.scss"
import CustomButton from '../../shared/elements/button/custom-button.component';


const TransactionList = (props) => {
    const [detailsShown, setDetailsShown] = useState({})
    
    const detailsVisible = (id) => {
        let detailHold = {...detailsShown};
        detailHold[id] = !detailHold[id];
        setDetailsShown(detailHold);
    }

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
                                Date
                            </h5>
                            <h5 className="grid-header-text">
                                Cost
                            </h5>
                        </div>
                    </div>
                    <hr className="close" />
                    {props.transactions.map(transaction => (
                        <div key={transaction.id}>
                            <div className="transaction-grid-outer">
                                {detailsShown[transaction.id] ?
                                    <SelectedTransaction
                                        transaction={transaction}
                                        key={transaction.id}
                                    />
                                    :
                                    <div>
                                        {props.inAccount ?
                                            <div>
                                                {props.account === transaction.accountTo ?
                                                    <div className="green-back">
                                                        <TransactionLine
                                                            transaction={transaction}
                                                            inAccount={props.inAccount}
                                                            green={true}
                                                        />
                                                    </div>
                                                    :
                                                    <div className="red-back">
                                                        <TransactionLine
                                                            transaction={transaction}
                                                            inAccount={props.inAccount}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <TransactionLine
                                                transaction={transaction}
                                            />
                                        }
                                    </div>
                                }
                                <div className="centered transaction-grid-right">
                                    {detailsShown[transaction.id] ?
                                        <CustomButton
                                            action={()=> detailsVisible(transaction.id)}
                                            label="&#x25B3;"
                                            buttonStyle="mini"
                                        />
                                        :
                                        <CustomButton
                                            action={()=> detailsVisible(transaction.id)}
                                            label="&#x25BD;"
                                            buttonStyle="mini"
                                        />
                                    }
                                </div>
                            </div>
                            <hr className="close" />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default TransactionList;