import React from 'react';
import "./account.scss"
import CustomButton from '../../shared/elements/button/custom-button.component';



const AccountButtonHandle = (props) => {
    const changeDetails = () => {
        props.action(props.name)
    }
    return (
        <CustomButton
            action={changeDetails}
            label={props.label}
            buttonStyle="mini"
        />
    )
}

export default AccountButtonHandle;