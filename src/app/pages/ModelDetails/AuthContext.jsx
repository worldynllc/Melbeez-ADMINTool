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
  const [setShowAddModal] = useState(false);
  const [postcomments, setPostcomments] = useState([]);
  const [likedetails, setLikeDetails] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

  const token = localStorage.getItem("authToken");

  const getAuthorizedHeaders = () => ({
    authorization: `Bearer ${token}`,
  });
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [transactiondata, setTransactiondata] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await authUserDetail();
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        localStorage.setItem("userName", data.result.username);
        localStorage.setItem("userId", data.result.id);
        localStorage.setItem("firstName", data.result.firstName);
        localStorage.setItem("lastName", data.result.lastName);

        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);
  const fetchFeeds = async (page = 0, size = 3) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/feed/all?page=${page}&size=${size}`,
        {
          mode: "cors",
          headers: {
            ...getAuthorizedHeaders(),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch feeds");
      }
      const data = await response.json();

      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return data;
    } catch (error) {
      return [];
    }
  };

  const handleUpload = async (
    formData,
    setMessage,
    setFormData,
    setShow,
    page = 0,
    size = 3
  ) => {
    if (!formData.author) {
      setMessage("Author is required.");
      showWarnToast("Please fill in all required fields.");
      return;
    }
    if (!formData.file && !formData.description) {
      setMessage("Please provide either an image or a description.");
      showWarnToast("Please provide an image and description.");
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
        `${process.env.REACT_APP_JAVA_API_URL}/feed/upload`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            ...getAuthorizedHeaders(),
          },
          body: form,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Unknown error occurred.";
        setShow(true);
        setMessage(errorMessage);
        showErrorToast(errorMessage);
        return;
      }

      showSuccessToast("Upload feed successful");
      setFormData({
        author: "",
        description: "",
        file: null,
      });
    } catch (error) {
      const errorMessage = "Error uploading file";
      setMessage(errorMessage);
      showErrorToast(errorMessage);
      setShow(true);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/feed/${postId}`,
        {
          method: "DELETE",
          headers: {
            ...getAuthorizedHeaders(),
          },
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

  const handleUploadwarrenty = async (
    formData,
    setMessage,
    setFormData,
    setShow
  ) => {
    if (
      !formData.vendor ||
      !formData.name ||
      !formData.monthlyPrice ||
      !formData.annualPrice ||
      !formData.planDescription ||
      !formData.other_Details ||
      !formData.product_price_ids ||
      !formData.planName
    ) {
      setMessage("Please fill in all required fields.");
      showWarnToast("Please fill in all required fields.");
      return;
    }

    const firstName = localStorage.getItem("firstName");

    const lastName = localStorage.getItem("lastName");

    if (!firstName && !lastName) {
      showErrorToast("User details not found.");
      return;
    }
    const userId = localStorage.getItem("userId");
    const form = new FormData();
    form.append("vendor", formData.vendor);
    form.append("name", formData.name);
    form.append("monthlyPrice", formData.monthlyPrice);
    form.append("annualPrice", formData.annualPrice);
    form.append("discount", formData.discount || "0");
    form.append("created_by", firstName + " " + lastName);
    form.append("updated_by", "");
    form.append("planDescription", formData.planDescription);
    form.append("planName", formData.planName);
    form.append("product_price_ids", formData.product_price_ids);
    form.append("other_Details", formData.other_Details);
    form.append("userId", userId);
    if (formData.file) {
      form.append("file", formData.file);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/warranty/upload`,
        {
          method: "POST",
          headers: { ...getAuthorizedHeaders() },
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

      setFormData({
        vendor: "",
        name: "",
        monthlyPrice: "",
        annualPrice: "",
        discount: "",
        created_by: "",
        updated_by: "",
        planDescription: "",
        planName: "",
        other_Details: "",
        product_price_ids: "",
        file: null,
      });
      setShowAddModal(false);
      showSuccessToast("Upload successful");
    } catch (error) {}
  };

  const handleUpdateWarranty = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/warranty/${formData.id}`,
        {
          mode: "cors",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthorizedHeaders(),
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update warranty.");
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const handleDeleteWarranty = async (warrantyId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/warrenty/${warrantyId}`,
        {
          method: "DELETE",
          headers: {
            ...getAuthorizedHeaders(),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete warranty");
      }
      setPostData((prevPosts) =>
        prevPosts.filter((post) => post.id !== warrantyId)
      );
      showSuccessToast("Warranty deleted successfully");
    } catch (error) {
      showErrorToast("Error deleting warranty: " + error.message);
    }
  };

  const fetchComments = async (feedId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/comment/${feedId}`,
        {
          headers: {
            ...getAuthorizedHeaders(),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();

      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPostcomments(data);
    } catch (error) {
      showErrorToast("No comment found");
    }
  };

  const createComment = async (postId, userId, commentText, userName) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/comment/post/${postId}/${userId}/${userName}`,
        {
          method: "POST",
          headers: {
            ...getAuthorizedHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: commentText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload comment");
      }

      const data = await response.json();

      showSuccessToast("Comment added successfully");
      return data;
    } catch (error) {
      showErrorToast("Failed to add comment");
      throw error;
    }
  };

  const handleDeleteComment = async (feedId, commentId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/comment/${feedId}/${commentId}`,
        {
          method: "DELETE",
          headers: {
            ...getAuthorizedHeaders(),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      await fetchComments(feedId);

      showSuccessToast("comment deleted successfully");
    } catch (error) {
      showErrorToast("Error deleting comment: " + error.message);
    }
  };

  const createLikes = async (feedId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/like/${feedId}/${userId}/${userName}`,
        {
          method: "POST",
          headers: {
            ...getAuthorizedHeaders(),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add Like");
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };
  const fetchLikesdetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/like/all`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            ...getAuthorizedHeaders(),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feeds");
      }
      const data = await response.json();
      setLikeDetails(data);
    } catch (error) {
      console.log("no likes found");
    }
  };

  const fetchTransactionDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JAVA_API_URL}/transaction/user/all`,
        {
          mode: "cors",
          headers: {
            ...getAuthorizedHeaders(),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Transaction Details");
      }
      const data = await response.json();
      setTransactiondata(data);
      setfilterdata(data);
    } catch (error) {
      showErrorToast("No Transaction Details found");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setPostcomments,
        postcomments,
        error,
        loading,
        handleUpload,
        createComment,
        postData,
        setPostData,
        fetchFeeds,
        handleDeletePost,
        handleUploadwarrenty,
        handleUpdateWarranty,
        handleDeleteWarranty,
        fetchComments,
        createLikes,
        handleDeleteComment,
        fetchLikesdetails,
        likedetails,
        setLikeDetails,
        fetchTransactionDetails,
        transactiondata,
        setTransactiondata,
        setfilterdata,
        filterdata,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
