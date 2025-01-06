/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from "react";
import {  Container, Spinner } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../Utility/toastMsg";
// import "./Warranty.css";
import { useQuery, useQueryClient } from "react-query";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import * as XLSX from "xlsx";
import PaymentTable from "./PaymentTable";
import ViewUserPaymentModal from "./ViewUserPaymentModal";

const userPayments = () => {  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [rowData, setRowData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false); // Modal visibility state
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [commonSearchTerm, setCommonSearchTerm] = useState("");
    const [formData, setFormData] = useState({});

//access the client
  useQueryClient();
  const userPaymentsapilog = async () => {
    const response = await  fetch(`${process.env.REACT_APP_JAVA_API_URL}/transactions/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  };
  //Query the client
  const { isLoading, data,status, isError,isSuccess } = useQuery("payments",
    userPaymentsapilog
  );
  useEffect(() => {
    if (isSuccess) {
      showSuccessToast("Payment history fetched successfully");
    }
  }, [isSuccess]); // Trigger the toast only when the query succeeds for the first time
if(status==="error"){
  showErrorToast(
   "Something went wrong. Please try again later"
  )
}  
const renderActions = (_, row) => {
    return (
      <>
        <button
          type="button"
          title="View"
          className="btn btn-icon btn-light btn-hover-warning btn-sm mr-2"
          onClick={() => handleRowClick(row)}
        >
          <span className="svg-icon svg-icon-md svg-icon-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#5BC0DE"
              className="bi bi-eye-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
          </span>
        </button>
      </>
    );
  };
  const [columns] = useState([
 { dataField: "email", text: "Email" },
    { dataField: "phoneNumber", text: "Phone" },
    { dataField: "productId", text: "Product id" },
    { dataField: "productName", text: "Product Name" },
    { dataField: "price", text: "Amount", formatter: (cell) => `$${parseFloat(cell).toFixed(2)}` },
    // { dataField: "address", text: "Address" },
    { dataField: "chargeRequest_status", text: "Payment Status" },
    {
      dataField: "createdAt", text: "Payment Date",
      formatter: (cell) => {
        const date = new Date(cell);
        const formattedDate = date.toLocaleDateString();
        return `${formattedDate}`;
      },
    },

    { dataField: "action", text: "Actions", formatter: renderActions },
  ]);

  const searchInputRefs = useRef(columns.map(() => React.createRef()));
  const handleRowClick = (row) => {
    setRowData(row);
    setFormData({
        email: row?.email,
        phoneNumber: row?.phoneNumber,
        productId: row?.productId,
        productName: row?.productName,
        price: row?.price,
        chargeRequest_status: row?.chargeRequest_status,
        createdAt: row?.createdAt,
      interval: row?.interval,
      paymentMethod: row?.paymentMethod,
      transactionId:row?.transactionId
   
    });
     setShowViewModal(true);
  };
  console.log("formData",formData);
  console.log("rowData",rowData)
  console.log("showViewModal",showViewModal)
  console.log("rowData.email", rowData?.email || "");

  const handleCloseModal = () => {
    setShowViewModal(false);
    setRowData(null);
  };


  const exportToExcel = () => {
    try {
      // Ensure data is not empty
      if (!data || data.length === 0) {
        showErrorToast("No data to export.");
        return;
      }

      // Filter out the 'id' field from each object in data
      const filteredData = data.map(({ id, ...rest }) => rest);

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "warranty_data.xlsx");
      showSuccessToast("Data exported to Excel successfully.");
    } catch (error) {
      showErrorToast("Error exporting data to Excel.");
      // console.error("Export to Excel error:", error);
    }
  };

  const handleSearchChange = (e, column) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [column.dataField]: searchValue,
    }));

    const filtered = data.filter((item) =>
      Object.entries(searchTerms).every(([key, value]) =>
        String(item[key])
          .toLowerCase()
          .includes(value)
      )
    );

    setFilteredData(filtered);
  };
console.log("filtered data",filteredData)
  const handleCommonSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setCommonSearchTerm(searchValue);

    const filtered = data.filter((item) =>
      columns.some((column) =>
        String(item[column.dataField])
          .toLowerCase()
          .includes(searchValue)
      )
    );

    setFilteredData(filtered);
  };
 if(isError){
   return(
    <div>
     <h1>Something went wrong. Please try again later.</h1>
    </div>
   )
 }
  return (
    <Container>
      <Card>
        <CardHeader >
          <CardHeaderToolbar>
            <div className="d-flex">
              <div>
                <input
                  type="search"
                  id="searchInput"
                  className="form-control ml-2"
                  placeholder="Search..."
                  onChange={handleCommonSearchChange}
                  value={commonSearchTerm}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary ml-2 mr-1"
                  title="Search"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <button
                  onClick={exportToExcel}
                  type="button"
                  className="btn btn-primary ml-2 mr-1"
                  title="Export Excel"
                >
                  Export Excel
                </button>
              </div>
            </div>
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody style={{ justifyContent: "center" }}>
         
        {isLoading ? ( // Display a loading spinner while data is being fetched
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
          <PaymentTable
            columns={columns}
            data={filteredData.length>0?filteredData: data}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            paginate={setCurrentPage}
            searchInputRefs={searchInputRefs}
            handleSearchChange={handleSearchChange}
            handleRowClick={handleRowClick} 
          />
          )}
          <ViewUserPaymentModal
          setFormData={setFormData}
            show={showViewModal}
            onHide={handleCloseModal}
            formData={formData}
          />
        </CardBody>
      </Card>
    </Container>
  );
};

export default userPayments;
