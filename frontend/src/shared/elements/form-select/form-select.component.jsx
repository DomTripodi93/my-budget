import React from 'react';

import {
    FormSelectContainer,
    FormSelectLabel,
    FormSelector
} from './form-select.styles';

const FormSelect = ({ handleChange, label, options, ...props }) => {
    return (
        <div>
            {options.length > 0 ?
                <FormSelectContainer className="input-width grid100" onChange={handleChange}>
                        <FormSelector {...props}>
                            {options.map(option => (
                                <option value={option.value} key={option.value}>{option.label}</option>
                            ))}
                        </FormSelector>
                    {label ? (
                        <FormSelectLabel className='shrink'>
                            {label}
                        </FormSelectLabel>
                    ) : null}
                </FormSelectContainer>
                :
                <h5>No Options Available</h5>
            }
        </div>
    )
};

export default FormSelect;
