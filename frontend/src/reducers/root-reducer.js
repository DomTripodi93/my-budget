import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import accountReducer from './account/account.reducer';
import transactionReducer from './transaction/transaction.reducer';
import recurringTransactionReducer from './recurring-transaction/recurring-transaction.reducer';


export default combineReducers({
    user: userReducer,
    account: accountReducer,
    transaction: transactionReducer,
    recurringTransaction: recurringTransactionReducer
})