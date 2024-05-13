import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { setProfile } from "../../../redux/slice/myProfile";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { updateProfile } from "../../services/ProfileService";
import { authUserDetail } from "../../services/ProfileService";
import * as auth from "../Auth";

function PersonaInformation(props) {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [uname, setUname] = useState()
  const [phno, setPhno] = useState()
  const [email, setEmail] = useState()

  const Handlesubmit = (e) => {
    e.preventDefault();
    let objdata = {
      firstName: fname,
      lastName: lname,
      username: uname,
      email: email,
      phoneNumber: phno,
    };

    if(fname == "" ){
      setEroor("First Name Can't be  Empty")
    }
    else if(lname ==""){
      setEroor("Last Name Can't be  Empty")
    }
    else if(uname ==""){
      setEroor("UserName Name Can't be  Empty")
    }
    else if(email ==""){
      setEroor("Email Name Can't be  Empty")
    }
    else if(phno ==""){
      setEroor("Phone Number Name Can't be  Empty")
    }
    else{
    setEroor(<p style={{color: "Green"}}>Profile Data Updated Successfully</p>)
    updateProfile(objdata)
    dispatch(setProfile(objdata))
    }
  }

  const [error, setEroor] = useState("")
  useEffect(() => {
    authUserDetail()
      .then((res) => {
        return res.json();
      })
      .then((result) => {
          setFname(result.result.firstName)
          setLname(result.result.lastName)
          setUname(result.result.username)
          setPhno(result.result.phoneNumber)
          setEmail(result.result.email)
          dispatch(setProfile(result.result))  
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <form className="card card-custom card-stretch">
      {loading && <ModalProgressBar />}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            Personal Information
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            Update your personal Information
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn mr-2"
            style={{ backgroundColor: "#facd21", color: "black" }}
            onClick={(e) => Handlesubmit(e)}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="form">
        <div className="card-body">
        {error && <p className="text-danger text-center mb-5"> {error} </p>}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              First Name
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="First name"
                className={`form-control form-control-lg form-control-solid `}
                name="firstname"
                value={fname}
                onChange={(e) => setFname(e.target.value.trim())}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Last Name
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="Last name"
                className={`form-control form-control-lg form-control-solid `}
                name="lastname"
                value={lname}
                onChange={(e) => setLname(e.target.value.trim())}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              User Name
            </label>  
            <div className="col-lg-9 col-xl-6">
              <input
                type="text"
                placeholder="User name"
                className={`form-control form-control-lg form-control-solid `}
                name="username"
                value={uname}
                onChange={(e) => setUname(e.target.value.trim())}
              />
            </div>
          </div>


          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mt-10 mb-6">Contact Info</h5>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Contact Phone
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-phone"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="+1(123)112-11-11"
                  className={`form-control form-control-lg form-control-solid `}
                  name="phone"
                  value={phno}
                  onChange={(e) => setPhno(e.target.value.trim())}
                />
              </div>
              <span className="form-text text-muted">
                We'll never share your phone with anyone else.
              </span>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Email Address
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"></i>
                  </span>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`form-control form-control-lg form-control-solid `}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default connect(null, auth.actions)(PersonaInformation);
