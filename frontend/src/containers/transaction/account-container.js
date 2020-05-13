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
    const accountTypes = props.accountTypes;

    useEffect(() => {
        if (!called[page]) {
            if (page === "All") {
                fetchAll();
            } else if (!accountTypes.includes(page)) {
                if (called["All"]) {
                    fetchSingleFromCache(page)
                } else {
                    fetchSingle(page);
                }
            } else {
                fetchByType(page);
            }
        } else if (!accountTypes.includes(page) && selectedAccount.name !== page) {
            if (called["All"]) {
                fetchSingleFromCache(page)
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
            } else if (!accountTypes.includes(page)) {
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
        fetchSingleAccount: (name) => dispatch(fetchSingleAccount(name)),
        fetchSingleAccountFromCache: (name) => dispatch(fetchSingleAccountFromCache(name))
    }
}

const mapStateToProps = state => ({
    accountsByType: state.account.accounts,
    allAccounts: state.account.allAccounts,
    selectedAccount: state.account.selectedAccount,
    accountCalled: state.account.called,
    accountTypes: ["Income", "Expense", "Asset", "Liability", "All"]
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)