import { useEffect,useState } from "react";
import { getGoodsRecords ,clearGoodsRecords} from "../Api/goods";

export const useGoodsRecords = () => {

    const [goods, setGoods] = useState([]);

    const addGood = (good) => {

    }
    const clearGoods = () => {
        clearGoodsRecords().then(({data}) => {
            if(data.success){
                setGoods([])
            }   
        })
    }

    useEffect(() => {
        getGoodsRecords().then(({data}) => {
            if(data.success){
                setGoods(data.products)
            }
        })
    },[])

    return [goods,addGood,clearGoods]
}