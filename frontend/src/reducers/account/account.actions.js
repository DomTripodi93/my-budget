import rootHttp from '../root-http';
import AccountActionTypes from './account.types';
import helpers from '../../shared/helpers';
import store from '../store';


const http = new rootHttp();
const helper = new helpers();

export function addAccount(account, callback) {
    account = prepAccountValues(account);
    return dispatch => {
        http.addItem("account", account)
            .then(addedAccount => {
                dispatch(addAccountToState(addedAccount.data, addedAccount.type));
                callback();
            });
    }
}
//Posts new account to API

export function fetchSingleAccount(id) {
    return dispatch => {
        http.fetchById("account", id)
            .then((account) => {
                dispatch(setSingleAccount(account.data));
            });
    }
}
//Gets specific account by name

export function fetchAccountsByType(type) {
    if (store.getState().account.called["All"]) {
        fetchAccountsFromStateByType(type)
    } else {
        fetchAccountsFromApiByType(type)
    }
}
//Decides whether to pull accounts from cache, or send request them from the API

function fetchAccountsFromStateByType(type) {
    return dispatch => {
        accountsForReturn = store.getState().account.allAccounts.filter(account => {
            return account.type === type;
        })
        dispatch(setAccounts(accountsForReturn.sort((first, second) => {
            if (first.name > second.name) {
                return 1;
            } else {
                return -1;
            }
        }), type))
    }
}
//Extracts accounts by type from cache

function fetchAccountsFromApiByType(type) {
    return dispatch => {
        http.fetchAll("account/byType/" + type)
            .then((accounts) => {
                dispatch(setAccounts(accounts, type));
            });
    }
}
//Gets all accounts for a specific type

export function fetchAllAccounts() {
    return dispatch => {
        http.fetchAll("account/byUser")
            .then((accounts) => {
                dispatch(setAllAccounts(accounts));
            });
    }
}
//Gets all accounts for a user


export function updateAccountFromList(account, callback) {
    account = prepAccountValues(account);
    return dispatch => {
        http.updateItem("account", account, account.id)
            .then(() => {
                dispatch(updateAccountInState(account, account.type));
                callback();
            });
    }
}
//Updates account in database

export function updateSingleAccount(account, callback) {
    account = prepAccountValues(account);
    return dispatch => {
        http.updateItem("account", account, account.id)
            .then(() => {
                if (Object.keys(store.getState().account.accounts).length > 0) {
                    dispatch(updateAccountInState(account, account.type));
                }
                dispatch(setSingleAccount(account));
                callback();
            });
    }
}
//Updates objective in database

export function deleteAccount(id, type) {
    return dispatch => {
        http.deleteItem("account", id)
            .then(() => {
                dispatch(deleteAccountFromState(id, type));
            });
    }
}
//Deletes selected account

function addAccountToState(account, type) {
    return {
        type: AccountActionTypes.ADD_ACCOUNT,
        payload: account,
        type
    }
}
//Adds new account from post to state

function setAccounts(accounts, type) {
    return {
        type: AccountActionTypes.SET_ACCOUNTS,
        payload: accounts,
        type
    }
}
//Sets all accounts of a type in state

function setAllAccounts(accounts) {
    return {
        type: AccountActionTypes.SET_ALL_ACCOUNTS,
        payload: accounts
    }
}
//Sets all accounts in state

function setSingleAccount(account) {
    return {
        type: AccountActionTypes.SET_SINGLE_ACCOUNT,
        payload: account
    }
}
//Sets selected account in state

function updateAccountInState(account, type) {
    return {
        type: AccountActionTypes.UPDATE_ACCOUNTS,
        payload: account,
        type
    }
}
//Updates function for account

function deleteAccountFromState(id, type) {
    return {
        type: AccountActionTypes.DELETE_ACCOUNT,
        payload: id,
        type
    }
}
//Deletes selected account

function prepAccountValues(account) {
    account.name = helper.capitalizeAll(account.name);
    account.type = helper.capitalizeAll(account.type);

    return account;
}