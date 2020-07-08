import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllAccounts, fetchAccountsByType, fetchSingleAccount, fetchSingleAccountFromCache } from '../../reducers/account/account.actions';
import AccountList from '../../components/account/account-list';
import AccountNew from '../../components/account/account-new';
import SelectedAccount from '../../components/account/selected-account';



const AccountContainer = (props) => {
    const page = props.match.params.page;
    const called = props.accountCalled;
    const fetchAll = props.fetchAllAccounts;
    const fetchByType = props.fetchAccountsByType;
    const fetchSingle = props.fetchSingleAccount;
    const fetchSingleFromCache = props.fetchSingleAccountFromCache;
    const selectedAccount = props.selectedAccount;
    const accountTypes = props.accountTypes;
    const searchType = props.match.params.searchType;

    useEffect(() => {
        if (!called["All"]){
            fetchAll();
        }
        if (!called[page] && searchType === "list" && page !=="All"){
            fetchByType(page);
        } else if (searchType === "single" && called["single"] !== page) {
            if (called["All"]) {
                fetchSingleFromCache(page)
            } 
        }
    }, [
        fetchAll, 
        fetchByType, 
        fetchSingle, 
        page,
        searchType,
        called, 
        selectedAccount, 
        fetchSingleFromCache, 
        accountTypes
    ])

    const [accounts, setAccounts] = useState([]);
    const [single, setSingle] = useState(false);
    const [first, setFirst] = useState(false);

    useEffect(() => {
        if ( searchType === "list" && called[page]) {
            if (page === "All") {
                setAccounts([...props.allAccounts]);
                if (props.allAccounts.length > 0){
                    setFirst(false);
                } else {
                    setFirst(true);
                }
                setSingle(false);
            } else {
                setAccounts(props.accountsByType[page]);
                setSingle(false);
            }
        } else if (searchType === "single" && called["single"] === page) {
            setAccounts([props.selectedAccount]);
            setSingle(true);
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
                first={first}
            />
            <br />
            {accounts.length > 0 ?
                <div>
                    {single ?
                        <SelectedAccount
                            account={accounts[0]}
                            accountList={props.allAccounts}
                            single={true}
                        />
                        :
                        <AccountList
                            accounts={accounts}
                            page={page}
                        />
                    }
                </div>
                :
                <div className="border centered">
                    <h4>
                        Add an <a onClick={showAddForm}>account</a>, or use the bulk account upload to add a whole <a>chart of accounts</a> at once. 
                    </h4>
                </div>
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