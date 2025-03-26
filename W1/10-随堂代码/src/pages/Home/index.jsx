import React, { useEffect } from 'react';
import { getGoodsRecords } from '../../Api/goods'
import './index.css';
import CateSelect from '../../components/CateSelect';
import BannerSwiper from '../../components/BannerSwiper';
import GoodsCard from '../../components/GoodsCard';
export default function Home() {
    useEffect(() => {
        console.log('Home page mounted');
        getGoodsRecords()
    }, []);
    return (
        <div className='home-page'>
            <div style={{ display: 'flex' }}>
                <CateSelect onChange={(data) => console.log(data)} />
                <BannerSwiper />
            </div>
            <div className='goods-list'>
                {new Array(20).fill(null).map((_, index) => (<GoodsCard key={index} type={1} />))}
            </div>
        </div>
    );
}