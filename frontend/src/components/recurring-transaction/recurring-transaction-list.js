import React, {useState} from 'react';
import RecurringTransactionLine from './recurring-transaction-line';
import "./recurring-transaction.scss"
import SelectedRecurringTransaction from './selected-recurring-transaction';


const RecurringTransactionList = (props) => {
    const [detailsShown, setDetailsShown] = useState({})
    const showDetails = (name) => {
        let detailHold = {...detailsShown};
        detailHold[name] = true;
        setDetailsShown(detailHold);
    }
    const hideDetails = (name) => {
        let detailHold = {...detailsShown};
        detailHold[name] = false;
        setDetailsShown(detailHold);
    }
    return (
        <div>
            {props.single && props.transactions.length > 0 ?
                <div>
                    <SelectedRecurringTransaction
                        transaction={props.transactions[0]}
                    />
                </div>
                :
                <div>
                    <div className="recurring-transaction-grid-outer">
                        <div className="recurring-transaction-grid-inner centered heading">
                            <h5 className="grid-header-text">
                                Id
                            </h5>
                            <h5 className="grid-header-text">
                                From
                            </h5>
                            <h5 className="grid-header-text">
                                To
                            </h5>
                            <h5 className="grid-header-text">
                                Cost
                            </h5>
                            <h5 className="grid-header-text">
                                Last
                            </h5>
                            <h5 className="grid-header-text">
                                Next
                            </h5>
                            <h5 className="grid-header-text">
                                Frequency
                            </h5>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div>
                            {props.transactions.map(recurringTransaction => (
                                <div key={recurringTransaction.id}>
                                    <div className="recurring-transaction-grid-outer">
                                        <div>
                                            {detailsShown[recurringTransaction.id] ?
                                                <div>
                                                    {recurringTransaction.id}
                                                </div>
                                                :
                                                <div>
                                                    <RecurringTransactionLine
                                                        recurringTransaction={recurringTransaction}
                                                    />
                                                </div>
                                            }
                                        </div>
                                        <div className="recurring-transaction-grid-right center">
                                            {detailsShown[recurringTransaction.id] ?
                                                null
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RecurringTransactionList;