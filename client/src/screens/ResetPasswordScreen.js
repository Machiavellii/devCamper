import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../actions/userActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { FORGOT_PASSWORD_RESET } from "../constants/userConstants";

import { Link } from "react-router-dom";

const ResetPasswordScreen = ({ history }) => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const forgotPass = useSelector((state) => state.forgotPassword);
  const { loading, error, success } = forgotPass;

  useEffect(() => {
    if (success) {
      history.push("/new-password");
      dispatch({
        type: FORGOT_PASSWORD_RESET,
      });
    }
  }, [history, success, dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link to="/login">Back to login</Link>
              <h1 className="mb-2">Reset Password</h1>
              <p>
                {" "}
                Use this form to reset your password using the registered email
                address.
              </p>

              {loading && <Spinner />}
              {error && (
                <Message variant="danger" delay="3000">
                  {error}
                </Message>
              )}

              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <label>Enter Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email address"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="Reset Password"
                    className="btn btn-dark btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordScreen;
