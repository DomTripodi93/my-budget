import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';


const TransactionNew = (props) => {
    return (
        <div>
            {props.addMode && props.single ?
                <div className='border'>
                    Transaction Form
                </div>
                :
                <div>
                    {props.addMode ?
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