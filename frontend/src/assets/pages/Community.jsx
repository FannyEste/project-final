import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DiscussionList from "./DiscussionList";
import "./Community.css";

const Community = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create discussion");
            }

            alert("Discussion created successfully!");
            setTopic("");
            setContent("");
            setAnonymous(false);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="community-container">
            <h1 className="community-title">Community Discussions</h1>

            {/* Discussion Form */}
            <div className="create-discussion-container">
                <h2>Start a Discussion</h2>
                <form onSubmit={handleSubmit} className="create-discussion-form">
                    <label>
                        Topic:
                        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
                    </label>
                    <label>
                        Content:
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                    </label>
                    <label>
                        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
                        Post as Anonymous
                    </label>
                    <button type="submit">Post Discussion</button>
                </form>
            </div>

            {/* List of Discussions */}
            <DiscussionList />
        </div>
    );
};

export default Community;
