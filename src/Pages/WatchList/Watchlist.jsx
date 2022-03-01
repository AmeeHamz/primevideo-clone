import React from "react";
import { Container, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import styles from "./Watchlist.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { newWatchList } from "../../Redux/user/actions";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";
import AddIcon from "@material-ui/icons/Add";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

export function Watchlist() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userdata, watchlist } = useSelector((state) => state.auth);

  const handleClick = (id) => {
    history.push(`/media/${id}`);
  };

  const handleClick1 = (id, e) => {
    history.push(`/player/song2`);
    e.stopPropagation();
  };

  const handleAdd = (payload) => {
    // console.log(userData._id, payload);
    dispatch(newWatchList({ id: userdata._id, mediaId: payload }));
  };

  function check(id) {
    console.log("Check function");
    if (watchlist.length > 0) {
      for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i]._id === id) return true;
      }
    }
    return false;
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return userdata.fav.length === 0 ? (
    <Box>
      <Container className={styles.watchlist_container}>
        <div className={styles.watchlist_link_container}>
          <NavLink className={styles.watchlist_link} to="/your-watchlist">
            Watchlist
          </NavLink>
        </div>
        <div className={styles.img_container}>
          <img
            src="https://m.media-amazon.com/images/G/01/digital/video/empty_list_watchlist_new.png"
            alt="add watchlist"
          />
          <h3 className={styles.container_subheading}>
            Your Watchlist is Empty
          </h3>
          <div className={styles.container_footer}>
            Add &nbsp;
            <a className={styles.remove_link_space} href="/">
              TV shows
            </a>
            &nbsp; and &nbsp;{" "}
            <a className={styles.remove_link_space} href="/">
              Movies
            </a>
            &nbsp;
            <span>
              that you want to watch later by clicking Add to Watchlist.
            </span>
          </div>
        </div>
      </Container>
    </Box>
  ) : (
    <div>
      <h1 style={{ marginLeft: "0px" }}>Your Watchlist</h1>
      <Grid
        container
        spacing={1}
        style={{ border: "1px solid white", height: "100vh" }}>
        {userdata &&
          userdata.fav.length > 0 &&
          userdata.fav.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={3} xl={2} spacing={3}>
              <div
                className={styles.Slide}
                key={item._id}
                style={{ margin: "20px" }}>
                <img
                  src={item.backdrop_path}
                  width="300px"
                  height="200px"
                  style={{ width: "300px", objectFit: "contain" }}
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
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
