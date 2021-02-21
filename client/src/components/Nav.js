import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserDetails } from "../actions/userActions";

const Nav = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    user: { role },
  } = userDetails;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.success) {
        dispatch(getUserDetails());
      }
    }
    // else {
    //   localStorage.removeItem("user");
    // }

    setTimeout(() => dispatch(logout()), 36000000);
  }, [dispatch, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-laptop-code"></i> DevCamper
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {userInfo ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                >
                  <i className="fas fa-user"></i> Account
                </a>
                <div className="dropdown-menu">
                  {role === "publisher" || "admin" ? (
                    <Link to="/manage-bootcamp" className="dropdown-item">
                      Manage Bootcamp
                    </Link>
                  ) : (
                    ""
                  )}
                  {role === "admin" ? (
                    <>
                      <Link to="/manage-users" className="dropdown-item">
                        Manage Users
                      </Link>
                      <Link to="/add-user" className="dropdown-item">
                        Create User
                      </Link>
                    </>
                  ) : (
                    ""
                  )}

                  <Link className="dropdown-item" to="/manage-reviews">
                    Manage Reviews
                  </Link>
                  <Link className="dropdown-item" to="/manage-account">
                    Manage Account
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={logoutHandler}
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </Link>
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item d-none d-sm-block">
              <a className="nav-link" href="#!">
                |
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bootcamps">
                Browse Bootcamps
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
