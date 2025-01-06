import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";


const ViewUpload = ({ show, onHide, formData, handleBlur, setFormData }) => {
  useEffect(() => {
    if (formData === undefined) {
      setFormData({
        vendor: "",
        name: "",
        monthlyPrice: "",
        annualPrice: "",
        discount: "",
        status: "",
        planDescription: "",
        planName: "",
        pictureLink: "",
        other_Details:"",
        product_price_ids:"",
      });
    }
  }, [formData, setFormData]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>View Warranty Product</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <div className="d-flex flex-wrap">
            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group >
                <Form.Label  htmlFor="vendor">Vendor Name</Form.Label>
                <Form.Control type="text"   id="vendor" disabled value={formData.vendor || ""} />
              </Form.Group>
            </div>
            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group > 
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control type="text"  id="name" autoComplete="name" disabled value={formData.name || ""} />
              </Form.Group>
            </div>
            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group >
                <Form.Label htmlFor="monthlyprice">Monthly Price</Form.Label>
                <Form.Control type="text"  id="monthlyprice" disabled value={formData.monthlyPrice || ""} />
              </Form.Group>
            </div>
            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group >
                <Form.Label htmlFor="annualprice">Annual Price</Form.Label>
                <Form.Control type="text"  id="annualprice" disabled value={formData.annualPrice || ""} />
              </Form.Group>
            </div>
            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group >
                <Form.Label htmlFor="discount">Discount</Form.Label>
                <Form.Control type="text"  id="discount" disabled value={formData.discount || ""} />
              </Form.Group>
            </div>
            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group >
                <Form.Label htmlFor="priceid">Price id</Form.Label>
                <Form.Control type="text"  id="priceid" disabled value={formData.product_price_ids || ""} />
              </Form.Group>
            </div>

            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group >
                <Form.Label htmlFor="status">Status</Form.Label>
                <Form.Control type="text"  id="status" disabled value={formData.status || ""} />
              </Form.Group>
            </div>
            <div className="p-2 flex-fill" style={{ width: "48%" }}>
              <Form.Group >
                <Form.Label htmlFor="plandescription">Plan Description</Form.Label>
                <Form.Control type="text"  id="plandescription" disabled rows={3} value={formData.planDescription || ""} />
              </Form.Group>
            </div>
           
            <div className="p-2 flex-fill" style={{ width: "100%" }}>
              <Form.Group >
                <Form.Label htmlFor="others">Others</Form.Label>
                <Form.Control as="textarea"  id="others" disabled rows={3} value={formData.other_Details || ""} />
              </Form.Group>
            </div>
            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group >
                <Form.Label htmlFor="planname">Plan Name</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                   id="planname"
                  autoComplete="off"
                  placeholder="Plan Name"
                  name="planName"
                  className="mb-3"
                  required
                  value={formData.planName || ""}
                />
              </Form.Group>
            </div>
            <div className="p-2 flex-fill" style={{ maxWidth: "48%" }}>
              <Form.Group >
                <Form.Label >Warranty Image</Form.Label>
                <div
                
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "150px", // Adjust height as needed
                  }}
                >
             
                    <img
                      src={formData.pictureLink|| ""}
                      alt="Uploaded"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        border: "2px solid #ccc",
                        objectFit: "contain",
                      }}
                    />
               
                </div>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              onHide();
              setFormData({
                vendor: "",
                name: "",
                monthlyPrice: "",
                annualPrice: "",
                discount: "",
                status: "",
                planDescription: "",
                planName: "",
                pictureLink: "",
              });
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ViewUpload;
