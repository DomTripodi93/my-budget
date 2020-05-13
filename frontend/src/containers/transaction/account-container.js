import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllAccounts, fetchAccountsByType, fetchSingleAccount, fetchSingleAccountFromCache } from '../../reducers/account/account.actions';
import AccountList from '../../components/account/account-list';
import AccountNew from '../../components/account/account-new';



const AccountContainer = (props) => {
    const page = props.match.params.page;
    const called = props.accountCalled;
    const fetchAll = props.fetchAllAccounts;
    const fetchByType = props.fetchAccountsByType;
    const fetchSingle = props.fetchSingleAccount;
    const fetchSingleFromCache = props.fetchSingleAccountFromCache;
    const selectedAccount = props.selectedAccount;
    const [single, setSingle] = useState(false);
    const accountTypes = [
        "Income",
        "Expense",
        "Asset",
        "Liability"
    ]

    useEffect(() => {
        if (!called[page]) {
            if (page === "All") {
                fetchAll();
            } else if (!accountTypes.contains(page)) {
                if (called["All"]) {
                    fetchSingleFromCache(+page)
                } else {
                    fetchSingle(page);
                }
            } else {
                fetchByType(page);
            }
        } else if (!accountTypes.contains(page) && selectedAccount.name !== +page) {
            if (called["All"]) {
                fetchSingleFromCache(+page)
            } else {
                fetchSingle(page);
            }
        }
    }, [
        fetchAll, 
        fetchByType, 
        fetchSingle, 
        page, 
        called, 
        selectedAccount, 
        fetchSingleFromCache, 
        accountTypes
    ])

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (called[page]) {
            if (page === "All") {
                setAccounts([...props.allAccounts]);
                setSingle(false);
            } else if (!accountTypes.contains(page)) {
                setAccounts([props.selectedAccount]);
                setSingle(true);
            } else {
                setAccounts(props.accountsByType[page]);
                setSingle(false);
            }
        }
    }, [page, props, called, accountTypes])

    const [addMode, setAddMode] = useState(false);

    const showAddForm = () => {
        setAddMode(!addMode)
    }

    return (
        <div>
            <h3 className='centered'>Accounts</h3>
            <AccountNew
                addMode={addMode}
                action={showAddForm}
            />
            {accounts.length > 0 ?
                <AccountList
                    accounts={accounts}
                    single={single}
                    page={page}
                />
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
        fetchSingleAccount: (id) => dispatch(fetchSingleAccount(id)),
        fetchSingleAccountFromCache: (id) => dispatch(fetchSingleAccountFromCache(id))
    }
}

const mapStateToProps = state => ({
    accountsByType: state.account.accounts,
    allAccounts: state.account.allAccounts,
    selectedAccount: state.account.selectedAccount,
    accountCalled: state.account.called
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)