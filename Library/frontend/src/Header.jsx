import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="top-navbar">
            <h1 className="logo">Library Management System 管理者</h1>
            <nav className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/students">Students</Link>
                <Link to="/books">Books</Link>
                <Link to="/profile">Profile</Link>
                <a href="/logout" onClick={handleLogout}>Logout</a>

            </nav>
        </header>
    );
}

export default Header;
