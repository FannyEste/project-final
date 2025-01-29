import React, { useState, useEffect } from "react";
import "./DiscussionList.css";

const DiscussionList = () => {
    const [discussions, setDiscussions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchDiscussions();
    }, [currentPage]);

    const fetchDiscussions = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/discussions?page=${currentPage}&limit=5`);
            const data = await response.json();
            setDiscussions(data.discussions);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        }
    };

    return (
        <div className="discussion-list">
            {discussions.map((discussion) => (
                <div key={discussion._id} className="discussion-item">
                    <h3>{discussion.topic}</h3>
                    <p>{discussion.content}</p>
                    <div className="discussion-footer">
                        <span>{discussion.likes} ❤️</span>
                        <span>{discussion.replies.length} 💬</span>
                    </div>
                </div>
            ))}

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default DiscussionList;
