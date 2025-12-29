import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { useAuth } from "../AuthContext";

const FeedPost = ({
  post,

  onPlay,
  isLiked,
  playingVideoId,
  setPlayingVideoId,
  handleCommentClick,
  calculatePostAge,
  onDelete,
  preventLinkDefault,
  commentCount,
}) => {
  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [likedByUser, setLikedByUser] = useState(isLiked || false);
  const [showMoreMap, setShowMoreMap] = useState({});

  useEffect(() => {
    setLikedByUser(isLiked);
    setLikeCount(post.likesCount);
  }, [isLiked, post.likesCount]);

  const {createLikes} = useAuth();

  const handleLikeClick = async () => {
    const updatedLikeState = !likedByUser;
    const updatedLikeCount = likedByUser ? likeCount - 1 : likeCount + 1;

    setLikedByUser(updatedLikeState);
    setLikeCount(updatedLikeCount);

    try {
      await createLikes(post.id);
    } catch (error) {
      console.error("Failed to toggle like:", error);

      setLikedByUser(!updatedLikeState);
      setLikeCount(likedByUser ? updatedLikeCount + 1 : updatedLikeCount - 1);
    }
  };

  const isExpanded = showMoreMap[post.id];
  const description = post.description || "";
  const isLong = description.length > 125;
  const visibleText = isExpanded ? description : description.slice(0, 125);

  return (
    <div key={post.id}>
      <Card
        className="feed-card"
        style={{
          display: "flex",
          flexDirection: "column",
          minheight: "550px",
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto 20px",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "15px" }}>
          <div className="card-header-custom d-flex flex-column flex-sm-row justify-content-between align-items-start gap-1">
            <div className="header-left d-flex align-items-center gap-2">
              <img
                src={toAbsoluteUrl("/media/logos/logo-light.png")}
                alt="Avatar"
                className="avatar bg-dark"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <div className="d-flex flex-column">
                <h6 className="mb-0">{post.author}</h6>
                <small className="text-muted mt-1">{calculatePostAge}</small>
              </div>
            </div>
          </div>
        </div>

        <div
          className="media-wrapper"
          style={{
            width: "100%",
            height: "250px",
            backgroundColor: "#1A1A27",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {post.link.endsWith(".mp4") ? (
            <video
              className="post-media"
              controls
              crossOrigin="anonymous"
              src={post.link}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              onClick={onPlay}
              onPlay={() => {
                if (playingVideoId !== post.id) {
                  setPlayingVideoId(post.id);
                }
              }}
              autoPlay={playingVideoId === post.id}
            />
          ) : (
            <img
              className="post-media"
              loading="lazy"
              src={post.link}
              alt="Post"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>

        <Card.Footer
          className="card-footer-custom d-flex justify-content-between align-items-center"
          style={{ padding: "6px 12px" }} // compact padding
        >
          <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            {/* Like Button */}
            <button
              title="Like"
              className="btn btn-icon btn-sm p-1"
              onClick={handleLikeClick}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                className={`svg-icon svg-icon-sm ${
                  likedByUser ? "svg-icon-danger" : "svg-icon-warning"
                }`}
                style={{ width: "18px", height: "18px" }}
              >
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Heart.svg")}
                />
              </span>
              <span style={{ fontSize: "12px", lineHeight: "1" }}>
                {likeCount}
              </span>
            </button>

            <button
              title="Comment"
              className="btn btn-icon btn-sm p-1"
              onClick={(e) => {
                preventLinkDefault(e);
                if (playingVideoId === post.id) {
                  const videoElement = document.querySelector(
                    `video[src="${post.link}"]`
                  );
                  if (videoElement) videoElement.pause();
                  setPlayingVideoId(null);
                }
                handleCommentClick(post);
              }}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span
                className="svg-icon svg-icon-sm svg-icon-warning"
                style={{ width: "18px", height: "18px" }}
              >
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/comment.svg")}
                />
              </span>
              <span style={{ fontSize: "12px", lineHeight: "1" }}>
                {commentCount}
              </span>
            </button>
          </div>

          <button
            title="Delete"
            className="btn btn-icon btn-light btn-xs p-1"
            onClick={() => onDelete(post, "post")}
            style={{ width: "28px", height: "28px" }}
          >
            <span
              className="svg-icon svg-icon-sm svg-icon-danger"
              style={{ width: "18px", height: "18px" }}
            >
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
            </span>
          </button>
        </Card.Footer>

        <Card.Body
          style={{
            padding: "10px 15px",
            overflow: "visible",
          }}
        >
          <Card.Text
            style={{
              fontSize: "clamp(12px, 1.5vw, 14px)",
              lineHeight: "1.5",
              marginBottom: isLong ? "6px" : "0px",
              color: "#333",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflow: "visible",
            }}
          >
            {visibleText}
            {!isExpanded && isLong && "..."}
          </Card.Text>

          {isLong && (
            <div style={{ marginTop: "4px" }}>
              <button
                onClick={() =>
                  setShowMoreMap((prev) => ({
                    ...prev,
                    [post.id]: !prev[post.id],
                  }))
                }
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  fontSize: "clamp(12px, 1.3vw, 13px)",
                  padding: 0,
                  cursor: "pointer",
                  display: "inline",
                }}
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default FeedPost;
