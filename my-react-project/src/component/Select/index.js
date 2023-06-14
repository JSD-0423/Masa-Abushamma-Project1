import React from 'react';

import './select.css'

const Select = ({ labelText, options,selectId ,onChange}) => {
    return (
        <div className="select-box w-100 h-100 position-relative">
            <div className="select-box-content px-2 py-1">
                <label for={selectId} className="ps-1">{labelText}</label>
                <select
                    name={selectId}
                    id={selectId}
                    className="w-100 border-0"
                    onChange={onChange}
                >
                    {options?.map((x)=>{
                    return(<option value={x.id} className="w-100">{x.value}</option>)})}
                </select>
            </div>
        </div>
    )
};

export default Select;  