import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../Utility/toastMsg";
import FeedCard from "./FeedCard";
import { authUserDetail } from "../../services/ProfileService";
import { useAuth } from "./AuthContext";
export default function ProductFeed({ status = 0, title = "Product feed", screen = "", isApproved = false }) {
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        author: "",
        description: "",
        file: null
    });
    const dispatch = useDispatch();


    const { userDetails, loading, error } = useAuth();
    useEffect(() => {
        if (!loading && userDetails) {

            setFormData((prevFormData) => ({
                ...prevFormData,
                author: userDetails.result.username
            }));
        }
    }, [userDetails, loading]);

    const handleClose = () => {
        setShow(false);
        setFormData({
            author: "",
            description: "",
            file: null
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0]
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpload = async () => {
        if (!formData.author || !formData.description || !formData.file) {
            setMessage('Please fill in all required fields.');
            return;
        }
        const form = new FormData();
        form.append('author', formData.author);
        form.append('description', formData.description);
        form.append('file', formData.file);
        try {
            const response = await fetch(`http://192.168.1.9:8083/upload`, {
                method: 'POST',
                body: form,
            });
            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.error || 'Unknown error occurred.');
                showErrorToast(errorData.error || 'Unknown error occurred.');
                return;
            }
            showSuccessToast('Upload successful');
            setFormData({
                author: "",
                description: "",
                file: null
            });
            window.location.reload();
        } catch (error) {
            showErrorToast('Error uploading file: ' + error.message);
            console.log("false")
        }
    };

    const showModal = () => {
        setShow(true);
    }
    return (
        <>
            <Card style={{ marginTop: "0px" }}>
                {screen === "ALL_DATA" ? (
                    <CardHeader title={title}>
                        <CardHeaderToolbar>
                            <div className="d-flex mt-3 flex-wrap">
                                <div>
                                    <Button onClick={showModal}>Create Post</Button>
                                </div>
                            </div>
                        </CardHeaderToolbar>
                    </CardHeader>
                ) : (
                    <CardHeader title={title}>
                        <CardHeaderToolbar>
                            <div className="d-flex">
                            </div>
                        </CardHeaderToolbar>
                    </CardHeader>
                )}
                <CardBody style={{ justifyContent: "center" }}>
                    <FeedCard />
                </CardBody>
            </Card>

            {/* -----  Edit Modal ---- */}
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Feed Upload</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpload}>
                    <Modal.Body>
                        <div style={{ display: "inline-block", width: "48%", marginRight: "8px" }}>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} required />
                        </div>
                        <div style={{ display: "inline-block", width: "48%", marginRight: "8px" }}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div style={{ display: "inline-block", width: "48%", marginRight: "8px" }}>
                            <Form.Label>Image</Form.Label>
                            <div className="border border-gray-100 border-2 p-2 w-60">
                                <input type="file" id="file" onChange={handleFileChange} />
                            </div>
                        </div>
                        <br />
                        <hr />
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button variant="secondary" onClick={handleClose} > Close</Button>
                            <Button style={{ backgroundColor: "#FACD21", border: "none", color: "black", marginLeft: 2, }} type="submit">Upload</Button>
                        </div>
                    </Modal.Body>
                </Form>
            </Modal>
        </>
    );
}