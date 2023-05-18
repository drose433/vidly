
import { useRef } from "react";
import React from 'react';

const Input = ({name, label, value, error, ...rest }) => {
    return (
    <React.Fragment>
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                {...rest}
                id={name}
                name={name}
                value={value}
                className='form-control' />
               {error && <div className="alert alert-danger">{error}</div>}
        </div>
    </React.Fragment>
);
}
 
export default Input;