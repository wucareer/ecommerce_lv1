import {configureStore} from '../Redux/toolKit'
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
export default configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
    },
}) 