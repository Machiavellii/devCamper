import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createCourse } from "../actions/courseActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { COURSE_CREATE_RESET } from "../constants/courseConstants";

import { Link } from "react-router-dom";

const AddCourseScreen = ({ match, history }) => {
  let bootcampId = match.params.id;
  bootcampId = bootcampId.substring(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [weeks, setWeeks] = useState(0);
  const [tuition, setTuition] = useState(0);
  const [minimumSkill, setMinimumSkill] = useState("");
  const [scholarshipAvailable, setScholarshipAvailable] = useState(false);

  const dispatch = useDispatch();

  const courseCreate = useSelector((state) => state.courseCreate);
  const { loading, error, success } = courseCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: COURSE_CREATE_RESET });
      history.push("/manage-courses");
    }
  }, [dispatch, success, history]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createCourse(
        {
          title,
          description,
          weeks,
          tuition,
          minimumSkill,
          scholarshipAvailable,
        },
        bootcampId
      )
    );
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to="/manage-courses"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Manage Courses
              </Link>
              <h1 className="mb-2">DevWorks Bootcamp</h1>
              <h3 className="text-primary mb-4">Add Course</h3>

              {loading && <Spinner />}
              {error && (
                <Message variant="danger" delay="3000">
                  {error}
                </Message>
              )}

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Course Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="number"
                    name="weeks"
                    placeholder="Duration"
                    className="form-control"
                    value={weeks}
                    onChange={(e) => setWeeks(e.target.value)}
                    required
                  />
                  <small className="form-text text-muted">
                    Enter number of weeks course lasts
                  </small>
                </div>
                <div className="form-group">
                  <label>Course Tuition</label>
                  <input
                    type="number"
                    name="tuition"
                    placeholder="Tuition"
                    className="form-control"
                    value={tuition}
                    onChange={(e) => setTuition(e.target.value)}
                    required
                  />
                  <small className="form-text text-muted">USD Currency</small>
                </div>
                <div className="form-group">
                  <label>Minimum Skill Required</label>

                  <select
                    name="minimumSkill"
                    className="form-control"
                    value={minimumSkill}
                    onChange={(e) => setMinimumSkill(e.target.value)}
                  >
                    <option value="beginner" defaultValue>
                      Beginner (Any)
                    </option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    rows="5"
                    className="form-control"
                    placeholder="Course description summary"
                    maxLength="500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="scholarshipAvailable"
                    id="scholarshipAvailable"
                    checked={scholarshipAvailable}
                    onChange={(e) =>
                      setScholarshipAvailable(
                        e.target.type === "checkbox"
                          ? e.target.checked
                          : e.target.value
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="scholarshipAvailable"
                  >
                    Scholarship Available
                  </label>
                </div>
                <div className="form-group mt-4">
                  <input
                    type="submit"
                    value="Add Course"
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

export default AddCourseScreen;
