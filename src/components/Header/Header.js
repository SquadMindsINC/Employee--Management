import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, withRouter } from "react-router";
import { connect } from "react-redux";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
} from "reactstrap";
import { closeSidebar, openSidebar } from "../../actions/navigation";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";
import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon";
import MessagesIcon from "../../assets/navbarMenus/pfofileIcons/MessagesIcon";
import TasksIcon from "../../assets/navbarMenus/pfofileIcons/TasksIcon";
import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import userImg from "../../assets/user.svg";
import s from "./Header.module.scss";
import "animate.css";
import { logout } from "../../firebase"

const Header = (props) => {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
  const toggleSidebar = () => {
    if (props.sidebarOpened) {
      props.dispatch(closeSidebar());
    } else {
      const paths = props.location.pathname.split('/');
      paths.pop();
      props.dispatch(openSidebar());
    }
  }  ;
  const handleLogout = async () => {
    try {
      await logout(history);
    } catch (error) {
      console.log(error.message);
    }
  };
  if (localStorage.getItem("role") === "admin") {
    return (
      <Navbar className={`${s.root} d-print-none`}>
        <div>
          <NavLink
            onClick={() => toggleSidebar()}
            className={`d-md-none mr-3 ${s.navItem}`}
            href="#"
          >
            <MenuIcon className={s.menuIcon} />
          </NavLink>
        </div>
        <Form className="d-none d-sm-block" inline>
          <FormGroup>
            <InputGroup className='input-group-no-border'>
              <Input id="search-input" placeholder="Search Dashboard" className='focus' />
              <InputGroupAddon addonType="prepend">               
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
        <Nav className="ml-auto">
          <NavItem className="d-sm-none mr-4">
            <NavLink
              className=""
              href="#"
            >
              <SearchIcon />
            </NavLink>
          </NavItem>
          <Dropdown nav isOpen={menuOpen} toggle={() => toggleMenu()} className="tutorial-dropdown mr-2 mr-sm-3">
            <DropdownToggle nav>
              <div className={s.navbarBlock}>
                <i className={'eva eva-bell-outline'} />
              </div>
            </DropdownToggle>
            <DropdownMenu right className="navbar-dropdown notifications-dropdown" style={{ width: "340px" }}>
              <DropdownItem>
                <div>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={notificationsOpen} toggle={() => toggleNotifications()} nav id="basic-nav-dropdown" className="ml-3">
            <DropdownToggle nav caret className="navbar-dropdown-toggle">
              <span className={`${s.avatar} rounded-circle float-left mr-2`}>
                <img src={userImg} alt="User" />
              </span>
              <span className="small d-none d-sm-block ml-1 mr-2 body-1">Varun</span>
            </DropdownToggle>
            <DropdownMenu className="navbar-dropdown profile-dropdown" style={{ width: "194px" }}>
              <DropdownItem className={s.dropdownProfileItem}><ProfileIcon /><span>Profile</span></DropdownItem>
              <DropdownItem className={s.dropdownProfileItem}><TasksIcon /><span>Tasks</span></DropdownItem>
              <DropdownItem className={s.dropdownProfileItem}><MessagesIcon /><span>Messages</span></DropdownItem>
              <NavItem>
                <NavLink href="#">
                  <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit" onClick={handleLogout}><img src={logoutIcon} alt="Logout" /><span className="ml-1">Logout</span></button>
                </NavLink>
              </NavItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }
  else {
    return (
      <Navbar className={`${s.root} d-print-none`}>
        <div>
          <NavLink
            onClick={() => toggleSidebar()}
            className={`d-md-none mr-3 ${s.navItem}`}
            href="#"
          >
            <MenuIcon className={s.menuIcon} />
          </NavLink>
        </div>
        <Form className="d-none d-sm-block" inline>
          <FormGroup>
            <InputGroup className='input-group-no-border'>
              <Input id="search-input" placeholder="Search Dashboard" className='focus' />
              <InputGroupAddon addonType="prepend">
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
        <Nav className="ml-auto">
          <NavItem className="d-sm-none mr-4">
            <NavLink
              className=""
              href="#"
            >
              <SearchIcon />
            </NavLink>
          </NavItem>
          <Dropdown nav isOpen={menuOpen} toggle={() => toggleMenu()} className="tutorial-dropdown mr-2 mr-sm-3">
            <DropdownToggle nav>
              <div className={s.navbarBlock}>
                <i className={'eva eva-bell-outline'} />
              </div> 
            </DropdownToggle>
            <DropdownMenu right className="navbar-dropdown notifications-dropdown" style={{ width: "340px" }}>             
              <DropdownItem>
                <div>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={notificationsOpen} toggle={() => toggleNotifications()} nav id="basic-nav-dropdown" className="ml-3">
            <DropdownToggle nav caret className="navbar-dropdown-toggle">
              <span className={`${s.avatar} rounded-circle float-left mr-2`}>
                <img src={userImg} alt="User" />
              </span>
              <span className="small d-none d-sm-block ml-1 mr-2 body-1">Christina Carey</span>
            </DropdownToggle>
            <DropdownMenu className="navbar-dropdown profile-dropdown" style={{ width: "194px" }}>
              <DropdownItem className={s.dropdownProfileItem}><MessagesIcon /><span>Messages</span></DropdownItem>
              <NavItem>
                <NavLink href="#">
                  <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit" onClick={handleLogout}><img src={logoutIcon} alt="Logout" /><span className="ml-1">Logout</span></button>
                </NavLink>
              </NavItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    );
  }
}
Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool,
}
function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}
export default withRouter(connect(mapStateToProps)(Header));

