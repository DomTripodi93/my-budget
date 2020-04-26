import rootHttp from '../root-http';
import TransactionActionTypes from './transaction.types';
import store from '../store';


const http = new rootHttp();

export function addTransaction(transaction, callback) {
    return dispatch => {
        http.addItem("transaction", transaction)
            .then(addedTransaction => {
                dispatch(addTransactionToState(addedTransaction.data, addedTransaction.type));
                callback();
            });
    }
}
//Posts new transaction to API

export function fetchSingleTransaction(id) {
    return dispatch => {
        http.fetchById("transaction", id)
            .then((transaction) => {
                dispatch(setSingleTransaction(transaction.data));
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
                dispatch(updateTransactionInState(transaction, transaction.type));
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
                    dispatch(updateTransactionInState(transaction, transaction.type));
                }
                dispatch(reconcileTransactionInState(transaction.id));
                dispatch(setSingleTransaction(transaction));
                callback();
            });
    }
}
//Updates objective in database

export function updateTransactionFromList(transaction, callback) {
    return dispatch => {
        http.updateItem("transaction", transaction, transaction.id)
            .then(() => {
                dispatch(updateTransactionInState(transaction, transaction.type));
                callback();
            });
    }
}
//Updates transaction in database

export function updateSingleTransaction(transaction, callback) {
    return dispatch => {
        http.updateItem("transaction", transaction, transaction.id)
            .then(() => {
                if (Object.keys(store.getState().transaction.accounts).length > 0) {
                    dispatch(updateTransactionInState(transaction, transaction.type));
                }
                dispatch(setSingleTransaction(transaction));
                callback();
            });
    }
}
//Updates objective in database

export function deleteTransaction(id, account) {
    return dispatch => {
        http.deleteItem("transaction", id)
            .then(() => {
                dispatch(deleteTransactionFromState(id, account));
            });
    }
}
//Deletes selected transaction

function addTransactionToState(transaction, account) {
    return {
        type: TransactionActionTypes.ADD_TRANSACTION,
        payload: transaction,
        account
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

function setSingleTransaction(transaction) {
    return {
        type: TransactionActionTypes.SET_SINGLE_TRANSACTION,
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
//Updates function for transaction

function updateTransactionInState(transaction, account) {
    return {
        type: TransactionActionTypes.UPDATE_TRANSACTIONS,
        payload: transaction,
        account
    }
}
//Updates function for transaction

function deleteTransactionFromState(id, account) {
    return {
        type: TransactionActionTypes.DELETE_TRANSACTION,
        payload: id,
        account
    }
}
//Deletes selected transaction