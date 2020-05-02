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
                console.log(addedAccount)
                dispatch(addAccountToState(addedAccount.data, addedAccount.data.accountType));
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

export function fetchAccountsByType(accountType) {
    return dispatch => {
        if (store.getState().account.called["All"]) {
            dispatch(fetchAccountsFromCacheByType(accountType));
        } else {
            dispatch(fetchAccountsFromApiByType(accountType));
        }
    }
}
//Decides whether to pull accounts from cache, or send request them from the API

function fetchAccountsFromCacheByType(accountType) {
    return dispatch => {
        let accountsForReturn = store.getState().account.allAccounts.filter(account => {
            return account.accountType === accountType;
        })
        dispatch(setAccounts({data: accountsForReturn.sort((first, second) => {
            if (first.name > second.name) {
                return 1;
            } else {
                return -1;
            }
        })}, accountType))
    }
}
//Extracts accounts by accountType from cache

function fetchAccountsFromApiByType(accountType) {
    return dispatch => {
        http.fetchAll("account/byType/" + accountType)
            .then((accounts) => {
                dispatch(setAccounts(accounts, accountType));
            });
    }
}
//Gets all accounts for a specific accountType

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
                dispatch(updateAccountInState(account, account.accountType));
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
                    dispatch(updateAccountInState(account, account.accountType));
                }
                dispatch(setSingleAccount(account));
                callback();
            });
    }
}
//Updates objective in database

export function deleteAccount(id, accountType) {
    return dispatch => {
        http.deleteItem("account", id)
            .then(() => {
                dispatch(deleteAccountFromState(id, accountType));
            });
    }
}
//Deletes selected account

function addAccountToState(account, accountType) {
    return {
        type: AccountActionTypes.ADD_ACCOUNT,
        payload: account,
        accountType
    }
}
//Adds new account from post to state

function setAccounts(accounts, accountType) {
    return {
        type: AccountActionTypes.SET_ACCOUNTS,
        payload: accounts,
        accountType
    }
}
//Sets all accounts of a accountType in state

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

function updateAccountInState(account, accountType) {
    return {
        type: AccountActionTypes.UPDATE_ACCOUNTS,
        payload: account,
        accountType
    }
}
//Updates function for account

function deleteAccountFromState(id, accountType) {
    return {
        type: AccountActionTypes.DELETE_ACCOUNT,
        payload: id,
        accountType
    }
}
//Deletes selected account

function prepAccountValues(account) {
    account.name = helper.capitalizeAll(account.name);

    return account;
}