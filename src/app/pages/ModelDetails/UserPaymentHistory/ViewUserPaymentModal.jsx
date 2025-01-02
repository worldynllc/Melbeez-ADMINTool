import React, { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const  ViewUserPaymentModal = ({ show, onHide, formData, setFormData }) => {
    useEffect(() => {
        if (formData === undefined) {
          setFormData({
            email: "",
            phoneNumber: "",
            productId:"",
            productName:"",
            price:"",
            chargeRequest_status: "",
            createdAt:"",
          interval: "",
          paymentMethod: "",
          transactionId:"",
          });
        }
      }, [formData, setFormData]);
console.log("show",show)
    return (
<Modal show={show} onHide={onHide} centered size="lg"   keyboard={false}> 
<Modal.Header closeButton>
  <Modal.Title>Payment Details</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Row className="mb-3">
      {/* <Col>
        <Form.Label>User ID</Form.Label>
        <Form.Control type="text" value={rowData.userId} disabled />
      </Col> */}
      {/* <Col>
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" value={rowData.userName} disabled />
      </Col> */}
    </Row>
    <Row className="mb-3">
      <Col>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control type="text" id="email" autoComplete="off" value={formData.email||""} disabled />
      </Col>
      <Col>
        <Form.Label htmlFor="phone">Phone</Form.Label>
        <Form.Control type="text" id="phone" autoComplete="off" value={formData.phoneNumber||""} disabled />
      </Col>
    </Row>
    {/* <Form.Label>Address</Form.Label>
    <Form.Control type="text" value={rowData.address} disabled /> */}
    <Row className="mb-3">
      <Col>
        <Form.Label htmlFor="paymentdate">Payment Date</Form.Label>
        <Form.Control
          type="text"
          id="paymentdate"
          value={formData.createdAt ||""}
          disabled
        />
      </Col>
      <Col>
        <Form.Label htmlFor="amount">Amount</Form.Label>
        <Form.Control type="text" id="amount" value={formData.price||""} disabled />
      </Col>
    </Row>
    <Row className="mb-3">
      <Col>
        <Form.Label htmlFor="productid">Product Id</Form.Label>
        <Form.Control type="text" id="productid" value={formData.productId||""} disabled />
      </Col>  
      <Col><Form.Label htmlFor="productname">Product Name</Form.Label>
        <Form.Control type="text" id="productname" value={formData.productName||""} disabled />  
        </Col>
    </Row>
    <Row className="mb-3">
      <Col>
        <Form.Label htmlFor="status">Status</Form.Label>
        <Form.Control type="text" id="status" value={formData.chargeRequest_status||""} disabled />
      </Col>  
      <Col><Form.Label htmlFor="subscriptionperiod">Subscription Period</Form.Label>
        <Form.Control type="text" id="subscriptionperiod" value={formData.interval||""} disabled />  
        </Col>
    </Row>
    <Row className="mb-3">
    <Col>
    <Form.Label htmlFor="paymentmethod">Payment Method</Form.Label>
    <Form.Control type="text" id="paymentmethod" value={formData.paymentMethod||""} disabled />
    </Col>
    <Col><Form.Label htmlFor="transactionid">Transaction Id</Form.Label>
    <Form.Control type="text" id="transactionid" value={formData.transactionId||""} disabled />
    </Col>
    </Row>
   
  </Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={onHide}>
    Close
  </Button>
</Modal.Footer>
</Modal>)
};
export default ViewUserPaymentModal;