import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import goods01 from '../../assets/goods01.png';
import './index.css';
import useAppear from '../../hooks/useAppear';
export default function GoodsCard(props) {
    const { type = 1 } = props;
    const navigate = useNavigate();
    const [containerRef, isAppear] = useAppear({ once: false, rootMargin: '100px' })

    const hanldeToDetailPage = () => {
        navigate('/detail')
    }


    useEffect(() => {

    }, [isAppear])

    const renderGoodsCard = () => {
        if (type === 1) {
            return (<div className="goods-card" onClick={hanldeToDetailPage}>
                <div className="cover">
                    <img src={goods01} alt="" />
                </div>
                <div className='info'>
                    <div className="name">很長的商品名稱，也不知道要寫什麼但這樣夠長了再多就刪掉。</div>
                    <div className="sales">
                        999,999 售出
                    </div>
                    <div className="price">
                        <span className='unit'>TWD</span>
                        <span className='value'>1,234,567</span>
                    </div>
                </div>
            </div>)
        } else if (type === 2) {
            return (
                <div className="goods-card-type2" onClick={hanldeToDetailPage}>
                    <div className="cover">
                        <img src={goods01} alt="" />
                    </div>
                    <div className='info'>
                        <div className="name">很長的商品名稱，也不知道要寫什麼但這樣夠長了再多就刪掉。</div>
                        <span className='unit'>TWD</span>
                        <span className='value'>1,234,567</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="carrot-container" onClick={hanldeToDetailPage}>
                    <div className="image-wrapper">
                        <img
                            src="/images/carrots.jpg"
                            alt="一堆橙色胡萝卜"
                        />
                    </div>
                    <p className="carrot-text">
                        某個很長但名稱，被截斷...
                    </p>
                </div>
            )
        }
    }



    return (

        <div ref={containerRef}>
            {isAppear && renderGoodsCard()}
        </div>
    )
}