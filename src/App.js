// -- React and related libs
import React, { Component, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";
// import { HashRouter } from "react-router-dom";

// -- Redux
import { connect } from "react-redux";

// -- Custom Components
// import LayoutComponent from "./components/Layout/Layout";
import ErrorPage from "./pages/error/ErrorPage";
// import Login from "./pages/login/UserLogin";
import AdminLogin from "./pages/login/AdminLogin";
import AdminLayout from "./pages/admin/Layout/AdminLayout"
import UserLayout from "./pages/user/Layout/UserLayout";
// import Register from "./pages/register/Register";
// -- Redux Actions
// import { logoutUser } from "./actions/auth";

// -- Third Party Libs
import { ToastContainer } from "react-toastify";

// -- Services
import isAuthenticated from "./services/authService";

// -- Component Styles
import "./styles/app.scss";


import { UserAuthContextProvider } from "../src/components/context/UserAuthContext";
// import UserDashboard from "./pages/user/dashboard/UserDashboard";
// import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import UserLogin from "./pages/login/UserLogin";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  return <Route
    {...rest}
    component={props =>
      isAuthenticated(JSON.parse(localStorage.getItem("authenticated"))) ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
};

const App = (props) => {

  const [role, setRole] = useState(null);
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem("role"))
    setisAuth(localStorage.getItem("isAuth"))
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("auth in listner=====>>>>", currentuser);
      if (currentuser) {
        setTimeout(() => {
          setRole(localStorage.getItem("role"))
          setisAuth(localStorage.getItem("isAuth"))
        }, 1000);
      } else {
        setRole(localStorage.getItem("role"))
        setisAuth(localStorage.getItem("isAuth"))
      }
    });


    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <ToastContainer />
      <UserAuthContextProvider>
        {role === "admin" ? <Switch>
          <Route
            exact
            path="/"
            render={() => isAuthenticated(JSON.parse(isAuth)) ? (
              <Redirect to="/admin" />
            ) : (
              <Redirect to="/admin/login" />
            )
            }
          />
          <Route path="/admin/login" render={() => isAuthenticated(JSON.parse(isAuth))

            ? <Redirect to="/admin" /> : <AdminLogin />} />

          <Route path="/admin" render={() => isAuthenticated(JSON.parse(isAuth)) ? <AdminLayout /> : <Redirect to="/admin/login" />} />
          <Route path='*' exact={true} component={() => <Redirect to="/admin" />} />

        </Switch>

          :
          role === "user" ? <Switch>
            <Route
              exact
              path="/"
              render={() => isAuthenticated(JSON.parse(isAuth)) ? (
                <Redirect to="/user" />
              ) : (
                <Redirect to="/user/login" />
              )
              }
            />
            <Route path="/user/login" render={() => isAuthenticated(JSON.parse(isAuth))

              ? <Redirect to="/user" /> : <UserLogin />} />

            <Route path="/user" render={() => isAuthenticated(JSON.parse(isAuth)) ? <UserLayout /> : <Redirect to="/user/login" />} />
            <Route path='*' exact={true} component={() => <Redirect to="/user" />} />
          </Switch>
            :
            <Switch>
              <Route
                path="/"
                exact
                render={() => <Redirect to="/user/login" />}
              />
              <Route
                path="/user/login"
                exact
                render={() => <UserLogin />}
              />
              <Route
                path="/user"
                render={() => <Redirect to="/user/login" />}
              />
              <Route
                path="/admin/login"
                exact
                render={() => <AdminLogin />}
              />
              <Route
                path="/admin"
                render={() => <Redirect to="/admin/login" />}
              />
              <Route
                path="/error"
                render={() => <ErrorPage />}
              />
              <Route path='*' exact={true} component={() => <Redirect to="/error" />} />
            </Switch>
        }
      </UserAuthContextProvider>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
