import axios from "axios";
import {
  BOOTCAMP_CREATE_FAIL,
  BOOTCAMP_CREATE_REQUEST,
  BOOTCAMP_CREATE_SUCCESS,
  BOOTCAMP_DELETE_FAIL,
  BOOTCAMP_DELETE_REQUEST,
  BOOTCAMP_DELETE_SUCCESS,
  BOOTCAMP_DETAILS_SUCCESS,
  BOOTCAMP_UPDATE_FAIL,
  BOOTCAMP_UPDATE_REQUEST,
  BOOTCAMP_UPDATE_SUCCESS,
  GET_BOOTCAMPS_FAIL,
  GET_BOOTCAMPS_RADIUS_FAIL,
  GET_BOOTCAMPS_RADIUS_REQUEST,
  GET_BOOTCAMPS_RADIUS_SUCCESS,
  GET_BOOTCAMPS_REQUEST,
  GET_BOOTCAMPS_SUCCESS,
  GET_BOOTCAMP_COURSE_FAIL,
  GET_BOOTCAMP_COURSE_REQUEST,
  GET_BOOTCAMP_COURSE_SUCCESS,
  GET_BOOTCAMP_FAIL,
  GET_BOOTCAMP_REQUEST,
  GET_BOOTCAMP_REVIEW_FAIL,
  GET_BOOTCAMP_REVIEW_REQUEST,
  GET_BOOTCAMP_REVIEW_SUCCESS,
  GET_BOOTCAMP_SUCCESS,
  GET_MY_BOOTCAMP_FAIL,
  GET_MY_BOOTCAMP_REQUEST,
  GET_MY_BOOTCAMP_SUCCESS,
  UPLOAD_BOOTCAMP_COVER_FAIL,
  UPLOAD_BOOTCAMP_COVER_REQUEST,
  UPLOAD_BOOTCAMP_COVER_SUCCESS,
} from "../constants/bootcampConstants";
import qs from "query-string";

export const listBootcamps = (query) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOTCAMPS_REQUEST,
    });

    // console.log(qs.stringify(query));

    const { data } = await axios.get(`api/v1/bootcamps?${qs.stringify(query)}`);

    dispatch({
      type: GET_BOOTCAMPS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_BOOTCAMPS_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getBootcamp = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOTCAMP_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/bootcamps/${id}`);

    dispatch({
      type: GET_BOOTCAMP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_BOOTCAMP_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getBootcampCourse = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOTCAMP_COURSE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/bootcamps/${id}/courses`);

    dispatch({
      type: GET_BOOTCAMP_COURSE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_BOOTCAMP_COURSE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getBootcampReview = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOTCAMP_REVIEW_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/bootcamps/${id}/reviews`);

    dispatch({
      type: GET_BOOTCAMP_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_BOOTCAMP_REVIEW_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getBootcampMe = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MY_BOOTCAMP_REQUEST,
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

    const { data } = await axios.get(`/api/v1/bootcamps/me`, config);

    dispatch({
      type: GET_MY_BOOTCAMP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_MY_BOOTCAMP_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const createBootcamp = (bootcamp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOTCAMP_CREATE_REQUEST,
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

    await axios.post(`/api/v1/bootcamps`, bootcamp, config);

    dispatch({
      type: BOOTCAMP_CREATE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: BOOTCAMP_CREATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const bootcampPhoto = (formFile, id, setUploadPercentage) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: UPLOAD_BOOTCAMP_COVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );

        //Clear Progress bar
        setTimeout(() => setUploadPercentage(0), 4000);
      },
    };

    await axios.put(`/api/v1/bootcamps/${id}/photo`, formFile, config);

    dispatch({
      type: UPLOAD_BOOTCAMP_COVER_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: UPLOAD_BOOTCAMP_COVER_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const updateBootcamp = (bootcamp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOTCAMP_UPDATE_REQUEST,
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
      `/api/v1/bootcamps/${bootcamp._id}`,
      bootcamp,
      config
    );

    dispatch({
      type: BOOTCAMP_UPDATE_SUCCESS,
    });

    dispatch({ type: BOOTCAMP_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BOOTCAMP_UPDATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const radiusBootcamps = (zipcode, miles) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BOOTCAMPS_RADIUS_REQUEST,
    });

    const { data } = await axios.get(
      `api/v1/bootcamps/radius/${zipcode}/${miles}`
    );

    dispatch({
      type: GET_BOOTCAMPS_RADIUS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_BOOTCAMPS_RADIUS_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const deleteBootcamp = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOTCAMP_DELETE_REQUEST,
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

    await axios.delete(`/api/v1/bootcamps/${id}`, config);

    dispatch({
      type: BOOTCAMP_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: BOOTCAMP_DELETE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};
