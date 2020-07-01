import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../../shared/elements/form-input/form-input.component';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { uploadBulkTransactions } from '../../reducers/transaction/transaction.actions';



const UploadTransactions = (props) => {
    const [transactions, setTransactions] = useState()

    const handleChange = event => {
        const { value } = event.target.files[0];
        setTransactions(value);
    };

    const handleSubmit = () => {
        let data = new FormData();
        data.append('transactions', transactions);
        props.uploadBulkTransactions(data);
    }

    return (
        <div className="border">
            <form onSubmit={handleSubmit}>
                <FormInput
                    label=''
                    type='file'
                    accept=".xlsx, .xls, .csv"
                    value={transactions}
                    onChange={handleChange}
                    required
                />
                <div className="grid50 middle size-holder">
                    <CustomButton
                        buttonStyle="blue"
                        type="submit"
                        label="Upload"
                    />
                    <CustomButton
                        buttonStyle="red"
                        action={props.callback}
                        label="Cancel"
                    />
                </div>
            </form>
        </div>
    )

}


const mapDispatchToProps = dispatch => ({
    uploadBulkTransactions: (csv) => {uploadBulkTransactions(csv)}    
});


export default connect(null, mapDispatchToProps)(UploadTransactions);