import React, { useRef } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { bulkUpload } from "../../services/configService";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../Utility/toastMsg";
import { Button } from "react-bootstrap";
import {
    headerSortingClasses,
    toAbsoluteUrl,
} from "../../../_metronic/_helpers";
import { useHistory } from 'react-router-dom';
// import TablePagination from "../../Components/TablePagination";
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { useDispatch } from "react-redux";
import { addCategoriesData } from "../../../redux/Category/action";
// import paginationFactory from 'react-bootstrap-table2-paginator';

export default function BulkUpload() {

    const dispatch = useDispatch();
    const [excelFileName, setExcelFileName] = useState([]);
    const history = useHistory()
    const [selectedFile, setSelectedFile] = useState("");
    const [resultData, setResultData] = useState([]);
    const [Error, setError] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        setSelectedFile(e?.target?.files[0] ?? "")
        setExcelFileName(e?.target?.files[0]?.name ?? "");
        e.preventDefault();
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true)
        if (excelFileName) {
            let formData = new FormData();
            formData.append("file", selectedFile);
            bulkUpload(formData)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if (res.result === false || res.result === null) {
                        setError(res.message);
                        setShowTable(false)
                        setShowLoader(false)
                    } else {
                        let values = Math.random();
                        dispatch(addCategoriesData(values));
                        setSelectedFile("");
                        setExcelFileName("")
                        setSelectedFile("");
                        setShowTable(true)
                        setResultData(res?.result);
                        setError(false)
                        setShowLoader(false)
                        showSuccessToast("File uploaded successfully")
                        fileInputRef.current.value = '';
                    }
                })
                .catch((error) => {
                    showErrorToast("Something went wrong!!");
                    setShowLoader(false)
                });
        } else {
            setSelectedFile()
            setExcelFileName()
        }
    };

    const columns = [
        {
            dataField: "rowNumber",
            text: "Row Number",
            headerSortingClasses,
        },
        {
            dataField: "status",
            text: "Status",
            headerSortingClasses,
        },
        {
            dataField: "message",
            text: "Message",
            headerSortingClasses,
        },
    ];
    const downloadExcelTemplate = () => {
        const url = 'https://melbeez.s3.us-west-1.amazonaws.com/Template/ProductModelInfoTemplate.xlsm';
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ProductModelInfoTemplate.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const goBack = () => {
        history.push("/model-details")
    }

    return (
        <>
            <Card style={{ marginTop: "-40px" }}>
                <CardHeader title="Bulk Upload">
                    <CardHeaderToolbar>
                        <Button variant="outline-secondary" onClick={goBack}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>&nbsp; &nbsp;Back</Button>
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody style={{ padding: "20px" }}>
                    <div className="mb-4 border border-dark p-5 bg-light" >
                        <h5>How to Upload ?</h5>
                        <hr />
                        <ol>
                            <li>Download a template <span onClick={downloadExcelTemplate} style={{ cursor: 'pointer', color: 'blue' }}>Click to download template</span></li>
                            <li>Add your data to the template file, Make sure it's a '.xlsx' or '.xlsm'</li>
                            <li>Upload file</li>
                        </ol>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                        <div className="border border-dark p-3 w-25">
                            <input type="file" id="file" onChange={handleFileChange} ref={fileInputRef} />
                        </div>
                        <div>
                            <Button variant="primary" onClick={handleUploadSubmit} disabled={showLoader || !selectedFile}>{showLoader ? "Loading..." : "Upload"}</Button>
                            <p className="text-danger">{Error}</p>
                        </div>
                    </div>
                    {showTable && <BootstrapTable
                        keyField="rowNumber"
                        data={resultData ?? []}
                        columns={columns}
                        striped
                        hover
                        condensed
                    // pagination={paginationFactory({
                    //     sizePerPage: 10,
                    //     sizePerPageList: [10, 20, 30],
                    //     showTotal: true,
                    // })}
                    />}
                </CardBody>
            </Card>
        </>
    );
}
