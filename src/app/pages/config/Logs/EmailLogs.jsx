import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { headerSortingClasses } from "../../../../_metronic/_helpers";
import { GetEmailLog } from "../../../services/configService";
import TablePagination from "../../../Components/TablePagination";
import moment from "moment";
import { useState } from "react";
import { charValidate } from "../../../../Utility/commonFunctions";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAdminData } from "../../../../redux/Admin/action";
import Cookie from "js-cookie";
import { useRef } from "react";

export default function EmailLogs() {
  const searchInputRef = useRef();
  const ExcelCustomName = Cookie.set("exclname", "Email Logs.csv");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const ref = useRef();
  const ref1 = useRef();
  const [search, setSearch] = useState();
  const [textShow, setTextShow] = useState(false);
  const textSortingForError = (text) => {
    if (text && text !== undefined) {
      return (
        <p
          onClick={() => {
            setTextShow(text);
            handleShow();
          }}
        >
          {charValidate(text, 20)}
        </p>
      );
    }else{
      return("N/A")
    }
  };

  const dateAndTimeFormatter = (_, row) => {
    let obj = row.createdOn;
    return moment(obj).format("LL HH:ss");
  };
  const errorMessageFormatter = (_, row) => {
    let obj = row.errorBody;
    if (obj == "") {
      return "N/A";
    } else {
      return obj;
    }
  };
  const statusFormat = (_, row) => {
    let obj = row.status;
    return obj
  };
  const columns = [
    {
      dataField: "to",
      text: "TO",
      headerSortingClasses,
    },
    {
      dataField: "status",
      text: "Status",
      headerSortingClasses,
      formatter: statusFormat
    },
    {
      dataField: "errorBody",
      text: "Errors",
      headerSortingClasses,
      formatter: textSortingForError,
      csvFormatter: errorMessageFormatter,
    },
    {
      dataField: "createdOn",
      text: "Date & Time",
      headerSortingClasses,
      formatter: dateAndTimeFormatter,
      csvFormatter: dateAndTimeFormatter,
    },
  ];

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleChange1 = (e) => {
    setValue1(e.target.value);
  };

  const handleClick = () => {
    Cookie.set("dateforsearch", value);
    Cookie.set("date2forsearch", value1);
    dispatch(addAdminData(value));
  };
  // const handleReset = () => {
  //   Cookie.remove("dateforsearch");
  //   Cookie.remove("date2forsearch");
  //   dispatch(addAdminData(""));
  //   setValue1("");
  //   setValue("");
  //   searchInputRef.current.value = "";
  // };

  // const handleReset2 = () => {
  //   Cookie.remove("searchText");
  //   dispatch(addAdminData("reset"));
  //   setSearch("");
  // }

  // const listenchange = (e) => {
  //   let temp = e.target.value;
  //   let changeAfterReplace = temp.replace(/^\s+|\s+$/g, '');
  //   setSearch(changeAfterReplace);
  // };

  const listenchange = (e) => {
    let temp = e.target.value;
    if (temp !== "") {
      let changeAfterReplace = temp.replace(/^\s+|\s+$/g, '');
      setSearch(changeAfterReplace);
    } else {
      searchInputRef.current.value = "";
      let searchValues = Math.random();
      Cookie.remove("searchText");
      setSearch("");
      Cookie.remove("dateforsearch");
      Cookie.remove("date2forsearch");
      dispatch(addAdminData(searchValues));
      setValue1("");
      setValue("");
    }
  };

  const handleSearch = () => {
    let searchValues = Math.random();
    Cookie.set("searchText", search)
    dispatch(addAdminData(searchValues));
  };

  return (
    <>
      <Card className='mt-lg-n12 mt-6'>
        <CardHeader className='mt-5' title="Email Logs">
          <CardHeaderToolbar>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <input
                    id="search-focus"
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    ref={searchInputRef}
                    onChange={listenchange}
                  />
                </div>
                <div>
                  <Form.Group controlId="duedate" className="mb-0 mr-2 ml-2">
                    <Form.Control
                      className="form-control"
                      onChange={handleChange}
                      value={value}
                      placeholder="Start date"
                      type="text"
                      ref={ref1}
                      onFocus={() => (ref1.current.type = "date")}
                      onBlur={() => (ref1.current.type = "text")}
                    />
                  </Form.Group>
                </div>
                <div>
                  <Form.Group controlId="duedate" className="mb-0 mr-2">
                    <Form.Control
                      className="form-control"
                      onChange={handleChange1}
                      value={value1}
                      placeholder="End date"
                      type="text"
                      ref={ref}
                      onFocus={() => (ref.current.type = "date")}
                      onBlur={() => (ref.current.type = "text")}
                    />
                  </Form.Group>
                </div>
                <div>
                  <Button onClick={() => { handleClick(); handleSearch(); }} title="Search"><i className="fas fa-search"></i></Button>
                </div>
                {/* <div className="col-1 ml-5 ml-md-0">
                  <Button onClick={() => { handleReset(); handleReset2(); }} title="Reset"><i className="fas fa-undo"></i></Button>
                </div> */}
              </div>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody style={{ justifyContent: "center" }}>
          <TablePagination
            keyField="Id"
            columns={columns}
            getRecordList={GetEmailLog}
          />
        </CardBody>
      </Card>
      <Modal show={show} onHide={handleClose} centered>
        <h4 className="p-5" style={{ fontSize: 13 }}>
          {textShow}
        </h4>
      </Modal>
    </>
  );
}
