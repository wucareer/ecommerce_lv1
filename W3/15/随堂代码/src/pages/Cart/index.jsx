import React, { useState } from "react";
import CheckBox from "../../Form/CheckBox";
import './index.css'
export default function Cart() {
    const [checked, setChecked] = useState(false);

    const handleToggle = () => {
        setChecked(!checked)
    }
    return <div className="cart-page">
        <CheckBox checked={checked} onChange={(value) => { setChecked(value) }} />
        
    </div>;    
}