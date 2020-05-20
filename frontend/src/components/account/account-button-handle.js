import React, { useState } from 'react';
import "./account.scss"
import CustomButton from '../../shared/elements/button/custom-button.component';



const AccountButtonHandle = (props) => {
    const showDetails = () => {
        props.action(props.name)
    }
    return (
        <CustomButton
            buttonStyle="soft-green"
            action={showDetails}
            label="Details"
        />
    )
}

export default AccountButtonHandle;