
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "r
import PropTypes from "prop-types";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Footer from "../../../components/Footer/Footer";
import Breadcrumbs from "../../../components/Breadbrumbs/Breadcrumbs";
import s from "./adminLayout.module.scss";
import AdminDashboard from "../dashboard/AdminDashboard";
import Tables from "../../Tables/Tables";
import Charts from "../../uielements/charts/Charts";
import Maps from "../../uielements/maps/google/GoogleMapPage";
import Profile from "../../profile/Profile";
import Contacts from "../../AdminSidebar/Contacts"
import Projects from "../../Projects/Projects"
import Calendar1 from "../../Calendar/Calendar1"


const AdminLayout = (props) => {
  console.log("in layout");
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          <Breadcrumbs url={window.location.pathname} />

          <Switch>
            <Route path="/admin" exact render={() => <Redirect to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" exact component={AdminDashboard} />
            <Route path="/admin/profile" exact component={Profile} />
            <Route path="/admin/project" exact component={Projects} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/calendar" exact component={Calendar1} />
            <Route path="/admin/charts" exact component={Charts} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/users-table" exact component={Contacts} />
            <Route path='*' exact render={() => <Redirect to="/admin" />} />

          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(AdminLayout));
