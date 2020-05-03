import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import TransactionForm from './single-transaction-form';



const TransactionNew = (props) => {
    return (
        <div>
            {props.addSingleMode ?
                <div className='border'>
                    <TransactionForm 
                        callback={props.action}
                        accounts={props.accounts}
                        callback={props.singleAction}
                    />
                </div>
                :
                <div>
                    {props.addBatchMode ?
                        <div className='border'>
                            Batch Upload
                        </div>
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