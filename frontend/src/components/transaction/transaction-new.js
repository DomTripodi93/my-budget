import React, { useState, useEffect } from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import TransactionForm from './single-transaction-form';
import UploadTransactions from '../upload/upload-transactions';
import { Link } from 'react-router-dom';



const TransactionNew = (props) => {
    const [error, setError] = useState("");

    useEffect(() => {
        if (props.accounts.length === 0) {
            setError("You must add accounts before uploading transactions.")
        } else {
            setError("")
        }
    }, [props])

    return (
        <div>
            {error.length > 0 ?
                <div className="border">
                    <h3 className="centered">
                        {error}
                        <br />
                        <br />
                        <Link to="/account/All">Go To Accounts</Link>
                    </h3>
                </div>
                :
                <div>
                    {props.addSingleMode ?
                        <div className='border'>
                            <TransactionForm
                                accounts={props.accounts}
                                callback={props.singleAction}
                            />
                        </div>
                        :
                        <div className="button-holder">
                            {props.addBatchMode ?
                                <UploadTransactions
                                    callback={props.batchAction}
                                />
                                :
                                <div className='grid50'>
                                    <div className="button-holder">
                                        <CustomButton
                                            buttonStyle="blue"
                                            label="Add Single Transaction"
                                            action={props.singleAction}
                                        />
                                    </div>
                                    <div className="button-holder">
                                        <CustomButton
                                            buttonStyle="soft-green"
                                            label="Batch Transaction Upload"
                                            action={props.batchAction}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default TransactionNew;