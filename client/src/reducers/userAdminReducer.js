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
  USER_CREATE_RESET,
  USER_CREATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants/usersAdminConstants";

export const getUsersAdminReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true, users: [] };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.data,
        success: action.payload.success,
      };
    case GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true, user: {} };
    case GET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload.data,
        success: action.payload.success,
      };
    case GET_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userAdminDeleteReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USERS_DELETE_REQUEST:
      return { loading: true };
    case USERS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USERS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
