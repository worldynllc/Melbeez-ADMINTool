/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect, Route } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import OtpScreen from "./Otp_page";
import NewPassword from "./Newpass_page";
import EmailConfirm  from "./EmailConfirm";
import PhoneConfirm from "./PhoneConfirm";

export function AuthPage() {
  let d = new Date()
  let year = d.getFullYear();
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid"
          style={{ backgroundColor: "#f9f6e7" }}
          id="kt_login"
        >

          <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0" style={{ backgroundColor: "#f9f6e7" }}>
            <Switch>
              <ContentRoute path="/auth/login" component={Login} />
              <ContentRoute
                path="/auth/registration"
                component={Registration}
              />
              <ContentRoute
                path="/auth/otp-validate"
                component={OtpScreen}
              />

              <ContentRoute
                path="/reset-password"
                component={NewPassword}
              />
             
              <ContentRoute
                path="/email-confirm"
                component={EmailConfirm}
              />
              
             <ContentRoute
                path="/phone-confirm"
                component={PhoneConfirm}
              />
             
              <ContentRoute
                path="/auth/forgot-password"
                component={ForgotPassword}
              />


              <Redirect from="/auth" exact={true} to="/auth/login" />
              <Redirect to="/auth/login" />
            </Switch>

          </div>

          <div className="d-flex d-lg-none flex-column-auto flex-column justify-content-between align-items-center mt-5 p-5">
            <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
              &copy; {year} Melbeez
            </div>
            <div className="d-flex order-1 order-sm-2 my-2">
              <div className="text-dark-100 text-hover-primary">
                <a href="https://api.melbeez.com/policies/privacy.html" target="_a">Privacy</a>
              </div>
              <div className="text-dark-100 text-hover-primary ml-3">
                <a href="https://api.melbeez.com/policies/eula.html" target="_a">EULA</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
