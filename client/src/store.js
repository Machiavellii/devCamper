import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  updatePasswordReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
} from "./reducers/userReducer";

import {
  bootcampListReducer,
  getBootcampReducer,
  getMyBootcampReducer,
  getBootcampCourseReducer,
  createBootcampReducer,
  bootcampPhotoReducer,
  updateBootcampReducer,
  bootcampDeleteReducer,
  getBootcampReviewReducer,
  bootcampRadiusReducer,
} from "./reducers/bootcampReducer";

import {
  createCourseReducer,
  courseDeleteReducer,
  updateCourseReducer,
  getCourseReducer,
} from "./reducers/courseReducer";

import {
  getReviewsReducer,
  reviewDeleteReducer,
  getReviewReducer,
  updateReviewReducer,
  createReviewReducer,
} from "./reducers/reviewReducers";

import {
  getUsersAdminReducer,
  userAdminDeleteReducer,
  getUserReducer,
  updateUserReducer,
  createUserReducer,
} from "./reducers/userAdminReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  updatePassword: updatePasswordReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  bootcampList: bootcampListReducer,
  getBootcamp: getBootcampReducer,
  getMyBootcamp: getMyBootcampReducer,
  getCoursesBootcamp: getBootcampCourseReducer,
  getReviewsBootcamp: getBootcampReviewReducer,
  bootcampCreate: createBootcampReducer,
  bootcampPhoto: bootcampPhotoReducer,
  updateBootcamp: updateBootcampReducer,
  bootcampsRadius: bootcampRadiusReducer,
  bootcampDelete: bootcampDeleteReducer,
  courseCreate: createCourseReducer,
  deleteCourse: courseDeleteReducer,
  updateCourse: updateCourseReducer,
  getCourse: getCourseReducer,
  getReviews: getReviewsReducer,
  deleteReview: reviewDeleteReducer,
  getReview: getReviewReducer,
  reviewUpdate: updateReviewReducer,
  reviewCreate: createReviewReducer,
  adminUsers: getUsersAdminReducer,
  deleteUser: userAdminDeleteReducer,
  getAdminUser: getUserReducer,
  updateAdminUser: updateUserReducer,
  createUser: createUserReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userDetailsFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userDetails: { user: userDetailsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
