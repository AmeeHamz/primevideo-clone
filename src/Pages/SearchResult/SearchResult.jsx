import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { searchQuery } from "../../Redux/Search/actions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import styles from "./SearchResult.module.css";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";
import AddIcon from "@material-ui/icons/Add";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { newWatchList } from "../../Redux/user/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export function SearchResult(props) {
  const { searched } = useSelector((state) => state.search);
  const { isAuth, userdata, watchlist } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  let path = null;

  const classes = useStyles();

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

  useEffect(() => {
    let temp = history.location.search.split("=")[1];
    dispatch(searchQuery({ query: temp }));
  }, [history.location.search]);

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
  return (
    <div>
      <h1 style={{ marginLeft: "40px" }}>Search Results</h1>
      <div className={styles.main_container} style={{ marginLeft: "-20px" }}>
        <Grid container spacing={1}>
          {searched.length > 0 &&
            searched.map((item) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={3}
                xl={2}
                spacing={3}
                style={{ maxHeight: "200px" }}>
                <div
                  className={styles.Slide}
                  onMouseEnter={(item) => console.log("asd", item._id)}
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
    </div>
  );
}
