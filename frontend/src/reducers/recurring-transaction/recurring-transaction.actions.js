import rootHttp from '../root-http';
import RecurringTransactionActionTypes from './recurring-transaction.types';
import store from '../store';


const http = new rootHttp();

export function addRecurringTransaction(recurringTransaction, callback) {
    return dispatch => {
        http.addItem("recurringTransaction", recurringTransaction)
            .then(addedRecurringTransaction => {
                dispatch(addRecurringTransactionToState(addedRecurringTransaction.data));
                callback();
            });
    }
}
//Posts new Recurring Transaction to API

export function fetchSingleRecurringTransaction(id) {
    return dispatch => {
        http.fetchById("recurringTransaction", id)
            .then((recurringTransaction) => {
                dispatch(setSelectedRecurringTransaction(recurringTransaction.data));
            });
    }
}
//Gets specific Recurring Transaction by name

export function fetchSingleRecurringTransactionFromCache(id) {
    return dispatch => {
        dispatch(setSelectedRecurringTransaction(
            store.getState().recurringTransaction.recurringTransactions
                .filter((value) => {
                    return value.id === id;
                })[0])
        );
    }
}
//Filters through all accounts to set the selected recurring transaction in the recurring
// transaction reducer

export function fetchRecurringTransactionsByUser() {
    return dispatch => {
        http.fetchAll("recurringTransaction/byUser")
            .then((recurringTransactions) => {
                dispatch(setRecurringTransactions(recurringTransactions));
            });
    }
}
//Gets all Recurring Transaction for a specific account

export function updateRecurringTransactionFromList(recurringTransaction, callback) {
    return dispatch => {
        http.updateItem("recurringTransaction", recurringTransaction, recurringTransaction.id)
            .then(() => {
                dispatch(updateRecurringTransactionInState(recurringTransaction));
                callback();
            });
    }
}
//Updates Recurring Transaction in database

export function updateSelectedRecurringTransaction(recurringTransaction, callback) {
    return dispatch => {
        http.updateItem("recurringTransaction", recurringTransaction, recurringTransaction.id)
            .then(() => {
                dispatch(updateRecurringTransactionInState(recurringTransaction));
                dispatch(setSelectedRecurringTransaction(recurringTransaction));
                callback();
            });
    }
}
//Updates Recurring Transaction in database

export function deleteRecurringTransaction(id) {
    return dispatch => {
        http.deleteItemById("recurringTransaction", id)
            .then(() => {
                dispatch(deleteRecurringTransactionFromState(id));
            });
    }
}
//Deletes selected Recurring Transaction

function addRecurringTransactionToState(recurringTransaction) {
    return {
        type: RecurringTransactionActionTypes.ADD_RECURRING_TRANSACTION,
        payload: recurringTransaction
    }
}
//Adds new Recurring Transaction from post to state

function setRecurringTransactions(recurringTransactions) {
    return {
        type: RecurringTransactionActionTypes.SET_RECURRING_TRANSACTIONS,
        payload: recurringTransactions
    }
}
//Sets all Recurring Transactions of a account in state

function setSelectedRecurringTransaction(recurringTransaction) {
    return {
        type: RecurringTransactionActionTypes.SET_SELECTED_RECURRING_TRANSACTION,
        payload: recurringTransaction
    }
}
//Sets selected Recurring Transaction in state

function updateRecurringTransactionInState(recurringTransaction) {
    return {
        type: RecurringTransactionActionTypes.UPDATE_RECURRING_TRANSACTIONS,
        payload: recurringTransaction
    }
}
//Updates Recurring Transaction

function deleteRecurringTransactionFromState(id) {
    return {
        type: RecurringTransactionActionTypes.DELETE_RECURRING_TRANSACTION,
        payload: id
    }
}
//Deletes selected Recurring Transaction