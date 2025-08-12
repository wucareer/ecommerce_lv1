

import { createSlice } from '../Redux/toolKit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
    },
    reducers: {
        // 添加商品
        // state 当前值
        // action 动作 payload reduce 是一个纯函数，不会做state的修改操作。返回一个新的state
        addItem: (state, action) => {
            // 商品信息
            const {payload}= action;
            const item = state.items.find(item => item.id === payload.id);
            if(item){
                item.quantity+=payload.quantity;
            }else{
                state.items.push(payload)
            }
            state.totalPrice+=payload.price*payload.quantity;
            state.totalQuantity+=payload.quantity;
        },
        // 移除商品
        removeItem: (state, action) => {
            const {payload}= action;
            state.items= state.items.filter(item => item.id!== payload.id);
            state.totalPrice-=payload.price*payload.quantity;
            state.totalQuantity-=payload.quantity;
        },
        updateQuantity: (state, action) => {
            // id quantity
            const {payload}=action;
            const {id,quantity}=payload;
            const item = state.items.find(item => item.id === id);
            if(item){
                item.quantity=quantity;
                state.totalPrice=state.totalPrice+((quantity-item.quantity)*item.price)
                state.totalQuantity=state.totalQuantity+quantity-item.quantity;
            }


        }
        




    }
})


export const  {addItem,removeItem,updateQuantity}= cartSlice.actions;

export default cartSlice.reducer;