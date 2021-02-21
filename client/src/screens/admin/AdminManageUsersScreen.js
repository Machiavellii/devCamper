import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getUsers, deleteAdminUser } from "../../actions/userAdminActions";

import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import { Link } from "react-router-dom";

import Moment from "react-moment";

const AdminManageUsersScreen = () => {
  const dispatch = useDispatch();

  const adminUsers = useSelector((state) => state.adminUsers);
  const { users, loading, error } = adminUsers;

  const deleteUser = useSelector((state) => state.deleteUser);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteUser;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteAdminUser(id));
    }
  };

  // console.log(users);

  return (
    <section className="containet mt-6">
      <div className="row">
        {loading && <Spinner />}
        {error && (
          <Message variant="danger" delay="3000">
            {error}
          </Message>
        )}

        {loadingDelete && <Spinner />}
        {errorDelete && (
          <Message variant="danger" delay="3000">
            {errorDelete}{" "}
          </Message>
        )}

        {users.map((user) => (
          <div className="card bg-white col-md-6 mb-2" key={user._id}>
            <div className="card-body ">
              <div className="card mb-3">
                <div className="row no-gutters admin-badge">
                  <div className="col-md-4 my-badge-box">
                    <span className=" badge badge-light">Name:</span>
                    <span className=" badge badge-light">Email:</span>
                    <span className=" badge badge-light">Role:</span>
                    <span className=" badge badge-light">Created At:</span>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <span className=" badge badge-light">{user.name}</span>
                      <span className=" badge badge-light">{user.email}</span>
                      <span className=" badge badge-light">{user.role}</span>
                      <span className=" badge badge-light">
                        <Moment format="DD/MM/YYYY">{user.createtAt}</Moment>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row no-gutters">
                <div className="col-md-6">
                  <Link
                    to={`/edit-user/${user._id}`}
                    className="btn btn-secondary btn-block mb-1"
                  >
                    Edit User
                  </Link>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminManageUsersScreen;
