import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Dialog, Fade, Backdrop, Container, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setMsg, feedback } from "../../Redux/Feedback/actions";

export const Feedback = ({ open, handleClose }) => {
  let [vertical, horizontal] = ["top", "center"];
  const dispatch = useDispatch();
  const history = useHistory();
  const [comment, setComment] = useState("");
  const { msg } = useSelector((state) => state.feedback);
  const { userdata } = useSelector((state) => state.auth);
  useEffect(() => {
    if (msg == "sent") {
      setTimeout(() => {
        dispatch(setMsg(null));
        handleClose();
        setComment("");
      }, 2000);
    }
  }, [msg]);

  const handleSubmit = () => {
    // console.log("submit");
    dispatch(
      feedback({
        email: userdata.email,
        feedback: comment,
        name: userdata.name,
      }),
    );
  };

  return (
    <Dialog
      classes={{ paper: styles.paper }}
      open={`true`}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={`true`} className={styles.feedback_container}>
        <Container>
          {msg == "sent" && (
            <Snackbar anchorOrigin={{ vertical, horizontal }} open="true">
              <Alert variant="filled" severity="success">
                Mail Sent
              </Alert>
            </Snackbar>
          )}
          <div>
            <h4>
              Your feedback is important and helps us improve our products.
              Please note that we aren't replying to feedback/suggestions. If
              you need to contact us, please go to the{" "}
              <span>
                <a className={styles.link_color} href="">
                  Help &amps; Customer Service
                </a>
              </span>
              {""} page.
            </h4>
          </div>
          <br />
          <div>
            <div>Your comments: </div>
            <textarea
              name=""
              cols="60"
              rows="10"
              value={comment}
              onChange={(e) => setComment(e.target.value)}></textarea>
            <div>
              <button
                className={styles.feedback_btn}
                onClick={() => handleSubmit()}>
                Submit
              </button>
              <button
                className={styles.feedback_btn}
                onClick={() => handleClose()}>
                cancel
              </button>
            </div>
          </div>
        </Container>
      </Fade>
    </Dialog>
  );
};
