import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return ( 
        <React.Fragment>
            <input 
            type='text'
            name='query'
            className='form-control my-3'
            placeholder='Search...'
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
            />
        </React.Fragment>
     );
}
 
export default SearchBox;