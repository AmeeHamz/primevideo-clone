import React from 'react'
import styles from './styles.module.css'
import {Container, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {LandingNav} from '../../Components/LandingNav/LandingNav'
import {useSelector} from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    root : {
        backgroundColor : 'white',
        paddingBottom: '20px',
        paddingTop: '30px'
    }
})

const LandingPage = () => {
    const { userdata, isAuth } = useSelector(state => state.auth) 
    // console.log(isAuth)
    const history = useHistory();

    React.useEffect(() => {
    }, [])

    const handlePayment = (amount) => {
        if(isAuth)history.push(`/payment?amount=${amount}`);
        else history.push(`/login`);
    }

    const classes = useStyles();

    return (
                <div className={styles.wrapper}>
                    { isAuth && userdata.subscription ? <Redirect to="/home" /> : null }
                    <header
                        className={styles.banner}
                        style={{
                            backgroundSize: "cover",
                            backgroundColor: '#000',
                            backgroundPosition: "right top",
                            backgroundImage: `linear-gradient(to right, #000 40%, transparent 58%),url("https://m.media-amazon.com/images/G/01/digital/video/Magellan_MLP/MLP_ROW_Muti-title_Mag1._SX1440_CR575,0,865,675_QL80_AC_FP_.jpg")`,
                            backdropPosition: "center",
                            backgroundRepeat: "no-repeat",
                            height:'88vh'
                        }}
                        >
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <h1>Welcome to Prime Video</h1>
                                <p className={styles.description} >
                                Enjoy exclusive Amazon Originals as well as popular movies and TV shows. Join Prime Video now for USD 5.99 <br/>per month. Cancel anytime.
                                </p>
                                <button onClick={() => handlePayment(399) } className={styles.landing_btn}>Start your free trial</button>
                                <p>Membership renews at USD 5.99/month.</p>
                            </div>
                            <div style={{flex:'1'}}> {` `} </div>
                        </div>
                    </header>
                    <header
                        className={styles.banner}
                        style={{
                            backgroundSize: "cover",
                            backgroundColor: '#000',
                            backgroundPosition: "right top",
                            backgroundImage: `linear-gradient(to left, #000 40%, transparent 58%), url('https://m.media-amazon.com/images/G/01/digital/video/Magellan_MLP/IN-Living-Room-V2._CB524587855_SY1200_FMJPG_.jpg')`,
                            backdropPosition: "center",
                            backgroundRepeat: "no-repeat",
                            height:'88vh'
                        }}
                        >
                        <div className={styles.container}>
                            <div style={{width: '120%'}}> {` `} </div>
                            <div className={styles.content}>
                                <h1>Great Entertainment</h1>
                                <p className={styles.description} style={{width: '90%'}} >
                                    With your Prime membership, you have access to exclusive Amazon Originals, blockbuster Bollywood movies, regional movies and more.
                                </p>
                                <button className={styles.landing_btn}>Get started</button>
                            </div>
                        </div>
                    </header>
                    <header
                        className={styles.banner}
                        style={{
                            backgroundSize: "cover",
                            backgroundColor: '#000',
                            backgroundPosition: "right top",
                            backgroundImage: `linear-gradient(to right, #000 40%, transparent 58%), url('https://m.media-amazon.com/images/G/01/digital/video/Magellan_MLP/PRIME_multi-benefit_MAGNET_2X._CB1519820207_SY1200_FMJPG_.jpg')`,
                            backdropPosition: "center",
                            backgroundRepeat: "no-repeat",
                            height:'88vh'
                        }}
                        >
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <h1 style={{width:'50%'}}>One membership, many benefits</h1>
                                <p className={styles.description} style={{width:'43%'}}>
                                    Your Prime membership now also includes ad-free music along with unlimited free, fast delivery on eligible items, exclusive access to deals &amp; more.                                </p>
                                <button className={styles.landing_btn}>Get started</button>
                                <a href="https://amazon.in/prime"> <div>*Go to amazon.in/prime for more information</div> </a>
                            </div>
                            <div style={{flex: '1'}}> {` `} </div>
                        </div>
                    </header>
                    <header
                        className={styles.banner}
                        style={{
                            backgroundSize: "cover",
                            backgroundColor: '#000',
                            backgroundPosition: "right top",
                            backgroundImage: `linear-gradient(to left, #000 40%, transparent 58%), url('https://images-na.ssl-images-amazon.com/images/G/01/digital/video/Magellan_MLP/MLP_Template_Image_Left._SY1200_FMJPG_.jpg')`,
                            backdropPosition: "center",
                            backgroundRepeat: "no-repeat",
                            height:'88vh'
                        }}
                        >
                        <div className={styles.container}>
                            <div style={{width: '170%'}}> {` `} </div>
                            <div className={styles.content}>
                                <h1 style={{width: '78%'}}>Even better with Fire TV Stick</h1>
                                <p className={styles.description} style={{width: '90%'}} >
                                    The biggest movies and TV shows are always better on a big screen. Simply plug in your Amazon Fire TV Stick and stream on any HDTV. Press the voice button on the remote and say the name of the title you want to watch to find it in seconds.                                </p>
                                <button className={styles.landing_btn}>Get started</button>
                            </div>
                        </div>
                    </header>
                    <Container>
                        <Grid container spacing={2} className={classes.root} >
                            <Grid item xs={12} sm={1} md={4} xl={4}>
                                <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                    <img class="dv-multi-column-image" src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/Magellan_MLP/PV_Benefits_Devices.jpg" alt="Watch anywhere"/>
                                    <h2 className={styles.diffHeading}>Watch anywhere</h2>
                                    <div style={{fontSize:'21px', lineHeight:'27px', width:'90%'}}>Enjoy from the web or with the Prime Video app on your phone, tablet, or select Smart TVs — on up to 3 devices at once.</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={1} md={4} xl={4}>
                                <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                    <img class="dv-multi-column-image" src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/Magellan_MLP/PV_Benefits_Download_IN.jpg" alt="Download and go"/>
                                    <h2 className={styles.diffHeading}>Download and go</h2>
                                    <div style={{fontSize:'21px', lineHeight:'27px', width:'90%'}}>Watch offline on the Prime Video app when you download titles to your iPhone, iPad, Tablet, or Android device.</div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={1} md={4} xl={4}>
                                <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                    <img class="dv-multi-column-image" src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/Magellan_MLP/300x300_Tile_1.png" alt="Data Saver"/>
                                    <h2 className={styles.diffHeading}>Data Saver</h2>                                
                                    <div style={{fontSize:'21px', lineHeight:'27px', width:'90%'}}>Control data usage while downloading and watching videos on select phones or tablets.</div>
                                </div>
                            </Grid>
                        </Grid >
                    </Container>
                    <header
                        className={styles.banner}
                        style={{
                            backgroundSize: "cover",
                            backgroundColor: '#000',
                            backgroundPosition: "right top",
                            backgroundImage: `linear-gradient(to right, #000 40%, transparent 58%), url('https://m.media-amazon.com/images/G/01/digital/video/Magellan_MLP/IN-kids-30Jan._CB1517304519_SY1200_FMJPG_.jpg')`,
                            backdropPosition: "center",
                            backgroundRepeat: "no-repeat",
                            height:'88vh'
                        }}
                        >
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <h1 style={{width:'50%'}}>Family Friendly</h1>
                                <p className={styles.description} style={{width:'43%'}}>
                                    With easy to use Parental Controls and a dedicated kids page, enjoy secure, ad-free kids entertainment. Kids can enjoy popular TV shows like Peppa Pig, Powerpuff Girls, and Chhota Bheem.
                                </p>
                                <button className={styles.landing_btn}>Get started</button>
                            </div>
                            <div style={{flex: '1'}}> {` `} </div>
                        </div>
                    </header>
                </div>
       
    )
}


export {LandingPage}