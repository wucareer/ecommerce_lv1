
import React from'react';
import {useNavigate} from 'react-router';
import { useSelector } from '../../Redux';

import cartIcon from '../../assets/cart_icon.png';
import './index.css';

export default function CartSuspend() {

    const {totalQuantity}= useSelector(state => (state.cart));
    const navigator = useNavigate();
     
    const handleToCartPage = () => {
    
        navigator('/cart');
    };

    return (

        <div className='cart-suspend' onClick={handleToCartPage} >
            
            <img className='cart-icon' src={cartIcon} alt="" srcSet="" />
            <div>购物车</div>
            <div className='suspend-count'>{totalQuantity}</div>
        </div>
    );
}