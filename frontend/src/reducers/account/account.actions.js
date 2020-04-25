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

// export function fetchAllAccounts(type) {
//     return dispatch => {
//         http.fetchAll("account/byType/" + type)
//             .then((accounts) => {
//                 dispatch(setAllAccounts(accounts, type));
//             });
//     }
// }
// //Gets all accounts for a user

export function fetchAccountsByType(type) {
    return dispatch => {
        http.fetchAll("account/byType/" + type)
            .then((accounts) => {
                dispatch(setAccounts(accounts, type));
            });
    }
}
//Gets all accounts for a specific type

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

export function addAccountToState(account, type) {
    return {
        type: AccountActionTypes.ADD_ACCOUNT,
        payload: account,
        type
    }
}
//Adds new account from post to state

export function setAccounts(accounts, type) {
    return {
        type: AccountActionTypes.SET_ACCOUNTS,
        payload: accounts,
        type
    }
}
//Sets all accounts in state

export function setSingleAccount(account) {
    return {
        type: AccountActionTypes.SET_SINGLE_ACCOUNT,
        payload: account
    }
}
//Sets selected account in state

export function updateAccountInState(account, type) {
    return {
        type: AccountActionTypes.UPDATE_ACCOUNTS,
        payload: account,
        type
    }
}
//Updates function for account

export function deleteAccountFromState(id, type) {
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