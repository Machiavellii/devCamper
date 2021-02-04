import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { radiusBootcamps } from "../actions/bootcampActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const BootcampsRadiusScreen = () => {
  const zipcodeFromStorage = localStorage.getItem("zipcode")
    ? JSON.parse(localStorage.getItem("zipcode"))
    : null;
  const milesFromStorage = localStorage.getItem("miles")
    ? JSON.parse(localStorage.getItem("miles"))
    : null;

  const dispatch = useDispatch();

  const radius = useSelector((state) => state.bootcampsRadius);
  const { loading, error, bootcamps } = radius;

  useEffect(() => {
    dispatch(radiusBootcamps(zipcodeFromStorage, milesFromStorage));
  }, [dispatch, zipcodeFromStorage, milesFromStorage]);

  return (
    <section className="browse my-6">
      {loading && <Spinner />}
      {error && (
        <Message variant="danger" delay="3000">
          {error}
        </Message>
      )}

      <div className="container">
        <div className="row justify-content-center">
          {/* Main col  */}
          <div className="col-md-10">
            {bootcamps.map((bootcamp) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BootcampsRadiusScreen;
