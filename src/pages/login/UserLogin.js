/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/Footer";
import loginImage from "../../assets/loginImage.svg";
import SofiaLogo from "../../components/Icons/SofiaLogo.js";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FormControl, Alert } from "react-bootstrap";
import { query, collection, where, doc, getDoc, setDoc, } from "firebase/firestore";
import { useUserAuth } from "../../components/context/UserAuthContext";
import { db } from "../../firebase";
import moment from "moment";
const Login = (props) => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const history = useHistory();
  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("Please enter a valid otp!");
    if (otp === "" || otp === null) return;
    try {
      console.log("result", result);
      await result.confirm(otp)
        .then(async (confirmationResult) => {
          console.log("jdvfsdnhfjdshi", confirmationResult);
          localStorage.setItem('isAuth', 'true')
          localStorage.setItem('user', JSON.stringify(confirmationResult?.user))
          localStorage.setItem('role', "user");
          console.log("SSzfasfas", confirmationResult?.user);

          const docRef = doc(db, "users", confirmationResult?.user?.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            localStorage.setItem('role', docSnap.data().role);
            history.push("/user");
          }
          else {
            await setDoc(docRef, {
              uid: confirmationResult?.user?.uid,
              name: "",
              authProvider: confirmationResult?.providerId,
              email: "",
              onlineState: "",
              role: "user",
              isVerified: false,
              created_at: moment.now()
            })
              .then((e) => {
                history.push("/user");
              })
              .catch(error => console.log("error on doc craete phone signup", error))
          }
        })
        .catch(async (err) => {
          console.log("error in confirm otp", err);
        })
    } catch (err) {
      setError(err.message);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const fetchUserName = async (user) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      return ({ user })
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className='img1' >
                <img style={{ width: "40%", marginLeft: "100px", }} src="https://upwork-usw2-prod-assets-static.s3.us-west-2.amazonaws.com/org-logo/1145930514433441792" alt="no-img" />
              </div>
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Login</p>
                <div className="logo-block">
                  <SofiaLogo />
                  <p className="mb-0">SQUADMINDS</p>
                </div>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                <FormGroup className="mb-3" controlId="formBasicEmail">
                  <PhoneInput
                    defaultCountry="IN"
                    value={number}
                    onChange={setNumber}
                    placeholder="Enter Phone Number"
                  />
                  <div id="recaptcha-container"></div>
                </FormGroup>
                <div className="button-right">
                  <Link to="/">
                    <Button variant="secondary" style={{ backgroundColor: "blue", color: "white" }}>Cancel</Button>
                  </Link>
                  &nbsp;
                  <Button type="Submit" variant="primary" style={{ backgroundColor: "blue", color: "white" }}>
                    Send Otp
                  </Button>
                </div>
              </form>
              <form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
                <FormGroup className="mb-3" controlId="formBasicOtp">
                  <FormControl
                    type="otp"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </FormGroup>
                <div className="button-right">
                  <Link to="/">
                    <Button variant="secondary" style={{ backgroundColor: "blue", color: "white" }}>Cancel</Button>
                  </Link>
                  &nbsp;
                  <Button type="submit" variant="primary" style={{ backgroundColor: "blue", color: "white" }}>
                    Verify
                  </Button>
                </div>
              </form>
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
  )
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}
export default withRouter(connect(mapStateToProps)(Login));
