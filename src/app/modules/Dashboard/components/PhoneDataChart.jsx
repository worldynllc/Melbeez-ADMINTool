import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { reqChartGraph, reqDashboardChart, reqDashboardChartformonth, reqDashboardChartforyear } from "../../../services/dashboardService";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
} from "../../../../_metronic/_partials/controls";
import { Button, Form } from "react-bootstrap";
import { YearData } from "./Data/YearData";
import { MonthData } from "./Data/MonthData";

export function PhoneDataChart() {
  const [phoneDataLable, setPhoneDataLable] = useState([]);
  const [phoneDataCount, setPhoneDataCount] = useState([]);

 
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    setTimeout(() => {
      EmailAPIFunc(false, currentMonth, currentYear);
    });
  }, []);

  const EmailAPIFunc = (isWeekly, month, year) => {
    reqDashboardChart(isWeekly, month, year)
      .then((res) => res.json())
      .then((res) => {
        setPhoneDataLable(res.result.phoneOTPsCountBarChart.data.labels);
        setPhoneDataCount(
          res.result.phoneOTPsCountBarChart.data.datasets[0].data
        );
      })
      .catch((error) => console.log(error));
  };


  // ...for setting ddropdown val...
  const [foryear, setForyear] = useState(currentYear);
  const [formonth, setFormonth] = useState(currentMonth);
  const handleSelectValueMonth = (e) => {
    let month = e.target.value;
    setFormonth(month);    
  };
  const handleSelectValueYear = (e) => {
    let year = e.target.value;
    setForyear(year);
  };
// ......


  const [status, setStatus] = useState(
    <select
      defaultValue=""
      className="form-select form-select-sm mr-1"
      aria-label=".form-select-lg example"
      onChange={(e) => {
        handleSelectValueYear(e);
      }}
    >
      {YearData.map((e, i) => (
        <option value={e.value} key={i}>
          {e.year}
        </option>
      ))}
    </select>
  );

  const [checktype, setCheckType] = useState(false);

  const radioHandler = () => {
    handleradio1()
    setCheckType(false);
    setStatus(
      <select
        defaultValue=""
        className="form-select form-select-sm mr-1"
        aria-label=".form-select-lg example"
        onChange={(e) => {
          handleSelectValueYear(e);
        }}
      >
        {YearData.map((e, i) => (
          <option value={e.value} key={i}>
            {e.year}
          </option>
        ))}
      </select>
    );
  };

  const radioHandler2 = () => {
    handleradio2()
    setCheckType(true);
    setStatus(
      <>
        <select
          defaultValue=""
          className="form-select form-select-sm"
          aria-label=".form-select-lg example"
          onChange={(e) => {
            handleSelectValueMonth(e);
          }}
        >
          {MonthData.map((e, i) => (
            <option value={e.id} key={i}>
              {e.month}
            </option>
          ))}
        </select>
        &nbsp;
        <select
          defaultValue=""
          className="form-select form-select-sm mr-1"
          aria-label=".form-select-lg example"
          onChange={(e) => {
            handleSelectValueYear(e);
          }}
        >
          {YearData.map((e, i) => (
            <option value={e.value} key={i}>
              {e.year}
            </option>
          ))}
        </select>
      </>
    );
  };

  const [radiostatus, setRadiostatus] = useState(false);

  const handleradio1 = () =>{
    setRadiostatus(false)
    reqDashboardChart(false)
    .then((res) => res.json())
    .then((res) => {
      setPhoneDataLable(res.result.phoneOTPsCountBarChart.data.labels);
      setPhoneDataCount(
        res.result.phoneOTPsCountBarChart.data.datasets[0].data
      );
    })
    .catch((error) => console.log(error));
  }

  const handleradio2 = () =>{
    setRadiostatus(true)
    reqDashboardChart(true)
    .then((res) => res.json())
    .then((res) => {
      setPhoneDataLable(res.result.phoneOTPsCountBarChart.data.labels);
        setPhoneDataCount(
          res.result.phoneOTPsCountBarChart.data.datasets[0].data
        );
    })
    .catch((error) => console.log(error));
  }

 
  const FindFilteredData = (e) => {
    e.preventDefault();    
    if (radiostatus == false) {
    reqDashboardChartforyear(false, foryear)
    .then((res) => res.json())
    .then((res) => {
      setPhoneDataLable(res.result.phoneOTPsCountBarChart.data.labels);
      setPhoneDataCount(
        res.result.phoneOTPsCountBarChart.data.datasets[0].data
      );
    })
    .catch((error) => console.log(error)); 
  }
  else{
    reqDashboardChartformonth(true, foryear, formonth)
    .then((res) => res.json())
    .then((res) => {
      setPhoneDataLable(res.result.phoneOTPsCountBarChart.data.labels);
      setPhoneDataCount(
        res.result.phoneOTPsCountBarChart.data.datasets[0].data
      );
    })
    .catch((error) => console.log(error));
  } 
  }

  function convertBase64ToExcel() {
    var data = basedata;
    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    var blob1 = b64toBlob(data, contentType);
    var blobUrl1 = URL.createObjectURL(blob1);

    const link = document.createElement('a');
    link.href = blobUrl1;
    if(checktype == false){
      link.setAttribute(
        'download',
      foryear + "_PhoneNo.OTPCountReport.xlsx",
      );
    }
    else if(checktype == true){
      link.setAttribute(
        'download',
        formonth + "/" +  foryear + "_PhoneNo.OTPCountReport.xlsx",
      );
    }

    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove the link
    link.parentNode.removeChild(link);
    //window.open(blobUrl1);
  }

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  var basedata = ""
  const downloadClick = () => {
    reqChartGraph("PhoneOTPCountChart", foryear, formonth, checktype)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        basedata=result.result;
        convertBase64ToExcel();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "",
      },
    },
    scales: {
      y: {
        ticks: {
          source: "data",
          autoSkip: false,
        },
      },
      x: {
        stacked: false,
        ticks: {
          beginAtZero: false,
          color: "#808080",
          stepSize: 50,
        },
      },
    },
  };
  const data = {
    labels: phoneDataLable.map((data) => data) ?? [],
    datasets: [
      {
        label: "Phone No. Data",
        data: phoneDataCount.map((data) => data) ?? [],
        backgroundColor: [
          "#2a71d0",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
        <Card>
        <CardHeader title="Phone No. OTP Chart"></CardHeader>
        <CardBody className="text-left">
          <Form className="d-flex mb-5 overflow-auto">
            <Form.Check
              inline
              label="Monthly"
              name="name"
              id="7"
              type="radio"
              defaultChecked
              onClick={(e) => radioHandler(1)}
            />
            <Form.Check
              inline
              label="Weekly"
              name="name"
              id="8"
              type="radio"
              onClick={(e) => radioHandler2(2)}
            />
            {status}
            <Button onClick={FindFilteredData}><i className="fas fa-search"></i></Button>
            <Button className='ml-1' onClick={downloadClick}>
            <i className="fa fa-file-excel" aria-hidden="true"></i>
            </Button>
           </Form>
            <br/>
          <Bar options={options} data={data} />
        </CardBody>
      </Card>
    </>
  );
}
