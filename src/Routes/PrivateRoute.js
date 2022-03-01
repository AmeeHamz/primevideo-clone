import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getActiveUser } from "../Redux/user/actions";
import { useDispatch } from "react-redux";

const PrivateRoute = ({ MyComponent, ...rest }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getActiveUser());
  }, []);
  const { isAuth, userdata } = useSelector((state) => state.auth);
  return isAuth && userdata.subscription ? (
    <Route {...rest} render={(props) => <MyComponent {...props} />} />
  ) : (
    // ) : (
    //   <Route {...rest} render={(props) => <MyComponent {...props} />} />
    // );
    <Redirect to="/" />
  );
};

export default PrivateRoute;
