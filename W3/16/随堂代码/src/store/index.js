import {configureStore} from '../Redux/toolKit'
import cartReducer from "./cartSlice";
export default configureStore({
    reducer: {
        cart: cartReducer
    }
}) 