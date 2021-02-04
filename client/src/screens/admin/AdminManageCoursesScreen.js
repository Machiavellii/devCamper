import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getBootcampCourse, getBootcamp } from "../../actions/bootcampActions";
import { deleteCourse } from "../../actions/courseActions";

import Spinner from "../../components/Spinner";
import Message from "../../components/Message";

const AdminManageCoursesScreen = ({ match }) => {
  const bootcampId = match.params.id;

  const myBootcamp = useSelector((state) => state.getBootcamp);
  const { loading, error, bootcamp, success } = myBootcamp;

  const bootcampCourses = useSelector((state) => state.getCoursesBootcamp);
  const {
    loading: coursesLoading,
    error: errorCourses,
    courses,
  } = bootcampCourses;

  const courseDelete = useSelector((state) => state.deleteCourse);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = courseDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBootcamp(bootcampId));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getBootcampCourse(bootcampId));
    }

    // eslint-disable-next-line
  }, [dispatch, success, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCourse(id));
    }
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to="/manage-bootcamp"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Bootcamp
              </Link>
              <h1 className="mb-4">Manage Courses</h1>

              {loadingDelete && <Spinner />}
              {errorDelete && (
                <Message variant="danger" delay="3000">
                  {errorDelete}{" "}
                </Message>
              )}

              {loading || loading === undefined ? (
                <Spinner />
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
                          src={`/uploads/${bootcamp.photo}`}
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
                          <span className="badge badge-dark mb-2">
                            {bootcamp.location.city}
                          </span>
                          <p className="card-text">
                            {bootcamp.careers.map((career, i) => (
                              <span key={i}>{career}/ </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/add-course/:${bootcamp.id}`}
                    className="btn btn-primary btn-block mb-4"
                  >
                    Add Bootcamp Course
                  </Link>
                </>
              )}

              {coursesLoading && <Spinner />}
              {errorCourses && (
                <Message variant="danger" delay="3000">
                  {errorCourses}{" "}
                </Message>
              )}

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {courses.map((course) => (
                  <tbody key={course._id}>
                    <tr>
                      <td>{course.title}</td>
                      <td>
                        <Link
                          to={`/edit-course/${course._id}`}
                          className="btn btn-secondary"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteHandler(course._id)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminManageCoursesScreen;
