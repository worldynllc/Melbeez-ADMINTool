import React, { useState,  useRef } from "react";
import { Table} from "react-bootstrap"; 
import { TablePagination } from "@material-ui/core";


const  PaymentTable = ({
  columns,
  data,
  currentPage,
  itemsPerPage: initialItemsPerPage,
  paginate, 
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [searchQueries] = useState({});
  // const [selectedIds, setSelectedIds] = useState([]);
   useRef(columns.map(() => React.createRef()));

  const sortedData = Array.isArray(data)? data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ): "data is not an array"


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    paginate(1); // Reset to the first page when changing items per page
  };

  const filteredData = currentItems.filter((item) =>
    columns.every((column) => {
      const query = searchQueries[column.dataField];
      if (query && column.dataField !== "actions") {
        const cellValue = item[column.dataField];

        if (typeof cellValue === "string") {
          return cellValue.toLowerCase().includes(query.toLowerCase());
        } else if (typeof cellValue === "number") {
          return cellValue.toString().includes(query);
        }

        return false;
      }
      return true; // Include items that haven't been searched or are in 'actions'
    })
  );


  return (
    <>
      {filteredData.length === 0 ? (
        <div className="text-center text-danger mt-4">
          No pending data found!
        </div>
      ) : (
        <div className="table-responsive">
          <Table
            className="table table-head-custom table-vertical-center overflow-hidden"
            hover
            condensed="true"
          >
            <thead>
              <tr>
            
                {columns.map((column, index) => (
                  <th key={index}>{column.text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id}>
                 
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                      {column.formatter
                        ? column.formatter(item[column.dataField], item)
                        : item[column.dataField]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]} 
        component="div"
        count={sortedData.length}
        rowsPerPage={itemsPerPage}
        page={currentPage - 1}
        onChangePage={(e, newPage) => paginate(newPage + 1)}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PaymentTable;
