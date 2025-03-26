import { useState, useEffect } from "react";

export const useSearchKeys = () => {
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        //    加载本地存储的搜索关键词
        const searchKeys = JSON.parse(localStorage.getItem('searchKeys') || '[]');
        setKeys(searchKeys);


    }, []);

    const addKey = (key) => {
        // 去重
        if (keys.includes(key)) {
            return;
        }
        const newKeys = [...keys, key];
        setKeys(newKeys);
        localStorage.setItem('searchKeys', JSON.stringify(newKeys));
    }


    const clearKeys = () => {
        setKeys([]);
        localStorage.setItem('searchKeys', JSON.stringify([]));
    }





    return [keys, addKey, clearKeys]

}