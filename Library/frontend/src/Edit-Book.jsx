import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import './css/Add-Book.css'; 
import Header from './Header';

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        author: '',
        isbn: '',
        copies: 1,
        category: '',
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await api.get(`/books/${id}`);
                const { title, author, isbn, copies, category } = res.data;
                setForm({
                    title: title || '',
                    author: author || '',
                    isbn: isbn || '',
                    copies: copies || 1,
                    category: category || '',
                });
            } catch (err) {
                setError('Failed to fetch book details.');
                console.error(err);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await api.get('/books');
                const allCategories = [
                    ...new Set(res.data.map((b) => b.category?.trim() || 'Uncategorized')),
                ];
                setCategories(['Other', ...allCategories.filter((c) => c !== 'Other')]);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };

        fetchBook();
        fetchCategories();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg('');

        try {
            await api.put(`/books/${id}`, form);
            setSuccessMsg('✅ Book updated successfully!');
            
            setTimeout(() => {
                setSuccessMsg('');
                navigate('/Books');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update book.');
            console.error(err);
        }
    };

    return (
        <header>
            <Header />
            <div className="login-body">
                <div className="wrapper login-form">
                    <h1>Edit Book</h1>

                    {successMsg && <div className="custom-alert success">{successMsg}</div>}
                    {error && <div className="custom-alert error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="author"
                                placeholder="Author"
                                value={form.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="isbn"
                                placeholder="ISBN"
                                value={form.isbn}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="number"
                                name="copies"
                                placeholder="Copies"
                                min="1"
                                value={form.copies}
                                onChange={handleChange}
                                required
                            />
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
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn-save">Update</button>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default EditBook;
