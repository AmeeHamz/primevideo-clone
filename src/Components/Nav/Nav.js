import React from "react";
import { AppBar, Avatar, ClickAwayListener, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { Search } from "../Search/Search";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { LandingNav } from "../LandingNav/LandingNav";
import { logout } from "../../Redux/user/actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    maxHeight: "72px",
    backgroundColor: "#1A242F",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    bottom: "20%",
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  homeIcon: {
    color: "white",
  },
  avatar: {
    margin: "10px",
  },
  subnav_links: {
    textDecoration: "none",
    color: "white",
  },
}));

export function Nav() {
  const classes = useStyles();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openNavLink, setOpenNavLink] = React.useState(false);
  const {userdata, isAuth} = useSelector(state => state.auth)
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickNavLink = () => {
    setOpenNavLink((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickAwayNavLink = () => {
    setOpenNavLink(false);
  };

  const queryHandler = (e) => {
    history.push(`/search?q=${query}`);
    setQuery("");
    // dispatch something on pressing enter (no clicks required)
  };

  return (
    <>
      { isAuth && userdata.subscription ? 
      (<div className={classes.root}>
        <AppBar id="appbar1" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div className={styles.navlink_wrapper_left}>
              <NavLink to="/">
                <img
                  className={styles.logo}
                  src="https://amazonuk.gcs-web.com/system/files-encrypted/nasdaq_kms/inline-images/Prime_Video_Logo.png"
                  alt="prime_logo"
                />
              </NavLink>
              <NavLink
                className={styles.home_nav}
                to="/"
                exact
                style={{ borderBottom: "0px" }}
                activeStyle={{ borderBottom: "1px solid white" }}>
                Home
              </NavLink>
              <ClickAwayListener onClickAway={handleClickAwayNavLink}>
                <div className={styles.drop}>
                  <div
                    className={styles.dropdown_wrapper}
                    onClick={handleClickNavLink}>
                    <div>Browse..</div>
                    {openNavLink ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </div>
                  {openNavLink ? (
                    <div className={styles.dropdown_navlink_container}>
                      <div className={styles.dropdown_navlink_wrapper}>
                        <NavLink className={styles.dropdown_navlink} to="/" exact>
                          Home
                        </NavLink>
                        <hr />
                        <NavLink
                          className={styles.dropdown_navlink}
                          to="/tv-shows">
                          TV Shows
                        </NavLink>
                        <hr />
                        <NavLink className={styles.dropdown_navlink} to="/movies">
                          Movies
                        </NavLink>
                        <hr />
                        <NavLink className={styles.dropdown_navlink} to="/kids">
                          Kids
                        </NavLink>
                      </div>
                    </div>
                  ) : null}
                </div>
              </ClickAwayListener>
              <NavLink
                className={styles.nav}
                to="/tv-shows"
                activeStyle={{ borderBottom: "1px solid white" }}>
                TV Shows
              </NavLink>
              <NavLink
                className={styles.nav}
                to="/movies"
                activeStyle={{ borderBottom: "1px solid white" }}>
                Movies
              </NavLink>
              <NavLink
                className={styles.nav}
                to="/kids"
                activeStyle={{ borderBottom: "1px solid white" }}>
                Kids
              </NavLink>
            </div>
            <div className={styles.navlink_wrapper_right}>
              <Search
                setQuery={setQuery}
                query={query}
                queryHandler={queryHandler}
              />
              <Avatar className={classes.avatar} />
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                  <div className={styles.dropdown_wrapper} onClick={handleClick}>
                    <div>{userdata.name}</div>
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </div>
                  {open ? (
                    <div className={styles.dropdown}>
                      <div className={styles.subnav_left_wrapper}>
                        <NavLink
                          className={classes.subnav_links}
                          to="/your-watchlist"
                          exact>
                          Your Watchlist
                        </NavLink>
                        <NavLink
                          className={classes.subnav_links}
                          to="/account-settings"
                          exact>
                          Account &amp; Settings
                        </NavLink>
                        <NavLink
                          className={classes.subnav_links}
                          to="/watch-anywhere"
                          exact>
                          Watch Anywhere
                        </NavLink>
                        <NavLink
                          className={classes.subnav_links}
                          to="/help"
                          exact>
                          Help
                        </NavLink>
                        <div onClick={() => dispatch(logout())}>
                          Not {userdata.name}? Sign Out
                        </div>
                      </div>
                      <div className={styles.subnav_right_wrapper}>
                        <div className={styles.sub_nav_avatar_wrapper}>
                          <Avatar />
                          <div style={{ marginLeft: "5px" }}>User1</div>
                        </div>
                        <div className={styles.sub_nav_avatar_wrapper}>
                          <Avatar />
                          <div style={{ marginLeft: "5px" }}>Kids</div>
                        </div>
                        <div className={styles.sub_nav_avatar_wrapper}>
                          <Avatar>+</Avatar>
                          <div style={{ marginLeft: "5px" }}>Add new</div>
                        </div>
                        <NavLink
                          className={classes.subnav_links}
                          to="/manage-profiles"
                          exact>
                          Manage profile
                        </NavLink>
                        <NavLink
                          className={classes.subnav_links}
                          to="/learn-more"
                          exact>
                          Learn more
                        </NavLink>
                      </div>
                    </div>
                  ) : null}
                </div>
              </ClickAwayListener>
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar></Toolbar>
      </div>) : <LandingNav/> }
    </>
  );
}
