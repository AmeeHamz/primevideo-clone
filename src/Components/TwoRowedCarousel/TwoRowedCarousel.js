import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Scrollbar,
} from "swiper";
import styles from "./twoRowedCarousel.module.css";
import "swiper/swiper-bundle.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";
import AddIcon from "@material-ui/icons/Add";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

export const TwoRowedCarousel = (props) => {
  const { check, handleAdd } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade, Scrollbar]);
  const isLoading = useSelector((state) => state.medias.isLoading);
  const handleClick = (id) => {
    history.push(`/media/${id}`);
  };

  const handleClick1 = (id, e) => {
    history.push(`/player/song2`);
    e.stopPropagation();
  };
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="prime">
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        slidesPerColumn={2}
        navigation={{ nextEl: ".swiper-button3", prevEl: ".swiper-button3" }}
        navigation
        speed={800}
        scrollbar={{ draggable: true, hide: true, el: ".swiper-scrollbar" }}
        onSwiper={(swiper) => swiper}
        onSlideChange={() => "slide change"}
        slidesPerColumnFill={"row"}
        className={styles.container}>
        {props.media.length > 0 &&
          props.media.map((item) => (
            <SwiperSlide className={styles.subContainer}>
              <div
                className={styles.Slide}
                key={item._id}
                onClick={() => handleClick(item._id)}>
                <img
                  src={item.backdrop_path}
                  width="100%"
                  style={{ width: "100%", objectFit: "contain" }}></img>
                <div className={styles.hidden}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "21%",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <div
                        className={styles.play_icon}
                        style={{
                          color: "white",
                          border: "2px solid white",
                          borderRadius: "50%",
                          height: "30px",
                          width: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "5px",
                        }}>
                        <PlayArrowOutlined fontSize="large" />
                      </div>
                      <div style={{ marginLeft: "10px" }}>Play</div>
                    </div>
                    <div>
                      <PlayCircleFilledWhiteIcon
                        style={{ marginRight: "10px" }}
                      />
                      {check(item._id) ? (
                        <RemoveCircleOutlineIcon
                          onClick={() => handleAdd(item)}
                        />
                      ) : (
                        <AddIcon onClick={() => handleAdd(item)} />
                      )}
                    </div>
                  </div>
                  <div>
                    <h1
                      style={{
                        fontSize: "15px",
                        color: "white",
                        lineHeight: "1px",
                      }}>
                      {" "}
                      {item.original_title}{" "}
                    </h1>
                    <p className={styles.overview}>
                      {" "}
                      {truncate(item?.overview, 100)}{" "}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      marginTop: "1px",
                      alignItems: "center",
                      color: "#8197a4",
                      fontSize: "12px",
                    }}>
                    <div>1 h 42 min</div>
                    <div> {item.release_date.substring(0, 4)} </div>
                    <div
                      style={{
                        fontSize: "11px",
                        border: "1px solid #8197a4",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        padding: "2px",
                      }}>
                      X-ray
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        border: "1px solid #8197a4",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        padding: "2px",
                      }}>
                      18+
                    </div>
                    <SpeakerNotesIcon />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
