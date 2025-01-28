import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiscussionList.css";

const DiscussionList = () => {
    const [discussions, setDiscussions] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // Fetch discussions from the API
        const fetchDiscussions = async () => {
            const response = await fetch(`/api/discussions?page=${page}`);
            const data = await response.json();
            setDiscussions(data);
        };
        fetchDiscussions();
    }, [page]);

    return (
        <div className="discussion-list">
            {discussions.map((discussion) => (
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
            ))}

            <div className="pagination">
                {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default DiscussionList;
