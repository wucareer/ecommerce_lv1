import { useRef,useState } from 'react';
import data from '../../assets/data.json'
import GoodsInfo from '../../components/GoodsInfo';
import GoodsCard from '../../components/GoodsCard';

import './index.css';
import Tabs from '../../components/Tabs';
import RichText from '../../components/RichText';
import Comment from '../../components/Comment';
export default function Detail() {


    const [activeIndex, setActiveIndex] = useState(0);
    const [comments, setComments]=useState([1,1,1,1,1,1,1,1,1,1])

    const toggleContent = (index) => {
        setActiveIndex(index)
    }

    return <div className="goods-detail">
        <div className="detail-content">
            <div className="left">
                <GoodsInfo />
                <div className="goods-detail-render">
                    {/* Tab */}
                    <Tabs options={['商品详情', `商品评价(${comments.length})`]} onChange={toggleContent} />
                    <div className="content">

                        {activeIndex === 0 && <div className="tab-content">
                            <div className="desc">
                                <RichText content={data.product}/>
                            </div>
                        </div>}
                        {activeIndex === 1 && <div className="tab-content">
                            {comments.map((item, index) => <Comment key={index} />)}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="title">你也许会喜欢^</div>
                <div className='recommend-list'>
                    {new Array(4).fill(0).map((item, index) => <GoodsCard key={index} {...item} />)}
                </div>
            </div>
        </div>
    </div>
}