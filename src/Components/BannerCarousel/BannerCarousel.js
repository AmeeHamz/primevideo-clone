import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import './styles.css';
import 'swiper/swiper-bundle.css';
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { fetchAllMedias } from '../../Redux/MediaRedux/actions'

export const BannerCarousel = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const main = useSelector(state => state.medias.main)    
    SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade])
    // console.log(main)

  
    const handleClick = (id) => {
        history.push(`/media/${id}`)
    }

    const handleClick1 = (id, e) => {
        history.push(`/player/song2`)
        e.stopPropagation()
    }


    return (
        <Swiper
            // spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={true}
            speed={1500}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            style={{marginBottom:"40px"}}                
            className="swipermain"        
        >
            {
                props.media.length > 0 && props.media.map((item) => (
                    <SwiperSlide style={{ backgroundColor: "#0F171E" }}>
                        <div style={{ backgroundImage: `url("${item.backdrop_path}")`, backgroundSize: "100% 100%",height:"100%", width: "105%", borderRadius: "5px" }} onClick={() => handleClick(item._id)}>
                    </div>
                    </SwiperSlide>
                ))
            }
        
        </Swiper>
    )
}
