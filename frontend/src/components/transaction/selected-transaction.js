import React from 'react';
import helpers from '../../shared/helpers';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { connect } from 'react-redux';
import { deleteTransaction } from '../../reducers/transaction/transaction.actions';


const SelectedTransaction = (props) => {
    const transaction = props.transaction;
    const helper = new helpers();

    const handleDelete = (transaction) => {
        if (window.confirm(
            "Are you sure you want to delete this transaction?"
        )) {
            props.deleteTransaction(transaction);
        }
    }

    return (
        <div className="centered border grid50">
            <h5>
                Account From:
                <br />
                {transaction.accountFrom}
                <br />
                <br />
                Account To:
                <br />
                {transaction.accountTo}
            </h5>
            <h5>
                Date of Transaction:
                <br />
                {helper.getJsDateStringFromIsoDateString(transaction.date.substring(0, 10))}
                <br />
                <br />
                Cost:
                <br />
                ${transaction.cost.toFixed(2)}
            </h5>
            <CustomButton
                label="Update"
                buttonStyle="blue large"
                action={() => {  }}
            />
            <CustomButton
                label="Delete"
                buttonStyle="red large"
                action={() => { handleDelete(transaction) }}
            />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTransaction: (transaction) => dispatch(deleteTransaction(transaction))
    }
}

export default connect(null, mapDispatchToProps)(SelectedTransaction);