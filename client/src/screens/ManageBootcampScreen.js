import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getBootcampMe,
  bootcampPhoto,
  deleteBootcamp,
} from "../actions/bootcampActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Progress from "../components/Progress";

import { Link } from "react-router-dom";

import {
  GET_BOOTCAMP_RESET,
  UPLOAD_BOOTCAMP_COVER_RESET,
} from "../constants/bootcampConstants";

const ManageBootcampScreen = ({ history }) => {
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {
    user: { role },
  } = userDetails;

  const myBootcamp = useSelector((state) => state.getMyBootcamp);
  const { loading, error, bootcamp } = myBootcamp;

  const myBootcampPhoto = useSelector((state) => state.bootcampPhoto);
  const { success: successPhoto } = myBootcampPhoto;

  const bootcampDelete = useSelector((state) => state.bootcampDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bootcampDelete;

  useEffect(() => {
    if (role === "admin") {
      history.push(`/admin-manage-bootcamps`);
    } else {
      dispatch({ type: GET_BOOTCAMP_RESET });
      dispatch(getBootcampMe());
    }

    if (successPhoto) {
      dispatch({ type: UPLOAD_BOOTCAMP_COVER_RESET });
      history.push(`/bootcamps/${bootcamp._id}`);
    }

    // eslint-disable-next-line
  }, [dispatch, successDelete, successPhoto, history]);

  const uploadFileHandler = (e) => {
    setImage(e.target.files[0]);
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const id = bootcamp.id;

    const formData = new FormData();
    formData.append("photo", image);

    dispatch(bootcampPhoto(formData, id, setUploadPercentage));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBootcamp(id));
    }
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4">Manage Bootcamp</h1>

              {loadingDelete && <Spinner />}
              {errorDelete && (
                <Message variant="danger" delay="3000">
                  {errorDelete}{" "}
                </Message>
              )}

              {loading || loading === undefined ? (
                <Spinner />
              ) : bootcamp === undefined ||
                error === "Bootcamp not found this id undefined in database" ? (
                <Link to="/add-bootcamp" className="btn btn-primary btn-block">
                  Add Bootcamp
                </Link>
              ) : error ? (
                <Message variant="danger" delay="3000">
                  {error}
                </Message>
              ) : (
                <>
                  <div className="card mb-3">
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img
                          src={
                            picture === null
                              ? `/uploads/${bootcamp.photo}`
                              : picture
                          }
                          className="card-img"
                          alt={bootcamp.photo}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link to={`/bootcamps/${bootcamp.id}`}>
                              {bootcamp.name}
                            </Link>

                            {bootcamp.averageRating ? (
                              <span className="float-right badge badge-success">
                                {bootcamp.averageRating}
                              </span>
                            ) : (
                              ""
                            )}
                          </h5>
                          {bootcamp.location ? (
                            <span className="badge badge-dark mb-2">
                              {bootcamp.location.city}
                            </span>
                          ) : (
                            ""
                          )}

                          <p className="card-text">
                            {bootcamp.careers.map((career, i) => (
                              <span key={i}>{career}/ </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form className="mb-4" onSubmit={onSubmit}>
                    <div className="form-group ">
                      <input
                        type="file"
                        name="photo"
                        onChange={uploadFileHandler}
                        className="form-control mb-3"
                      />
                    </div>

                    <input
                      type="submit"
                      className={`btn btn-${
                        picture === null ? "light" : "primary"
                      } btn-block`}
                      value={picture === null ? "Upload Image" : "Click Me"}
                    />

                    <Progress percentage={uploadPercentage} />
                  </form>

                  <Link
                    to={`/edit-bootcamp/${bootcamp.id}`}
                    className="btn btn-primary btn-block"
                  >
                    Edit Bootcamp Details
                  </Link>
                  <Link
                    to="/manage-courses"
                    className="btn btn-secondary btn-block"
                  >
                    Manage Courses
                  </Link>
                  <button
                    className="btn btn-danger btn-block"
                    onClick={() => deleteHandler(bootcamp._id)}
                  >
                    Remove Bootcamp
                  </button>
                </>
              )}

              <p className="text-muted mt-5">
                * You can only add one bootcamp per account.
              </p>
              <p className="text-muted">
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBootcampScreen;
