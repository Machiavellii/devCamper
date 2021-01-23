import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../actions/userActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const NewPasswordScreen = ({ history }) => {
  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const resetPass = useSelector((state) => state.resetPassword);
  const { loading, error, success } = resetPass;

  useEffect(() => {
    if (success) {
      history.push("/login");
    }
  }, [history, success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmNewPassword) {
      setMessage("Password do not match!");
    } else {
      dispatch(resetPassword(token, { password }));
    }
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Reset Password</h1>
              <p>
                {" "}
                Use this form to reset your password..(Check your email box for
                password token)
              </p>

              {loading && <Spinner />}
              {error && (
                <Message variant="danger" delay="3000">
                  {error}
                </Message>
              )}
              {message && (
                <Message variant="danger" delay="3000">
                  {message}
                </Message>
              )}

              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="newPassword2"
                    className="form-control"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Password Token </label>
                  <input
                    type="text"
                    name="token"
                    className="form-control"
                    placeholder="Password Token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
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

export default NewPasswordScreen;
