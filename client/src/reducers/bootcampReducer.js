import {
  BOOTCAMP_CREATE_FAIL,
  BOOTCAMP_CREATE_REQUEST,
  BOOTCAMP_CREATE_RESET,
  BOOTCAMP_CREATE_SUCCESS,
  GET_BOOTCAMPS_FAIL,
  GET_BOOTCAMPS_REQUEST,
  GET_BOOTCAMPS_SUCCESS,
  GET_BOOTCAMP_FAIL,
  GET_BOOTCAMP_REQUEST,
  GET_BOOTCAMP_SUCCESS,
  GET_MY_BOOTCAMP_FAIL,
  GET_MY_BOOTCAMP_REQUEST,
  GET_MY_BOOTCAMP_SUCCESS,
  UPLOAD_BOOTCAMP_COVER_REQUEST,
  UPLOAD_BOOTCAMP_COVER_SUCCESS,
  UPLOAD_BOOTCAMP_COVER_FAIL,
  BOOTCAMP_UPDATE_REQUEST,
  BOOTCAMP_UPDATE_SUCCESS,
  BOOTCAMP_UPDATE_FAIL,
  BOOTCAMP_UPDATE_RESET,
  BOOTCAMP_DELETE_REQUEST,
  BOOTCAMP_DELETE_SUCCESS,
  BOOTCAMP_DELETE_FAIL,
  UPLOAD_BOOTCAMP_COVER_RESET,
  GET_BOOTCAMP_COURSE_REQUEST,
  GET_BOOTCAMP_COURSE_SUCCESS,
  GET_BOOTCAMP_COURSE_FAIL,
  GET_BOOTCAMP_REVIEW_REQUEST,
  GET_BOOTCAMP_REVIEW_SUCCESS,
  GET_BOOTCAMP_REVIEW_FAIL,
  GET_BOOTCAMPS_RADIUS_REQUEST,
  GET_BOOTCAMPS_RADIUS_SUCCESS,
  GET_BOOTCAMPS_RADIUS_FAIL,
  GET_BOOTCAMP_RADIUS_RESET,
} from "../constants/bootcampConstants";

export const bootcampListReducer = (state = { bootcamps: [] }, action) => {
  switch (action.type) {
    case GET_BOOTCAMPS_REQUEST:
      return { loading: true, bootcamps: [] };
    case GET_BOOTCAMPS_SUCCESS:
      return {
        loading: false,
        bootcamps: action.payload.data,
        pages: action.payload.pagination,
        page: action.payload.count,
        success: action.payload.success,
      };
    case GET_BOOTCAMPS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBootcampReducer = (state = { bootcamp: {} }, action) => {
  switch (action.type) {
    case GET_BOOTCAMP_REQUEST:
      return { loading: true, bootcamps: {} };
    case GET_BOOTCAMP_SUCCESS:
      return {
        loading: false,
        bootcamp: action.payload.data,
        success: action.payload.success,
      };
    case GET_BOOTCAMP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getMyBootcampReducer = (state = { bootcamp: {} }, action) => {
  switch (action.type) {
    case GET_MY_BOOTCAMP_REQUEST:
      return { loading: true, bootcamps: {} };
    case GET_MY_BOOTCAMP_SUCCESS:
      return {
        loading: false,
        bootcamp: action.payload.data,
        success: action.payload.success,
      };
    case GET_MY_BOOTCAMP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBootcampCourseReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case GET_BOOTCAMP_COURSE_REQUEST:
      return { loading: true, courses: [] };
    case GET_BOOTCAMP_COURSE_SUCCESS:
      return {
        loading: false,
        courses: action.payload.data,
        success: action.payload.success,
      };
    case GET_BOOTCAMP_COURSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getBootcampReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_BOOTCAMP_REVIEW_REQUEST:
      return { loading: true, reviews: [] };
    case GET_BOOTCAMP_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.data,
        success: action.payload.success,
      };
    case GET_BOOTCAMP_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createBootcampReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOTCAMP_CREATE_REQUEST:
      return { loading: true };
    case BOOTCAMP_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BOOTCAMP_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOTCAMP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bootcampPhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_BOOTCAMP_COVER_REQUEST:
      return { loading: true };
    case UPLOAD_BOOTCAMP_COVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPLOAD_BOOTCAMP_COVER_FAIL:
      return { loading: false, error: action.payload };
    case UPLOAD_BOOTCAMP_COVER_RESET:
      return {};
    default:
      return state;
  }
};

export const updateBootcampReducer = (state = { bootcamp: {} }, action) => {
  switch (action.type) {
    case BOOTCAMP_UPDATE_REQUEST:
      return { loading: true };
    case BOOTCAMP_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        bootcamp: action.payload,
      };
    case BOOTCAMP_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOTCAMP_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bootcampRadiusReducer = (state = { bootcamps: [] }, action) => {
  switch (action.type) {
    case GET_BOOTCAMPS_RADIUS_REQUEST:
      return { loading: true, bootcamps: [] };
    case GET_BOOTCAMPS_RADIUS_SUCCESS:
      return {
        loading: false,
        bootcamps: action.payload.data,
        // pages: action.payload.pagination,
        // page: action.payload.count,
        success: action.payload.success,
      };
    case GET_BOOTCAMPS_RADIUS_FAIL:
      return { loading: false, error: action.payload };
    case GET_BOOTCAMP_RADIUS_RESET:
      return {
        bootcamps: [],
      };
    default:
      return state;
  }
};

export const bootcampDeleteReducer = (state = { bootcamp: {} }, action) => {
  switch (action.type) {
    case BOOTCAMP_DELETE_REQUEST:
      return { loading: true };
    case BOOTCAMP_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BOOTCAMP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
