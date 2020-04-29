import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TransactionList from '../../components/transaction/transaction-list';
import { fetchTransactionsByAccount, fetchSingleTransaction, fetchTransactionsNotReconciled } from '../../reducers/transaction/transaction.actions';



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
            {page}
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