import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/swiper-bundle.css";
import styles from "./Carousel.module.css";
import { useHistory } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { useSelector } from "react-redux";
import { useResponsive } from "react-hooks-responsive";
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";
import AddIcon from "@material-ui/icons/Add";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const breakpoints = { xs: 0, sm: 480, md: 640, lg: 720, xl: 2048 };

export const SimpleCarousel = (props) => {
  const { check, handleAdd } = props;
  const { size, orientation, screenIsAtLeast, screenIsAtMost } = useResponsive(
    breakpoints,
  );
  const history = useHistory();
  const tv = useSelector((state) => state.medias.tv);
  const { watchlist } = useSelector((state) => state.auth);
  const [num, setNum] = React.useState(4);

  React.useEffect(() => {
    // console.log(size)
    if (size == "xs") setNum(2);
    if (size == "lg") setNum(4);
    if (size == "xl") setNum(6);
  }, [size]);

  SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);
  React.useEffect(() => {
    // console.log(props)
  }, [props]);

  const handleClick = (id) => {
    history.push(`/media/${id}`);
  };

  const handleClick1 = (id, e) => {
    history.push(`/player/song2`);
    e.stopPropagation();
  };

  //   function check(id) {
  //     console.log("Check function");
  //     if (isAuth && watchlist.length > 0) {
  //       for (let i = 0; i < watchlist.length; i++) {
  //         if (watchlist[i]._id === id) return true;
  //       }
  //     }
  //     return false;
  //   }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="prime">
      <Swiper
        spaceBetween={10}
        slidesPerView={num}
        slidesPerColumn={1}
        navigation={{ nextEl: ".swiper-button2", prevEl: ".swiper-button2" }}
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
              <div className={styles.Slide} key={item._id}>
                <img
                  src={item.backdrop_path}
                  width="100%"
                  style={{ width: "100%", objectFit: "contain" }}
                  onClick={() => handleClick(item._id)}
                />
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
