/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/Footer";
import loginImage from "../../assets/loginImage.svg";
import SofiaLogo from "../../components/Icons/SofiaLogo.js";
import "react-phone-number-input/style.css";
import { signInWithEmailAndPassword, } from "firebase/auth";
import { doc, getDoc,} from "firebase/firestore";
import { auth, db } from "../../firebase";

const AdminLogin = () => {
  const history = useHistory();
  const logInWithEmailAndPassword = async (email, password, navigate) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(async e => {
        localStorage.setItem('isAuth', 'true')
        localStorage.setItem('user', JSON.stringify(e?.user))
        const docRef = doc(db, "users", e.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          localStorage.setItem('role', docSnap.data().role);
          history.push("/admin")
        } else {
          console.log("No such document!");
        }
      }).catch(err => alert(err.message))
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationState, setValidationState] = useState({
    email: "",
    password: "",
  })
  // eslint-disable-next-line no-unused-vars
  const validation = (key, value) => {
    let isvalid = false;
    let result;
    switch (key) {
      case 'email':
        result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isvalid = value ? result.test(value) : true;
        break;
      case 'password':
        result = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
        isvalid = value ? result.test(value) : true;
        break;
      default:
        break;
    }
    console.log("asdgjvaghscdvhas", isvalid);
    return isvalid;
  }
  const Login = () => {
    if (!email)
      setValidationState({ ...validationState, email: "Please enter valid email" })
    else {
      if (!password)
        setValidationState({ ...validationState, password: "Please enter your Password" })
      else {
        logInWithEmailAndPassword(email, password, history);
      }
    }
  };
  return (
    <div>
      <div className="auth-page">      
        <Container className="col-12">
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={6} className="left-column">
              <Widget className="widget-auth widget-p-lg">
              <i class="fa-solid fa-arrow-left-long" onClick={() => { history.push("/user/login")}}></i>
              <div className='img1' >
          <img style={{  width: "40%", marginLeft: "100px", }} src="https://upwork-usw2-prod-assets-static.s3.us-west-2.amazonaws.com/org-logo/1145930514433441792" />
        </div>
                <div className="d-flex align-items-center justify-content-between py-3">
                  <p className="auth-header mb-0">Login</p>
                  <div className="logo-block">
                    <SofiaLogo />
                    <p className="mb-0">SQUADMINDS</p>
                  </div>
                </div>
                <div className="login">
                  <div className="login__container">
                    <input
                      type="text"
                      className="login__textBox"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setValidationState({ ...validationState, email: "" })
                      }}
                      placeholder="E-mail Address"
                      required
                    />
                    <span>{validationState?.email}</span>
                    <input style={{ marginTop: "15px" }}
                      type="password"
                      className="login__textBox"
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setValidationState({ ...validationState, password: "" })
                      }}
                      placeholder="Password"
                      required
                    />
                    <span>{validationState?.password}</span>
                    <div>                   
                      <Button style={{ marginTop: "15px", marginLeft: "70px",backgroundColor:"blue",color:"white" }} onClick={Login} variant="primary" className="login__btn" >
                        Login
                      </Button>
                    </div>                  
                  </div>
                </div>
              </Widget>
            </Col>
            <Col xs={0} lg={6} className="right-column">
              <div>
                <img src={loginImage} alt="Error page" />
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return {
  };
}
export default withRouter(connect(mapStateToProps)(AdminLogin));