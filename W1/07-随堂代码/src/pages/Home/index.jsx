import React, { useEffect } from 'react';
import { getGoodsRecords } from '../../Api/goods'
import './index.css';
import CateSelect from '../../components/CateSelect';
export default function Home() {
    useEffect(() => {
        console.log('Home page mounted');
        getGoodsRecords()
    }, []);
    return (
        <div className='home-page'>
            <CateSelect onChange={(data) => console.log(data)} />
        </div>
    );
}