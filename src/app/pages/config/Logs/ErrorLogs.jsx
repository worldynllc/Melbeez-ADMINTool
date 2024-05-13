import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../_metronic/_partials/controls';
import { headerSortingClasses } from '../../../../_metronic/_helpers';
import { GetErrorLog } from '../../../services/configService';
import TablePagination from '../../../Components/TablePagination';
import moment from 'moment';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAdminData } from '../../../../redux/Admin/action';
import Cookie from 'js-cookie';
import { useRef } from 'react';

export default function ErrorLogs() {
  const searchInputRef = useRef();
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const ref = useRef();
  const ref1 = useRef();
  const [search, setSearch] = useState();
  const ExcelCustomName = Cookie.set("exclname", "Error Logs.csv");
  const dateAndTimeFormatter = (cell, row) => {
    let obj = row.createdOn;
    return moment(obj).format('LL HH:ss');
  };
  const dispatch = useDispatch();
  const columns = [
    {
      dataField: 'exceptionMsg',
      text: 'exception Msg',
      headerSortingClasses,
    },
    {
      dataField: 'exceptionType',
      text: 'exception Type',
      headerSortingClasses,
    },
    {
      dataField: 'exceptionDetail',
      text: 'exception Detail',
      headerSortingClasses,
    },
    {
      dataField: 'createdOn',
      text: 'created On',
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
    Cookie.set('dateforsearch', value);
    Cookie.set('date2forsearch', value1);
    dispatch(addAdminData(value));
  };
  // const handleReset = () => {
  //   Cookie.remove('dateforsearch');
  //   Cookie.remove('date2forsearch');
  //   dispatch(addAdminData(''));
  //   setValue1("");
  //   setValue("");
  //   searchInputRef.current.value = "";
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
    Cookie.set('searchText', search);
    dispatch(addAdminData(search));
  };

  // const handleRest2 = () => {
  //   Cookie.remove('searchText');
  //   dispatch(addAdminData("reset"));
  //   setSearch("")
  // }

  return (
    <>
      <Card className='mt-lg-n12 mt-6'>
        <CardHeader className='mt-5' title="Error Logs">
          <CardHeaderToolbar>
            <div className='d-flex align-items-center'>
                <div>
                  <input
                    id="search-focus"
                    type='search'
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
                      onFocus={() => (ref1.current.type = 'date')}
                      onBlur={() => (ref1.current.type = 'text')}
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
                      onFocus={() => (ref.current.type = 'date')}
                      onBlur={() => (ref.current.type = 'text')}
                    />
                  </Form.Group>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      handleClick();
                      handleSearch();
                    }}
                    title="Search"
                  >
                    <i className="fas fa-search" title="Search"></i>
                  </Button>
                </div>
              </div>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody style={{ justifyContent: 'center' }}>
          <TablePagination
            keyField="Id"
            columns={columns}
            getRecordList={GetErrorLog}
          />
        </CardBody>
      </Card>
    </>
  );
}
