import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../Pages/Login/Login";
import { Feed } from "../Pages/Feed/Feed";
import { Register } from "../Pages/Register/Register";
import { Nav } from "../Components/Nav";
import { SearchResult } from "../Pages/SearchResult/SearchResult";
import ViewMedia from "../Pages/View/ViewMedia";
import MediaPlayer from "../Pages/MediaPlayer/MediaPlayer";
import { LandingPage } from "../Pages/LandingPage/LandingPage";
import { Payment } from "../Pages/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import { Watchlist } from "../Pages/WatchList/Watchlist";
import { Series } from "../Pages/Series/Series";
import { Movies } from "../Pages/Movies/Movies";
import { Footer } from "../Components/Footer/Footer";

export const Routes = () => {
  return (
    <div>
        <Route path="/" render={() => <Nav />} />
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/register" exact render={() => <Register />} />
      <Switch>
        <Route path="/payment" exact render={() => <Payment />} />
        <PrivateRoute path="/search" exact MyComponent={SearchResult} />
        <Route path="/" exact render={() => <LandingPage />} />
        <PrivateRoute path="/home" exact MyComponent={Feed} />
        <PrivateRoute path="/tv-shows" exact MyComponent={Series} />
        <PrivateRoute path="/movies" exact MyComponent={Movies} />
        <PrivateRoute
          path="/media/:id"
          exact
          MyComponent={ViewMedia}
        />
        <PrivateRoute
          path="/player/:title"
          exact
          MyComponent={MediaPlayer} />
          <PrivateRoute
          path="/your-watchlist"
          exact
          MyComponent={Watchlist} />
      </Switch>
      <Route path="/" render={() => <Footer></Footer>} />
    </div>
  );
};