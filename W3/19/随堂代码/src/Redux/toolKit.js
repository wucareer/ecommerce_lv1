
import store from './index'
const createSlice = (config) => {

    const actions={}
    const reducers={}

    for(let key in config.reducers){
        actions[key]=(payload)=>{
            return {
                payload,
                type:key,
                nameSpace:config.name
            }
        }


        reducers[key]=(state,action)=>{
            config.reducers[key](state,action)
        }
    }




    return {
        actions,
        reducer:{
            reducers,
            initialState:config.initialState,
        }
    }
}




const configureStore = (reducers) => {
    store.load(reducers.reducer)
}   





export {
    createSlice,
    configureStore,
}