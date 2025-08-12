
import React, { useState } from 'react';
import './index.css'
export default function Tabs(props) {
    // ['详情','评价','售后']
    const { options = [], onChange = () => { } } = props;
    const [activeIndex, setActiveIndex] = useState(0);


    const handlClick = (index) => {
        setActiveIndex(index)
        onChange(index)
    }
    return (
        <div className="tabs">
            {options.map((item, index) => (
                <div onClick={() => { handlClick(index) }} className={`tab ${activeIndex === index ? 'active' : ''}`} key={index}>{item}</div>
            ))}
        </div >
    )
}