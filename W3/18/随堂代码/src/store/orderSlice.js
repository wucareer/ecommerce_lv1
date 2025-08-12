import { createSlice } from "../Redux/toolKit";

const orderSlice = createSlice({
    name:'order',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
        status:0 //0 待创建 1 待付款  4 已完成
    },
    reducers: {
        addItem:(state,action)=>{
            const {payload}=action;
            const item=state.items.find(item=>item.id===payload.id);
            if(item){
                item.quantity+=payload.quantity;
            }else{
                state.items.push(payload);
            }
            state.totalQuantity+=payload.quantity;
            state.totalPrice+=payload.price*payload.quantity;
        },
        addAll:(state,action)=>{
            const {payload}=action;
            state.items=payload;
            state.totalQuantity=payload.reduce((acc,item)=>acc+item.quantity,0);
            state.totalPrice=payload.reduce((acc,item)=>acc+item.price*item.quantity,0);
        },
        removeAll:(state,action)=>{
            state.items=[];
            state.totalQuantity=0;
            state.totalPrice=0;
        },
        removeItem:(state,action)=>{
            const {payload}=action;
            state.items=state.items.filter(item=>item.id!==payload.id);
            state.totalQuantity-=payload.quantity;
            state.totalPrice-=payload.price*payload.quantity;
        },
        updateQuantity:(state,action)=>{
            const {payload}=action;
            const {id,quantity}=payload;
            const item=state.items.find(item=>item.id===id);
            if(item){
                item.quantity=quantity;
                state.totalPrice=state.totalPrice+((quantity-item.quantity)*item.price)
                state.totalQuantity=state.totalQuantity+quantity-item.quantity;
            }
        },
        createOrder:(state,action)=>{
            // 已创建 待付款
            state.status=1;
        },
        payOrder:(state,action)=>{
            // 已付款 待发货
            state.status=2;

            // 调用接口 发送订单
        },

    }
}
)


export const {addItem,removeItem,removeAll,addAll,updateQuantity,createOrder,payOrder}=orderSlice.actions;


export default orderSlice.reducer;