import React from "react";
import { headerSortingClasses } from "../../../../_metronic/_helpers";
import { Container, Table, Pagination, Spinner } from "react-bootstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../../Utility/toastMsg";
import * as XLSX from "xlsx";
import { selectFilter } from "react-bootstrap-table2-filter";
import moment from "moment";
function Transaction() {
  const [columns] = useState([
    { dataField: "userName", text: "user Name", headerSortingClasses },
    { dataField: "email", text: "Email", headerSortingClasses },
    {
      dataField: "phoneNumber",
      text: "Mobile",
      headerSortingClasses,
      formatter: (cell) => `${parseFloat(cell)}%` || "N/A",
    },
    { dataField: "vendor", text: "Vendor", headerSortingClasses },
    { dataField: "productName", text: "Product Name", headerSortingClasses },

    {
      dataField: "price",
      text: "Price",
      headerSortingClasses,
      formatter: (cell) => `$${parseFloat(cell).toFixed(2)}`,
    },

    {
      dataField: "interval",
      text: "subscription",
      headerSortingClasses,
      formatter: (cell) => `$${parseFloat(cell).toFixed(2)}`,
    },

    {
      dataField: "invoice_status",
      text: "Status",
      headerSortingClasses,
      formatter: (cell) => cell,
    },

    {
      dataField: "createdAt",
      text: "subscription Date",
      headerSortingClasses,
      formatter: (cell) => {
        const trimmedCell = cell.slice(0, -5);
        return moment(trimmedCell).format("DD-MM-YYYY");
      },
    },
  ]);

  const {
    fetchTransactionDetails,
    transactiondata,
    loading,
    setfilterdata,
    filterdata,
  } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [commonSearchTerm, setCommonSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterdata.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleRowsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    try {
      if (!transactiondata || transactiondata.length === 0) {
        showErrorToast("No data to export.");
        return;
      }

      const filteredData = transactiondata.map(({ id, ...rest }) => rest);

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "userTransctionlog.xlsx");
      showSuccessToast("Data exported to Excel successfully.");
    } catch (error) {
      showErrorToast("Error exporting data to Excel.");
    }
  };

  const handleFilter = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "") {
      setfilterdata(transactiondata);
    } else {
      const filtered = transactiondata.filter(
        (item) =>
          item.invoice_status.toLowerCase() === filterValue.toLowerCase()
      );
      setfilterdata(filtered);
    }
  };

  const handleCommonSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setCommonSearchTerm(searchValue);

    const filtered = transactiondata.filter((item) =>
      columns.some((column) =>
        String(item[column.dataField])
          .toLowerCase()
          .includes(searchValue)
      )
    );

    setfilterdata(filtered);
  };

  const renderhead = () => {
    return (
      <tr>
        {columns.map((col) => (
          <th key={col.dataField}>{col.text}</th>
        ))}
      </tr>
    );
  };

  const renderdata = () => {
    return (
      <>
        {currentItems.map((item, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.dataField}>
                {col.dataField === "createdAt"
                  ? moment(item[col.dataField].slice(0, -5)).format(
                      "DD-MM-YYYY"
                    )
                  : col.dataField === "interval"
                  ? item[col.dataField] === "month"
                    ? "Monthly"
                    : item[col.dataField] === "year"
                    ? "Yearly"
                    : item[col.dataField]
                  : item[col.dataField]}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(transactiondata.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Card>
        <CardHeader title="Transaction logs">
          <CardHeaderToolbar>
            <div>
              <select
                name="invoice_statusSelect"
                id="invoice_statusSelect"
                onChange={handleFilter}
                style={{
                  height: "38px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "1.1em",
                  padding: "3px 0px",
                  marginRight: "10px",
                  marginTop: "2px",
                  backgroundColor: "#fff",
                }}
              >
                <option value="" defaultValue>
                  Filter by status
                </option>
                <option value="paid">paid</option>
                <option value="open">open</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div className="d-flex">
              <div>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search Transaction..."
                  onChange={handleCommonSearchChange}
                  value={commonSearchTerm}
                />
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
        <CardBody>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table
                  className="table table-head-custom table-vertical-center overflow-hidden"
                  hover
                  condensed="true"
                >
                  <thead>{renderhead()}</thead>
                  <tbody>{renderdata()}</tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <select
                    id="rowsPerPage"
                    value={itemsPerPage}
                    onChange={handleRowsPerPageChange}
                    style={{
                      height: "38px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "1.1em",
                      padding: "3px 0px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>

                <div className="d-flex justify-content-center w-100">
                  <Pagination>
                    {pageNumbers.map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}

export default Transaction;
