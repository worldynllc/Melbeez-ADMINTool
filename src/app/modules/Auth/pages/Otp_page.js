import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoImg from "./logos/loginLogo.png";


export default function OtpScreen() {

  const history = useHistory();

  function routetonewpass() {
    history.push("/reset-password");
  }

  const [otpdata, setotpdata] = useState('');

  const handleChangeotp = event => {
    setotpdata(event.target.value);
  }

  function printotp() {
    // console.log(otpdata)
  }

  const [errorMessage, setErrorMessage] = useState('');

  const handleAPI2 = (f) => {
    f.preventDefault();

    var obj = {
      "otp": otpdata,
      "emailorphone": sessionStorage.getItem("emaildata"),
      "purpose": "RESET_PASSWORD"

    }

    const reqoption = {
      method: "POST",
      headers: { "Content-Type": "application/json","melbeez-platform": "AdminPortal" },
      body: JSON.stringify(obj),
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/verifyotp`,
      reqoption
    )

      .then((res) => {
        return res.json();
      })
      .then((result) => {
        sessionStorage.setItem("resetPassToken", result.result.resetPasswordToken)

        if (result.result.isSuccess == true) {
          routetonewpass()
        }
        else {
          setErrorMessage("Please Enter Valid OTP")
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <img className="d-block mx-auto img-fluid w-50 mb-20" src={logoImg} alt="" />

            <h2 className="text-center">OTP Verification</h2>
            <br/>

        <label>Enter OTP Sended On the Email </label>
        <br />
        {errorMessage && <div className="text-danger text-center mb-5"> {errorMessage} </div>}

        <input className="form-control"
          onChange={handleChangeotp}
          value={otpdata}
          placeholder="OTP"
          style={{ background: "#e5e5e5" }}
        >

        </input>
        <button className="btn btn-light-primary font-weight-bold px-9 py-3 my-3 mx-3"
          style={{ backgroundColor: "#facd21", border: "none", color: "black", }}
          onClick={(f) => { printotp(); handleAPI2(f); }}
        >Submit</button>

      </div>
    </>
  )
}