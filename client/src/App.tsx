import { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated, logout, refreshAccessToken } from './services/authService';

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);
    const navigate = useNavigate();

    // Check auth status and set up token refresh
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if we have an expired but refreshable token
                if (!isAuthenticated()) {
                    const token = await refreshAccessToken();
                    if (token) {
                        setAuthStatus(true);
                        return;
                    }
                }
                setAuthStatus(isAuthenticated());
            } catch (error) {
                setAuthStatus(false);
            }
        };

        checkAuth();

        // Set up storage event listener for cross-tab sync
        const handleStorageChange = () => {
            setAuthStatus(isAuthenticated());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setAuthStatus(false);
            navigate('/');
        }
    };

    return (
        <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={darkMode ? "dark" : "light"}
            />
            <Header
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode(!darkMode)}
                isAuthenticated={authStatus}
                onLogout={handleLogout}
            />
            <main className="flex-grow dark:bg-gray-800 dark:text-white transition-colors duration-300">
                <Outlet context={{ 
                    isAuthenticated: authStatus, 
                    setAuthStatus,
                    darkMode 
                }} />
            </main>
            <Footer/>
        </div>
    );
}