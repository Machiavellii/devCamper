import {
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  USERS_DELETE_FAIL,
  USERS_DELETE_REQUEST,
  USERS_DELETE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/usersAdminConstants";
import axios from "axios";

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USERS_REQUEST,
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

    const { data } = await axios.get(`/api/v1/users`, config);

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_REQUEST,
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

    const { data } = await axios.get(`/api/v1/users/${id}`, config);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const createUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
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

    await axios.post(`/api/v1/users`, user, config);

    dispatch({
      type: USER_CREATE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/v1/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const deleteAdminUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_DELETE_REQUEST,
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

    await axios.delete(`/api/v1/users/${id}`, config);

    dispatch({
      type: USERS_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: USERS_DELETE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};
