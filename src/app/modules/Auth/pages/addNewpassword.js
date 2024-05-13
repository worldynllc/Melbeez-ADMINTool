import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NewPassword from "./Newpass_page";

export default function Addnewpassword() {
  return (
    <Switch>
      {/* <Redirect from="/reset-password" exact={true} to="/error/error-v1" /> */}
    
    <div style={{marginTop: "90px"}} className="container  col-5">  <Route  path="/reset-password" component={NewPassword} /> </div>
    </Switch>
  );
}
