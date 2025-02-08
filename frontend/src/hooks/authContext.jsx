import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config"; // Adjust based on your setup

const AuthContext = createContext();

let refreshTimeout; // Keep track of refresh timer

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            const decoded = decodeToken(token);

            if (decoded && decoded.exp * 1000 > Date.now()) {
                setUser(JSON.parse(storedUser));
                refreshTokenBeforeExpiry(decoded.exp);
            } else {
                console.warn("Token expired. Logging out...");
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (token, user) => {
        try {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);

            const decoded = decodeToken(token);
            if (decoded) refreshTokenBeforeExpiry(decoded.exp);
        } catch (error) {
            console.error("Login error:", error);
            logout();
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        clearTimeout(refreshTimeout); // Stop refreshing token after logout
    };

    const refreshToken = async () => {
        try {
            console.log("Attempting to refresh token...");
            const response = await axios.get(`${API_URL}/api/refresh-token`, { withCredentials: true });

            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                console.log("Token refreshed successfully.");
                return response.data.accessToken;
            }
        } catch (error) {
            console.error("Token refresh failed. Logging out.", error);
            logout();
        }
        return null;
    };

    const refreshTokenBeforeExpiry = (expTime) => {
        const timeToExpire = expTime * 1000 - Date.now();
        const refreshTime = timeToExpire - 60000; // Refresh 1 minute before expiry

        if (refreshTime > 0) {
            refreshTimeout = setTimeout(async () => {
                const newToken = await refreshToken();
                if (newToken) {
                    const decoded = decodeToken(newToken);
                    if (decoded) refreshTokenBeforeExpiry(decoded.exp);
                }
            }, refreshTime);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use authentication
export const useAuth = () => useContext(AuthContext);

// Helper function to decode token
const decodeToken = (token) => {
    try {
        if (!token) return null;
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};
