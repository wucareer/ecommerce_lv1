import React, {  useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import './index.css';
import { useSearchKeys } from '../../hooks/useSearchKeys';
import { useGoodsRecords } from '../../hooks/useGoodsRecords';
export default function Search() {
    const [focusing, setFocusing] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [keys,addKey,clearKeys]=useSearchKeys()
    const [goods,addGood,clearGoods]=useGoodsRecords()
    const inputRef = useRef();



    useEffect(() => {

        document.addEventListener('click', handleClosePannel)
        // 当作生命周期使用 ，class组件中 componentDidMount
        const searchParams = new URLSearchParams(location.search);
        console.log(searchParams.get('key'));
        const urlKey = searchParams.get('key') || '';
        // 回填
        inputRef.current.value = urlKey;
        // 存到本地
        
    }, [])

    const doSearch = (key) => {

    }

    const handleSearch = (e) => {
        if (location.pathname === '/search') {
            doSearch(inputRef.current.value);
        } else {
            navigate(`/search${inputRef.current.value ? '?key=' : ""}${inputRef.current.value ? inputRef.current.value : ''}`)
        }
        addKey(inputRef.current.value)
    }

    const handleClosePannel = (e) => {
        const searchWrapper=document.querySelector('.search-wrapper');
        if(searchWrapper && !searchWrapper.contains(e.target)){
            setFocusing(false);
        }
        

    }
    const handleClearGoods=()=>{
        clearGoods()
    }
    return (
        <div className="search-wrapper">
            <div className="search">
                <input type="text"
                    ref={inputRef}
                    
                    onFocus={() => setFocusing(true)}
                    className="search-input"
                    placeholder="Search"
                ></input>
                <div className='search-bt' onClick={handleSearch}>搜寻</div>
            </div>
            <div className="keys">
                {keys.map((item,index)=>{
                    return <div key={index} className="key">{item}</div>;
                })}
            </div>
            {
                focusing && <div className="pannel">
                    <div className="keys-history">
                        <div className='clear' onClick={()=>{clearKeys()}}>清除</div>
                        <div className="title">搜寻历史</div>
                        {
                            keys.map((item,index)=>{
                                return <div key={index} className="key">{item}</div>;
                            })
                        }

                    </div>
                    <div className="lookhistory">
                        <div className='clear' onClick={handleClearGoods}>清除</div>
                        <div className="title">商品查看历史</div>
                        {
                            goods.map((item,index)=>{
                                return <div key={index} className="record" >{item.name}</div>;
                            })
                        }

                    </div>
                </div >
            }

        </div >
    )
}