import {
  COURSE_CREATE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_RESET,
  COURSE_CREATE_SUCCESS,
  COURSE_DELETE_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_RESET,
  COURSE_UPDATE_SUCCESS,
  GET_COURSE_FAIL,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
} from "../constants/courseConstants";

export const createCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return { loading: true };
    case COURSE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case COURSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_UPDATE_REQUEST:
      return { loading: true };
    case COURSE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        course: action.payload,
      };
    case COURSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const courseDeleteReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return { loading: true };
    case COURSE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case COURSE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case GET_COURSE_REQUEST:
      return { loading: true, courses: {} };
    case GET_COURSE_SUCCESS:
      return {
        loading: false,
        course: action.payload.data,
        success: action.payload.success,
      };
    case GET_COURSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
