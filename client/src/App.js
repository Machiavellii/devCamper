import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";

import ShowScreen from "./screens/ShowScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BootcampsScreen from "./screens/BootcampsScreen";
import BootcampsRadiusScreen from "./screens/BootcampsRadiusScreen";
import BootcampScreen from "./screens/BootcampScreen";
import ReviewsScreen from "./screens/ReviewsScreen";
import AddReviewScreen from "./screens/AddReviewScreen";
import EditReviewScreen from "./screens/EditReviewScreen";
import ManageReviewsScreen from "./screens/ManageReviewsScreen";
import ManageBootcampScreen from "./screens/ManageBootcampScreen";
import AddBootcampScreen from "./screens/AddBootcampScreen";
import EditBootcampScreen from "./screens/EditBootcampScreen";
import ManageCoursesScreen from "./screens/ManageCoursesScreen";
import AddCourseScreen from "./screens/AddCourseScreen";
import EditCourseScreen from "./screens/EditCourseScreen";
import ManageAccountScreen from "./screens/ManageAccountScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import NewPasswordScreen from "./screens/NewPasswordScreen";
import AdminManageBootcampsScreen from "./screens/admin/AdminManageBootcampsScreen";
import AdminManageCoursesScreen from "./screens/admin/AdminManageCoursesScreen";
import AdminManageUsersScreen from "./screens/admin/AdminManageUsersScreen";
import AdminEditUserScreen from "./screens/admin/AdminEditUserScreen";
import AdminAddUserScreen from "./screens/admin/AdminAddUserScreen";

import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteRole from "./components/PrivaRouteRole";

const App = () => {
  return (
    <Router>
      <Nav />

      <Route path="/" component={ShowScreen} exact />
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route path="/bootcamps" component={BootcampsScreen} exact />
      <Route path="/bootcampsradius" component={BootcampsRadiusScreen} exact />
      <Route path="/bootcamps/:id" component={BootcampScreen} exact />
      {/* <Route path="/bootcamps/:slug" component={BootcampScreen} exact /> */}
      <PrivateRoute path="/add-bootcamp" component={AddBootcampScreen} exact />
      <PrivateRoute
        path="/edit-bootcamp/:id"
        component={EditBootcampScreen}
        exact
      />
      <PrivateRouteRole
        path="/manage-bootcamp"
        component={ManageBootcampScreen}
        exact
      />
      <PrivateRouteRole
        path="/admin-manage-bootcamps"
        component={AdminManageBootcampsScreen}
        exact
      />
      <Route path="/reviews/:id" component={ReviewsScreen} exact />
      <PrivateRoute path="/add-review/:id" component={AddReviewScreen} exact />

      <PrivateRoute
        path="/edit-review/:id"
        component={EditReviewScreen}
        exact
      />

      <PrivateRoute
        path="/manage-reviews"
        component={ManageReviewsScreen}
        exact
      />
      <PrivateRoute path="/add-course/:id" component={AddCourseScreen} exact />
      <PrivateRoute
        path="/edit-course/:id"
        component={EditCourseScreen}
        exact
      />
      <PrivateRoute
        path="/manage-courses"
        component={ManageCoursesScreen}
        exact
      />
      <PrivateRoute
        path="/admin-manage-courses/:id"
        component={AdminManageCoursesScreen}
        exact
      />
      <PrivateRoute
        path="/manage-account"
        component={ManageAccountScreen}
        exact
      />
      <PrivateRoute
        path="/manage-users"
        component={AdminManageUsersScreen}
        exact
      />
      <PrivateRoute
        path="/edit-user/:id"
        component={AdminEditUserScreen}
        exact
      />
      <PrivateRoute path="/add-user" component={AdminAddUserScreen} exact />
      <PrivateRoute
        path="/update-password"
        component={UpdatePasswordScreen}
        exact
      />
      <Route path="/reset-password" component={ResetPasswordScreen} exact />
      <Route path="/new-password" component={NewPasswordScreen} exact />
    </Router>
  );
};

export default App;
