import React from "react";
import { Button, Modal } from "react-bootstrap";

const ApproveRejectAction = ({ show, handleCloseModal , IsApprove, selectedRows, handleSubmit}) => {

    return (
        <>
            <Modal show={show} onHide={handleCloseModal} centered >
                <Modal.Header closeButton>
                    <Modal.Title> { IsApprove  ? "Approve" : "Reject"} selected products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "flex" }}>
                        Are you sure to {IsApprove ? "approve" : "reject"} all selected products ?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal(false)}>
                        Close
                    </Button>
                    <Button variant={ IsApprove ? "primary btn btn-primary" : "primary btn btn-danger"} onClick={() => handleSubmit(selectedRows)}>
                        {IsApprove  ? "Approve" : "Reject"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ApproveRejectAction;
