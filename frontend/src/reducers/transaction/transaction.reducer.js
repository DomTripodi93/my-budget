import TransactionActionTypes from './transaction.types';

const INITIAL_STATE = {
    transactionsNotReconciled: [],
    transactions: {},
    selectedTransaction: {},
    called: {}
}

const transactionReducer = (state = INITIAL_STATE, action) => {
    var sortTransactions = (transactions) => {
        return transactions.sort((first, second) => {
            if (first.date < second.date) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    let transactionsHold = { ...state.transactions }
    switch (action.type) {
        case TransactionActionTypes.SET_SINGLE_TRANSACTION:
            return {
                ...state,
                selectedTransaction: action.payload
            };
        case TransactionActionTypes.SET_TRANSACTIONS:
            let calledHold = { ...state.called };
            calledHold[action.account] = true;
            if (action.payload.data.length > 0) {
                transactionsHold[action.account] = action.payload.data;
            } else {
                transactionsHold[action.account] = [];
            }
            return {
                ...state,
                transactions: transactionsHold,
                called: calledHold
            };
        case TransactionActionTypes.SET_TRANSACTIONS_NOT_RECONCILED:
            let calledHold = { ...state.called };
            calledHold["notReconciled"] = true;
            return {
                ...state,
                transactionsNotReconciled: action.payload.data,
                called: calledHold
            };
        case TransactionActionTypes.RECONCILE_TRANSACTION:
            let reconciledHold = state.notReconciled
                .filter((value) => {
                    return value.id !== action.id;
                });
            return {
                ...state,
                transactionsNotReconciled: reconciledHold
            };
        case TransactionActionTypes.ADD_TRANSACTION:
            if (transactionsHold[action.account].length > 0) {
                transactionsHold[action.account] = sortTransactions([
                    action.payload,
                    ...transactionsHold[action.account]
                ]);
            }
            return {
                ...state,
                transactions: transactionsHold
            };
        case TransactionActionTypes.UPDATE_TRANSACTIONS:
            if (transactionsHold[action.account].length > 0) {
                transactionsHold[action.account] = sortTransactions([
                    action.payload,
                    ...transactionsHold[action.account]
                        .filter((value) => {
                            return value.id !== action.payload.id;
                        })
                ]);
            }
            return {
                ...state,
                transactions: transactionsHold
            };
        case TransactionActionTypes.DELETE_TRANSACTION:
            transactionsHold[action.account] = [
                ...transactionsHold[action.account]
                    .filter((value) => {
                        return value.id !== action.payload;
                    })
            ]
            return {
                ...state,
                transactions: transactionsHold
            };
        case TransactionActionTypes.SIGNOUT_USER:
            return {
                transactions: {},
                selectedTransaction: {},
                called: {}
            };
        default:
            return state;
    }
}

export default transactionReducer;