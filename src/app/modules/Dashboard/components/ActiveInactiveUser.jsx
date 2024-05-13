import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getDashBoardChart } from "../../../services/dashboardService";

export default function ActiveInactive() {
    const [activeUser, setActiveUser] = useState("");
    const [inActiveUser, setInActiveUser] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setTimeout(() => {
            getDashBoardChart()
                .then((res) => res.json())
                .then((res) => {
                    setActiveUser(res.result.activeUsersCount)
                    setInActiveUser(res.result.inActiveUsersCount)
                })
                .then((error) => {
                    // console.log(error)
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.clear();
                    handleShow()
                  });
        }, 500)
    }, [])
    return (
        <>
            <div className="">
                <div className="row">
                    <div className="col-xl-3">
                        <div
                            className="card card-custom bg-light-warning card-stretch gutter-b"
                            style={{
                                backgroundPosition: "right top",
                                backgroundSize: "30% auto",
                                backgroundImage: "url(assets/media/svg/shapes/abstract-1.svg)",
                            }}
                        >
                            <div className="card-body">
                                <span className="svg-icon svg-icon-2x svg-icon-success">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        version="1.1"
                                    >
                                        <g
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <polygon points="0 0 24 0 24 24 0 24" />
                                            <path
                                                d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                                                fill="#000000"
                                                fillRule="nonzero"
                                                opacity="0.3"
                                            />
                                            <path
                                                d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                                                fill="#000000"
                                                fillRule="nonzero"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span className="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block">
                                    {activeUser}
                                </span>
                                <span className="font-weight-bold text-muted font-size-sm">
                                    Active Users
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div
                            className="card card-custom bg-light-warning card-stretch gutter-b"
                            style={{
                                backgroundPosition: "right top",
                                backgroundSize: "30% auto",
                                backgroundImage: "url(assets/media/svg/shapes/abstract-1.svg)",
                            }}
                        >
                            <div className="card-body">
                                <span className="svg-icon svg-icon-2x svg-icon-danger">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        version="1.1"
                                    >
                                        <g
                                            stroke="none"
                                            strokeWidth="1"
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <polygon points="0 0 24 0 24 24 0 24" />
                                            <path
                                                d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                                                fill="#000000"
                                                fillRule="nonzero"
                                                opacity="0.3"
                                            />
                                            <path
                                                d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                                                fill="#000000"
                                                fillRule="nonzero"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span className="card-title font-weight-bolder text-dark-75 font-size-h2 mb-0 mt-6 d-block">
                                    {inActiveUser}
                                </span>
                                <span className="font-weight-bold text-muted font-size-sm">
                                    Inactive User
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} >
        <Modal.Body> Your Session Has Ended Please Login Again  &nbsp;
          <Link
              to="/logout"
              className="btn btn-light-primary font-weight-bold"
              style={{
              backgroundColor: "#facd21", color: 'black'}}
            >
              Click Here or Reload
            </Link>
            </Modal.Body>
      </Modal>
        </>
    );
}
