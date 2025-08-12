
import React from'react';
import { useNavigate } from 'react-router';
import { createOrder,payOrder } from '../../store/orderSlice';
import { useSelector,useDispatch } from '../../Redux';
import './index.css';
import goods01 from '../../assets/goods01.png';
export default function CartSumary(props) {
    const {items,totalQuantity,totalPrice,status}=useSelector(state => ({status:state.order.status,items:state.order.items,totalQuantity:state.order.totalQuantity,totalPrice:state.order.totalPrice}));
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => { 
        
        if(status===0){
            //生成订单
            dispatch(createOrder())
            navigator('/order')
        }else if(status===1){
            // 跳转到成功页面 
            // 支付订单 写死2

            props.onSubmit&&props.onSubmit()
        }

    };
    return (
        <div className="cart-sumary">
            <div className="first-row">
                <div className="title">明细</div>
                <div className="des">
                    <span>已选</span>
                    <span style={{ fontSize: '20px', fontWeight: 500, color: '#1F2022', margin: '0 4px' }}>{totalQuantity}</span>
                    <span>件商品</span>
                </div>
            </div>
            <div className="second-row">
                {
                    items.map((item, index) => (
                        <div key={item.id} className="goods-preview">
                            <img src={goods01} alt=""  />
                        </div>
                    ))
                }
                <div className="goods-preview more">
                    等{totalQuantity}件商品
                </div>
            </div>
            <div className="third-row">
                <div>商品总价</div>
                <div className="price"><span>TWD</span>
                    <span>{totalPrice}</span>
                </div>
            </div>
            <div className="submit-btn" onClick={handleClick}>{status===0?'结账去':status===1?'去付款':'已完成'}</div>
        </div>
    );
}