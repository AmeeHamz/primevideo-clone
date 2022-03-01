import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ShareIcon from "@material-ui/icons/Share";
import CreateIcon from "@material-ui/icons/Create";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import GetAppIcon from "@material-ui/icons/GetApp";
import { fetchMedia } from "../../Redux/MediaRedux/actions";
import styles from "./styles.module.css";
import { getActiveUser, newWatchList } from "../../Redux/user/actions";
import { Feedback } from "../../Components/Feedback/Feedback";
import Loading from "../../Components/Loading/Loading";

const ViewMedia = () => {
  const { id } = useParams();
  const isLoading = useSelector((state) => state.medias.isLoading);
  const userData = useSelector((state) => state.auth.userdata);
  const media = useSelector((state) => state.medias.currmedia);
  const cast = useSelector((state) => state.medias.cast);
  const crew = useSelector((state) => state.medias.crew);
  const episodes = useSelector((state) => state.medias.episodes);
  const genre = useSelector((state) => state.medias.genre);
  const { watchlist, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [added, setAdded] = React.useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  var language = "";
  if (media.original_language == "ja") language = "Japanese";
  if (media.original_language == "en") language = "English";
  if (media.original_language == "hi") language = "Hindi";
  if (media.original_language == "ml") language = "Malayalam";
  if (media.original_language == "ta") language = "Tamil";
  if (media.original_language == "ru") language = "Russian";

  React.useEffect(() => {
    dispatch(fetchMedia(id));
    dispatch(getActiveUser());
  }, []);

  function check(id) {
    console.log("Check function");
    if (isAuth && watchlist.length > 0) {
      for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i]._id === id) return true;
      }
    }
    return false;
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const handleClick = (videotitle) => {
    // console.log(videotitle);
    history.push(`/player/${videotitle}`);
  };

  const handleAdd = (payload) => {
    // console.log(userData._id, payload);
    dispatch(newWatchList({ id: userData._id, mediaId: payload }));
  };

  if (isLoading) return <Loading></Loading>;
  else
    return (
      <>
        {/* for Soul */}
        {media.media_type === "movie" && media.original_title == "Soul" && (
          <div>
            <header
              className={styles.banner}
              style={{
                backgroundSize: "cover",
                backdropPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "88vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
              <div
                style={{
                  width: "90%",
                  minHeight: "100%",
                  zIndex: 5,
                  background:
                    "linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(28,38,48,1) 50%, rgba(28,38,48,1) 100%)",
                }}></div>
              <video
                height="100%"
                width="60%"
                style={{
                  marginTop: "0px",
                  top: 0,
                  position: "absolute",
                  right: 0,
                  objectFit: "fill",
                  zIndex: 3,
                }}
                autoPlay
                onMouseEnter={(e) => e.target.play()}
                muted>
                <source
                  src="http://localhost:8001/video/soul"
                  type="video/mp4"
                />
              </video>
              <div
                className={styles.container}
                style={{ marginTop: "-700px", zIndex: 10 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "2",
                    alignItems: "start",
                    marginLeft: "5%",
                    marginTop: "-100px",
                  }}>
                  <p className={styles.media_title}>{media.original_title}</p>
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      alignItems: "center",
                      color: "#8197a4",
                      fontSize: "15px",
                    }}>
                    <div>IMDb {Number(media.vote_average).toFixed(1)}</div>
                    <div>1 h 42 min</div>
                    <div>2020</div>
                    <div
                      style={{
                        fontSize: "11px",
                        border: "1px solid #8197a4",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        padding: "3px",
                      }}>
                      X-ray
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        border: "1px solid #8197a4",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        padding: "3px",
                      }}>
                      7+
                    </div>
                    <SpeakerNotesIcon />
                  </div>
                  <div
                    style={{
                      marginTop: "15px",
                      width: "60%",
                      fontSize: "17px",
                    }}>
                    {truncate(media?.overview, 200)}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      width: "60%",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      alignItems: "center",
                      alignContent: "center",
                      textAlign: "center",
                    }}>
                    <div
                      onClick={() => handleClick("soul")}
                      className={styles.banner_btn_active}>
                      <PlayArrowOutlined
                        fontSize="large"
                        style={{ color: "white" }}
                      />
                      <div>Play</div>
                    </div>
                    <div onClick={handleClick} className={styles.banner_btn}>
                      <PlayArrowOutlined fontSize="large" />
                      <div>Watch Trailer</div>
                    </div>
                    <div
                      onClick={() => handleAdd(media)}
                      className={styles.banner_btn_add}>
                      <div>
                        {check(media._id)
                          ? "Remove From Watchlist"
                          : "Add to WatchList"}
                      </div>
                    </div>
                    <div
                      onClick={handleClick}
                      className={styles.banner_btn_download}>
                      <GetAppIcon fontSize="large" />
                      <div>Download</div>
                    </div>
                  </div>
                  <div className={styles.crew}>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Directors
                    </div>
                    <div style={{ color: "#79b8f3" }}>
                      {truncate(crew.join(), 50)}
                    </div>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Starring
                    </div>
                    <div style={{ color: "#79b8f3" }}>
                      {truncate(cast.join(), 50)}
                    </div>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Genres
                    </div>
                    <div style={{ color: "#79b8f3" }}>{genre.join()}</div>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Subtitles
                    </div>
                    <div style={{ color: "#79b8f3" }}>English</div>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Audio languages
                    </div>
                    <div style={{ color: "#79b8f3" }}>{language}</div>
                  </div>
                </div>
                <div style={{ flex: "1" }}> {` `} </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "50px",
                  zIndex: 1000,
                }}>
                <div
                  style={{
                    color: "#8197a4",
                    fontSize: "15px",
                    marginLeft: "5%",
                  }}>
                  By clicking play,{" "}
                  <span style={{ color: "#79b8f3" }}>
                    you agree to our Terms of Use.
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "5%",
                    alignItems: "center",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                    }}>
                    <ShareIcon fontSize="large" style={{ color: "white" }} />
                    <div style={{ marginLeft: "10px" }}>Share</div>
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                      cursor: "pointer",
                    }}>
                    <CreateIcon fontSize="large" style={{ color: "white" }} />
                    <div style={{ marginLeft: "10px" }}>Feedback</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                    }}>
                    <HelpOutlineIcon
                      fontSize="large"
                      style={{ color: "white" }}
                    />
                    <div style={{ marginLeft: "10px" }}>Help</div>
                  </div>
                </div>
              </div>
            </header>
            <div>{/* carousel */}</div>
          </div>
        )}
        {/* for series */}
        {media.media_type == "tv" && (
          <div>
            <header
              className={styles.banner}
              style={{
                backgroundSize: "cover",
                backgroundImage: `linear-gradient(to right, #0f171e 40%, transparent 100%),url("${media.backdrop_path}")`,
                backdropPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "88vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}>
              <div className={styles.container}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "2",
                    alignItems: "start",
                    marginLeft: "5%",
                  }}>
                  <p className={styles.media_title}>{media.original_title}</p>
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      alignItems: "center",
                      color: "#8197a4",
                      fontSize: "15px",
                    }}>
                    <div>IMDb {Number(media.vote_average).toFixed(1)}</div>
                    <div>1 h 42 min</div>
                    <div>2020</div>
                    <div
                      style={{
                        fontSize: "11px",
                        border: "1px solid #8197a4",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        padding: "3px",
                      }}>
                      X-ray
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        border: "1px solid #8197a4",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        padding: "3px",
                      }}>
                      7+
                    </div>
                    <SpeakerNotesIcon />
                  </div>
                  <div
                    style={{
                      marginTop: "15px",
                      width: "100%",
                      fontSize: "17px",
                    }}>
                    {truncate(media?.overview, 200)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "60%",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      alignItems: "center",
                      alignContent: "center",
                      textAlign: "center",
                    }}>
                    <div
                      onClick={() => handleClick("TR1")}
                      className={styles.banner_btn_active}>
                      <PlayArrowOutlined
                        fontSize="large"
                        style={{ color: "white" }}
                      />
                      <div>Play</div>
                    </div>
                    <div
                      onClick={() => handleClick("TR1")}
                      className={styles.banner_btn}>
                      <PlayArrowOutlined fontSize="large" />
                      <div>Watch Trailer</div>
                    </div>
                    <div
                      onClick={() => handleAdd(media)}
                      className={styles.banner_btn_add}>
                      <div>
                        {check(media._id)
                          ? "Remove From Watchlist"
                          : "Add to WatchList"}
                      </div>
                    </div>
                    <div
                      onClick={handleClick}
                      className={styles.banner_btn_download}>
                      <GetAppIcon fontSize="large" />
                      <div>Download</div>
                    </div>
                  </div>
                  <div className={styles.crew}>
                    <div style={{ color: "#8197a4" }}>Directors</div>
                    <div style={{ color: "#79b8f3" }}>
                      {truncate(crew.join(), 50)}
                    </div>
                    <div style={{ color: "#8197a4" }}>Starring</div>
                    <div style={{ color: "#79b8f3" }}>
                      {truncate(cast.join(), 50)}
                    </div>
                    <div style={{ color: "#8197a4" }}>Genres</div>
                    <div style={{ color: "#79b8f3" }}>{genre.join()}</div>
                    <div style={{ color: "#8197a4" }}>Subtitles</div>
                    <div style={{ color: "#79b8f3" }}>English</div>
                    <div style={{ color: "#8197a4" }}>Audio languages</div>
                    <div style={{ color: "#79b8f3" }}>{language}</div>
                  </div>
                </div>
                <div style={{ flex: "1" }}> {` `} </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "50px",
                }}>
                <div
                  style={{
                    color: "#8197a4",
                    fontSize: "15px",
                    marginLeft: "5%",
                  }}>
                  By clicking play,{" "}
                  <span style={{ color: "#79b8f3" }}>
                    you agree to our Terms of Use.
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "5%",
                    alignItems: "center",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                    }}>
                    <ShareIcon fontSize="large" style={{ color: "white" }} />
                    <div style={{ marginLeft: "10px" }}>Share</div>
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                      cursor: "pointer",
                    }}>
                    <CreateIcon fontSize="large" style={{ color: "white" }} />
                    <div style={{ marginLeft: "10px" }}>Feedback</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                    }}>
                    <HelpOutlineIcon
                      fontSize="large"
                      style={{ color: "white" }}
                    />
                    <div style={{ marginLeft: "10px" }}>Help</div>
                  </div>
                </div>
              </div>
            </header>
            <div>
              {/* episode list  */}

              {episodes.length > 0 &&
                episodes.map((item) => (
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        width: "93%",
                        height: "auto",
                        margin: "auto",
                        marginTop: "10px",
                        backgroundColor: "#19232C",
                      }}>
                      <div style={{ flex: "1" }}>
                        <img width="80%" src={item.image} alt="test" />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flex: "2",
                          marginLeft: "-50px",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            color: "white",
                            justifyContent: "space-between",
                            marginTop: "10px",
                          }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "15px",
                              color: "white",
                            }}>
                            <div
                              style={{
                                color: "white",
                                backgroundColor: "#0f79af",
                                borderRadius: "50%",
                                height: "50px",
                                width: "50px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                              <PlayArrowOutlined fontSize="large" />
                            </div>
                            <div
                              style={{ fontSize: "17px", marginLeft: "10px" }}>
                              {item.title}
                            </div>
                          </div>
                          <GetAppIcon
                            fontSize="large"
                            style={{ margin: "10px" }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "10px",
                            color: "#8197a4",
                            fontSize: "15px",
                            justifyContent: "space-between",
                            maxWidth: "60%",
                          }}>
                          <div>{item.released}</div>
                          <div>45 min</div>
                          <div
                            style={{
                              fontSize: "11px",
                              border: "1px solid #8197a4",
                              fontWeight: "bold",
                              borderRadius: "2px",
                              padding: "3px",
                            }}>
                            7+
                          </div>
                          <div>English</div>
                          <div>{language}</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "10px",
                            color: "white",
                            fontSize: "15px",
                          }}>
                          {item.overview}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {media.media_type === "movie" && media.original_title != "Soul" && (
          <div>
            <header
              className={styles.banner}
              style={{
                backgroundSize: "cover",
                backgroundImage: `linear-gradient(to right, #0f171e 40%, transparent 100%),url("${media.backdrop_path}")`,
                backdropPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "88vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
              <div className={styles.container}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "2",
                    alignItems: "start",
                    marginLeft: "5%",
                  }}>
                  <p className={styles.media_title}>{media.original_title}</p>
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      alignItems: "center",
                      color: "#8197a4",
                      fontSize: "15px",
                    }}>
                    <div>IMDb {Number(media.vote_average).toFixed(1)}</div>
                    <div>1 h 42 min</div>
                    <div>2020</div>
                    <div
                      style={{
                        fontSize: "11px",
                        border: "1px solid #8197a4",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        padding: "3px",
                      }}>
                      X-ray
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        border: "1px solid #8197a4",
                        fontWeight: "bold",
                        borderRadius: "2px",
                        padding: "3px",
                      }}>
                      7+
                    </div>
                    <SpeakerNotesIcon />
                  </div>
                  <div
                    style={{
                      marginTop: "15px",
                      width: "100%",
                      fontSize: "17px",
                    }}>
                    {truncate(media?.overview, 200)}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      width: "60%",
                      justifyContent: "space-between",
                      marginTop: "15px",
                      alignItems: "center",
                      alignContent: "center",
                      textAlign: "center",
                    }}>
                    <div
                      onClick={() => handleClick("TR2")}
                      className={styles.banner_btn_active}>
                      <PlayArrowOutlined
                        fontSize="large"
                        style={{ color: "white" }}
                      />
                      <div>Play</div>
                    </div>
                    <div
                      onClick={() => handleClick("TR2")}
                      className={styles.banner_btn}>
                      <PlayArrowOutlined fontSize="large" />
                      <div>Watch Trailer</div>
                    </div>
                    <div
                      onClick={() => handleAdd(media)}
                      className={styles.banner_btn_add}>
                      <div>
                        {check(media._id)
                          ? "Remove From Watchlist"
                          : "Add to WatchList"}
                      </div>
                    </div>
                    <div
                      onClick={handleClick}
                      className={styles.banner_btn_download}>
                      <GetAppIcon fontSize="large" />
                      <div>Download</div>
                    </div>
                  </div>
                  <div className={styles.crew}>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Directors
                    </div>
                    <div style={{ color: "#79b8f3" }}>
                      {truncate(crew.join(), 50)}
                    </div>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Starring
                    </div>
                    <div style={{ color: "#79b8f3" }}>
                      {truncate(cast.join(), 50)}
                    </div>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Genres
                    </div>
                    <div style={{ color: "#79b8f3" }}>{genre.join()}</div>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Subtitles
                    </div>
                    <div style={{ color: "#79b8f3" }}>English</div>
                    <div style={{ color: "#8197a4", fontWeight: 600 }}>
                      Audio languages
                    </div>
                    <div style={{ color: "#79b8f3" }}>{language}</div>
                  </div>
                </div>
                <div style={{ flex: "1" }}> {` `} </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "50px",
                }}>
                <div
                  style={{
                    color: "#8197a4",
                    fontSize: "15px",
                    marginLeft: "5%",
                  }}>
                  By clicking play,{" "}
                  <span style={{ color: "#79b8f3" }}>
                    you agree to our Terms of Use.
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "5%",
                    alignItems: "center",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                    }}>
                    <ShareIcon fontSize="large" style={{ color: "white" }} />
                    <div style={{ marginLeft: "10px" }}>Share</div>
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                      cursor: "pointer",
                    }}>
                    <CreateIcon fontSize="large" style={{ color: "white" }} />
                    <div style={{ marginLeft: "10px" }}>Feedback</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                      color: "white",
                    }}>
                    <HelpOutlineIcon
                      fontSize="large"
                      style={{ color: "white" }}
                    />
                    <div style={{ marginLeft: "10px" }}>Help</div>
                  </div>
                </div>
              </div>
            </header>
            <div>{/* carousel */}</div>
          </div>
        )}
        {open ? <Feedback open={open} handleClose={handleClose} /> : <></>}
      </>
    );
};

export default ViewMedia;
