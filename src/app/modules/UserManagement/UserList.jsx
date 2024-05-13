import React, { useRef, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../_metronic/_partials/controls';
import {
  sortCaret,
  headerSortingClasses,
  toAbsoluteUrl,
} from '../../../_metronic/_helpers';
import { useDispatch } from 'react-redux';
import { addBlockUserData } from '../../../redux/Block_user/action';
import {
  getUserList,
  requestUserList,
  reqUserRestriction,
  userVerify,
} from '../../services/configService';
import TablePagination, { CSVExport } from '../../Components/TablePagination';
import { Button, Modal } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { addConfirmUserdata } from '../../../redux/User_Confirm/action';
import { SearchingUserdata } from '../../../redux/Search/action';
import { showSuccessToast } from '../../../Utility/toastMsg';
import { useEffect } from 'react';
import Cookie from "js-cookie"

export default function UserList() {
  const searchInputRef = useRef();
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setDisableTemp(false);
    setDisablePermanent(false);
  };
  const handleShow = () => setShow(true);
  const [confirmShow, setConfirmShow] = useState(false);

  const handleconfirmClose = () => {
    setConfirmShow(false);
    setCheckEmail(false);
    setCheckPhone(false);
  };
  const handleClose2 = () => {
    setConfirmShow(false);
  };
  const handleconfirmShow = () => {
    setConfirmShow(true);
  };
  const [userId, setUserId] = useState('');

  const [verifyUserId, setVerifyUserID] = useState(false);

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);

  const [isChecked, setIsChecked] = useState();
  const [togleCheck, setTogleCheck] = useState();
  let [disableTemp, setDisableTemp] = useState();
  let [disablePermanent, setDisablePermanent] = useState();

  const handleTemporaryBlock = (e) => {
    setIsChecked(e?.target?.checked);
    if (isChecked == true) {
      setTogleCheck(false);
      setDisableTemp(false);
    } else {
      setDisableTemp(true);
    }
  };

  const handlePermanentBlock = (e) => {
    setTogleCheck(e?.target?.checked);
    setIsChecked(false);
    if (togleCheck == false) {
      setDisablePermanent(true);
    } else {
      setDisablePermanent(false);
    }
  };

  const handlePhoneChange = (e) => {
    setCheckPhone(e.target.checked);
  };

  const handleEmailChange = (e) => {
    setCheckEmail(e.target.checked);
  };

  const submitVerifyUser = () => {
    userVerify(verifyUserId, checkEmail, checkPhone)
      .then((res) => res.json())
      .then((res) => {
        dispatch(addConfirmUserdata(verifyUserId, checkEmail, checkPhone));
        showSuccessToast(res.message);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose2();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      userId: userId,
      isTemporaryLock: isChecked,
      isPermanentLock: togleCheck,
    };

    reqUserRestriction(userId, isChecked, togleCheck)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        dispatch(addBlockUserData(obj));
        showSuccessToast(res.message);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const showModal = (e, row) => {
    e.preventDefault();
    setIsChecked(row?.isLockOut);
    setUserId(row?.id);
    let tempblock = row.isTemporaryLockOut;
    let permanentblock = row.isPermanentLocuOut;
    setIsChecked(tempblock);
    setTogleCheck(permanentblock);
    handleShow();
  };

  const showConfirmModal = (e, row) => {
    e.preventDefault();
    setVerifyUserID(row.id);
    let emailconf = row.emailConfirmed;
    let phoneconf = row.phoneNumberConfirmed;
    setCheckEmail(emailconf);
    setCheckPhone(phoneconf);
    handleconfirmShow();
  };

  useEffect(() => {
    const cookieSearch = Cookie.get("searchText")
    setSearch(cookieSearch)
  }, [])

  const handleSearch = () => {
    requestUserList(0, 10, search)
      .then((res) => res.json())
      .then(() => {
        const ans = search.replace("+", "%2B");
        Cookie.set("searchText", ans)
        dispatch(addBlockUserData(search));
      });
  };

  const renderActions = (_, row) => {
    return (
      <>
        <a
          href="#"
          title="Block user"
          className="btn btn-icon btn-light btn-sm mx-3"
          onClick={(e) => {
            e.stopPropagation();
            showModal(e, row);
          }}
        >
          <span className="svg-icon svg-icon-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D32F2F" class="bi bi-ban-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM2.71 12.584c.218.252.454.488.706.707l9.875-9.875a7.034 7.034 0 0 0-.707-.707l-9.875 9.875Z" />
            </svg>
          </span>
        </a>
        <a
          href="#"
          title="Edit credentials"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={(e) => {
            e.stopPropagation();
            showConfirmModal(e, row);
          }}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl(
                '/media/svg/icons/Communication/Address-card.svg',
              )}
            />
          </span>
        </a>
      </>
    );
  };

  const formatWithIcon = (cell, row) => {
    if (cell == false) {
      return <span></span>;
    } else
      return (
        <span className='ml-8'>
          <i className="fa fa-lock" aria-hidden="true"></i>
        </span>
      );
  };

  const formatWithIcon2 = (cell, row) => {
    if (cell == false) {
      return <span></span>;
    } else
      return (
        <span>
          <i className="fa fa-check" aria-hidden="true"></i>
        </span>
      );
  };

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
      csvExport: false
    },
    {
      dataField: 'firstName',
      text: 'First Name',
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'lastName',
      text: 'Last Name',
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'email',
      text: 'Email',
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: 'phoneNumber',
      text: 'Contact',
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: 'isPermanentLocuOut',
      text: 'Permanent Locked',
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: formatWithIcon,
    },
    {
      dataField: 'isTemporaryLockOut',
      text: 'Temporary Locked',
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: formatWithIcon,
    },
    {
      dataField: 'emailConfirmed',
      text: 'Confirmed Email',
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: formatWithIcon2,
    },
    {
      dataField: 'phoneNumberConfirmed',
      text: 'Confirmed Phone',
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: formatWithIcon2,
    },
    {
      dataField: 'isVerifiedByAdmin',
      text: 'Verified by Admin',
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: formatWithIcon2,
    },
    {
      dataField: 'isBlockedByAdmin',
      text: 'Blocked by Admin',
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: formatWithIcon2,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: renderActions,
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      csvExport: false,
      style: {
        minWidth: '114px',
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
      dispatch(addBlockUserData(searchValues));
    }
  };

  return (
    <>
      <Card style={{ marginTop: "-40px" }}>
        <CardHeader title="Users">
          <CardHeaderToolbar>
            <div className="d-flex">
              <div>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  onChange={listenchange}
                  ref={searchInputRef}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={(e) => {
                  handleSearch(undefined, undefined, listenchange);
                }}
                title="Search"
              >
                <i className="fas fa-search" title='Search'></i>
              </button>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody style={{ justifyContent: 'center' }}>
          <TablePagination
            keyField="Id"
            columns={columns}
            getRecordList={requestUserList}
            isPaginationShow={true}
            isShowExportCsv={false}
          />
        </CardBody>
      </Card>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Block User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={disablePermanent}
                  checked={isChecked}
                  onChange={handleTemporaryBlock}
                />
              }
              label="Temporary Block User"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={disableTemp}
                  checked={togleCheck}
                  onChange={handlePermanentBlock}
                />
              }
              label="Permanent Block User"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={confirmShow} onHide={handleconfirmClose}>
        <Modal.Header>
          <Modal.Title>Verify User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={checkEmail} onChange={handleEmailChange} />
              }
              label="Email Confirm"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={checkPhone} onChange={handlePhoneChange} />
              }
              label="Phone Confirm"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleconfirmClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitVerifyUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
