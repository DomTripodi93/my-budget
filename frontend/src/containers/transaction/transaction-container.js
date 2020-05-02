import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TransactionList from '../../components/transaction/transaction-list';
import { fetchTransactionsByAccount, fetchSingleTransaction, fetchTransactionsNotReconciled } from '../../reducers/transaction/transaction.actions';
import TransactionNew from '../../components/transaction/transaction-new';



const TransactionContainer = (props) => {
    const page = props.match.params.page;
    const fetchNotReconciled = props.fetchTransactionsNotReconciled;
    const fetchByAccount = props.fetchTransactionsByAccount;
    const fetchSingle = props.fetchSingleTransaction;
    const [single, setSingle] = useState(false);

    useEffect(() => {
        if (page === "notReconciled") {
            fetchNotReconciled();
            setSingle(false);
        } else if (/^\d+$/.test(page)) {
            fetchSingle(page);
            setSingle(true);
        } else {
            fetchByAccount(page);
            setSingle(false);
        }
    }, [fetchNotReconciled, fetchByAccount, fetchSingle, page])

    const [transactions, setTransactions] = useState([]);

    const [addSingleMode, setAddSingleMode] = useState(false);

    const showAddSingleForm = () => {
        setAddSingleMode(!addSingleMode)
    }

    const [addBatchMode, setAddBatchMode] = useState(false);

    const showAddBatchForm = () => {
        setAddBatchMode(!addBatchMode)
    }

    useEffect(() => {
        if (props.transactionCalled[page]) {
            if (page === "notReconciled") {
                setTransactions([...props.transactionsNotReconciled])
            } else if (/^\d+$/.test(page)) {
                setTransactions([props.selectedTransaction])
            } else {
                setTransactions(props.transactions[page])
            }
        }
    }, [page, props])

    return (
        <div>
            <h3 className='centered'>Transactions</h3>
            <div className="grid100">
                <TransactionNew
                    singleAction={showAddSingleForm}
                    addSingleMode={addSingleMode}
                    batchAction={showAddBatchForm}
                    addBatchMode={addBatchMode}
                    accounts={props.allAccounts}
                />
            </div>
            {transactions.length > 0 ?
                <TransactionList
                    transactions={transactions}
                    single={single}
                />
                :
                null

            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTransactionsNotReconciled: () => dispatch(fetchTransactionsNotReconciled()),
        fetchTransactionsByAccount: (account) => dispatch(fetchTransactionsByAccount(account)),
        fetchSingleTransaction: (id) => dispatch(fetchSingleTransaction(id))
    }
}

const mapStateToProps = state => ({
    transactionsNotReconciled: state.transaction.transactionsNotReconciled,
    transactions: state.transaction.transactions,
    selectedTransaction: state.transaction.selectedTransaction,
    transactionCalled: state.transaction.called
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer)