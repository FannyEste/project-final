import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DiscussionList from "./DiscussionList";
import "./Community.css";

const Community = () => {
    const { user, loading } = useAuth(); // Include loading state
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Loading state:", loading); // Debug loading state
        console.log("User in Community.jsx:", user); // Debug user state

        if (!loading && !user) {
            console.log("Redirecting to login...");
            navigate("/login"); // Redirect only after loading
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <p>Loading...</p>; // Avoid rendering prematurely
    }

    return (
        <div className="community-container">
            <h1 className="community-title">Community Discussions</h1>
            <button
                className="start-discussion-button"
                onClick={() => navigate("/community/new")}
            >
                Start a Discussion
            </button>
            <DiscussionList />
        </div>
    );
};

export default Community;
