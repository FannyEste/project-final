import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Adjusted path
import "./Community.css";

const Community = ({ isAuthenticated }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="community-container">
            <h1 className="community-title">Community Discussions</h1>
            <button
                className="start-discussion-button"
                onClick={() => navigate("/community/new")}
            >
                Start a Discussion
            </button>
            <p>Welcome to the community!</p>
        </div>
    );
};

export default Community;
