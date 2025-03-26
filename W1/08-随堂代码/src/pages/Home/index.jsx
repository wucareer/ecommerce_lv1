import React, { useEffect } from 'react';
import { getGoodsRecords } from '../../Api/goods'
import './index.css';
import CateSelect from '../../components/CateSelect';
import BannerSwiper from '../../components/BannerSwiper';
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
        </div>
    );
}