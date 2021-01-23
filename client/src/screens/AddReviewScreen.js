import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createReview } from "../actions/reviewActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { REVIEW_CREATE_RESET } from "../constants/reviewConstants";

import { Link } from "react-router-dom";

const AddReviewScreen = ({ match, history }) => {
  let bootcampId = match.params.id;

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { loading, error, success } = reviewCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: REVIEW_CREATE_RESET });
      history.push("/manage-reviews");
    }
  }, [dispatch, success, history]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createReview({ rating, title, text }, bootcampId));
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to={`/bootcamps/${bootcampId}`}
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Bootcamp Info
              </Link>
              <h1 className="mb-2">DevWorks Bootcamp</h1>
              <h3 className="text-primary mb-4">Write a Review</h3>
              <p>
                You must have attended and graduated this bootcamp to review
              </p>

              {loading && <Spinner />}
              {error && (
                <Message variant="danger" delay="3000">
                  {error === "Duplicate field value entered"
                    ? "Sorry, you already written review in this bootcamp!"
                    : error}
                </Message>
              )}

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="rating">
                    Rating: <span className="text-primary">{rating}</span>
                  </label>
                  <input
                    type="range"
                    className="custom-range"
                    min="1"
                    max="10"
                    step="1"
                    value={rating}
                    id="rating"
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Review title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="text"
                    rows="10"
                    className="form-control"
                    placeholder="Your review"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Submit Review"
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

export default AddReviewScreen;
