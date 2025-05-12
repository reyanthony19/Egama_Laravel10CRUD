import React, { useEffect, useState } from 'react';
import api from './api';
import './css/Dashboard.css';
import Header from './Header';

function DeletedBooks() {
    const [deletedBooks, setDeletedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeletedBooks();
    }, []);

    const fetchDeletedBooks = async () => {
        try {
            const res = await api.get('/books/deleted');
            setDeletedBooks(res.data);
        } catch (error) {
            console.error('Failed to fetch deleted books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (bookId) => {
        const isConfirmed = window.confirm('Restore this book?');
        if (isConfirmed) {
            try {
                await api.put(`/books/${bookId}`, { deleted: 0 });
                setDeletedBooks(deletedBooks.filter(book => book.id !== bookId));
                alert('Book restored successfully');
            } catch (error) {
                console.error('Failed to restore book:', error);
                alert('Failed to restore book');
            }
        }
    };

    return (
        <header>
            <Header />
            <div className="table-container">
                <h1>Deleted Books</h1>

                {loading ? (
                    <p>Loading deleted books...</p>
                ) : deletedBooks.length === 0 ? (
                    <p>No deleted books found.</p>
                ) : (
                    <div className="table-scroll">
                        <table className="books-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>ISBN</th>
                                    <th>Copies</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deletedBooks.map(book => (
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.copies}</td>
                                        <td>{book.category || 'Uncategorized'}</td>
                                        <td>
                                            <button
                                                onClick={() => handleRestore(book.id)}
                                                className="btn-glow small-btn"
                                            >
                                                Restore
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </header>
    );
}

export default DeletedBooks;
