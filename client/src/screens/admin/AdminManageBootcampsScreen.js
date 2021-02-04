import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  bootcampPhoto,
  deleteBootcamp,
  listBootcamps,
} from "../../actions/bootcampActions";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import Progress from "../../components/Progress";

import { Link } from "react-router-dom";

import {
  UPLOAD_BOOTCAMP_COVER_RESET,
  GET_BOOTCAMP_RESET,
} from "../../constants/bootcampConstants";

const AdminManageBootcampsScreen = ({ history }) => {
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const dispatch = useDispatch();

  const myBootcampPhoto = useSelector((state) => state.bootcampPhoto);
  const { success: successPhoto } = myBootcampPhoto;

  const bootcampDelete = useSelector((state) => state.bootcampDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bootcampDelete;

  const bootcampsList = useSelector((state) => state.bootcampList);
  const { loading, error, bootcamps, pages, count } = bootcampsList;

  useEffect(() => {
    dispatch({ type: GET_BOOTCAMP_RESET });
    dispatch(listBootcamps("", ""));

    // if (successPhoto) {
    //   dispatch({ type: UPLOAD_BOOTCAMP_COVER_RESET });
    //   history.push(`/bootcamps/${bootcamp._id}`);
    // }
  }, [dispatch, successDelete, successPhoto]);

  // console.log(bootcamps);

  const uploadFileHandler = (e) => {
    setImage(e.target.files[0]);
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const id = bootcamp.id;

    const formData = new FormData();
    formData.append("photo", image);

    // dispatch(bootcampPhoto(formData, id, setUploadPercentage));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBootcamp(id));
    }
  };

  return (
    <section className="container mt-6">
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

        {bootcamps.map((bootcamp) => (
          <div className="card bg-white col-md-6 mb-2" key={bootcamp.id}>
            <div className="card-body ">
              {/* <div className="col-md-8"> */}
              <div className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={
                        picture === null
                          ? `/uploads/${bootcamp.photo}`
                          : picture
                      }
                      className="card-img h-100"
                      alt={bootcamp.photo}
                      style={{ objectFit: "cover" }}
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

                      {/* <p className="card-text">
                        {bootcamp.careers.map((career, i) => (
                          <span key={i}>{career}/ </span>
                        ))}
                      </p> */}
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
                to={`/admin-manage-courses/${bootcamp._id}`}
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

              {/* </div> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminManageBootcampsScreen;
