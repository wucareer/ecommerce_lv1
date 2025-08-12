
import React, { useEffect, useState } from 'react'
import reduce_icon from '../../assets/reduce_icon.png'
import plus_icon from '../../assets/plus_icon.png'
import './index.css'

export default function NumOperation(props) {
    const { onChange = () => { },defaultValue=1 } = props;
    const [value, setValue] = useState(1)

    useEffect(() => {
        setValue(defaultValue)
    },[defaultValue])

    const count = (action) => {
        if (action === 'reduce' && value > 0) {

            setValue(value - 1)
            onChange(value-1)
        } else if (action === 'plus') {
            setValue(value + 1)
            onChange(value+1)
        }

    }
    return (
        <div className='numOperation'>
            <div className='num-btn' >
                <img src={reduce_icon} onClick={() => { count('reduce') }} alt="" srcSet="" />
            </div>
            <div className='num-value'>{value}</div>
            <div className='num-btn' >
                <img src={plus_icon} onClick={() => { count('plus') }} alt="" srcSet="" />
            </div>
        </div>
    )
}