import axios from "axios";
import {
  COURSE_CREATE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_DELETE_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  GET_COURSE_FAIL,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
} from "../constants/courseConstants";

export const getCourse = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COURSE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/courses/${id}`);

    dispatch({
      type: GET_COURSE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_COURSE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const createCourse = (course, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_CREATE_REQUEST,
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

    await axios.post(`/api/v1/bootcamps/${id}/courses`, course, config);

    dispatch({
      type: COURSE_CREATE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const updateCourse = (course) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_UPDATE_REQUEST,
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
      `/api/v1/courses/${course._id}`,
      course,
      config
    );

    dispatch({
      type: COURSE_UPDATE_SUCCESS,
    });

    dispatch({ type: GET_COURSE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: COURSE_UPDATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_DELETE_REQUEST,
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

    await axios.delete(`/api/v1/courses/${id}`, config);

    dispatch({
      type: COURSE_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};
