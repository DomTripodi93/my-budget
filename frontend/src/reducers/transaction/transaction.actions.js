import rootHttp from '../root-http';
import TransactionActionTypes from './transaction.types';
import store from '../store';
import { updateBalance } from '../account/account.actions';


const http = new rootHttp();

export function addTransaction(transaction, callback) {
    return dispatch => {
        http.addItem("transaction", transaction)
            .then(addedTransaction => {
                dispatch(addTransactionToState(addedTransaction.data));
                dispatch(updateAccountsForTransaction(transaction));
                callback();
            });
    }
}
//Posts new transaction to API

function updateAccountsForTransaction(transaction) {
    let accountFrom = store.getState().account.allAccounts.filter(account => {
        return account.name === transaction.accountFrom;
    })[0]
    accountFrom.balance -= transaction.cost;
    let accountTo = store.getState().account.allAccounts.filter(account => {
        return account.name === transaction.accountTo;
    })[0]
    accountTo.balance += +transaction.cost;
    return dispatch => {
        dispatch(updateBalance(accountFrom));
        dispatch(updateBalance(accountTo));
    }
}
//Updates accounts for journaled transaction

export function uploadBulkTransactions(transactions) {
    return dispatch => {
        http.addItem("transaction/bulk", transactions)
            .then(() => {
                dispatch(fetchTransactionsNotReconciled());
            })
    }
}
//Sends CSV file of un-reconciled transactions to backend for upload,
// then fetches updated list of un-reconciled transactions

export function fetchSingleTransaction(id) {
    return dispatch => {
        http.fetchById("transaction", id)
            .then((transaction) => {
                dispatch(setSelectedTransaction(transaction.data));
            });
    }
}
//Gets specific transaction by name

export function fetchTransactionsByAccount(account) {
    return dispatch => {
        http.fetchAll("transaction/byAccount/" + account)
            .then((transactions) => {
                dispatch(setTransactions(transactions, account));
            });
    }
}
//Gets all transactions for a specific account

export function fetchTransactionsNotReconciled() {
    return dispatch => {
        http.fetchAll("transaction/notReconciled/")
            .then((transactions) => {
                dispatch(setTransactionsNotReconciled(transactions));
            });
    }
}
//Gets all transactions for a specific account

export function reconcileTransactionFromList(transaction, callback) {
    return dispatch => {
        http.updateItem("transaction", transaction, transaction.id)
            .then(() => {
                dispatch(reconcileTransactionInState(transaction.id));
                dispatch(updateTransactionInState(transaction));
                callback();
            });
    }
}
//Updates transaction in database

export function reconcileSingleTransaction(transaction, callback) {
    return dispatch => {
        http.updateItem("transaction", transaction, transaction.id)
            .then(() => {
                if (Object.keys(store.getState().transaction.accounts).length > 0) {
                    dispatch(updateTransactionInState(transaction));
                }
                dispatch(reconcileTransactionInState(transaction.id));
                dispatch(setSelectedTransaction(transaction));
                callback();
            });
    }
}
//Updates transaction in database

function reconcileAccountsForTransaction(transaction) {
    let accountFrom = store.getState().account.allAccounts.filter(account => {
        return account.name === transaction.accountFrom;
    })[0]
    accountFrom.balance -= transaction.cost;
    let accountTo = store.getState().account.allAccounts.filter(account => {
        return account.name === transaction.accountTo;
    })[0]
    accountTo.balance += transaction.cost;
    return dispatch => {
        if (!accountFrom.isBank) {
            dispatch(updateBalance(accountFrom));
        }
        if (!accountTo.isBank) {
            dispatch(updateBalance(accountTo));
        }
    }
}
//Updates accounts for reconciled transaction

export function updateTransactionFromList(transaction, callback) {
    return dispatch => {
        http.updateItem("transaction", transaction, transaction.id)
            .then(() => {
                dispatch(updateTransactionInState(transaction));
                callback();
            });
    }
}
//Updates transaction in database

export function updateSelectedTransaction(transaction, callback) {
    return dispatch => {
        http.updateItem("transaction", transaction, transaction.id)
            .then(() => {
                if (Object.keys(store.getState().transaction.accounts).length > 0) {
                    dispatch(updateTransactionInState(transaction));
                }
                dispatch(setSelectedTransaction(transaction));
                callback();
            });
    }
}
//Updates transaction in database

export function deleteTransaction(transaction) {
    const { id, accountTo, accountFrom } = transaction;
    const transactionHold = {...transaction};
    transactionHold.accountTo = accountFrom;
    transactionHold.accountFrom = accountTo;
    return dispatch => {
        http.deleteItemById("transaction", id)
            .then(() => {
                dispatch(deleteTransactionFromState(id, accountTo));
                dispatch(deleteTransactionFromState(id, accountFrom));
                dispatch(updateAccountsForTransaction(transactionHold));
            });
    }
}
//Deletes selected transaction

function addTransactionToState(transaction) {
    return {
        type: TransactionActionTypes.ADD_TRANSACTION,
        payload: transaction
    }
}
//Adds new transaction from post to state

function setTransactions(transactions, account) {
    return {
        type: TransactionActionTypes.SET_TRANSACTIONS,
        payload: transactions,
        account
    }
}
//Sets all transactions of a account in state

function setTransactionsNotReconciled(transactions) {
    return {
        type: TransactionActionTypes.SET_TRANSACTIONS_NOT_RECONCILED,
        payload: transactions
    }
}
//Sets all transactions of a account in state

function setSelectedTransaction(transaction) {
    return {
        type: TransactionActionTypes.SET_SELECTED_TRANSACTION,
        payload: transaction
    }
}
//Sets selected transaction in state

function reconcileTransactionInState(id) {
    return {
        type: TransactionActionTypes.RECONCILE_TRANSACTION,
        id
    }
}
//Updates transaction

function updateTransactionInState(transaction) {
    return {
        type: TransactionActionTypes.UPDATE_TRANSACTIONS,
        payload: transaction
    }
}
//Updates transaction

function deleteTransactionFromState(id, account) {
    return {
        type: TransactionActionTypes.DELETE_TRANSACTION,
        payload: id,
        account
    }
}
//Deletes selected transaction