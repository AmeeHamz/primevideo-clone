import React from 'react'
import styles from './styles.module.css'
import {Divider} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import Axios from 'axios';
import { getActiveUser } from '../../Redux/user/actions';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
export const Payment = () => {
  const {userdata, isAuth} = useSelector(state => state.auth)
  const [loading, setLoading] = React.useState(false)
  const history = useHistory();
  const arr = history.location.search.split("=")
  let price = arr[arr.length - 1]
  const dispatch = useDispatch();
    const paymentHandler = async (e) => {
        e.preventDefault();
        var today = new Date();
        var str = today.toGMTString();
        let activeUser = userdata._id
        let payload = {
          user_id: activeUser,
          order: {
              amount: Number(price),
              date: str,
          },
      }
        const API_URL = 'http://localhost:8001/'
        const orderUrl = `${API_URL}order`;
        let config = {
            method: 'POST',
            url: orderUrl,
            data: payload,
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const response = await Axios(config);
        const { data } = response;
        const options = {
          name: "Prime RazorPay",
          description: "Integration of Razorpay",
          order_id: data.id,
          handler: async (response) => {
            try {
              const paymentId = response.razorpay_payment_id;
              const url = `${API_URL}capture/${paymentId}`;
              config ={
                method: 'POST',
                url: url,
                data: payload,
                headers: {
                  'Content-Type': 'application/json'
                }
              }
              await Axios(config)
                .then((res) => {
                   alert("Your payment was Successfull, Redirecting to Home page...")
                    setLoading(true)
                    dispatch(getActiveUser())
                    // setInterval(() => setLoading(false), 5000)
                    setTimeout(() => setLoading(false), 15000)
                } )
                .catch((err) => alert("error"))
            } catch (err) {
                console.log(err);
              }
          },
          modal: {
          ondismiss: function() {
              alert(`Payment Failed`)
          }
          },
          prefill: {
              email: userdata.email,
          },
          theme: {
            color: "#082436",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
    return (
       <>
      {!isAuth && <Redirect to="/login" /> }
        { isAuth && userdata.subscription ? <Redirect to="/home" /> : ( <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.header_content_container}>
                    <img id="dv-signup-banner-logoimage" src="https://m.media-amazon.com/images/G/01/digital/video/acquisition/logo/prime_negative-v1._CB485946247_.png" alt="Prime"/>
                    <h4>Watch now, cancel anytime</h4>
                    <h3>Start your membership today</h3>
                </div>
                <div className={styles.header_photos_container}>
                    <img src="https://m.media-amazon.com/images/G/01/Digital_Video/Pipeline/packshot_pipeline_banner3_IN._CB409104359_.png" alt="photos" />
                </div>
            </header>
            <div className={styles.info}>
                <InfoIcon style={{color: "rgb(108, 170, 228)", marginLeft:'1%'}} />
                <div style={{marginLeft:'1%'}}>
                    You will be charged ₹999 for a year of Prime. Your membership auto-renews every year if bought using any credit card or a debit card from HDFC, Axis, Citi, ICICI, Kotak, Deutsche, or Canara.
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
                <button className={styles.payment_btn}onClick={paymentHandler}>Continue</button>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Divider style={{width: '100px', marginRight:'10px'}} />
                    <span >Or</span>
                    <Divider style={{width: '100px', marginLeft:'10px'}} />
                </div>
                <div style={{width: '20%', textAlign: 'center'}}>
                    Start a 30-day free trial with auto-renew. (Credit cards or a supported debit card from HDFC, Axis, Citi, ICICI, Kotak, Deutsche, and Canara eligible.)
                </div>
            </div>
        </div>)}
       </>
    )
}