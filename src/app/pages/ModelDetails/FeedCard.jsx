import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { toAbsoluteUrl } from '../../../_metronic/_helpers';
import SVG from "react-inlinesvg";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { FaTelegram, FaInstagram, FaFacebook } from 'react-icons/fa';

import { showErrorToast } from '../../../Utility/toastMsg';



const CardHeader = ({ author }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px' }}>
            <img src={toAbsoluteUrl("/media/users/300_21.jpg")} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
        <div>
            <h6>{author}</h6>
        </div>
    </div>
);

function FeedCard() {
    const [postData, setPostData] = useState([]);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);
    const [showShareModal, setShowShareModal] = useState(false);

    useEffect(() => {
        fetch("http://192.168.1.9:8083/feeds")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPostData(data);
            })
            .catch((error) => showErrorToast.error("Error fetching data:", error));
    }, []);



    const handleShareClick = (post) => {
        setSelectedPost(post);
        setShowShareModal(true);
    };

    const handleShareWhatsApp = (post) => {
        const message = `Check out this post: ${post.link}`;
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        window.location.href = url;
    };

    const handleShareFacebook = (post) => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.link)}`;
        window.open(url, '_blank');
    };

    const handleShareInstagram = (post) => {
        const message = `Check out this post: ${post.link}`;
        const url = `https://www.instagram.com/share?text=${encodeURIComponent(message)}`;
        window.location.href = url;
    };


    const handleShareTelegram = (post) => {
        const message = encodeURIComponent(`Check out this post: ${post.link}`);
        const url = `https://telegram.me/share/url?url=${message}`;
        window.open(url, '_blank');
    };

    const handleCommentSubmit = () => {

        console.log('Comment text:', commentText);
        console.log('Comment image:', commentImage);

        setShowCommentModal(false);
    };
    const handleDeletePost = (postId) => {
        console.log("button clicked");
        fetch(`http://192.168.1.9:8083/feeds/id/${postId}`, {
            method: "DELETE",
        })
            .then(() => {
                setPostData((prevPosts) =>
                    prevPosts.filter((post) => post.id !== postId)
                );
            })
            .catch((error) => console.error("Error deleting post:", error));
    };
    const handleCommentClick = (post) => {
        setSelectedPost(post);
        setShowCommentModal(true);
    };
    const handleLikeClick = (postId) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => id !== postId));
        } else {
            setLikedPosts([...likedPosts, postId]);
        }
    };
    const handleShareGmail = (post) => {
        const subject = 'Check out this post';
        const body = `Hi,\n\nI thought you might be interested in this post: ${post.link}`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    };
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {postData.map((post) => (
                <Card key={post.id} style={{ maxWidth: '345px', margin: '10px' }}>
                    <Card.Header>
                        <CardHeader author={post.author} />
                    </Card.Header>
                    <Card.Img
                        style={{ width: "100%", height: "300px" }}
                        variant="top"
                        src={post.link}
                        alt="green iguana"
                    />
                    <Card.Body>
                        <Card.Text>
                            {post.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            {/* Like button */}
                            <button
                                title="Like"
                                className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2"
                                onClick={() => handleLikeClick(post.id)}
                            >
                                <span className={`svg-icon svg-icon-md svg-icon-${likedPosts.includes(post.id) ? 'danger' : 'warning'}`}>
                                    <SVG src={toAbsoluteUrl(likedPosts.includes(post.id) ? "/media/svg/icons/General/Heart.svg" : "/media/svg/icons/General/Heart.svg")} />
                                </span>
                            </button>
                            {/* Comment button */}
                            <a href="#" title="Comment" className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2 " onClick={() => handleCommentClick(post)}>
                                <span className="svg-icon svg-icon-md svg-icon-warning">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/comment.svg")} />
                                </span>
                            </a>
                            {/* Share button */}
                            <a href="#" title="Share" className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2" onClick={() => handleShareClick(post)}>
                                <span className="svg-icon svg-icon-md svg-icon-warning">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/share.svg")} />
                                </span>
                            </a>
                        </div>
                        <div>
                            {/* Delete Post button */}
                            <a href="#" title="Delete Post" className="btn btn-icon btn-light btn-hover-danger btn-sm mr-2" onClick={() => handleDeletePost(post.id)} >
                                <span className="svg-icon svg-icon-md svg-icon-danger">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
                                </span>
                            </a>
                        </div>
                    </Card.Footer>

                </Card>
            ))}

            {/* Comment Modal */}
            {selectedPost && (
                <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* Comment input field */}
                            <Form.Group controlId="commentText">
                                <Form.Label>Type Your Comment </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="commentImage">
                                <Form.Label>Upload Image (Optional)</Form.Label>
                                <Form.File
                                    id="custom-file"
                                    label="Choose file"
                                    custom
                                    onChange={(e) => setCommentImage(e.target.files[0])}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* Close modal button */}
                        <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
                            Close
                        </Button>
                        {/* Submit comment button */}
                        <Button variant="primary" onClick={handleCommentSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Share Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{
                        display: "flex", justifyContent: "space-between"
                    }}>
                        {/* WhatsApp icon */}
                        <Button variant="light" onClick={() => handleShareWhatsApp(selectedPost)}>
                            <FaWhatsapp size={20} color="#128C7E" />
                        </Button>
                        {/* Gmail icon */}
                        <Button variant="light" onClick={() => handleShareGmail(selectedPost)}>
                            <FaEnvelope size={20} color="#EA4335" />
                        </Button>
                        {/* Telegram icon */}
                        <Button variant="light" onClick={() => handleShareTelegram(selectedPost)}>
                            <FaTelegram size={20} color="#0088cc" />
                        </Button>
                        {/* Instagram icon */}
                        <Button variant="light" onClick={() => handleShareInstagram(selectedPost)}>
                            <FaInstagram size={20} color="#bc2a8d" />
                        </Button>

                        <Button variant="light" onClick={() => handleShareFacebook(selectedPost)}>
                            <FaFacebook size={20} color="#3b5998" />
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default FeedCard;