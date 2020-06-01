import React, {useState} from 'react';
import RecurringTransactionLine from './recurring-transaction-line';
import "./recurring-transaction.scss"
import SelectedRecurringTransaction from './selected-recurring-transaction';
import CustomButton from '../../shared/elements/button/custom-button.component';
import RecurringTransactionForm from './recurring-transaction-form';



const RecurringTransactionList = (props) => {
    const [detailsShown, setDetailsShown] = useState({})
    
    const detailsVisible = (id) => {
        let detailHold = {...detailsShown};
        detailHold[id] = !detailHold[id];
        setDetailsShown(detailHold);
    }

    const [editMode, setEditMode] = useState({})
    
    const editUpdate = (id) => {
        let editHold = {...editMode};
        editHold[id] = !editHold[id];
        setEditMode(editHold);
    }
    
    return (
        <div>
            {props.single && props.transactions.length > 0 ?
                <div>
                    <SelectedRecurringTransaction
                        transaction={props.transactions[0]}
                        callback={editUpdate}
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
                                                    {editMode[recurringTransaction.id] ?
                                                        <RecurringTransactionForm
                                                            editMode={true}
                                                            transactionInput={recurringTransaction}
                                                            callback={()=>{editUpdate(recurringTransaction.id)}}
                                                            accounts={props.accounts}
                                                        />
                                                        :
                                                        <SelectedRecurringTransaction
                                                            transaction={recurringTransaction}
                                                            callback={editUpdate}
                                                        />
                                                    }
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
                                                <CustomButton
                                                    action={()=> detailsVisible(recurringTransaction.id)}
                                                    label="&#x25B3;"
                                                    buttonStyle="mini"
                                                />
                                                :
                                                <CustomButton
                                                    action={()=> detailsVisible(recurringTransaction.id)}
                                                    label="&#x25BD;"
                                                    buttonStyle="mini"
                                                />
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