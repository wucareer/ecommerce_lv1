import React, { useState, useEffect,useRef } from 'react';
import { getGoodsRecords } from '../../Api/goods'
import './index.css';
import CateSelect from '../../components/CateSelect';
import BannerSwiper from '../../components/BannerSwiper';
import BannerTwos from '../../components/BannerTwos';
import GoodsCard from '../../components/GoodsCard';
export default function Home() {
    const userRef = useRef(null);


    useEffect(()=>{
        if(userRef.current){
            const user=new window.EshopUser({
                root:userRef.current
            })
        }
    },[userRef])

    useEffect(() => {
        console.log('Home page mounted');
        getGoodsRecords()

    }, []);
    return (
        <div className="home-content">
            <div className="function-area">
                <div className="left-area"  >
                    <CateSelect />
                </div>
                <div className="mid-area">
                    <div className='banners-area'><BannerSwiper /></div>
                    <div className='banners-area'>  <BannerTwos />
                        <BannerTwos /></div>
                </div>
                <div className="home-user-container" ref={userRef}></div>
            </div>
            <div className="recommend-area">
                {new Array(20).fill(0).map((_, index) => (<GoodsCard key={index} />))}
            </div>
        </div>
    );
}