import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouteRole = ({ component: Component, ...rest }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const {
    user: { role },
  } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) =>
        role === "publisher" || ("admin" && userInfo) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRouteRole;
