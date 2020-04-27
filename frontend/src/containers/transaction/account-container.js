import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllAccounts, fetchAccountsByType, fetchSingleAccount } from '../../reducers/account/account.actions';

const AccountContainer = (props) => {
    const page = props.match.params.page;

    return (
        <div>
            {page}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllAccounts: () => dispatch(fetchAllAccounts()),
        fetchAccountsByType: () => dispatch(fetchAccountsByType()),
        fetchSingleAccount: () => dispatch(fetchSingleAccount())
    }
}

const mapStateToProps = state => ({
    accountsByType: state.account.accounts,
    allAccounts: state.account.allAccounts,
    selectedAccount: state.account.selectedAccount,
    accountCalled: state.account.called
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)