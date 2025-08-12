
import { useEffect, useState } from 'react';
import img_check_active from '../../assets/check_active.png';
import './index.css';
export default function CheckBox(props) {
    const {checked,onChange=()=>{}}=props;

    const [value, setValue] = useState(false);


    useEffect(()=>{
        setValue(checked);
    },[checked])

    const toggle=(value)=>{
        setValue(value);
        onChange(value);
    }

    return ( 
        <div className="checkbox">
          
            {
                value?(<img src={img_check_active} onClick={()=>toggle(false)}  />):(
                    <div className="unchecked" onClick={()=>toggle(true)}></div>
                )
            }
        </div>)
    
}