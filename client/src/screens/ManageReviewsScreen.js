import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getReviews, deleteReview } from "../actions/reviewActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { Link } from "react-router-dom";

const ManageReviewsScreen = () => {
  const dispatch = useDispatch();

  const reviewsGet = useSelector((state) => state.getReviews);
  const { loading, error, reviews } = reviewsGet;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const reviewDelete = useSelector((state) => state.deleteReview);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = reviewDelete;

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteReview(id));
    }
  };

  return (
    <section className="container mt-6">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-4">Manage Reviews</h1>

              {loadingDelete && <Spinner />}
              {errorDelete && (
                <Message variant="danger" delay="3000">
                  {errorDelete}{" "}
                </Message>
              )}
              {loading && <Spinner />}
              {error && (
                <Message variant="danger" delay="3000">
                  {error}{" "}
                </Message>
              )}

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Bootcamp</th>
                    <th scope="col">Rating</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {reviews.map(
                    (review) =>
                      review.user === user._id && (
                        <tr key={review._id}>
                          <td>{review.title}</td>
                          <td>{review.rating}</td>
                          <td>
                            <Link
                              to={`/edit-review/${review._id}`}
                              className="btn btn-secondary"
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteHandler(review._id)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageReviewsScreen;
