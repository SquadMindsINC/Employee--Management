import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import SofiaLogo from "../Icons/SofiaLogo.js";
import cn from "classnames";

const Sidebar = (props) => {
  const {
    activeItem = '',
    ...restProps
  } = props;
  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (props.sidebarOpened) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0);
    }
  }, [props.sidebarOpened])

  if (localStorage.getItem("role") === "admin") {
    return (
      <nav className={cn(s.root, { [s.sidebarOpen]: burgerSidebarOpen })}  >
        <header className={s.logo}>
          <SofiaLogo />
          <span className={s.title}>SQUAMINDS</span>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Dashboard"
            isHeader
            iconName={<i className={'eva eva-home-outline'} />}
            link="/admin/dashboard"
            index="dashboard"
          // badge="9"
          />
          <h5 className={s.navTitle}></h5>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Profile"
            isHeader
            iconName={<i className={'eva eva-person-outline'} />}
            link="/admin/profile"
            index="Profile"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Projects"
            isHeader
            iconName={<i className={'eva eva-folder-outline'} />}
            link="/admin/project"
            index="Projects"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Leave Table"
            isHeader
            iconName={<i className={'eva eva-grid-outline'} />}
            link="/admin/tables"
            index="tables"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Calendar"
            isHeader
            iconName={<i className={'eva eva-calendar-outline'} />}
            link="/admin/calendar"
            index="Calendar"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Charts"
            isHeader
            iconName={<i className={'eva eva-bar-chart-outline'} />}
            link="/admin/charts"
            index="Charts"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Maps"
            isHeader
            iconName={<i className={'eva eva-map-outline'} />}
            link="/admin/maps"
            index="Googlemappage"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="UserTable"
            isHeader
            iconName={<i className={'eva eva-grid-outline'} />}
            link="/admin/users-table"
            index="UserTable"
          />
        </ul>
      </nav>
    );
  }
  else {
    return (
      <nav className={cn(s.root, { [s.sidebarOpen]: burgerSidebarOpen })}  >
        <header className={s.logo}>
          <SofiaLogo />
          <span className={s.title}>SQUAMINDS</span>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Dashboard"
            isHeader
            iconName={<i className={'eva eva-home-outline'} />}
            link="/user/dashboard"
            index="dashboard"
          // badge="9"
          />
          <h5 className={s.navTitle}></h5>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Profile"
            isHeader
            iconName={<i className={'eva eva-person-outline'} />}
            link="/user/profile"
            index="Profile"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Projects"
            isHeader
            iconName={<i className={'eva eva-folder-outline'} />}
            link="/user/project"
            index="typography"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Leave Table"
            isHeader
            iconName={<i className={'eva eva-grid-outline'} />}
            link="/user/tables"
            index="tables"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Calendar"
            isHeader
            iconName={<i className={'eva eva-calendar-outline'} />}
            link="/user/calendar"
            index="Calendar"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Charts"
            isHeader
            iconName={<i className={'eva eva-bar-chart-outline'} />}
            link="/user/charts"
            index="Charts"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={props.activeItem}
            header="Maps"
            isHeader
            iconName={<i className={'eva eva-map-outline'} />}
            link="/user/maps"
            index="Googlemappage"
          />
        </ul>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
