import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createUser } from "../../actions/userAdminActions";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";

import { USER_CREATE_RESET } from "../../constants/usersAdminConstants";

import { Link } from "react-router-dom";

const AddAdminUser = ({ match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const createAminUser = useSelector((state) => state.createUser);
  const { loading, error, success } = createAminUser;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_CREATE_RESET });
      history.push("/manage-users");
    }
  }, [dispatch, success, history]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ name, email, password }));
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
              <h1 className="mb-2">Add User</h1>

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
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="User Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="Add User"
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

export default AddAdminUser;
