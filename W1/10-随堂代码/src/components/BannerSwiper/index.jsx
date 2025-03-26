

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import banner1 from '../../assets/banner01.png';
import './index.css'

export default function BannerSwiper() {


    return (
        <Swiper
            pagination={{
                clickable: true,
                bulletActiveClass:'custom-swiper-pagination-bullet-active',
                bulletClass:'custom-swiper-pagination-bullet',
            }}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src={banner1} alt="" srcSet="" />
            </SwiperSlide> <SwiperSlide>
                <img src={banner1} alt="" srcSet="" />
            </SwiperSlide> <SwiperSlide>
                <img src={banner1} alt="" srcSet="" />
            </SwiperSlide>
        </Swiper>
    )
}