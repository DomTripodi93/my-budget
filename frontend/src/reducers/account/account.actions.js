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
                dispatch(addAccountToState(addedAccount.data, addedAccount.data.accountType));
                callback();
            });
    }
}
//Posts new account to API

export function addFirstAccount(account, callback) {
    account = prepAccountValues(account);
    return dispatch => {
        http.addItem("account/first", account)
            .then(addedAccount => {
                dispatch(addAccountToState(addedAccount.data, addedAccount.data.accountType));
                callback();
            });
    }
}
//Posts new account to API

export function fetchSingleAccount(name) {
    return dispatch => {
        http.fetchByValue("account", name)
            .then((account) => {
                dispatch(setSelectedAccount(account.data));
            });
    }
}
//Gets specific account by name

export function fetchSingleAccountFromCache(name) {
    return dispatch => {
        dispatch(setSelectedAccount(
            store.getState().account.allAccounts
                .filter((value) => {
                    return value.name === name;
                })[0]
        ));
    }
}
//Filters through all accounts to set the selected account in the account reducer

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
        dispatch(setAccounts({
            data: accountsForReturn.sort((first, second) => {
                if (first.name > second.name) {
                    return 1;
                } else {
                    return -1;
                }
            })
        }, accountType))
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

export function updateAccountFromList(account) {
    account = prepAccountValues(account);
    return dispatch => {
        http.updateItem("account", account, account.name)
            .then(() => {
                dispatch(updateAccountInState(account, account.accountType));
            });
    }
}
//Updates account in database

export function updateSelectedAccount(account) {
    account = prepAccountValues(account);
    return dispatch => {
        http.updateItem("account", account, account.name)
            .then(() => {
                if (Object.keys(store.getState().account.accounts).includes(account.accountType)) {
                    dispatch(updateAccountInState(account, account.accountType));
                }
                dispatch(setSelectedAccount(account));
            });
    }
}
//Updates account in database

export function updateBank(newBank, callback) {
    return dispatch => {
        http.updateItem("account/isBank", null, newBank.name)
            .then(() => {
                dispatch(updateBankAccountInState(newBank));
                callback();
            });
    }
}
//Updates account in database to be the bank account

export function deleteAccount(name, accountType) {
    return dispatch => {
        http.deleteItem("account", name)
            .then(() => {
                dispatch(deleteAccountFromState(name, accountType));
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

function setSelectedAccount(account) {
    return {
        type: AccountActionTypes.SET_SELECTED_ACCOUNT,
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

function updateBankAccountInState(account) {
    return {
        type: AccountActionTypes.UPDATE_BANK_ACCOUNT,
        payload: account
    }
}
//Updates function for account

function deleteAccountFromState(name, accountType) {
    return {
        type: AccountActionTypes.DELETE_ACCOUNT,
        payload: name,
        accountType
    }
}
//Deletes selected account

function prepAccountValues(account) {
    account.name = helper.capitalizeAll(account.name);

    return account;
}