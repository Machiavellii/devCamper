import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getBootcamp, getBootcampCourse } from "../actions/bootcampActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { Link } from "react-router-dom";

const BootcampScreen = ({ match }) => {
  const bootcampId = match.params.id;

  const dispatch = useDispatch();

  const bootcampGet = useSelector((state) => state.getBootcamp);
  const { loading, error, bootcamp } = bootcampGet;

  const bootcampCourses = useSelector((state) => state.getCoursesBootcamp);
  const {
    loading: coursesLoading,
    error: errorCourses,
    courses,
  } = bootcampCourses;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getBootcamp(bootcampId));
    dispatch(getBootcampCourse(bootcampId));
  }, [dispatch, bootcampId]);

  return (
    <section className="bootcamp mt-6">
      {loading || loading === undefined ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger" delay="3000">
          {error}
        </Message>
      ) : (
        <div className="container">
          <div className="row" key={bootcamp._id}>
            <div className="col-md-8">
              <h1>{bootcamp.name}</h1>
              <p>{bootcamp.description}</p>
              {/* <!-- Avg cost --> */}
              <p className="lead mb-4">
                {bootcamp.averageCost ? (
                  <>
                    Average Course Cost:{" "}
                    <span className="text-primary">
                      ${bootcamp.averageCost}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </p>

              {/* <!-- Courses --> */}

              {coursesLoading && <Spinner />}
              {errorCourses && (
                <Message variant="danger" delay="3000">
                  {errorCourses}
                </Message>
              )}
              {courses.map((courses) => (
                <div className="card mb-3" key={courses._id}>
                  <h5 className="card-header bg-primary text-white">
                    {courses.title}
                  </h5>
                  <div className="card-body">
                    <h5 className="card-title">
                      Duration: {courses.weeks} Weeks
                    </h5>
                    <p className="card-text">{courses.description}</p>
                    <ul className="list-group mb-3">
                      <li className="list-group-item">
                        Cost: ${courses.tuition} USD
                      </li>
                      <li className="list-group-item">
                        Skill Required: {courses.minimumSkill}
                      </li>
                      <li className="list-group-item">
                        Scholarship Available:{" "}
                        {courses.scholarshipAvailable ? (
                          <i className="fas fa-check text-success"></i>
                        ) : (
                          <i className="fas fa-times text-danger"></i>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* <!-- Sidebar --> */}
            <div className="col-md-4">
              <img
                src={`/uploads/${bootcamp.photo}`}
                className="img-thumbnail"
                alt={bootcamp.photo}
              />

              <h1 className="text-center my-4">
                {bootcamp.averageRating ? (
                  <>
                    <span className="badge badge-secondary badge-success rounded-circle p-3">
                      {bootcamp.averageRating}
                    </span>{" "}
                    Rating
                  </>
                ) : (
                  ""
                )}
              </h1>

              {userInfo && user._id !== bootcamp.user ? (
                <Link
                  to={`/add-review/${bootcamp._id}`}
                  className="btn btn-light btn-block my-3"
                >
                  <i className="fas fa-pencil-alt"></i> Write a Review
                </Link>
              ) : (
                ""
              )}

              <Link
                to={`/reviews/${bootcamp._id}`}
                className="btn btn-dark btn-block my-3"
              >
                <i className="fas fa-comments"></i> Read Reviews
              </Link>
              <a
                href={bootcamp.website}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-block my-3"
              >
                <i className="fas fa-globe"></i> Visit Website
              </a>

              <div id="map" style={{ width: "100%", height: "300px" }}></div>

              <ul className="list-group list-group-flush mt-4">
                <li className="list-group-item">
                  {bootcamp.housing ? (
                    <i className="fas fa-check text-success"></i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}{" "}
                  Housing
                </li>
                <li className="list-group-item">
                  {bootcamp.jobAssistance ? (
                    <i className="fas fa-check text-success"></i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}{" "}
                  Job Assistance
                </li>
                <li className="list-group-item">
                  {bootcamp.jobGuarantee ? (
                    <i className="fas fa-check text-success"></i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}{" "}
                  Job Guarantee
                </li>
                <li className="list-group-item">
                  {bootcamp.acceptGi ? (
                    <i className="fas fa-check text-success"></i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}{" "}
                  Accepts GI Bill
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BootcampScreen;
