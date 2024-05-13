/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import SVG from "react-inlinesvg";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import * as auth from "../Auth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Card } from "react-bootstrap";
import { handleAPI } from "./../../services/ProfileService"

function ChangePassword(props) {
  // Fields
  const [loading, setloading] = useState(false);
  const [isError, setisError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  useEffect(() => { }, [user]);
  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    setisError(false);
    const updatedUser = Object.assign(user, {
      password: values.password,
    });
    // user for update preparation
    dispatch(props.setUser(updatedUser));
    setTimeout(() => {
      setloading(false);
      setSubmitting(false);
      setisError(true);

    }, 1000);
  };

  const [current, setcurrent] = useState('');
  const handleCurrent = event => {
    setcurrent(event.target.value);
    setErrorMessageforold("")
  }

  function printcurrent() {
  }
  const [newpass, setNewpass] = useState('');
  const [errorMessageforold, setErrorMessageforold] = useState('');
  const [errorMessagefornew, setErrorMessagefornew] = useState('');

  const handleNewpas = event => {
    setNewpass(event.target.value);
    setErrorMessagefornew("")
  }

  function printNewpass() {
  }

  const [verifypass, setVerifypass] = useState('');

  const handleVerifypass = event => {
    setVerifypass(event.target.value);
    setErrorMessagefornew("")
  }

  function printverify() {
  }


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let obj = {
    "oldPassword": current,
    "newPassword": newpass,
    "confirmPassword": verifypass
  }

  const onSaveHandler = async () => {
    printverify();
    printNewpass();
    printcurrent();
    await handleAPI(obj)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.result == true) {
          handleShow()
        }
        else if (result.message == "Please enter valid current password.") {
          setErrorMessageforold("Old Password Dont Match")
        }
        else if (current == "") {
          setErrorMessageforold("Please Enter old password")
        }
        else if (newpass.length,verifypass.length < 8) {
          setErrorMessagefornew("Password Must be 8 Character Long and must have at least one Uppercase, Number & Special Character")
          if(newpass,verifypass == "") {
            setErrorMessagefornew("New & Confirm Password Can't be Empty")
          }
        }
        else if (verifypass !== newpass) {
          setErrorMessagefornew("New Password and Confirm Password Don't match")
        }
        else if (result.message > "Passwords must have at least one non alphanumeric character") {
          setErrorMessagefornew("Passwords must have at least one uppercase, Number & Special Character")
        }
        else{
          setErrorMessagefornew("")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
          <div style={{ marginTop: "-36px", float: "right", marginRight: "10px" }}>
            <span onClick={togglePassword}>
              <i className="fa fa-eye-slash" aria-hidden="true"></i>
            </span>
          </div>
        </>
      );
    } else {
      setShoweye(
        <>
          &nbsp;
          <div style={{ marginTop: "-36px", float: "right", marginRight: "10px"}}>
            <span onClick={togglePassword}>
              <i className="fa fa-eye" aria-hidden="true"></i>
            </span>
          </div>
        </>
      );
    }
  };
  useEffect(() => {
    eyeToggle();
  },[passwordShown]);

  return (
    <>
      {loading && <ModalProgressBar />}
      <Card>
        <div className="card-header py-3">
          <div style={{ display: "flex", justifyContent: 'space-between', marginTop: "20px" }}>
            <div className="card-title align-items-start flex-column">
              <h3 className="card-label font-weight-bolder text-dark">
                Change Password
              </h3>
              <span className="text-muted font-weight-bold font-size-sm mt-1">
                Change your account password
              </span>
            </div>

            <div className="card-toolbar">
              <button
                className="btn mr-2"
                style={{ backgroundColor: '#facd21', color: "black" }}
                onClick={onSaveHandler}
              >
                Save Changes
              </button>
            </div>
          </div>

        </div>
       

        <div className="form">
          <div className="card-body">
            {isError && (
              <div
                className="alert alert-custom alert-light-danger fade show mb-10"
                role="alert"
              >
                <div className="alert-icon">
                  <span className="svg-icon svg-icon-3x svg-icon-danger">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}
                    ></SVG>
                  </span>
                </div>
                <div className="alert-text font-weight-bold">
                  Configure user passwords to expire periodically. Users will need
                  warning that their passwords are going to expire,
                  <br />
                  or they m
                  ight inadvertently get locked out of the system!
                </div>
                <div className="alert-close" onClick={() => setisError(false)}>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">
                      <i className="ki ki-close"></i>
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label text-alert">
                Current Password
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                   type={passwordShown ? "text" : "password"}
                   placeholder="Current Password"
                  className={`form-control form-control-lg form-control-solid mb-2 }`}
                  name="currentPassword"
                  onChange={handleCurrent}
                  value={current}
                  />
                  {showeye}
              {errorMessageforold && <p className="text-danger text-center mb-5"> {errorMessageforold} </p>}
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label text-alert">
                New Password
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="New Password"
                  className={`form-control form-control-lg form-control-solid }`}
                  name="password"
                  onChange={handleNewpas}
                  value={newpass}
                />
              </div>
            </div> 
            
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label text-alert">
                Confirm Password
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`form-control form-control-lg form-control-solid }`}
                  name="cPassword"
                  onChange={handleVerifypass}
                  value={verifypass}
                />
              </div>
            </div>
            {errorMessagefornew && <p className="text-danger text-center mb-5"> {errorMessagefornew} </p>}
          </div>
        </div>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src="https://www.nicepng.com/png/detail/262-2627516_clipart-cross-tick-green-tick-png-icon.png" alt="img" style={{ width: "50px", height: "50px" }} />
          Your password Changed successfully
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleClose(); setVerifypass(""); setNewpass(""); setcurrent(""); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default connect(null, auth.actions)(ChangePassword);
