import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listBootcamps, radiusBootcamps } from "../actions/bootcampActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { GET_BOOTCAMP_RADIUS_RESET } from "../constants/bootcampConstants";
import Pagination from "../components/Pagination";
import qs from "query-string";

const BootcampsScreen = ({ match }) => {
  const limit = match.params.limit || 5;

  const [miles, setMiles] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [averageCost, setAverageCost] = useState("");
  const [toggleSortByName, setToggleSortByName] = useState(false);

  const dispatch = useDispatch();

  const bootcampsList = useSelector((state) => state.bootcampList);
  const { loading, error, bootcamps, pages, count } = bootcampsList;

  const radius = useSelector((state) => state.bootcampsRadius);
  const {
    loading: loadingRadius,
    error: errorRadius,
    bootcamps: bootcampsRadius,
  } = radius;

  const queryParam = qs.parse(useLocation().search);

  const sortName = {
    ...queryParam,
    sort: toggleSortByName ? "name" : "-name",
  };

  useEffect(() => {
    dispatch(listBootcamps(sortName));
  }, [dispatch, toggleSortByName]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(radiusBootcamps(zipcode, miles));

    setMiles("");
    setZipcode("");
  };

  const onClick = () => {
    dispatch({ type: GET_BOOTCAMP_RADIUS_RESET });
  };

  // Get current posts
  const indexOfLastContent = currentPage * limit;
  const indexOfFirstContent = indexOfLastContent - limit;

  const currentContent = bootcamps.slice(
    indexOfFirstContent,
    indexOfLastContent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="browse my-6">
      {loadingRadius && <Spinner />}
      {errorRadius && (
        <Message variant="danger" delay="3000">
          {errorRadius}
        </Message>
      )}

      {loading && <Spinner />}
      {error && (
        <Message variant="danger" delay="3000">
          {error}
        </Message>
      )}

      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-4">
            <div className="card card-body mb-4">
              <h4 className="mb-3">By Location</h4>
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="miles"
                        placeholder="Miles From"
                        value={miles}
                        onChange={(e) => setMiles(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="zipcode"
                        placeholder="Enter Zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {bootcampsRadius.length > 0 ? (
                  <button
                    className="btn btn-danger btn-block"
                    onClick={onClick}
                  >
                    Reset
                  </button>
                ) : (
                  <input
                    type="submit"
                    value="Find Bootcamps"
                    className="btn btn-primary btn-block"
                  />
                )}
              </form>
            </div>

            <h4>Filter</h4>
            <form>
              <div className="form-group">
                <label> Career</label>
                <select
                  className="custom-select mb-2"
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="any" defaultValue>
                    Any
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label> Rating</label>
                <select
                  className="custom-select mb-2"
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="any" defaultValue>
                    Any
                  </option>
                  <option value="9">9+</option>
                  <option value="8">8+</option>
                  <option value="7">7+</option>
                  <option value="6">6+</option>
                  <option value="5">5+</option>
                  <option value="4">4+</option>
                  <option value="3">3+</option>
                  <option value="2">2+</option>
                </select>
              </div>

              <div className="form-group">
                <label> Budget</label>
                <select
                  className="custom-select mb-2"
                  // onChange={(e) => setAverageCost(e.target.value)}
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="any" defaultValue>
                    Any
                  </option>
                  <option value="20000">$20,000</option>
                  <option value="15000">$15,000</option>
                  <option value="10000">$10,000</option>
                  <option value="8000">$8,000</option>
                  <option value="6000">$6,000</option>
                  <option value="4000">$4,000</option>
                  <option value="2000">$2,000</option>
                </select>
              </div>
              <input
                type="submit"
                value="Find Bootcamps"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>

          {/* Main col  */}
          <div className="col-md-8">
            {bootcampsRadius.length > 0
              ? bootcampsRadius.map((bootcamp) => (
                  <div className="card mb-3" key={bootcamp._id}>
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
                            <Link to={`/bootcamps/${bootcamp._id}`}>
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
                ))
              : currentContent.map((bootcamp) => (
                  <div className="card mb-3" key={bootcamp._id}>
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
                            <Link to={`/bootcamps/${bootcamp._id}`}>
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
                            {bootcamp.courses.map((course) => (
                              <span key={course._id}>{course.title}/ </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            <Pagination
              contentsPerPage={limit}
              totalContent={bootcamps.length}
              paginate={paginate}
            />

            <span
              onClick={(e) => setToggleSortByName(!toggleSortByName)}
              style={{ cursor: "pointer", border: "unset" }}
              className="page-link float-right"
            >
              {toggleSortByName ? "Reset Sort" : "Sort By Name"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BootcampsScreen;
