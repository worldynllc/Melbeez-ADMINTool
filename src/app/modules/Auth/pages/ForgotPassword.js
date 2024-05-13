import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import logoImg from "./logos/loginLogo.png";




function ForgotPassword() {

  const history = useHistory();

  function routetootp() {
    history.push("/auth/otp-validate");
  }

  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);
  }

  function printemail() {
    sessionStorage.setItem("emaildata", message)
  }

  const [errorMessage, setErrorMessage] = useState('');

  const handleAPI = (e) => {
    e.preventDefault();

    const reqoption = {
      method: "POST",
      headers: { "Content-Type": "application/json","melbeez-platform": "AdminPortal", },
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/sendotp?Emailorphone=${message}`,
      reqoption
    )

      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.result == true) {
          routetootp()
        }
        else {
          setErrorMessage("Please Enter Valid Email or Phone")
        }

      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="login-form login-forgot" style={{ display: "block" }}>
        <img className="d-block mx-auto img-fluid w-50 mb-20" src={logoImg} alt="" />

        <div className="text-center mb-10 mb-lg-20">
          <h3 className="font-size-h1">Forgotten Password ?</h3>
          <div className="text-muted font-weight-bold">
            Enter your email to reset your password
          </div>
        </div>
        {errorMessage && <div className="text-danger text-center mb-5"> {errorMessage} </div>}

        <div className="form-group fv-plugins-icon-container">
          <input
            type="email"
            className="form-control form-control-solid h-auto py-5 px-6"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={message}
            style={{ background: "#e5e5e5" }}
          />

        </div>
        <div className="form-group d-flex flex-wrap flex-center">

          <button
            type="button"
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
            onClick={(e) => { handleAPI(e); printemail(); }}
            style={{ backgroundColor: "#facd21", border: "none", color: "black" }}
          >
            Request OTP
          </button>

          <Link to="/auth">
            <button
              type="button"
              id="kt_login_forgot_cancel"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
              style={{ backgroundColor: "#facd21", border: "none", color: "black" }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
