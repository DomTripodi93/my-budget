import AccountActionTypes from './account.types';

const INITIAL_STATE = {
    allAccounts: [],
    accounts: {},
    selectedAccount: {},
    called: {}
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
    let accountsHold = { ...state.accounts }
    let calledHold = { ...state.called };
    switch (action.type) {
        case AccountActionTypes.SET_SINGLE_ACCOUNT:
            calledHold[action.payload.id] = true;
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
            accountsHold[action.accountType] = sortAccounts([
                action.payload,
                ...accountsHold[action.accountType]
            ]);
            return {
                ...state,
                accounts: accountsHold
            };
        case AccountActionTypes.UPDATE_ACCOUNTS:
            accountsHold[action.accountType] = sortAccounts([
                action.payload,
                ...accountsHold[action.accountType]
                    .filter((value) => {
                        return value.id !== action.payload.id;
                    })
            ]);
            return {
                ...state,
                accounts: accountsHold
            };
        case AccountActionTypes.DELETE_ACCOUNT:
            accountsHold[action.accountType] = [
                ...accountsHold[action.accountType]
                    .filter((value) => {
                        return value.id !== action.payload;
                    })
            ]
            return {
                ...state,
                accounts: accountsHold
            };
        case AccountActionTypes.SIGNOUT_USER:
            return {
                accounts: {},
                selectedAccount: {},
                called: {}
            };
        default:
            return state;
    }
}

export default accountReducer;