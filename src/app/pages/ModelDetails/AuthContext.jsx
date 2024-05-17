// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { authUserDetail } from "../../services/ProfileService";
import {
  showSuccessToast,
  showErrorToast,
  showWarnToast,
} from "../../../Utility/toastMsg";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await authUserDetail();
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const fetchFeeds = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/feeds`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feeds");
      }
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      showErrorToast("Error fetching data: " + error.message);
    }
  };

  const handleUpload = async (formData, setMessage, setFormData, setShow) => {
    if (!formData.author) {
      setMessage("Author is required.");
      showWarnToast("Please fill in all required fields.");
      return;
    }

    if (!formData.file && !formData.description) {
      setMessage("Please provide either an image or a description.");
      showWarnToast("Please provide either an image or a description.");
      setShow(true);
      return;
    }

    const form = new FormData();
    form.append("author", formData.author);
    if (formData.file) {
      form.append("file", formData.file);
    }
    if (formData.description) {
      form.append("description", formData.description);
    }
    if (userDetails) {
      form.append("userId", userDetails.result.id);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/upload`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Unknown error occurred.";
        setMessage(errorMessage);
        showErrorToast(errorMessage);
        return;
      }

      showSuccessToast("Upload successful");
      setFormData({
        author: "",
        description: "",
        file: null,
      });
      // Don't close the modal if only a description is provided
      if (formData.description && !formData.file) {
        setShow(false);
      }
    } catch (error) {
      const errorMessage = "Error uploading file: " + error.message;
      showErrorToast(errorMessage);
      setMessage(errorMessage);
      console.error(errorMessage);
      setShow(true);
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/feeds/id/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPostData((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
      showSuccessToast("Post deleted successfully");
    } catch (error) {
      showErrorToast("Error deleting post: " + error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        loading,
        error,
        handleUpload,
        postData,
        fetchFeeds,
        handleDeletePost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
