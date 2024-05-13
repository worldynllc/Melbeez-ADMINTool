import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../_metronic/_partials/controls';
import {
  headerSortingClasses,
  toAbsoluteUrl,
} from '../../../../_metronic/_helpers';
import {
  reqProdCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} from '../../../services/configService';
import TablePagination from '../../../Components/TablePagination';
import SVG from 'react-inlinesvg';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addCategoriesData } from '../../../../redux/Category/action';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from '../../../../Utility/toastMsg';
import { addBlockUserData } from '../../../../redux/Block_user/action';
import Cookie from "js-cookie";


export default function Category() {
  const searchInputRef = useRef();  

  const [isModify, setModify] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const handleClose = () => {
    setShow(false);
    setModify(false);
    setCategoryNameonEdit('');
    setIsvalidate(false)
  };
  const handleShow = () => setShow(true);

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);
  const [categoryId, setCategoryId] = useState(0);

  const [checkIdonEdit, setCheckIdonEdit] = useState(0);
  const [categoryNameonEdit, setCategoryNameonEdit] = useState('');
  const [checkActiveonEdit, setCheckActiveonEdit] = useState(true);

  const [ isValidate, setIsvalidate] = useState("");

  const dispatch = useDispatch();

  const headerFormat = (col, row) => {
    if (row.isActive === true) {
      return 'Published';
    } else {
      return 'Drafted';
    }
  };

  const renderActions = (_, row) => {
    return (
      <>
        <a
          href="#"
          title="Edit category"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={(e) => {
            e.stopPropagation();
            showModal(e, row);
            setModify(true);
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
            />
          </span>
        </a>
        <a
          href="#"
          title="Delete category"
          className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
          onClick={(e) => {
            e.stopPropagation();
            showDeleteModal(e, row.categoryId);
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
          </span>
        </a>
      </>
    );
  };

  const deleteSubmit = (e) => {
    e.preventDefault();
    let obj = {
      catId: categoryId,
    };
    deleteCategory(categoryId)
      .then((res) => res.json())
      .then((res) => {
        handleDeleteClose();
        dispatch(addCategoriesData(obj));
        if (res.result) {
          showSuccessToast(res.message);
        } else {
          showErrorToast(res.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const showModal = (e, obj) => {
    e.preventDefault();
    if (obj == null) {
      setCategoryNameonEdit('');
      setCheckActiveonEdit(true);
    } else {
      setCheckIdonEdit(obj.categoryId);
      setCategoryNameonEdit(obj.categoryName);
      setCheckActiveonEdit(obj.isActive);
    }
    handleShow();
  };

  const handleSubmit = () => {
    const categoryData = categoryNameonEdit.trim()
    if(!categoryData){
      setIsvalidate(true)
      return 
    }
    if (isModify) {
      let obj = {
        categoryId: checkIdonEdit,
        categoryName: categoryNameonEdit,
        isActive: checkActiveonEdit,
      };
      updateCategory(obj)
        .then((res) => res.json())
        .then((res) => {
          dispatch(addCategoriesData(obj));
          handleClose();
        })
        .catch((err) => console.log(err));
    } else {
      let objs = {
        categoryName: categoryNameonEdit,
        isActive: checkActiveonEdit,
      };
     
      addCategory(objs)
        .then((res) => res.json())
        .then((res) => {
          handleClose();
          dispatch(addCategoriesData(objs));
          if (res.result) {
            showSuccessToast(res.message);
          } else {
            showErrorToast(res.title);
            showErrorToast(res.message);
          }
        })
        .catch((error) => {
          showErrorToast(error.message);
        });
    }
  }

  const showDeleteModal = (e, id) => {
    e.preventDefault();
    setCategoryId(id);
    handleDeleteShow();
  };

  const columns = [
    {
      dataField: 'categoryName',
      text: 'Name',
      headerSortingClasses,
      
    },
    {
      dataField: 'isActive',
      text: 'Publish',
      headerSortingClasses,
      formatter: headerFormat,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: renderActions,
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px',
      },
    },
  ];

  const handleSelectChange = (e) => {
    e.preventDefault();
    setCheckActiveonEdit(e.target.value === 'true' ? true : false);
  };

  const handleChange = (e) => {
    setCategoryNameonEdit(e.target.value)
    setIsvalidate(false)
  }

  const listenchange = (e) => {
    let temp = e.target.value;
    if(temp !== ""){
      let changeAfterReplace = temp.replace(/^\s+|\s+$/g, '');
      setSearch(changeAfterReplace);
    }else{
        searchInputRef.current.value = "";
        let searchValues = Math.random();
        Cookie.remove("searchText");
        dispatch(addCategoriesData(searchValues));
    }
  };

  const handleSearch = () => {
    reqProdCategory(0,10,search)
      .then((res) => res.json())
      .then(() => {
        Cookie.set("searchText",search)
        dispatch(addBlockUserData(search));
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              onChange={handleChange}
              placeholder="Enter Category name"
              value={categoryNameonEdit}
              className="mb-3"
            />
            {isValidate && (
              <p style={{ color: "red" }}>Category name is required</p>
            )}
            <Form.Label>Publish or Save as Draft</Form.Label>
            <br />
            <select
              className="form-control"
              onChange={handleSelectChange}
              value={checkActiveonEdit}
            >
              <option value="true">Publish</option>
              <option value="false">Draft</option>
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
      </Modal>
      <Card style = {{marginTop : "-40px"}}>
        <CardHeader title="Categories">
          <CardHeaderToolbar>
            <div className="d-flex">
              <div>
                <input
                  id="search-focus"
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
              <div>
                <Button onClick={showModal}>Add New</Button>
              </div>
            </div>
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody style={{ justifyContent: "center" }}>
          <TablePagination
            keyField="Id"
            columns={columns}
            getRecordList={reqProdCategory}
            isShowExportCsv={false}
          />
        </CardBody>
      </Card>
      <Modal show={deleteShow} onHide={handleDeleteClose} centered>
        <Modal.Header>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this Category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button
            variant="primary btn btn-danger"
            onClick={(e) => {
              deleteSubmit(e);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
