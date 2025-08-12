// 倒推法。
import { useState } from "react"

class Store {
    constructor() {
        this.state={};
        this.reducers = {};
        this.listeners = [];

    }

    load(reducers){
        // key :{initialState, reducers}
        for (let key in reducers) {
            this.state[key]=reducers[key].initialState;
            // {key:fcuntion(){}...}
            this.reducers={...this.reducers,...reducers[key].reducers}
        }



    }
    callback(){
        this.listeners.forEach(listener => listener(this.state))
    }

    dispatch(action){
        // type   payload nameSpace
        
        this.reducers[action.type](this.state[action.nameSpace],{type:action.type, payload:action.payload})
        this.callback()

    }
    subscribe(listener){
        this.listeners.push(listener)
    }
}


const store = new Store();

const useDispatch = () => {
    return store.dispatch.bind(store)
}

const useSelector = (callback) => {
    const [state, setState] = useState(callback(store.state))
    store.subscribe((state) => {
        const newState = callback(state)


        setState({...newState})
    })
    console.log('我们的store数据：',state);
    
    return state
}

export {
    useDispatch,
    useSelector
}

export default store