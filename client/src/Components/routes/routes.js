import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../../Store";
import Worker from "../../umesh/worker";
import Admin from "../../umesh/admin";
import Manager from "../../umesh/manager";
import Login from "../../umesh/pages/login/login";
import Profile from "../../umesh/pages/profile/profile";
import Forgot from "../../umesh/pages/forgot/forgot";
import Register from "../../umesh/pages/register/register";
import AdminEditUser from "../../umesh/pages/admin/AdminEditUser";
import GetAllUsers from "../../umesh/pages/admin/getAllUser";
import AdminRegister from "../../umesh/pages/admin/adminAddEmployee";
import Reset from "../../umesh/pages/reset/reset";
import ConfirmEmail from "../../Actions/confirmEmail";

function Routes() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route>
              <Route path="/" component={Login} exact />
              <Route path="/worker" component={Worker} />
              <Route path="/admin" component={Admin} />
              <Route path="/manager" component={Manager} />

              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/register" component={Register} />

              <Route path="/edit_user/:id" component={AdminEditUser} />
              <Route path="/getAll" component={GetAllUsers} />
              <Route path="/adminReg" component={AdminRegister} />

              <Route path="/users/reset_password/:id" component={Reset} />
              <Route
                path="/users/activate/:auth_token"
                component={ConfirmEmail}
              />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default Routes;
