import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import LoginRegister from "../../Layout/LoginRegister/LoginRegister";
import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Regreq, setRegister } from "../../Redux/user/actions";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checker, setChecker] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const { registered } = useSelector((state) => state.auth);
  let [vertical, horizontal] = ["top", "center"];

  useEffect(() => {
    setTimeout(() => {
      if (registered) {
        dispatch(setRegister(false));
        history.push("/login");
      }
    }, 2000);
  }, [registered]);

  const handleSubmit = () => {
    const payload = {
      name,
      email,
      password,
    };
    dispatch(Regreq(payload));
  };

  const handleChecker = () => {
    if (password === password2) setChecker(true);
    else setChecker(false);
  };

  return (
    <LoginRegister>
      {registered && (
        <Snackbar anchorOrigin={{ vertical, horizontal }} open="true">
          <Alert
            className={styles.alert_success}
            variant="filled"
            severity="success">
            Register Success
          </Alert>
        </Snackbar>
      )}
      <div className={styles.form_wrapper}>
        <h2 className={styles.form_heading}>Create Account</h2>
        <Box>
          <div className={styles.input_wrapper}>
            <label className={styles.label}>Your name</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.input_wrapper}>
            <label className={styles.label}>Email</label>
            <input
              type="text"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.input_wrapper}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              className={styles.input}
              value={password.pass1}
              minLength="6"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={styles.pass_bottom_label}>
              Passwords must be at least 6 characters.
            </label>
          </div>
          <div className={styles.input_wrapper}>
            <label className={styles.label}>Re-enter password</label>
            <input
              type="password"
              className={styles.input}
              value={password.pass2}
              onChange={(e) => setPassword2(e.target.value)}
              onBlur={() => handleChecker()}
            />
          </div>
          <div>
            {!checker ? <div>Password does not match, Please retry!</div> : null}
            <button
              className={styles.btn_primary}
              onClick={handleSubmit}
              disabled={checker ? false : true}>
              Create your Amazon account
            </button>
          </div>
          <div className={styles.form_term_policy}>
            By continuing, you agree to Amazon's{` `}
            <span>
              <a style={{color: "blue"}} href="/">Conditions of Use</a>
            </span>
            {` `}and{` `}
            <span>
              <a style={{color: "blue"}} href="/">Privacy Notice</a>
            </span>
            .
          </div>
          <div className={styles.form_footer}>
            Already have a account?
            <span>
              <a style={{color: "blue"}} href="/login">Sign-In </a>
            </span>
          </div>
        </Box>
      </div>
    </LoginRegister>
  );
};