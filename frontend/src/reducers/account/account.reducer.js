import AccountActionTypes from './account.types';

const INITIAL_STATE = {
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
    switch (action.type) {
        case AccountActionTypes.SET_SINGLE_ACCOUNT:
            return {
                ...state,
                selectedAccount: action.payload
            };
        case AccountActionTypes.SET_ACCOUNTS:
            let calledHold = { ...state.called };
            calledHold[action.type] = true;
            if (action.payload.data.length > 0) {
                accountsHold[action.type] = action.payload.data;
            } else {
                accountsHold[action.type] = [];
            }
            return {
                ...state,
                accounts: accountsHold,
                called: calledHold
            };
        case AccountActionTypes.ADD_ACCOUNT:
            accountsHold[action.type] = sortAccounts([
                action.payload,
                ...accountsHold[action.type]
            ]);
            return {
                ...state,
                accounts: accountsHold
            };
        case AccountActionTypes.UPDATE_ACCOUNTS:
            accountsHold[action.type] = sortAccounts([
                action.payload,
                ...accountsHold[action.type]
                    .filter((value) => {
                        return value.id !== action.payload.id;
                    })
            ]);
            return {
                ...state,
                accounts: accountsHold
            };
        case AccountActionTypes.DELETE_ACCOUNT:
            accountsHold[action.type] = [
                ...accountsHold[action.type]
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