import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllAccounts, fetchAccountsByType, fetchSingleAccount } from '../../reducers/account/account.actions';
import AccountList from '../../components/account/account-list';
import AccountNew from '../../components/account/account-new';



const AccountContainer = (props) => {
    const page = props.match.params.page;
    const fetchAll = props.fetchAllAccounts;
    const fetchByType = props.fetchAccountsByType;
    const fetchSingle = props.fetchSingleAccount;
    const [single, setSingle] = useState(false);

    useEffect(() => {
        if (page === "All") {
            fetchAll();
            setSingle(false);
        } else if (/^\d+$/.test(page)) {
            fetchSingle(page);
            setSingle(true);
        } else {
            fetchByType(page);
            setSingle(false);
        }
    }, [fetchAll, fetchByType, fetchSingle, page])

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (props.accountCalled[page]) {
            if (page === "All") {
                setAccounts([...props.allAccounts]);
            } else if (/^\d+$/.test(page)) {
                setAccounts([props.selectedAccount]);
            } else {
                setAccounts(props.accountsByType[page]);
            }
        }
    }, [page, props])

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