import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

import { Link } from "react-router-dom";

const ManageAccountScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, user, successUpdate, history]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser({ name, email }));
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Manage Account</h1>

              {loadingUpdate && <Spinner />}
              {errorUpdate && (
                <Message variant="danger" delay="3000">
                  {errorUpdate}
                </Message>
              )}

              {loading ? (
                <Spinner />
              ) : error ? (
                <Message variant="danger" delay="3000">
                  {error}
                </Message>
              ) : (
                <form onSubmit={onSubmitHandler}>
                  <div className="form-group">
                    <label>Name</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="submit"
                          value="Save"
                          className="btn btn-success btn-block"
                        />
                      </div>
                      <div className="col-md-6">
                        <Link
                          to="/update-password"
                          className="btn btn-secondary btn-block"
                        >
                          Update Password
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageAccountScreen;
