import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';


const TransactionNew = (props) => {
    return (
        <div>
            {props.addSingleMode ?
                <div className='border'>
                    Transaction Form
                </div>
                :
                <div>
                    {props.addBatchMode ?
                        <div>
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
                                buttonStyle="blue"
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