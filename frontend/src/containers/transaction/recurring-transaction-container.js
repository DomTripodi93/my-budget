import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TransactionList from '../../components/transaction/transaction-list';
import { fetchRecurringTransactionsByUser, fetchSingleRecurringTransaction } from '../../reducers/recurring-transaction/recurring-transaction.actions';
import RecurringTransactionNew from '../../components/recurring-transaction/recurring-transaction-new';
import { fetchAllAccounts } from '../../reducers/account/account.actions';



const RecurringTransactionContainer = (props) => {
    const page = props.match.params.page;
    const fetchAllRecurring = props.fetchRecurringTransactions;
    const fetchSingle = props.fetchSingleRecurringTransaction;
    const fetchAccounts = props.fetchAllAccounts;
    const [single, setSingle] = useState(false);

    useEffect(() => {
        if (page === "All") {
            fetchAllRecurring();
            setSingle(false);
        } else {
            fetchSingle(page);
            setSingle(true);
        }
        fetchAccounts();
    }, [fetchAllRecurring, fetchSingle, fetchAccounts, page])

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (props.transactionCalled) {
            if (page === "All") {
                setTransactions([...props.transactionsNotReconciled])
            } else {
                setTransactions([props.selectedTransaction])
            }
        }
    }, [page, props])

    const [addMode, setAddMode] = useState(false);

    const showAddForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Recurring Transactions</h3>
            {page}
            <div className="grid100">
                <RecurringTransactionNew
                    addMode={addMode}
                    action={showAddForm}
                    accounts={props.allAccounts}
                />
            </div>
            {transactions.length > 0 ?
                <TransactionList
                    transactions={transactions}
                    recurring={true}
                    single={single}
                    accounts={props.allAccounts}
                />
                :
                null

            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRecurringTransactions: () => dispatch(fetchRecurringTransactionsByUser()),
        fetchSingleRecurringTransaction: (id) => dispatch(fetchSingleRecurringTransaction(id)),
        fetchAllAccounts: () => dispatch(fetchAllAccounts())
    }
}

const mapStateToProps = state => ({
    allRecurringTransactions: state.recurringTransaction.recurringTransactions,
    transactions: state.transaction.transactions,
    selectedRecurringTransaction: state.recurringTransaction.selectedRecurringTransaction,
    recurringTransactionsCalled: state.recurringTransaction.called,
    allAccounts: state.account.allAccounts,
    accountCalled: state.account.called
});

export default connect(mapStateToProps, mapDispatchToProps)(RecurringTransactionContainer)