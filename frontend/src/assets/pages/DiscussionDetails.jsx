import React, { useState, useEffect } from "react";
import "./DiscussionDetails.css"; // Ensure the path is correct

const DiscussionDetails = ({ discussionId }) => {
    const [discussion, setDiscussion] = useState(null);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        // Fetch discussion and replies
        const fetchDiscussion = async () => {
            const response = await fetch(`http://localhost:8080/api/discussions/${discussionId}`);
            const data = await response.json();
            setDiscussion(data.discussion);
            setReplies(data.replies);
        };
        fetchDiscussion();
    }, [discussionId]);

    return (
        <div className="discussion-details">
            {discussion && (
                <>
                    <h2>{discussion.topic}</h2>
                    <p>{discussion.content}</p>
                    <div className="replies">
                        <h3>Replies:</h3>
                        {replies.map((reply) => (
                            <div key={reply.id} className="reply">
                                <p>{reply.content}</p>
                                <span>- {reply.name || "Anonymous"}</span>
                            </div>
                        ))}
                    </div>
                    <button className="floating-reply-button">+</button>
                </>
            )}
        </div>
    );
};

export default DiscussionDetails;
