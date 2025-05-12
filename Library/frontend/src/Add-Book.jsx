import React, { useState } from 'react';
import api from './api';
import './css/Add-Book.css';
import Header from './Header';

function AddBook() {
    const [form, setForm] = useState({
        title: '',
        author: '',
        isbn: '',
        copies: 1,
        category: 'Other',
    });
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg('');

        try {
            await api.post('/books', form);
            setSuccessMsg('✅ Book Added successfully!');
            setForm({
                title: '',
                author: '',
                isbn: '',
                copies: 1,
                category: 'Other',
            });

            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add book.');
        }
    };

    return (
        <header>
            <Header />
            <div className="login-body">
                <div className="wrapper login-form">
                    <h1>Add New Book</h1>
                    
                    {/* Success and error messages */}
                    {successMsg && <div className="custom-alert success">{successMsg}</div>}
                    {error && <p className="custom-alert error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                        </div>
                        <div className="input-box">
                            <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
                        </div>
                        <div className="input-box">
                            <input type="text" name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
                        </div>
                        <div className="input-box">
                            <input type="number" name="copies" placeholder="Copies" min="1" value={form.copies} onChange={handleChange} required />
                        </div>
                        <div className="input-box">
                            <select
                                name="category"
                                className="input-box-select"
                                value={form.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-fiction">Non-fiction</option>
                                <option value="Science">Science</option>
                                <option value="Technology">Technology</option>
                                <option value="History">History</option>
                                <option value="Biography">Biography</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-save">Save</button>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default AddBook;
