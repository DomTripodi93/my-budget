import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllAccounts, fetchAccountsByType, fetchSingleAccount } from '../../reducers/account/account.actions';

const AccountContainer = (props) => {
    const page = props.match.params.page;
    const fetchAll = props.fetchAllAccounts;
    const fetchByType = props.fetchAccountsByType;
    const fetchSingle = props.fetchSingleAccount;

    useEffect(() => {
        if (page){
            console.log(page)
            if (page === "All") {
                fetchAll();
            } else if (/^\d+$/.test(page)){
                fetchSingle(page);
            } else {
                fetchByType(page)
            }
        }
    }, [fetchAll, fetchByType, fetchSingle, page])

    return (
        <div>
            {page}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllAccounts: () => dispatch(fetchAllAccounts()),
        fetchAccountsByType: (accountType) => dispatch(fetchAccountsByType(accountType)),
        fetchSingleAccount: (id) => dispatch(fetchSingleAccount(id))
    }
}

const mapStateToProps = state => ({
    accountsByType: state.account.accounts,
    allAccounts: state.account.allAccounts,
    selectedAccount: state.account.selectedAccount,
    accountCalled: state.account.called
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)