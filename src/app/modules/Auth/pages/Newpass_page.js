import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import logoImg from "./logos/loginLogo.png";
import useSearchParams from "use-search-params";
import { useEffect } from "react";



export default function NewPassword() {

  const history = useHistory();

  function routetohome() {
    history.push("/auth");
  }

  const decodeUriComponent = require('decode-uri-component');

  const [searchParams, setSearchParams] = useSearchParams();


  setSearchParams.get()

  var fields = (decodeUriComponent(searchParams)).split('&');
  let emailFromurl = fields[0];
  let codeFromurl = fields[1];
  let dateFromurl = fields[2];

  emailFromurl = emailFromurl && emailFromurl.substr(6,);
  codeFromurl = codeFromurl && codeFromurl.substr(5,);
  dateFromurl = dateFromurl && dateFromurl.substr(5,);


  // decoding the string
  const emailRes = emailFromurl && window.atob(emailFromurl);

  const codeRes = codeFromurl && window.atob(codeFromurl);

  var dateRes = dateFromurl && window.atob(dateFromurl);
  dateRes = dateRes && dateRes.substr(8, 2);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');

  if (dateRes === dd) {
  }
  else if (dateRes = dateRes && dateRes) {
    alert("invaild link")
    window.open("about:blank", "_self");
    window.close();
  }

  const [newpass, setNewpass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');

  const handlepass = event => {
    setNewpass(event.target.value);
  }
  const handlechangepass = event => {
    setConfirmpass(event.target.value);
  }

  function printnewpass() {
    // console.log(newpass)
    // console.log(confirmpass)
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errorMessage, setErrorMessage] = useState('');

  const handleAPI3 = (ef) => {
    ef.preventDefault();

    var obj = {
      "password": newpass,
      "confirmpassword": confirmpass,
      "emailorphone": emailRes || sessionStorage.getItem("emaildata"),
      "token": codeRes || sessionStorage.getItem("resetPassToken")
    }

    const reqoption = {
      method: "POST",
      headers: { "Content-Type": "application/json", "melbeez-platform": "AdminPortal" },
      body: JSON.stringify(obj),
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/reset-password`,
      reqoption
    )

      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.result == true) {
          handleShow()
        }
        else {
          if (newpass == "" || confirmpass == "") {
            setErrorMessage("Password Fields Can't be empty")
          }
          else if (newpass !== confirmpass) {
            setErrorMessage("New Password & Confirm Password Don't Match")
          }
          else if (result.message !== "") {
            setErrorMessage(<><span>Password Must be 8 Character Long & must have </span> <br /> <span>At least one Uppercase,Number & Special Character</span></>)
          }
          else {
            setErrorMessage("")
          }

        }

      })
      .catch((error) => {
        console.log({ error });

      });
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [showeye, setShoweye] = useState();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const eyeToggle = () => {
    if (passwordShown == false) {
      setShoweye(
        <>
          &nbsp;
          <div style={{ marginTop: "-27px", float: "right" }}>
            <span onClick={togglePassword}>
              <i className="fa fa-eye-slash mr-3" aria-hidden="true"></i>
            </span>
          </div>
        </>
      );
    } else {
      setShoweye(
        <>
          &nbsp;
          <div style={{ marginTop: "-27px", float: "right" }}>
            <span onClick={togglePassword}>
              <i className="fa fa-eye mr-3" aria-hidden="true"></i>
            </span>
          </div>
        </>
      );
    }
  };
  useEffect(() => {
    eyeToggle();
  }, [passwordShown]);

  return (
    <>

      <div className="container">
        <img className="d-block mx-auto img-fluid w-5 mb-20" src={logoImg} alt="" />
        <form className="" style={{ width: "100%" }}>
          <div>
            <h2 className="text-center">Reset Password</h2>
            <br />
            <p style={{ color: "#808080", textAlign: "center" }}> Note! password must contain one capital letter & one number in it. </p>
            <input className="form-control" type={passwordShown ? "text" : "password"}
              onChange={handlepass}
              value={newpass}
              placeholder="Enter New Password"
              style={{ background: "#e5e5e5" }}
            >
            </input>
            {showeye}
            <br />
            <input className="form-control" type={passwordShown ? "text" : "password"}
              onChange={handlechangepass}
              value={confirmpass}
              placeholder="Confirm Password"
              style={{ background: "#e5e5e5" }}
            >
            </input>
            {errorMessage && <div className="text-danger text-center mt-5"> {errorMessage} </div>}
          </div>
          <div className="text-center">
            <button className="btn btn-light-primary font-weight-bold px-9 py-3 my-3 mx-3"
              style={{ backgroundColor: "#facd21", border: "none", color: "black" }}
              onClick={(ef) => { printnewpass(); handleAPI3(ef); }}
            >Submit</button>
          </div>
        </form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src="https://www.nicepng.com/png/detail/262-2627516_clipart-cross-tick-green-tick-png-icon.png" alt="img" style={{ width: "50px", height: "50px" }} />
          Your password reset successfully
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleClose(); routetohome(); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}