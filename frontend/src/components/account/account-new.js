import React from 'react';
import CustomButton from '../../shared/elements/button/custom-button.component';


const AccountNew = (props) => {
    return (
        <div>
            {props.addMode ?
                <div className='border'>
                    account form
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