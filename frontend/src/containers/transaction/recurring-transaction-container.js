import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecurringTransactionsByUser, fetchSingleRecurringTransaction, fetchSingleRecurringTransactionFromCache } from '../../reducers/recurring-transaction/recurring-transaction.actions';
import RecurringTransactionNew from '../../components/recurring-transaction/recurring-transaction-new';
import { fetchAllAccounts } from '../../reducers/account/account.actions';
import RecurringTransactionList from '../../components/recurring-transaction/recurring-transaction-list';



const RecurringTransactionContainer = (props) => {
    const page = props.match.params.page;
    const fetchAllRecurring = props.fetchRecurringTransactions;
    const fetchSingle = props.fetchSingleRecurringTransaction;
    const fetchSingleFromCache = props.fetchSingleRecurringTransactionFromCache;
    const fetchAccounts = props.fetchAllAccounts;
    const selected = props.selectedRecurringTransaction;
    const called = props.recurringTransactionsCalled;
    const [single, setSingle] = useState(false);

    useEffect(() => {
        if (!called) {
            if (page === "All") {
                fetchAllRecurring();
            } else {
                fetchSingle(page);
            }
            fetchAccounts();
        } else if (/^\d+$/.test(page) && selected.id !== +page) {
            fetchSingleFromCache(page);
        }
    }, [
        fetchAllRecurring,
        fetchSingle,
        fetchAccounts,
        fetchSingleFromCache,
        page,
        called,
        selected
    ])

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (called) {
            if (page === "All") {
                setTransactions([...props.allRecurringTransactions])
                setSingle(false);
            } else {
                setTransactions([selected])
                setSingle(true);
            }
        }
    }, [page, props, called, selected])

    const [addMode, setAddMode] = useState(false);

    const showAddForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Recurring Transactions</h3>
            <div className="grid100">
                <RecurringTransactionNew
                    addMode={addMode}
                    action={showAddForm}
                    accounts={props.allAccounts}
                />
            </div>
            {transactions.length > 0 ?
                <RecurringTransactionList
                    transactions={transactions}
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
        fetchSingleRecurringTransactionFromCache: (id) => dispatch(fetchSingleRecurringTransactionFromCache(id)),
        fetchAllAccounts: () => dispatch(fetchAllAccounts()),
    }
}

const mapStateToProps = state => ({
    allRecurringTransactions: state.recurringTransaction.recurringTransactions,
    selectedRecurringTransaction: state.recurringTransaction.selectedRecurringTransaction,
    recurringTransactionsCalled: state.recurringTransaction.called,
    allAccounts: state.account.allAccounts,
    accountCalled: state.account.called
});

export default connect(mapStateToProps, mapDispatchToProps)(RecurringTransactionContainer)