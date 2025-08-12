import React, { useState, useEffect } from 'react';
import img_radio_checked from '../../assets/form_radio_checked.png';
import './index.css';
import FormItem from '../FormItem';
function Radio(props) {
    const { label = '', onChange = () => { }, value = false } = props;
    const [active, setActive] = useState(value);

    const handleCheck = (value) => {
        // setActive(value);
        onChange(value);
    };
    useEffect(() => {
        setActive(value);
    }, [value]);

    return (
        <div className="form-radio">
            {
                active ?
                    <img style={{ width: '20px', height: '20px' }} onClick={() => { handleCheck(false); }} src={img_radio_checked} alt="" />
                    :
                    <div onClick={() => { handleCheck(true); }} className="radio-checked"></div>
            }
            {props.children && <span style={{ marginLeft: '10px' }}>{props.children}</span>}
        </div>

    );
}

export default Radio;