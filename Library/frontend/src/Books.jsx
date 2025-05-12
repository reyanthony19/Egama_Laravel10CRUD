import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import './css/Booklist.css';
import Header from './Header';

function Books() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    const fetchBooks = useCallback(async () => {
        try {
            const res = await api.get('/books');

            const sortedBooks = res.data.sort((a, b) => {
                const dateA = new Date(a.updated_at || a.created_at);
                const dateB = new Date(b.updated_at || b.created_at);
                return dateB - dateA;
            });

            setBooks(sortedBooks);
            extractCategories(sortedBooks);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const extractCategories = (books) => {
        const allCategories = ['All', ...new Set(books.map((b) => b.category || 'Uncategorized'))];
        setCategories(allCategories);
    };

    const filterBooks = useCallback(() => {
        let filtered = books;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter((book) => (book.category || 'Uncategorized') === selectedCategory);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (book) =>
                    book.title.toLowerCase().includes(term) ||
                    book.author.toLowerCase().includes(term)
            );
        }

        setFilteredBooks(filtered);
    }, [books, searchTerm, selectedCategory]);

    useEffect(() => {
        fetchBooks();

        const interval = setInterval(() => {
            fetchBooks();
        }, 5000);

        return () => clearInterval(interval);
    }, [fetchBooks]);

    useEffect(() => {
        filterBooks();
    }, [books, searchTerm, selectedCategory, filterBooks]);

    const handleDelete = async (bookId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this book?');

        if (isConfirmed) {
            try {
                await api.put(`/books/${bookId}`, { deleted: 1 });

                setBooks(books.filter(book => book.id !== bookId));
                setFilteredBooks(filteredBooks.filter(book => book.id !== bookId));

                alert('Book marked as deleted');
            } catch (error) {
                console.error('Failed to mark book as deleted:', error);
                alert('Failed to delete book');
            }
        }
    };

    return (
        <header>
            <Header />
            <div className="table-container">
                <h1>Book List</h1>

                <div className="book-controls">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="category-select"
                    >
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <Link to="/Add-Book" className="btn-glow-add">
                        + Add Book
                    </Link>
                    <Link to="/deleted-books" className="btn-glow-deleted">
                        View Deleted Books
                    </Link>
                </div>

                {loading ? (
                    <p>Loading books...</p>
                ) : filteredBooks.length === 0 ? (
                    <p>No books found.</p>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map((book) => (
                                    <tr key={book.id || book._id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.copies}</td>
                                        <td>{book.category || 'Uncategorized'}</td>
                                        <td>
                                            <Link to={`/edit-book/${book.id || book._id}`} className="btn-edit small-btn">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(book.id || book._id)}
                                                className="btn-glow-delete"
                                            >
                                                Delete
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

export default Books;
