import React from "react";
import FooterIcon from "../Icons/FooterIcon";
import s from "./Footer.module.scss";
import {  useHistory } from "react-router";

const Footer = () => {

  const history = useHistory();

  const handleClick = () => {
    console.log("jkhbhjbhj");
      history.push("/admin/login")
    }
     
  return (
    <div className={s.footer}>
      <span className={s.footerLabel} onClick={handleClick}>Copyright &copy; 2021 squadminds</span> 
      <FooterIcon />
    </div>
  )
}

export default Footer;
