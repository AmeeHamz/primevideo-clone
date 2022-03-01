import React from 'react';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PlayArrowOutlined from '@material-ui/icons/PlayArrowOutlined';
import AddIcon from '@material-ui/icons/Add';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import styles from "./MediaCard.module.css"

export const MediaCard = ({media}) => {

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className={styles.Slide}>
            <img src={media.backdrop_path} width="100%" style={{ width: "100%", objectFit: "contain"}} alt="poster" />
                <div className={styles.hidden} >
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center",marginTop:'30%'}}  >
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                            <div className={styles.play_icon} style={{ color: 'white', border:  '2px solid white', borderRadius: "50%", height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    <PlayArrowOutlined fontSize="large" />
                            </div>
                            <div style={{marginLeft: '10px'}} >Play</div>
                        </div>
                        <div>
                            <PlayCircleFilledWhiteIcon style={{ marginRight:'10px' }}/>
                            <AddIcon />
                        </div>
                    </div>
                    <div>
                        <h1 style={{ fontSize: "15px", color: "white", lineHeight: "1px"}} > {media.original_title} </h1>
                        <p className={styles.overview} > {truncate(media?.overview, 100)} </p>
                    </div>
                    <div style={{ display: 'flex', width: "100%", justifyContent: "space-between", marginTop: "1px", alignItems: "center", color: "#8197a4", fontSize: '12px' }}>
                        <div>1 h 42 min</div>
                        <div> {media.release_date.substring(0, 4)} </div>
                        <div style={{ fontSize: "11px", border: "1px solid #8197a4", fontWeight: "bold", borderRadius: "2px", padding: "2px" }}>X-ray</div>
                        <div style={{ fontSize: "11px", border: "1px solid #8197a4", fontWeight: "bold", borderRadius: "2px", padding: "2px" }}>18+</div>
                        <SpeakerNotesIcon />
                    </div>
                </div >
        </div>
    )
}
