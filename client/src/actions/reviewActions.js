import axios from "axios";
import {
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEW_FAIL,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  REVIEWS_DELETE_FAIL,
  REVIEWS_DELETE_REQUEST,
  REVIEWS_DELETE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_UPDATE_FAIL,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
} from "../constants/reviewConstants";

export const getReviews = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_REVIEWS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/reviews`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_REVIEW_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/reviews/${id}`);

    dispatch({
      type: GET_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_REVIEW_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const createReview = (review, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/v1/bootcamps/${id}/reviews`, review, config);

    dispatch({
      type: REVIEW_CREATE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const updateReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/v1/reviews/${review._id}`,
      review,
      config
    );

    dispatch({
      type: REVIEW_UPDATE_SUCCESS,
    });

    dispatch({ type: GET_REVIEW_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: REVIEW_UPDATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const deleteReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEWS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/reviews/${id}`, config);

    dispatch({
      type: REVIEWS_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: REVIEWS_DELETE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};
