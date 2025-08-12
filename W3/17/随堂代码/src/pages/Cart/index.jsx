import React, { useState } from "react";
import { useSelector ,useDispatch} from "../../Redux";
import { updateQuantity } from "../../store/cartSlice";
import { addItem,removeItem,addAll,removeAll,updateQuantity as updateQuantityOrder } from "../../store/orderSlice";
import CheckBox from "../../Form/CheckBox";
import './index.css'
import GoodsCard from "../../components/GoodsCard";
import NumOperation from "../../components/NumOperation";
import OrderSummary from "../../components/OrderSummay";
export default function Cart() {
    const [checked, setChecked] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const dispatch = useDispatch();
    // 回调函数
    const {cartItems,totalQuantity} = useSelector(state =>({cartItems:state.cart.items,totalQuantity:state.cart.totalQuantity}));
    


    const hanleItemChecked = (value,item) => {
        const {id}=item;
        if (value) {
            setSelectedItems([...selectedItems,id]);
            dispatch(addItem(item));
        }else{
            dispatch(removeItem(item));
            setSelectedItems(selectedItems.filter(item => item!== id))
        }
    }


    const handleSelectAll=()=>{
        if(cartItems.length===selectedItems.length){
            setSelectedItems([]);
            dispatch(removeAll())
        }else{
            dispatch(addAll(cartItems))
            setSelectedItems(cartItems.map(item=>item.id))
        }
    }

    const handleNumChange = (value,item) => {
        // 在订单里
        if(selectedItems.includes(item.id)){
            dispatch(updateQuantityOrder({ id: item.id, quantity: value }))
        }
        dispatch(updateQuantity({ id: item.id, quantity: value }))
    }

    return (
        <div className="cart-page">
              
            <div className="cart-container">
                <div className="left">
                    <h1>全部商品(35)</h1>
                    <div className="cart-select-all" onClick={handleSelectAll}>
                        <CheckBox checked={cartItems.length===selectedItems.length} />
                        <div style={{ marginLeft: '10px' }}>{cartItems.length===selectedItems.length ? '取消全选' : '全选'}</div>
                    </div>
                    <div className="cart-items">
                        {
                            cartItems.map(item => (
                                <div key={item.id} className="cart-item" >
                                    <CheckBox onChange={(value)=>{hanleItemChecked(value,item)}} checked={selectedItems.includes(item.id)} />
                                    <div style={{ marginLeft: '15px' }}> <GoodsCard type={2} /></div>
                                    <div style={{ marginLeft: '50px' }}>
                                        <NumOperation defaultValue={item.quantity} onChange={(value) => { handleNumChange(value,item) }} />
                                    </div>
                                </div>
                            ))
                        }
                       
    
                    </div>
                </div>
                <div className="right">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}