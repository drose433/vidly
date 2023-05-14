import { useRef } from "react";
import React from 'react';

const Input = ({ name, label, value, error, onChange }) => {
    return (
    <React.Fragment>
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                value={value}
                name={name}
                onChange={onChange} 
                id={name} 
                type="text" 
                className='form-control' />
               {error && <div className="alert alert-danger">{error}</div>}
        </div>
    </React.Fragment>
);
}
 
export default Input;