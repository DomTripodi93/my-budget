import RecurringTransactionActionTypes from './recurring-transaction.types';

const INITIAL_STATE = {
    recurringTransactions: [],
    selectedRecurringTransaction: {},
    called: false
}

const recurringTransactionReducer = (state = INITIAL_STATE, action) => {
    var sortRecurringTransactions = (recurringTransactions) => {
        return recurringTransactions.sort((first, second) => {
            if (first.date < second.date) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    let recurringTransactionsHold = []
    if (state.recurringTransactions.length > 0) {
        recurringTransactionsHold = [...state.recurringTransactions]
    }
    switch (action.type) {
        case RecurringTransactionActionTypes.SET_SINGLE_RECURRING_TRANSACTION:
            return {
                ...state,
                selectedRecurringTransaction: action.payload
            };
        case RecurringTransactionActionTypes.SET_RECURRING_TRANSACTIONS:
            if (action.payload.data.length > 0) {
                recurringTransactionsHold = action.payload.data;
            } else {
                recurringTransactionsHold = [];
            }
            return {
                ...state,
                recurringTransactions: recurringTransactionsHold,
                called: true
            };
        case RecurringTransactionActionTypes.ADD_RECURRING_TRANSACTION:
            recurringTransactionsHold = sortRecurringTransactions([
                action.payload,
                ...recurringTransactionsHold
            ]);
            return {
                ...state,
                recurringTransactions: recurringTransactionsHold
            };
        case RecurringTransactionActionTypes.UPDATE_RECURRING_TRANSACTIONS:
            recurringTransactionsHold = sortRecurringTransactions([
                action.payload,
                ...recurringTransactionsHold
                    .filter((value) => {
                        return value.id !== action.payload.id;
                    })
            ]);
            return {
                ...state,
                recurringTransactions: recurringTransactionsHold
            };
        case RecurringTransactionActionTypes.DELETE_RECURRING_TRANSACTION:
            recurringTransactionsHold = [
                ...recurringTransactionsHold
                    .filter((value) => {
                        return value.id !== action.payload;
                    })
            ]
            return {
                ...state,
                recurringTransactions: recurringTransactionsHold
            };
        case RecurringTransactionActionTypes.SIGNOUT_USER:
            return {
                recurringTransactions: [],
                selectedRecurringTransaction: {},
                called: false
            };
        default:
            return state;
    }
}

export default recurringTransactionReducer;