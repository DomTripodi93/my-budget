import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import TransactionForm from './single-transaction-form';
import UploadTransactions from '../upload/upload-transactions';



const TransactionNew = (props) => {
    return (
        <div>
            {props.addSingleMode ?
                <div className='border'>
                    <TransactionForm 
                        accounts={props.accounts}
                        callback={props.singleAction}
                    />
                </div>
                :
                <div>
                    {props.addBatchMode ?
                        <UploadTransactions                         
                            callback={props.batchAction}
                        />
                        :
                        <div className='grid50'>
                            <CustomButton
                                buttonStyle="blue"
                                label="Add Single Transaction"
                                action={props.singleAction}
                            />
                            <CustomButton
                                buttonStyle="soft-green"
                                label="Batch Transaction Upload"
                                action={props.batchAction}
                            />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default TransactionNew;