import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, logout } from "../actions/userActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const UpdatePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const uptPassword = useSelector((state) => state.updatePassword);
  const { loading, error, success } = uptPassword;

  useEffect(() => {
    if (success) {
      dispatch(logout());
    }
  }, [dispatch, success]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("Password do not match!");
    } else {
      dispatch(updatePassword({ currentPassword, newPassword }));
    }
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Update Password</h1>

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
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  <input
                    type="submit"
                    value="Update Password"
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

export default UpdatePasswordScreen;
