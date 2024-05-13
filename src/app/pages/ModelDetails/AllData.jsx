import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import {
  headerSortingClasses,
  toAbsoluteUrl,
} from "../../../_metronic/_helpers";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  reqProdCategory,
  getProductModelInfo,
  addProductInfo,
  deleteProductInfo,
  getProductInputsById,
  bulkUpload,
  updateApprovedProduct,
} from "../../services/configService";
import "./index.css";
import { useHistory } from 'react-router-dom';
import Cookie from "js-cookie";
import SVG from "react-inlinesvg";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCategoriesData } from "../../../redux/Category/action";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../../../Utility/toastMsg";
import TablePagination from "../../Components/TablePagination";
import { useEffect } from "react";
import { charValidate } from "../../../Utility/commonFunctions";
import EditProducts from "./EditProducts";
import ProductQueueTable from "./ProductQueueTable";

export default function AllData() {
  const searchInputRef = useRef();
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)

  const handleClose = () => {
    setShow(false);
    setCategoryNameonEdit("");
    setIsvalidate(false);
    setCategoryInputs();
    resetForm();
  };

  const handleShow = () => setShow(true);

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);
  const [productId, setProductId] = useState(0);
  const [search, setSearch] = useState("");

  const [checkIdonEdit, setCheckIdonEdit] = useState(0);
  const [categoryNameonEdit, setCategoryNameonEdit] = useState("");
  const [categoryNameOnSelection, setCategoryNameOnSelection] = useState("");
  const [viewData, setViewData] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [categoryInputs, setCategoryInputs] = useState([]);
  const [checkActiveonEdit, setCheckActiveonEdit] = useState(true);
  const [error, setError] = useState("");

  const [isValidate, setIsvalidate] = useState("");

  const dispatch = useDispatch();

  const statusFormatter = (col, row) => {
    return row?.status === 0
      ? "Pending"
      : row?.status === 1
        ? <span style={{ color: "green" }}>Approved</span>
        : row?.status === 2
          ? <span style={{ color: "#ff9a00" }}>Submitted</span> : row?.status === 3 ? <span style={{ color: "red" }}>Rejected</span>
            : "N/A";
  };

  const manufacturerFormatter = (col, row) => {
    return row?.manufacturerName ? row?.manufacturerName : "N/A";
  };

  const modelNumberFormatter = (col, row) => {
    return row?.modelNumber ? row?.modelNumber : "N/A";
  };

  useEffect(() => {
    reqProdCategory(0, 100)
      .then((res) => res.json())
      .then((res) => {
        setCategoryName(res?.result);
      });
  }, []);
  // const [categoryValue, setCateogryValue] = useState("")

  // const handleCategoryChange = (e) => {
  //   let categoryNameonChange = e.target.options[e.target.selectedIndex].textContent;
  //   setCategoryNameOnSelection(categoryNameonChange)
  //   handleChange(e);
  //   // const { name, value } = e.target;
  //   // const manufacturerNameValue = value.manufacturerName;
  //   // setFieldValue('manufacturerName', manufacturerNameValue);
  //   // console.log(manufacturerNameValue, "mafuna name", name, "va;ie")
  //   // resetForm();
  //   setCateogryValue(e.target.value)
  //   let categoryId = e.target.value;
  //   getProductInputsById(categoryId)
  //     .then((result) => result.json())
  //     .then((result) => {
  //       setCategoryInputs(JSON.parse(result?.result[0]?.formBuilderData));
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const renderActions = (_, row) => {
    // console.log(row)
    return (
      <>
        {row?.status === 1 ? (
          <>
            <a
              href="#"
              title="Edit"
              className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
              onClick={(e) => {
                e.preventDefault();
                setShowEditModal(true);
                setViewData(row);
                setCategoryInputs(JSON.parse(row?.formBuilderData))
              }}
            >
              <span className="svg-icon svg-icon-md svg-icon-primary">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                />
              </span>
            </a>
          </>
        ) : (
          ""
          // <a
          //   href="#"
          //   title="Disabled"
          //   className="btn btn-icon btn-light btn-hover-secondary  btn-sm mx-1"
          //   disabled
          //   onClick={(e) => {
          //     e.preventDefault();
          //   }}
          // >
          //   <span className="svg-icon svg-icon-md svg-icon-secondary">
          //     <SVG
          //       src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          //     />
          //   </span>
          // </a>
        )}
        <a
          href="#"
          title="Delete category"
          className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
          onClick={(e) => {
            e.stopPropagation();
            showDeleteModal(e, row?.id);
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
          </span>
        </a>
        <a
          href="#"
          title="View"
          className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
          onClick={(e) => {
            e.stopPropagation();
            setShowView(true);
            setViewData(row);
            setCategoryInputs(JSON.parse(row?.formBuilderData))
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#5bc0de"
              class="bi bi-eye-fill"
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

  const initialValues = {
    manufacturerName: "",
    serialNumber: "",
    modelNumber: "",
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
    const productName = row?.productName ? charValidate(row?.productName, 20) : "N/A";
    return (
      <span title={row?.productName}>
        {productName}
      </span>
    );
  };

  const addProductSchema = Yup.object({
    others: Yup.string()
      .trim("can't be empty")
      .required("Other Info can't be empty")
      .test(
        "keyValuePairs",
        "Input must be in the format of key-value pairs e.g - Name: John;",
        (value) => {
          if (!value) return true;
          const keyValuePattern = /^(\w+\s*:\s*\S+\s*;\s*)+$/;
          return keyValuePattern.test(value);
        }
      ),
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addProductSchema,
    onSubmit: (values, action) => {
      let allDynamicInputs = [];
      categoryInputs.map(e => {
        const field = {
          ...e,
          Value: values[e?.Field],
        };
        allDynamicInputs.push(field);
      });
      let bodyParams = {
        status: 0,
        modelNumber: values?.modelNumber ?? "",
        manufacturerName: values?.manufacturerName ?? "",
        categoryName: categoryNameOnSelection ?? "",
        categoryId: values?.categoryName ?? "",
        productName: values?.productName ?? "",
        categoryType: values?.Type ?? "",
        automotiveType: values?.AutomotiveType ?? "",
        typeofLicence: values?.LicenseType ?? "",
        expiryDate: values?.ExpiryDate + "" ?? "",
        systemType: values?.SystemType ?? "",
        phoneOS: values?.PhoneOS ?? "",
        capacity: values.Capacity + "" ?? "",
        numberOfDoors: values?.NumberofDoors ?? "",
        screenSize: values?.ScreenSize ?? "",
        resolution: values.Resolution ?? "",
        manufactureYear: values?.ManufactureYear + "" ?? "",
        noiseLevel: values?.NoiseLevel ?? "",
        controlButtonPlacement: values?.ControlButtonPlacement ?? "",
        cookingPower: values?.CookingPower ?? "",
        description: values?.Description ?? "",
        formBuilderData: JSON.stringify(allDynamicInputs),
        otherInfo: values.others ?? "",
      };
      addProductInfo(bodyParams)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.result === false) {
            setError(res.message);
          } else if (res.result === true) {
            setError("")
            dispatch(addCategoriesData(values));
            showSuccessToast(res.message);
            handleClose();
          }
        })
        .catch((error) => {
          showErrorToast("Unauthorized");
        });
    },
  });
  // const deleteSubmit = (e) => {
  //   e.preventDefault();
  //   let obj = {
  //     id: productId,
  //   };
  //   deleteProductInfo(productId)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       handleDeleteClose();
  //       dispatch(addCategoriesData(obj));
  //       if (res.result) {
  //         showSuccessToast(res.message);
  //       } else {
  //         showErrorToast(res.message);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const showModal = (e, obj) => {
  //   e.preventDefault();
  //   if (obj == null) {
  //     setCategoryNameonEdit("");
  //     setCheckActiveonEdit(true);
  //   } else {
  //     setCheckIdonEdit(obj.productId);
  //     setCategoryNameonEdit(obj.categoryName);
  //     setCheckActiveonEdit(obj.isActive);
  //   }
  //   handleShow();
  // };

  const showDeleteModal = (e, id) => {
    e.preventDefault();
    setProductId(id);
    handleDeleteShow();
  };

  const columns = [
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
      dataField: "categoryName",
      text: "Category Name",
      headerSortingClasses,
      formatter: CategoryNameFormatter,
    },
    {
      dataField: "productName",
      text: "Product Name",
      headerSortingClasses,
      formatter: productNameFormatter,
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
      dataField: "status",
      text: "Status",
      headerSortingClasses,
      formatter: statusFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: renderActions,
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  // const listenchange = (e) => {
  //   let temp = e.target.value;
  //   if (temp !== "") {
  //     let changeAfterReplace = temp.replace(/^\s+|\s+$/g, '');
  //     setSearch(changeAfterReplace);
  //   } else {
  //     searchInputRef.current.value = "";
  //     let searchValues = Math.random();
  //     Cookie.remove("searchText");
  //     dispatch(addCategoriesData(searchValues));
  //   }
  // };

  // const handleSearch = () => {
  //   let searchValue = Math.random();
  //   getProductModelInfo(0, 10, search)
  //     .then((res) => res.json())
  //     .then(() => {
  //       Cookie.set("searchText", search)
  //       dispatch(addCategoriesData(searchValue));
  //     });
  // };

  // const history = useHistory()

  // const handleNavigate = () => {
  //   history.push("/bulk-upload")
  // }
  // const handleFilter = (e) => {
  //   let x = Math.random();
  //   let filterValue = e.target.value;
  //   Cookie.set("filterValue", filterValue);
  //   dispatch(addCategoriesData(x));
  // };

  // let formattedOtherInfo = formatJsonString(viewData?.otherInfo);

  // const getCurrentDate = () => {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   return `${year}`;
  // };

  // useEffect(() => {
  //   reqProdCategory(0, 100)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setCategoryName(res?.result);
  //     });
  // }, []);

  // const [showErrorOnEdit, setShowErrorOnEdit] = useState("")
  // const [otherInfoValidation, setOtherInfoValidation] = useState(false)

  // const handleEditChange = (event, fieldName) => {
  //   const { name, value } = event.target;

  //   const pattern = /^(\w+\s*:\s*\S+\s*;\s*)+$/;

  //   // Check if the input value matches the pattern
  //   if (name === "otherInfo" && !pattern.test(value)) {
  //     // If it doesn't match, you can prevent further action or show an error
  //     // For example:
  //     setShowErrorOnEdit("Input must be in the format of key-value pairs e.g - Name: John;");
  //     // setOtherInfoValidation(true)
  //   } else {
  //     setShowErrorOnEdit("");
  //   }
  //   setCategoryInputs((prevInputs) =>
  //     prevInputs.map((input) =>
  //       input?.Type === "TextArea" && input?.Placeholder === fieldName
  //         ? { ...input, Value: value }
  //         : input
  //     )
  //   );

  //   setViewData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  // const [isOtherInfoInvalid, setIsOtherInfoInvalid] = useState(false);


  // const handleEditSubmit = () => {
  //   // console.log('categoryInputs:', categoryInputs);
  //   // console.log('formattedOtherInfo:', formattedOtherInfo);
  //   if (showErrorOnEdit) {
  //     return;
  //   } else {
  //     let payloadObj = {
  //       modelNumber: viewData?.modelNumber ?? "",
  //       manufacturerName: viewData?.manufacturerName ?? "",
  //       categoryId: viewData?.categoryId ?? "",
  //       categoryName: viewData?.categoryName ?? "",
  //       productName: viewData?.productName ?? "",
  //       categoryType: viewData?.categoryType ?? "",
  //       automotiveType: viewData?.automotiveType ?? "",
  //       typeofLicence: viewData?.typeofLicence ?? "",
  //       expiryDate: viewData?.expiryDate ?? "",
  //       systemType: viewData?.systemType ?? "",
  //       phoneOS: viewData?.phoneOS ?? "",
  //       capacity: viewData?.capacity ?? "",
  //       numberOfDoors: viewData?.numberOfDoors ?? "",
  //       screenSize: viewData?.screenSize ?? "",
  //       resolution: viewData?.resolution ?? "",
  //       manufactureYear: viewData?.manufactureYear ?? "",
  //       noiseLevel: viewData?.noiseLevel ?? "",
  //       controlButtonPlacement: viewData?.controlButtonPlacement ?? "",
  //       cookingPower: viewData?.cookingPower ?? "",
  //       description: viewData?.description ?? "",
  //       formBuilderData: JSON.stringify(categoryInputs)  ?? "",
  //       otherInfo: viewData?.otherInfo ?? "",
  //       status: 0
  //     }
  //     // console.log("payloadObj : ", payloadObj)
  //     // Access the values from viewData, categoryInputs, formattedOtherInfo
  //     // console.log('viewData:', viewData);
  //     updateApprovedProduct(payloadObj, viewData?.id)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if(res && res.result == true){
  //           dispatch(addCategoriesData(payloadObj));
  //           showSuccessToast(res.message ?? "Product updated successfully");
  //           // setSubmitShow(false)
  //           setShowEditModal(false)
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <>
      <ProductQueueTable 
        status={""}
        title={"All Product"}
        screen="ALL_DATA"
      />
    </>
  );
}
