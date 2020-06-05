import React from 'react';
import { connect } from 'react-redux';



const UploadTransactions = () => {
    return(
        <div>
            <FormInput
                label='Batch Upload'
                type='file'
                name='transactions'
                value={date}
                onChange={handleChange}
                required
            />
        </div>
    )

}


const mapDispatchToProps = dispatch => ({
});


export default connect(null, mapDispatchToProps)(UploadTransactions);