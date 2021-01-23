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
  REVIEW_CREATE_RESET,
  REVIEW_CREATE_SUCCESS,
  REVIEW_UPDATE_FAIL,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_RESET,
  REVIEW_UPDATE_SUCCESS,
} from "../constants/reviewConstants";

export const getReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return { loading: true, reviews: [] };
    case GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.data,
        success: action.payload.success,
      };
    case GET_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getReviewReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case GET_REVIEW_REQUEST:
      return { loading: true, review: {} };
    case GET_REVIEW_SUCCESS:
      return {
        loading: false,
        review: action.payload.data,
        success: action.payload.success,
      };
    case GET_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true };
    case REVIEW_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateReviewReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case REVIEW_UPDATE_REQUEST:
      return { loading: true };
    case REVIEW_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        review: action.payload,
      };
    case REVIEW_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const reviewDeleteReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case REVIEWS_DELETE_REQUEST:
      return { loading: true };
    case REVIEWS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REVIEWS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
