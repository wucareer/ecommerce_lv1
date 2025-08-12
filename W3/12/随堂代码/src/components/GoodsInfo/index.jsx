

import React, { useState } from 'react'
import './index.css'
import goods02 from '../../assets/goods02.png'
import goods01 from '../../assets/goods01.png'
import NumOperation from '../NumOperation'
import Magnify from '../Magnify'
export default function GoodsInfo() {
    const [imgs, setImgs] = useState([goods01, goods02])
    const [currentImg, setCurrentImg] = useState(imgs[0])
    const mainImgRef = React.createRef()
    return (
        <div className="goods-info">
            <div className="goods-img">
                <div className="img-box">
                    <img ref={mainImgRef} className="main-img" src={currentImg} alt="" />
                    <div className="img-box-swiper">
                        {
                            imgs.map((img, index) => (
                                <div key={index} className='img-box-swiper-item' onClick={() => { setCurrentImg(img) }} >
                                    <img src={img} alt="" />
                                </div>))
                        }


                    </div>
                </div>
            </div>
            <div className="goods-sku">
                <div className="name">一個很長的商品名稱，我也不知道會有多長，但就是有可能會很長就對了，如果真的很長最多就是這麼長。</div>
                <div className="sales">已售 9999999</div>
                <div className="price">
                    <span className='market-price-label'>特价</span>
                    <span className='unit'>TWD</span>
                    <span className='price-num'>2323232</span>
                    <div className='original-price'>
                        原价 TWD 9999999
                    </div>
                </div>
                <div className="buyNum">
                    <span>数量：</span>
                    {/* 数量操作 */}
                    <NumOperation />
                </div>
                <div className='buy-btn'>加入购物车</div>
            </div>
            <Magnify imgRef={mainImgRef} size={'lg'} scale={3}  />
        </div>
    )
}