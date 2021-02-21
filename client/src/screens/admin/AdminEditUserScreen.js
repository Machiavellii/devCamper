import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../actions/userAdminActions";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";

import { USER_UPDATE_RESET } from "../../constants/usersAdminConstants";

import { Link } from "react-router-dom";

const AdminEditUserScreen = ({ match, history }) => {
  let userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  const getAdminUser = useSelector((state) => state.getAdminUser);
  const { loading, error, user } = getAdminUser;

  const updateAdminUser = useSelector((state) => state.updateAdminUser);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateAdminUser;

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/manage-users");
    } else {
      if (user || user.name || user._id !== userId) {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      } else {
        dispatch(getUser(userId));
      }
    }
  }, [dispatch, user, history, userId, successUpdate]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        role,
      })
    );
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to="/manage-users"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Users
              </Link>
              <h1 className="mb-2">Edit User</h1>

              {loadingUpdate && <Spinner />}
              {errorUpdate && (
                <Message variant="danger" delay="3000">
                  {errorUpdate}
                </Message>
              )}

              {loading && <Spinner />}
              {error && (
                <Message variant="danger" delay="3000">
                  {error}
                </Message>
              )}

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="User Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="card card-body mb-3">
                  <h5>User Role</h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      value="user"
                      id="user"
                      onChange={(e) => setRole(e.target.value)}
                      checked={role === "user"}
                    />
                    <label htmlFor="user" className="form-check-label">
                      Regular User (Browse, Write reviews, etc)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      value="publisher"
                      id="publisher"
                      onChange={(e) => setRole(e.target.value)}
                      checked={role === "publisher"}
                    />
                    <label htmlFor="publisher" className="form-check-label">
                      Bootcamp Publisher
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="Edit User"
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

export default AdminEditUserScreen;
