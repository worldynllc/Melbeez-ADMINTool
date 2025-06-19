import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { Button, Modal, Form } from "react-bootstrap";
import FeedCard from "./FeedCard";
import { useAuth } from "../AuthContext";

export default function ProductFeed({
  status = 0,
  title = "Product feed",
  screen = "",
  isApproved = false,
}) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [feed, setFeed] = useState([]);

  const [formData, setFormData] = useState({
    author: "",
    description: "",
    file: null,
  });

  const { userDetails, handleUpload, fetchFeeds } = useAuth();

  const [descriptionError, setDescriptionError] = useState("");
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetails && !formData.author) {
      const fullName = `${userDetails.result.firstName} ${userDetails.result.lastName}`;
      setFormData((prev) => ({ ...prev, author: fullName }));
    }
  }, [userDetails, formData.author]);

  const handleClose = () => {
    setFormData({
      author: formData.author,
      description: "",
      file: null,
    });
    setFileError("");
    setDescriptionError("");
    setShow(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];

    if (!file) {
      setFileError("File is required.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setFileError("File size should not exceed 50 MB.");
    } else if (!fileTypes.includes(file.type)) {
      setFileError("Only image and video files are allowed.");
    } else {
      setFileError("");
    }

    setFormData((prev) => ({ ...prev, file }));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 1000) {
      setDescriptionError("Description cannot exceed 1000 characters.");
    } else {
      setDescriptionError("");
      setFormData((prev) => ({ ...prev, description: value }));
    }
  };

  const showModal = () => {
    setShow(true);

    const firstName = localStorage.getItem("firstName");

    const lastName = localStorage.getItem("lastName");
    const fullName = firstName.concat(" ", lastName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      author: fullName,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setFileError("File is required.");
      return;
    }

    if (!descriptionError && !fileError) {
      setLoading(true);
      try {
        await handleUpload(formData, setMessage, setFormData);
        handleClose();
        const newFeeds = await fetchFeeds(0, 1);
        setFeed((prevFeeds) => {
          const updated = [...newFeeds, ...prevFeeds];
          return updated.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        });
      } catch (error) {
        console.error("Error during upload:", error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Card style={{ marginTop: "0px" }}>
        <CardHeader title={title}>
          <CardHeaderToolbar>
            {screen === "ALL_DATA" && (
              <Button onClick={showModal}>Create Post</Button>
            )}
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody style={{ justifyContent: "center" }}>
          <FeedCard feeds={feed} setFeeds={setFeed} />
        </CardBody>
      </Card>

      <Modal show={show} onHide={handleClose} centered size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">Upload New Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body
            className="px-4 py-3"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <div
              style={{
                display: "inline-block",
                width: "30%",
                marginRight: "8px",
              }}
            >
              <Form.Label htmlFor="author">Author</Form.Label>
              <Form.Control
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
            <div
              style={{
                display: "inline-block",
                width: "60%",
                marginRight: "8px",
              }}
            >
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Enter a description (max 200 characters)"
                isInvalid={!!descriptionError}
              />
              <Form.Control.Feedback type="invalid">
                {descriptionError}
              </Form.Control.Feedback>
            </div>

            <div className="d-inline-block border rounded px-3 py-2 bg-light mt-5">
              <Form.Group className="mb-0">
                <Form.Label className="fw-medium mb-1">
                  Upload Image or Video
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  style={{ width: "auto" }}
                />
                {fileError && (
                  <div className="text-danger small mt-1">{fileError}</div>
                )}
              </Form.Group>
            </div>

            {formData.file && (
              <div className="mt-3 rounded border p-2 bg-light">
                <p className="mb-2 fw-medium">Preview:</p>

                <div
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f9fa",
                    overflow: "hidden",
                  }}
                >
                  {formData.file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(formData.file)}
                      alt="preview"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <video
                      controls
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    >
                      <source
                        src={URL.createObjectURL(formData.file)}
                        type={formData.file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                <div className="mt-2 text small">
                  File Type: <strong>{formData.file.type}</strong> | Size:{" "}
                  <strong>{(formData.file.size / 1024).toFixed(2)} KB</strong>
                </div>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer className="px-4 pb-3">
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="ms-2"
              style={{
                backgroundColor: "#FACD21",
                color: "black",
                border: "none",
              }}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
