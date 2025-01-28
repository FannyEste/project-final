import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiscussionList.css";

const DiscussionList = () => {
    const [discussions, setDiscussions] = useState([]); // Initialize as an empty array
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch discussions from the API
        const fetchDiscussions = async () => {
            console.log("fetchDiscussions function called");
            try {
                const response = await fetch(`http://localhost:8080/api/discussions?page=${page}`);
                console.log("Response received:", response);
                const data = await response.json();

                console.log("Fetched discussions:", data); // Debug the response

                // Update the state with the discussions array
                setDiscussions(data.discussions || []); // Safeguard in case `discussions` is undefined
            } catch (error) {
                console.error("Error fetching discussions:", error);
            }
        };
        fetchDiscussions();
    }, [page]);

    return (
        <div className="discussion-list">
            {discussions.length > 0 ? (
                discussions.map((discussion) => (
                    <div
                        key={discussion.id}
                        className="discussion-card"
                        onClick={() => navigate(`/community/discussion/${discussion.id}`)}
                    >
                        <div className="discussion-header">
                            <img
                                src={discussion.avatar || "/default-avatar.png"}
                                alt={discussion.name || "Anonymous"}
                                className="avatar"
                            />
                            <h3>{discussion.name || "Anonymous"}</h3>
                        </div>
                        <h4>{discussion.topic}</h4>
                        <p>{discussion.content.slice(0, 100)}...</p>
                        <div className="discussion-footer">
                            <span>{discussion.replies} Replies</span>
                            <span>{discussion.likes} Likes</span>
                            <button className="like-button">❤️</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No discussions available. Be the first to start one!</p>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default DiscussionList;
