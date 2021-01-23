import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getBootcampReview, getBootcamp } from "../actions/bootcampActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { Link } from "react-router-dom";

const ReviewsScreen = ({ match }) => {
  const bootcampId = match.params.id;

  const dispatch = useDispatch();

  const getReviewsBootcamp = useSelector((state) => state.getReviewsBootcamp);
  const { loading, error, reviews } = getReviewsBootcamp;

  const bootcampGet = useSelector((state) => state.getBootcamp);
  const {
    loading: loadingBootcamp,
    error: errorBootcamp,
    bootcamp,
  } = bootcampGet;

  useEffect(() => {
    dispatch(getBootcampReview(bootcampId));
    dispatch(getBootcamp(bootcampId));
  }, [dispatch, bootcampId]);

  return (
    <section className="bootcamp mt-6">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Link
              to={`/bootcamps/${bootcampId}`}
              className="btn btn-secondary my-3"
            >
              <i className="fas fa-chevron-left"></i> Bootcamp Info
            </Link>

            <h1 className="mb-4">DevWorks Bootcamp Reviews</h1>
            {loading && <Spinner />}
            {error && (
              <Message variant="danger" delay="3000">
                {error}{" "}
              </Message>
            )}

            {reviews.map((review) => (
              <div className="card mb-3" key={review._id}>
                <h5 className="card-header bg-dark text-white">
                  {review.title}
                </h5>
                <div className="card-body">
                  <h5 className="card-title">
                    Rating:{" "}
                    <span className="text-success">{review.rating}</span>
                  </h5>
                  <p className="card-text">{review.text}</p>
                  {/* <p className="text-muted">Writtern By Kevin Smith</p> */}
                </div>
              </div>
            ))}
          </div>

          {loadingBootcamp && <Spinner />}
          {errorBootcamp && (
            <Message variant="danger" delay="3000">
              {errorBootcamp}{" "}
            </Message>
          )}
          <div className="col-md-4">
            <h1 className="text-center my-4">
              {bootcamp ? (
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
            <Link to="/add-review" className="btn btn-primary btn-block my-3">
              <i className="fas fa-pencil-alt"></i> Review This Bootcamp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsScreen;
