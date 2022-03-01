import React from "react";
import { Box, Grid, Container, Typography, Divider } from "@material-ui/core";
import styles from "./LoginRegister.module.css";

const LoginRegister = (props) => {
  return (
    <Box className={styles.wrapper_container}>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={10} sm={5} md={3} lg={3}>
          <Box className={styles.img_container}>
            <img src="./images/logo.png" width="150" height="47" alt="" />
          </Box>
          <Grid container className={styles.form_container}>
            <div>{props.children}</div>
          </Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <div className={styles.divider} />
      <Container>
        <Grid item xs></Grid>
        <Grid item xs>
          <div className={styles.footer}>
            <ul>
              <li>
                <a style={{color: "blue"}} href="/login">Conditins of use</a>
              </li>
              <li>
                <a style={{color: "blue"}} href="/login">Privacy Notice</a>
              </li>
              <li>
                <a style={{color: "blue"}} href="/login">Help</a>
              </li>
            </ul>
          </div>
          <div className={styles.footer_}>
            © 1996-2021, Amazon.com, Inc. or its affiliates
          </div>
        </Grid>
        <Grid item xs></Grid>
      </Container>
    </Box>
  );
};
export default LoginRegister;
