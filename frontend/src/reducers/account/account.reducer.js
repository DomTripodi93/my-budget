import AccountActionTypes from './account.types';

const INITIAL_STATE = {
    allAccounts: [],
    accounts: {},
    selectedAccount: {},
    called: { single: "" }
}

const accountReducer = (state = INITIAL_STATE, action) => {
    var sortAccounts = (accounts) => {
        return accounts.sort((first, second) => {
            if (first.name > second.name) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    let allAccountsHold = [...state.allAccounts];
    let accountsHold = { ...state.accounts };
    let calledHold = { ...state.called };
    let selectedHold = { ...state.selectedAccount }
    switch (action.type) {
        case AccountActionTypes.SET_SELECTED_ACCOUNT:
            calledHold["single"] = action.payload.name;
            return {
                ...state,
                selectedAccount: action.payload,
                called: calledHold
            };
        case AccountActionTypes.SET_SELECTED_TO_BANK_ACCOUNT:
            calledHold["single"] = "Bank";
            return {
                ...state,
                selectedAccount: action.payload,
                called: calledHold
            };
        case AccountActionTypes.SET_ACCOUNTS:
            calledHold[action.accountType] = true;
            if (action.payload.data.length > 0) {
                accountsHold[action.accountType] = action.payload.data;
            } else {
                accountsHold[action.accountType] = [];
            }
            return {
                ...state,
                accounts: accountsHold,
                called: calledHold
            };
        case AccountActionTypes.SET_ALL_ACCOUNTS:
            calledHold["All"] = true;
            return {
                ...state,
                allAccounts: action.payload.data,
                called: calledHold
            };
        case AccountActionTypes.ADD_ACCOUNT:
            if (calledHold[action.accountType]) {
                accountsHold[action.accountType] = sortAccounts([
                    action.payload,
                    ...accountsHold[action.accountType]
                ]);
            }
            if (calledHold["All"]) {
                allAccountsHold = sortAccounts([
                    action.payload,
                    ...allAccountsHold
                ])
            }
            return {
                ...state,
                accounts: accountsHold,
                allAccounts: allAccountsHold
            };
        case AccountActionTypes.UPDATE_ACCOUNTS:
            if (calledHold[action.accountType]) {
                accountsHold[action.accountType] = sortAccounts([
                    action.payload,
                    ...accountsHold[action.accountType]
                        .filter((value) => {
                            return value.name !== action.payload.name;
                        })
                ]);
            }
            if (selectedHold.name === action.payload.name){
                selectedHold = { ...action.payload };
            }
            if (calledHold["All"]) {
                allAccountsHold = sortAccounts([
                    action.payload,
                    ...allAccountsHold
                        .filter((value) => {
                            return value.name !== action.payload.name;
                        })
                ])
            }
            return {
                ...state,
                accounts: accountsHold,
                allAccounts: allAccountsHold,
                selectedAccount: selectedHold
            };
        case AccountActionTypes.UPDATE_BANK_ACCOUNT:
            if (calledHold["Asset"]) {
                let lastBank = accountsHold["Asset"].filter(account => {
                    return account.isBank === true;
                })[0];
                lastBank.isBank = false;
                accountsHold["Asset"] = sortAccounts([
                    action.payload,
                    lastBank,
                    ...accountsHold["Asset"]
                        .filter((value) => {
                            return value.name !== action.payload.name && value.isBank !== true;
                        })
                ]);
            }
            if (calledHold["All"]) {
                let lastBank = allAccountsHold.filter(account => {
                    return account.isBank === true;
                })[0];
                lastBank.isBank = false;
                action.payload.isBank = true;
                allAccountsHold = sortAccounts([
                    action.payload,
                    ...allAccountsHold
                        .filter((value) => {
                            return value.name !== action.payload.name && !value.isBank;
                        })
                ])
            }
            return {
                ...state,
                accounts: accountsHold,
                allAccounts: allAccountsHold
            };            
        case AccountActionTypes.DELETE_ACCOUNT:
            if (calledHold[action.accountType]) {
                accountsHold[action.accountType] = [
                    ...accountsHold[action.accountType]
                        .filter((value) => {
                            return value.name !== action.payload;
                        })
                ]
            }
            if (calledHold["All"]) {
                allAccountsHold = [
                    ...allAccountsHold
                        .filter((value) => {
                            return value.name !== action.payload;
                        })
                ]
            }
            return {
                ...state,
                accounts: accountsHold,
                allAccounts: allAccountsHold
            };
        case AccountActionTypes.SIGNOUT_USER:
            return {
                allAccounts: [],
                accounts: {},
                selectedAccount: {},
                called: {}
            };
        default:
            return state;
    }
}

export default accountReducer;