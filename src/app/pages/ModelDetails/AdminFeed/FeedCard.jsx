import React, { useEffect, useState } from "react";
import { Modal, Spinner, Form, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../AuthContext";
import CommentList from "./CommentList";
import DeleteModal from "./DeleteModel";
import FeedPost from "./Feedpost";
import { calculatePostAge } from "../../../../Utility/calculateFeedAge";
import "./FeedCard.css";

function FeedCard({ feeds, setFeeds }) {
  const {
    handleDeletePost,
    fetchComments,
    postcomments,
    createComment,
    createLikes,
    handleDeleteComment,
    fetchLikesdetails,
    likedetails,
    fetchFeeds,
  } = useAuth();

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    loadFeeds();
    fetchLikesdetails();
  }, []);

  const loadFeeds = async (pageToLoad = page, fresh = false) => {
    try {
      const newFeeds = await fetchFeeds(pageToLoad, 3);

      if (newFeeds.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedFeeds = fresh ? newFeeds : [...feeds, ...newFeeds];
      const sortedFeeds = updatedFeeds.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setFeeds(sortedFeeds);
      setPage((prevPage) => pageToLoad + 1);
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  const handleCommentClick = async (post) => {
    setSelectedPost(post);
    await fetchComments(post.id);
    setShowCommentModal(true);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPost || !commentText.trim()) return;
    try {
      const newComment = await createComment(
        selectedPost.id,
        userId,
        commentText,
        userName
      );
      postcomments.push(newComment);
      setCommentText("");
      postcomments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFeeds((prevFeeds) =>
        prevFeeds.map((feed) =>
          feed.id === selectedPost.id
            ? { ...feed, commentCount: feed.commentCount + 1 }
            : feed
        )
      );
      await fetchComments(selectedPost.id);
    } catch (error) {
      alert("Failed to submit comment. Please try again.");
    }
  };

  const handleDeleteClick = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteType === "post") {
        await handleDeletePost(itemToDelete.id);
        setFeeds((prevFeeds) =>
          prevFeeds.filter((feed) => feed.id !== itemToDelete.id)
        );
      } else if (deleteType === "comment") {
        await handleDeleteComment(selectedPost.id, itemToDelete.id);
        setFeeds((prevFeeds) =>
          prevFeeds.map((feed) =>
            feed.id === selectedPost.id
              ? {
                  ...feed,
                  commentCount: feed.commentCount - 1,
                  comments: feed.comments
                    ? feed.comments
                        .filter((comment) => comment.id !== itemToDelete.id)
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                    : [],
                }
              : feed
          )
        );
        await fetchComments(selectedPost.id);
      }
      setShowDeleteModal(false);
      setItemToDelete(null);
      setDeleteType(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const preventLinkDefault = (e) => e.preventDefault();

  const handleVideoPlay = (postId) => {
    setPlayingVideoId((prevId) => (prevId === postId ? null : postId));
  };

  const isPostLikedByUser = (postId) => {
    return likedetails.some(
      (like) => like.feed?.id === postId && like.userId === userId
    );
  };
  const handleLikeFromCard = async (postId) => {
    try {
      await createLikes(postId);
      await fetchLikesdetails();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={feeds.length}
        next={loadFeeds}
        hasMore={hasMore}
        loader={
          <h4 className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </h4>
        }
        endMessage={
          <p className="text-center text-danger mt-4">
            No more posts available.
          </p>
        }
      >
        {feeds.map((post) => (
          <div
            key={post.id}
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FeedPost
              post={post}
              fetchComments={fetchComments}
              createLikes={handleLikeFromCard}
              isLiked={isPostLikedByUser(post.id)}
              postcomments={post.comments}
              onplay={handleVideoPlay}
              playingVideoId={playingVideoId}
              setPlayingVideoId={setPlayingVideoId}
              onDelete={handleDeleteClick}
              handleCommentClick={handleCommentClick}
              preventLinkDefault={preventLinkDefault}
              calculatePostAge={calculatePostAge(post.createdAt)}
              commentCount={post.commentCount}
            />
          </div>
        ))}
      </InfiniteScroll>

      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleDeleteConfirm}
      />

      {selectedPost && (
        <Modal
          show={showCommentModal}
          onHide={() => setShowCommentModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {postcomments.length > 0 ? (
              <CommentList
                comments={postcomments}
                onDeleteClick={handleDeleteClick}
                calculatePostAge={calculatePostAge}
              />
            ) : (
              <p>No comments available.</p>
            )}
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group controlId="commentText" className="mt-4">
                <Form.Label>Type Your Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCommentModal(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleCommentSubmit}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default FeedCard;
