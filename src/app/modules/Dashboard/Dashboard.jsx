import React from "react";
import { EmailDataChart } from "./components/EmailDataChart";
import { PhoneDataChart } from "./components/PhoneDataChart";
import ActiveInactive from "./components/ActiveInactiveUser";
import { UniqueUserChart } from "./components/UniqueUserChart";
import { NewUserChart } from "./components/NewUserChart";
import { Chart as ChartJS } from "chart.js/auto";
import { BarCode } from "./components/BarCode";

export default function DashBoard() {
  return (
    <>
      <ActiveInactive />
      <div className="row">
        <div className="col-md-6 col-12 ">
          <EmailDataChart />
        </div>
        <div className="col-md-6 col-12 ">
          <PhoneDataChart />
        </div>
        <div className="col-md-6 col-12 ">
          <NewUserChart />
        </div>
        <div className="col-md-6 col-12 ">
          <UniqueUserChart />
        </div>
        <div className="col-md-6 col-12 ">
          <BarCode />
        </div>
      </div>
    </>
  );
}
