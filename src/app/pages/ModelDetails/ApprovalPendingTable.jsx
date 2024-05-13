import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from "../../../_metronic/_partials/controls";
import SVG from "react-inlinesvg";
import {
  headerSortingClasses,
  toAbsoluteUrl
} from "../../../_metronic/_helpers";
import {
  getProductModelSubmittedInfo,
  approveRejectProduct,
} from "../../services/configService";
import Cookie from "js-cookie";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCategoriesData } from "../../../redux/Category/action";
import "react-toastify/dist/ReactToastify.css";
import { showSuccessToast } from "../../../Utility/toastMsg";
import TablePagination from "../../Components/TablePagination";
import ApproveRejectAction from "./ApproveRejectAction";

export default function ApprovalPendingTable() {
  Cookie.remove("filterValue");
  const [isModify, setModify] = useState(false);
  const [show, setShow] = useState(false);
  const [IsApprove, setIsApprove] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModalApprovalPopUp, setShowModalApprovalPopUp] = useState(false);

  const handleClose = () => {
    setShow(false);
    setModify(false);
  };
  const handleShow = () => setShow(true);

  const [statusShow, setStatusShow] = useState(false);
  const [pendingData, setPendingData] = useState("");
  const [rowData, setRowData] = useState("");
  const [categoryInputs, setCategoryInputs] = useState([]);
  // const [statusPopUp, setStatusPopUp] = useState(false);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef();
  const dispatch = useDispatch();

  const renderActions = (_, row) => {
    return (
      <>
         {/* {selectedRows && selectedRows.length !== 2 &&  */}
          <>
            <a
              href="#"
              title="Approve"
              className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
              onClick={(e) => {
                e.stopPropagation();
                setStatusShow(true);
                setIsApprove(true)
                setRowData(row)
              }}
            >
              <span
                className="svg-icon svg-icon-md svg-icon-primary"
                onClick={() => setIsApprove(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="green"
                  className="bi bi-check-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </span>
            </a>
            <a
              href="#"
              title="Reject"
              className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
              onClick={(e) => {
                e.stopPropagation();
                setRowData(row)
                setStatusShow(true);
                setIsApprove(false)
                setIsApprove(false)
              }}
            >
              <span className="svg-icon svg-icon-md svg-icon-danger">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Error-circle.svg")} />
              </span>
            </a>

          </>

        {/* } */}

        <a
          href="#"
          title="View"
          className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
          onClick={(e) => {
            e.stopPropagation();
            handleShow();
            setPendingData(row);
            setCategoryInputs(JSON.parse(row?.formBuilderData))
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#5bc0de"
              className="bi bi-eye-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
          </span>
        </a>
      </>
    );
  };

  const handleSubmit = (selectedRows) => {
    let obj = {
      id: selectedRows && selectedRows.length > 0 ? selectedRows : [rowData?.id],
      status: IsApprove ? 1 : 3,
    };
    let x = Math.random();
    approveRejectProduct(obj)
      .then((res) => res.json())
      .then((res) => {
        dispatch(addCategoriesData(x));
        setRowData(undefined)
        setStatusShow(false);
        showSuccessToast(res?.message ?? "Success");
        setSelectedRows([]);
        setShowModalApprovalPopUp(false)
      })
      .catch((err) => setSelectedRows([]));
  };

  const IdFormatter = (col, row) => {
    return (<>
      <p style={{ display: "hidden" }}>{row?.manufacturerName ? row?.manufacturerName : "N/A"}</p>
    </>)
  };
  const manufacturerFormatter = (col, row) => {
    return row?.manufacturerName ? row?.manufacturerName : "N/A";
  };

  const modelNumberFormatter = (col, row) => {
    return row?.modelNumber ? row?.modelNumber : "N/A";
  };
  const CreatedByFormatter = (col, row) => {
    return row?.createdBy ? row?.createdBy : "N/A";
  };
  const UpdatedByFormatter = (col, row) => {
    return row?.updatedBy ? row?.updatedBy : "N/A";
  };
  const CategoryNameFormatter = (col, row) => {
    return row?.categoryName ? row?.categoryName : "N/A";
  };
  const productNameFormatter = (col, row) => {
    return row?.productName ? row?.productName : "N/A";
  };

  // let formattedOtherInfo = formatJsonString(pendingData?.otherInfo);
  const columns = [
    {
      dataField: "id",
      text: "Manufacturer Name",
      headerSortingClasses,
      formatter: IdFormatter,
    },
    {
      dataField: "manufacturerName",
      text: "Manufacturer Name",
      headerSortingClasses,
      formatter: manufacturerFormatter,
    },
    {
      dataField: "modelNumber",
      text: "Model No.",
      headerSortingClasses,
      formatter: modelNumberFormatter,
    },
    {
      dataField: "productName",
      text: "Product Name",
      headerSortingClasses,
      formatter: productNameFormatter,
    },
    {
      dataField: "categoryName",
      text: "Category Name",
      headerSortingClasses,
      formatter: CategoryNameFormatter,
    },
    {
      dataField: "CreatedBy",
      text: "Created By",
      headerSortingClasses,
      formatter: CreatedByFormatter,
    },
    {
      dataField: "UpdatedBy",
      text: "Updated By",
      headerSortingClasses,
      formatter: UpdatedByFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: renderActions,
      classes: "text-center pr-0",
      headerClasses: "text-center pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const listenchange = (e) => {
    let temp = e.target.value;
    if (temp !== "") {
      let changeAfterReplace = temp.replace(/^\s+|\s+$/g, '');
      setSearch(changeAfterReplace);
    } else {
      searchInputRef.current.value = "";
      let searchValues = Math.random();
      Cookie.remove("searchText");
      dispatch(addCategoriesData(searchValues));
    }
  };

  const handleSearch = () => {
    let x = Math.random();
    getProductModelSubmittedInfo(0, 10, search)
      .then((res) => res.json())
      .then(() => {
        Cookie.set("searchText", search)
        dispatch(addCategoriesData(x));
      });
  };

  const handleCloseModal = (isSubmit) => {
    setShowModalApprovalPopUp(false)
  }

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        setSelectedRows([...selectedRows, row.id]);
      } else {
        setSelectedRows(selectedRows.filter(id => id !== row.id));
      }
    },
    onSelectAll: (isSelect, rows, e) => {
      if (isSelect) {
        const allIds = rows.map(row => row.id);
        setSelectedRows(allIds);
      } else {
        setSelectedRows([]);
      }
    }
  };

  return (
    <>
      <Card style={{ marginTop: "-40px" }}>
        <CardHeader title="Pending Approval">
          <CardHeaderToolbar>
            <div className="d-flex">
              {selectedRows.length !== 0 &&
                <div style={{ display: "flex" }}>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary ml-2 mr-1"
                      title="Approve"
                      onClick={() => { setShowModalApprovalPopUp(true); setIsApprove(true); }}
                    >
                      Approve All
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger ml-2 mr-2"
                      title="Reject"
                      onClick={() => { setShowModalApprovalPopUp(true); setIsApprove(false); }}
                    >
                      Reject All
                    </button>
                  </div>
                </div>
              }
              <div>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  onChange={listenchange}
                  ref={searchInputRef}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary ml-2 mr-1"
                  onClick={(e) => {
                    handleSearch(undefined, undefined, listenchange);
                  }}
                  title="Search"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody style={{ justifyContent: "center" }}>
          <TablePagination
            keyField="id"
            columns={columns}
            getRecordList={getProductModelSubmittedInfo}
            isShowExportCsv={false}
            selectRow={selectRow}
          />
        </CardBody>
      </Card>

      <ApproveRejectAction
        show={showModalApprovalPopUp}
        handleCloseModal={handleCloseModal}
        IsApprove={IsApprove}
        selectedRows={selectedRows}
        handleSubmit={handleSubmit}
      />

      {/* -----  View Modal ---- */}

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Pending Approval Data Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Label>Manufacturer Name</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder={
                    pendingData?.manufacturerName
                      ? pendingData?.manufacturerName
                      : "N/A"
                  }
                  value={pendingData?.manufacturerName ?? "N/A"}
                  className="mb-3"
                  disabled
                />
              </Col>
              <Col>
                <Form.Label>Model Number</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder={
                    pendingData?.modelNumber ? pendingData?.modelNumber : "N/A"
                  }
                  value={pendingData?.modelNumber ?? "N/A"}
                  className="mb-3"
                  disabled
                />
              </Col>
            </Row>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder={
                pendingData?.productName
                  ? pendingData?.productName
                  : "N/A"
              }
              disabled
              value={pendingData?.productName ?? "N/A"}
              className="mb-3"
              style={{ width: "48%" }}
            />
            {/* <Form.Label>Category Name</Form.Label> */}
            {categoryInputs?.map((input, index) => {
              return (
                <>
                  {input?.Type === "Dropdown" && (
                    <>
                      <div className="test-fifty" style={{
                        width: "49%",
                        display: "inline-block",
                        marginRight: "6px"
                      }}>
                        <Form.Label>Category Name</Form.Label>
                        <select
                          className="mb-3"
                          style={{ width: "100%", height: "33px" }}
                          name={input?.Field}
                          value={pendingData?.categoryName}
                          required
                          disabled
                        >
                          <option value={pendingData?.categoryName}>{pendingData?.categoryName}</option>
                        </select>
                      </div>
                    </>
                  )}
                  {input?.Type === "Dropdown" && (
                    <>
                      <div className="test-fifty" style={{
                        width: "49%",
                        display: "inline-block",
                        marginRight: "6px"
                      }}>
                        <Form.Label>{input?.Field}</Form.Label>
                        <select
                          className="mb-3"
                          style={{ width: "100%", height: "33px" }}
                          value={input?.Value}
                          required
                          disabled
                        >
                          <option>Category Type</option>
                          {input?.DropdownData?.map((item, index) => (
                            <>
                              <option key={index} value={item?.Id}>
                                {item?.Value}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  {input?.Type === "Text" && (
                    <>
                      <div className="test-fifty" style={{
                        width: "49%",
                        display: "inline-block",
                        marginRight: "6px"
                      }}>
                        <Form.Label>{input?.Placeholder}</Form.Label><br />
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          value={input?.Value}
                          placeholder={input?.Placeholder}
                          className="mb-3"
                          required
                          style={{
                            display: "inline-block",
                            width: "100%",
                            marginRight: "8px",
                          }}
                          disabled
                        /><br />
                      </div>
                    </>
                  )}
                  {input?.Type === "DateTime" && (
                    <>
                      <div className="test-fifty" style={{
                        width: "49%",
                        display: "inline-block",
                        marginRight: "6px"
                      }}>
                        <Form.Label>{input?.Placeholder}</Form.Label><br />
                        <Form.Control
                          type="date"
                          autoComplete="off"
                          placeholder={input?.Placeholder}
                          value={input?.Value}
                          className="mb-3"
                          style={{
                            display: "inline-block",
                            width: "100%",
                            marginRight: "8px",
                          }}
                          disabled
                        />
                      </div>
                    </>
                  )}
                  {input?.Type === "Number" && (
                    <>
                      <div className="test-fifty" style={{
                        width: "49%",
                        display: "inline-block",
                        marginRight: "6px"
                      }}>
                        <Form.Label>{input?.Placeholder}</Form.Label><br />
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          placeholder={input?.Placeholder}
                          value={input?.Value}
                          className="mb-3"
                          style={{
                            display: "inline-block",
                            width: "100%",
                            marginRight: "8px",
                          }}
                          disabled
                        />
                      </div>
                      <br />
                    </>
                  )}
                  {input?.Type === "TextArea" && (
                    <>
                      <Form.Label>{input?.Placeholder}</Form.Label><br />
                      <Form.Control
                        as="textarea"
                        placeholder={input?.Placeholder}
                        rows={3}
                        className="mb-3"
                        value={input?.Value}
                        disabled
                      />
                    </>
                  )}
                </>
              );
            })}
            <Form.Label>Others</Form.Label><br />
            <Form.Control
              as="textarea"
              // placeholder={formattedOtherInfo ? formattedOtherInfo : "N/A"}
              rows={3}
              className="mb-3"
              name="others"
              value={pendingData?.otherInfo ?? "N/A"}
              disabled
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ----------Approve/Reject Modal---------- */}
      <Modal show={statusShow} onHide={() => setStatusShow(false)} centered>
        <Modal.Header>
          {/* <Modal.Title>{IsApprove ? "Approve" : "Reject"} Confirmation</Modal.Title> */}
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to {IsApprove ? "Approve" : "Reject"} ?{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setStatusShow(false)}>
            Cancel
          </Button>
          <Button
            variant={
              IsApprove ? "primary btn btn-primary" : "primary btn btn-danger"
            }
            onClick={handleSubmit}
          >
            {IsApprove ? "Approve" : "Reject"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* -----------Status Modal---------- */}

      {/* <Modal show={statusPopUp} onHide={() => setStatusPopUp(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Select Action</Form.Label>
            <br />
            <select
              className="form-control"
            //   onChange={handleSelectChange}
            //   value={checkActiveonEdit}
            >
              <option value="true">Pending</option>
              <option value="false">Approve</option>
              <option value="false">Reject</option>
            </select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: "#facd21",
              border: "none",
              color: "black",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}
