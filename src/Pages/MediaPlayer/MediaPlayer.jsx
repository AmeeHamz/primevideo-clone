import React, { useState, useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import screenful from "screenfull";
import Controls from "./Controls";
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    playerWrapper: {
        marginTop: "-50px",
        width: "100%",
        maxHeight: "95%",
        position: "fixed",
        // "&:hover": {
        //   "& $controlsWrapper": {
        //     visibility: "visible",
        //   },
        // },
    },

    controlsWrapper: {
        visibility: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    topControls: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(2),
    },
    middleControls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    bottomWrapper: {
        display: "flex",
        flexDirection: "column",

        // background: "rgba(0,0,0,0.6)",
        // height: 60,
        padding: theme.spacing(2),
    },

    bottomControls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // height:40,
    },

    button: {
        margin: theme.spacing(1),
    },
    controlIcons: {
        color: "#777",

        fontSize: 50,
        transform: "scale(0.9)",
        "&:hover": {
            color: "#fff",
            transform: "scale(1)",
        },
    },

    bottomIcons: {
        color: "#999",
        "&:hover": {
            color: "#fff",
        },
    },

    volumeSlider: {
        width: 100,
    },
}));

const PrettoSlider = withStyles({
    root: {
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const format = (seconds) => {
    if (isNaN(seconds)) {
        return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
        return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
};

let count = 0;

const MediaPlayer = () => {
    const { title } = useParams()
    const classes = useStyles();
    const [showControls, setShowControls] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [timeDisplayFormat, setTimeDisplayFormat] = useState("normal");
    const [bookmarks, setBookmarks] = useState([]);
    const [state, setState] = useState({
        pip: false,
        playing: true,
        controls: false,
        light: false,

        muted: true,
        played: 0,
        duration: 0,
        playbackRate: 1.0,
        volume: 1,
        loop: false,
        seeking: false,
    });

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsRef = useRef(null);
    const canvasRef = useRef(null);
    const {
        playing,
        controls,
        light,

        muted,
        loop,
        playbackRate,
        pip,
        played,
        seeking,
        volume,
    } = state;

    const handlePlayPause = () => {
        setState({ ...state, playing: !state.playing });
    };

    const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    };

    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    };

    const handleProgress = (changeState) => {
        if (count > 3) {
            controlsRef.current.style.visibility = "hidden";
            count = 0;
        }
        if (controlsRef.current.style.visibility == "visible") {
            count += 1;
        }
        if (!state.seeking) {
            setState({ ...state, ...changeState });
        }
    };

    const handleSeekChange = (e, newValue) => {
        console.log({ newValue });
        setState({ ...state, played: parseFloat(newValue / 100) });
    };

    const handleSeekMouseDown = (e) => {
        setState({ ...state, seeking: true });
    };

    const handleSeekMouseUp = (e, newValue) => {
        console.log({ value: e.target });
        setState({ ...state, seeking: false });
        // console.log(sliderRef.current.value)
        playerRef.current.seekTo(newValue / 100, "fraction");
    };

    const handleDuration = (duration) => {
        setState({ ...state, duration });
    };

    const handleVolumeSeekDown = (e, newValue) => {
        setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
    };
    const handleVolumeChange = (e, newValue) => {
        // console.log(newValue);
        setState({
            ...state,
            volume: parseFloat(newValue / 100),
            muted: newValue === 0 ? true : false,
        });
    };

    const toggleFullScreen = () => {
        screenful.toggle(playerContainerRef.current);
    };

    const handleMouseMove = () => {
        console.log("mousemove");
        controlsRef.current.style.visibility = "visible";
        count = 0;
    };

    const hanldeMouseLeave = () => {
        controlsRef.current.style.visibility = "hidden";
        count = 0;
    };

    const handleDisplayFormat = () => {
        setTimeDisplayFormat(
            timeDisplayFormat == "normal" ? "remaining" : "normal"
        );
    };

    const handlePlaybackRate = (rate) => {
        setState({ ...state, playbackRate: rate });
    };

    const hanldeMute = () => {
        setState({ ...state, muted: !state.muted });
    };

    const addBookmark = () => {
        const canvas = canvasRef.current;
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            playerRef.current.getInternalPlayer(),
            0,
            0,
            canvas.width,
            canvas.height
        );
        const dataUri = canvas.toDataURL();
        canvas.width = 0;
        canvas.height = 0;
        const bookmarksCopy = [...bookmarks];
        bookmarksCopy.push({
            time: playerRef.current.getCurrentTime(),
            display: format(playerRef.current.getCurrentTime()),
            image: dataUri,
        });
        setBookmarks(bookmarksCopy);
    };

    const currentTime =
        playerRef && playerRef.current
            ? playerRef.current.getCurrentTime()
            : "00:00";

    const duration =
        playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
    const elapsedTime =
        timeDisplayFormat == "normal"
            ? format(currentTime)
            : `-${format(duration - currentTime)}`;

    const totalDuration = format(duration);
    return (
        <div>
            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={hanldeMouseLeave}
                ref={playerContainerRef}
                className={classes.playerWrapper}
            >
                <ReactPlayer
                    ref={playerRef}
                    width="100%"
                    height="100%"
                    url={`http://localhost:8001/video/${title}`}
                    pip={pip}
                    playing={playing}
                    controls={false}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onProgress={handleProgress}
                    config={{
                        file: {
                            attributes: {
                                crossorigin: "anonymous",
                            },
                        },
                    }}
                />

                <Controls
                    title={title}
                    ref={controlsRef}
                    onSeek={handleSeekChange}
                    onSeekMouseDown={handleSeekMouseDown}
                    onSeekMouseUp={handleSeekMouseUp}
                    onDuration={handleDuration}
                    onRewind={handleRewind}
                    onPlayPause={handlePlayPause}
                    onFastForward={handleFastForward}
                    playing={playing}
                    played={played}
                    elapsedTime={elapsedTime}
                    totalDuration={totalDuration}
                    onMute={hanldeMute}
                    muted={muted}
                    onVolumeChange={handleVolumeChange}
                    onVolumeSeekDown={handleVolumeSeekDown}
                    onChangeDispayFormat={handleDisplayFormat}
                    playbackRate={playbackRate}
                    onPlaybackRateChange={handlePlaybackRate}
                    onToggleFullScreen={toggleFullScreen}
                    volume={volume}
                />
            </div>

            <Grid container style={{ marginTop: 20 }} spacing={3}>
                {bookmarks.map((bookmark, index) => (
                    <Grid key={index} item>
                        <Paper
                            onClick={() => {
                                playerRef.current.seekTo(bookmark.time);
                                controlsRef.current.style.visibility = "visible";

                                setTimeout(() => {
                                    controlsRef.current.style.visibility = "hidden";
                                }, 1000);
                            }}
                            elevation={3}
                        >
                            <img crossOrigin="anonymous" src={bookmark.image} />
                            <Typography variant="body2" align="center">
                                bookmark at {bookmark.display}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <canvas ref={canvasRef} />
        </div>
    )
}


export default MediaPlayer



    // < video height = "95%" controls autoPlay >
    //     <source src={`http://localhost:8001/video/${currSong}`} type="video/mp4" />
    //         </video >