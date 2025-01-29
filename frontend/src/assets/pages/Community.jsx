import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";
import "./Community.css";

const Community = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const [discussions, setDiscussions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [commentText, setCommentText] = useState({});
    const [openComments, setOpenComments] = useState({});

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
        fetchDiscussions();
    }, [user, loading, currentPage]);

    if (loading) return <p>Loading...</p>;

    const fetchDiscussions = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/discussions?page=${currentPage}&limit=3`);
            const data = await response.json();
            setDiscussions(data.discussions || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to post a discussion.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/discussions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ topic, content, anonymous }),
            });

            if (!response.ok) throw new Error("Failed to create discussion");

            alert("Discussion created successfully!");
            setTopic("");
            setContent("");
            setAnonymous(false);
            fetchDiscussions();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteDiscussion = async (discussionId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/api/discussions/${discussionId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to delete discussion");

            setDiscussions((prevDiscussions) =>
                prevDiscussions.filter((discussion) => discussion._id !== discussionId)
            );

            fetchDiscussions();
        } catch (error) {
            console.error("Error deleting discussion:", error);
        }
    };

    const handleDeleteComment = async (discussionId, replyId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to delete a comment.");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/discussions/${discussionId}/reply/${replyId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to delete comment");

            setDiscussions((prevDiscussions) =>
                prevDiscussions.map((discussion) =>
                    discussion._id === discussionId
                        ? { ...discussion, replies: discussion.replies.filter((reply) => reply._id !== replyId) }
                        : discussion
                )
            );

            fetchDiscussions();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleLike = async (discussionId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to like a discussion.");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/discussions/${discussionId}/like`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to like/unlike discussion");

            const updatedDiscussion = await response.json();

            setDiscussions((prevDiscussions) =>
                prevDiscussions.map((discussion) =>
                    discussion._id === discussionId ? updatedDiscussion : discussion
                )
            );
        } catch (error) {
            console.error("Error liking discussion:", error);
        }
    };

    const handleCommentSubmit = async (discussionId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to comment.");
                return;
            }

            if (!commentText[discussionId]) {
                alert("Comment cannot be empty.");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/discussions/${discussionId}/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ content: commentText[discussionId] }),
            });

            if (!response.ok) throw new Error("Failed to post comment");

            setCommentText({ ...commentText, [discussionId]: "" });
            fetchDiscussions();
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <div className="community-container">
            <h1 className="community-title">Community Discussions</h1>

            <div className="discussion-list">
                {discussions.map((discussion) => (
                    <div key={discussion._id} className="discussion-card">
                        <div className="discussion-header">
                            <span className="username">{discussion.anonymous ? "Anonymous" : discussion.user?.name || "Unknown User"}</span>
                            {discussion.user?._id === user?.id && (
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteDiscussion(discussion._id)}
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                        <h3>{discussion.topic}</h3>
                        <p>{discussion.content}</p>

                        <div className="discussion-footer">
                            <button className="like-button" onClick={() => handleLike(discussion._id)}>
                                ❤️ {discussion.likes}
                            </button>
                            <button className="comment-button" onClick={() => setOpenComments((prev) => ({
                                ...prev,
                                [discussion._id]: !prev[discussion._id]
                            }))}>
                                💬 {discussion.replies.length}
                            </button>
                        </div>

                        {openComments[discussion._id] && (
                            <div className="discussion-comments">
                                {discussion.replies.map((reply) => (
                                    <div key={reply._id} className="comment-item">
                                        <span className="comment-name">{reply.name}:</span>
                                        <span className="comment-text">{reply.content}</span>
                                        {reply.user === user?.id && (
                                            <button className="delete-button" onClick={() => handleDeleteComment(discussion._id, reply._id)}>
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <div className="comment-input">
                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={commentText[discussion._id] || ""}
                                        onChange={(e) =>
                                            setCommentText({ ...commentText, [discussion._id]: e.target.value })
                                        }
                                    />
                                    <button onClick={() => handleCommentSubmit(discussion._id)}>Post</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="pagination-controls">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>

            <div className="create-discussion-container">
                <h2>Start a Discussion</h2>
                <form onSubmit={handleSubmit} className="create-discussion-form">
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" required />
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
                    <button type="submit">Post Discussion</button>
                </form>
            </div>
        </div>
    );
};

export default Community;
