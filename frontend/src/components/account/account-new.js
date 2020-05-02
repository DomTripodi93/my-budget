import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';
import AccountForm from './account-form';


const AccountNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div className='border'>
                    <AccountForm 
                        callback={props.action}
                    />
                </div>
                :
                <div className='top'>
                    <CustomButton
                        buttonStyle="blue"
                        label="Add New Account"
                        action={props.action}
                    />
                </div>
            }
        </div>
    )
}

export default AccountNew;