import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getReview, updateReview } from "../actions/reviewActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { REVIEW_UPDATE_RESET } from "../constants/reviewConstants";

import { Link } from "react-router-dom";

const EditReviewScreen = ({ match, history }) => {
  let reviewId = match.params.id;

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const reviewGet = useSelector((state) => state.getReview);
  const { loading, error, review } = reviewGet;

  const reviewUpdate = useSelector((state) => state.reviewUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = reviewUpdate;

  useEffect(() => {
    dispatch(getReview(reviewId));
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: REVIEW_UPDATE_RESET });
      history.push("/manage-reviews");
    } else {
      if (review || review.text || review._id !== reviewId) {
        setTitle(review.title);
        setText(review.text);
        setRating(review.rating);
      } else {
        dispatch(getReview(reviewId));
      }
    }
  }, [dispatch, review, history, reviewId, successUpdate]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateReview({
        _id: reviewId,
        title,
        text,
        rating,
      })
    );
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                to="/manage-reviews"
                className="btn btn-link text-secondary my-3"
              >
                <i className="fas fa-chevron-left"></i> Bootcamp Info
              </Link>
              <h1 className="mb-2">DevWorks Bootcamp</h1>
              <h3 className="text-primary mb-4">Write a Review</h3>
              <p>
                You must have attended and graduated this bootcamp to review
              </p>

              {loadingUpdate && <Spinner />}
              {errorUpdate && (
                <Message variant="danger" delay="3000">
                  {errorUpdate}
                </Message>
              )}

              {loading && <Spinner />}
              {error && (
                <Message variant="danger" delay="3000">
                  {error}
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

export default EditReviewScreen;
