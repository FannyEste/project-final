import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateDiscussion.css";

const CreateDiscussion = () => {
    const [topic, setTopic] = useState("");
    const [content, setContent] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to post a discussion.");
            navigate("/login");
            return;
        }

        const newDiscussion = {
            topic,
            content,
            anonymous,
            createdAt: new Date(),
        };

        console.log("Submitting new discussion:", newDiscussion); // Debug log
        console.log("Authorization token:", token); // Debug log

        try {
            const response = await fetch("http://localhost:8080/api/discussions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Include token in Authorization header
                },
                body: JSON.stringify(newDiscussion),
            });
            console.log("Headers being sent:", {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            });
            
            console.log("Response from server:", response); // Debug log

            // Check if the response is not successful
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error from server:", errorData); // Debug log
                throw new Error(errorData.message || "Failed to create discussion");
            }

            alert("Discussion created successfully!");
            navigate("/community"); // Redirect back to Community
        } catch (error) {
            console.error("Error creating discussion:", error); // Debug log
            alert(error.message);
        }
    };

    return (
        <div className="create-discussion-container">
            <h1>Start a Discussion</h1>
            <form onSubmit={handleSubmit} className="create-discussion-form">
                <label>
                    Topic:
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter the topic"
                        required
                    />
                </label>
                <label>
                    Content:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your discussion here"
                        required
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={anonymous}
                        onChange={(e) => setAnonymous(e.target.checked)}
                    />
                    Post as Anonymous
                </label>
                <button type="submit">Post Discussion</button>
            </form>
        </div>
    );
};

export default CreateDiscussion;
