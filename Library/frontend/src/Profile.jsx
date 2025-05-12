import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import './css/Add-Book.css';
import Header from './Header';

function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [meta, setMeta] = useState({
        email_verified_at: '',
        remember_token: '',
        created_at: '',
        updated_at: ''
    });

    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/${id}`);
            } catch (err) {
                setError('Failed to fetch user profile.');
            }
        };
    
        fetchUser();
    }, [id]);    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg('');

        try {
            const payload = { ...form };
            if (!payload.password) delete payload.password;

            await api.put(`/users/${id}`, payload);
            setSuccessMsg('✅ Profile updated successfully!');

            setTimeout(() => {
                setSuccessMsg('');
                navigate('/profile');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
            console.error(err);
        }
    };

    return (
        <header>
            <Header />
            <div className="login-body">
                <div className="wrapper login-form">
                    <h1>Edit Profile</h1>

                    {successMsg && <div className="custom-alert success">{successMsg}</div>}
                    {error && <div className="custom-alert error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="New Password (leave blank to keep current)"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="meta-info">
                            <p><strong>Email Verified:</strong> {meta.email_verified_at || 'Not Verified'}</p>
                            <p><strong>Remember Token:</strong> {meta.remember_token || 'N/A'}</p>
                            <p><strong>Created At:</strong> {meta.created_at}</p>
                            <p><strong>Updated At:</strong> {meta.updated_at}</p>
                        </div>

                        <button type="submit" className="btn-save">Update Profile</button>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default Profile;
