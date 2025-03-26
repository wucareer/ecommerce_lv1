import React, { useEffect } from 'react';
import { getGoodsRecords } from '../../Api/goods'
import './index.css';
export default function Home() {
    useEffect(() => {
        console.log('Home page mounted');
        getGoodsRecords()
    }, []);
    return (
        <div className='home-page'>
            首页
        </div>
    );
}