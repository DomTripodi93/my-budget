import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllAccounts, fetchAccountsByType, fetchSingleAccount } from '../../reducers/account/account.actions';

const AccountContainer = (props) => {
    const page = props.match.params.page;
    const fetchAll = props.fetchAllAccounts;
    const fetchByType = props.fetchAccountsByType;
    const fetchSingle = props.fetchSingleAccount;

    useEffect(() => {
        if (page === "All") {
            fetchAll();
        } else if (/^\d+$/.test(page)) {
            fetchSingle(page);
        } else {
            fetchByType(page)
        }
    }, [fetchAll, fetchByType, fetchSingle, page])

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (page === "All") {
            if (props.allAccounts){
                setAccounts([...props.allAccounts])
            }
        } else if (/^\d+$/.test(page)) {
            if (props.selectedAccount){
                setAccounts([props.selectedAccount])
            }
        } else {
            if (props.accountsByType[page]){
                setAccounts([...props.accountsByType[page]])
            }
        }
    }, [page, setAccounts, props])

    return (
        <div>
            {page}
            {accounts ?
                <div>
                    {accounts.forEach(account => (
                        <div>
                            {account.name}
                        </div>
                    ))}
                </div>
                :
                null

            }
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