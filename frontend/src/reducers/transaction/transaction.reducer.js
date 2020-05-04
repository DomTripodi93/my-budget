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
    let notReconciledHold = [...state.transactionsNotReconciled]
    let transactionsHold = { ...state.transactions }
    let calledHold = { ...state.called };
    switch (action.type) {
        case TransactionActionTypes.SET_SINGLE_TRANSACTION:
            calledHold[action.payload.id] = true;
            return {
                ...state,
                selectedTransaction: action.payload,
                called: calledHold
            };
        case TransactionActionTypes.SET_TRANSACTIONS:
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
            calledHold["notReconciled"] = true;
            return {
                ...state,
                transactionsNotReconciled: action.payload.data,
                called: calledHold
            };
        case TransactionActionTypes.RECONCILE_TRANSACTION:
            notReconciledHold = notReconciledHold
                .filter((value) => {
                    return value.id !== action.id;
                });
            return {
                ...state,
                transactionsNotReconciled: notReconciledHold
            };
        case TransactionActionTypes.ADD_TRANSACTION:
            if (calledHold[action.payload.accountTo]) {
                transactionsHold[action.payload.accountTo] = sortTransactions([
                    action.payload,
                    ...transactionsHold[action.payload.accountTo]
                ]);
            }
            if (calledHold[action.payload.accountFrom]) {
                transactionsHold[action.payload.accountFrom] = sortTransactions([
                    action.payload,
                    ...transactionsHold[action.payload.accountTo]
                ]);
            }
            if (calledHold["notReconciled"]) {
                notReconciledHold = sortTransactions([
                    action.payload,
                    ...notReconciledHold
                ])
            }
            return {
                ...state,
                transactionsNotReconciled: notReconciledHold,
                transactions: transactionsHold,
            };
        case TransactionActionTypes.UPDATE_TRANSACTIONS:
            if (calledHold[action.payload.accountTo]) {
                transactionsHold[action.payload.accountTo] = sortTransactions([
                    action.payload,
                    ...transactionsHold[action.payload.accountTo]
                        .filter((value) => {
                            return value.id !== action.payload.id;
                        })
                ]);
            }
            if (calledHold[action.payload.accountFrom]) {
                transactionsHold[action.payload.accountFrom] = sortTransactions([
                    action.payload,
                    ...transactionsHold[action.payload.accountTo]
                        .filter((value) => {
                            return value.id !== action.payload.id;
                        })
                ]);
            }
            if (calledHold["notReconciled"]) {
                notReconciledHold = sortTransactions([
                    action.payload,
                    ...notReconciledHold
                        .filter((value) => {
                            return value.id !== action.payload.id;
                        })
                ])
            }
            return {
                ...state,
                transactions: transactionsHold
            };
        case TransactionActionTypes.DELETE_TRANSACTION:
            if (calledHold[action.accountTo]) {
                transactionsHold[action.accountTo] = [
                    ...transactionsHold[action.accountTo]
                        .filter((value) => {
                            return value.id !== action.payload;
                        })
                ]
            }
            if (calledHold[action.accountFrom]) {
                transactionsHold[action.accountFrom] = [
                    ...transactionsHold[action.accountTo]
                        .filter((value) => {
                            return value.id !== action.payload;
                        })
                ]
            }
            if (calledHold["notReconciled"]) {
                notReconciledHold = sortTransactions([
                    ...notReconciledHold
                        .filter((value) => {
                            return value.id !== action.payload;
                        })
                ])
            }
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