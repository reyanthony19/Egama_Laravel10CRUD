import { useEffect, useState } from 'react';
import api from './api';
import './css/Dashboard.css';
import Header from './Header';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);



  useEffect(() => {
    fetchBooks();
    fetchUsers();

    const interval = setInterval(() => {
      fetchUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error("Error loading books:", err);
      alert('Failed to load books');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  return (
    <div className="admin-body">
      <Header />

      <main className="main-content">
        <div className="dashboard-header">
          <h2>Welcome {users[0]?.name || '......'}</h2>
          <span className="subtitle">システム制御パネル</span>
        </div>

        <section className="dashboard-grid">
          <div className="card">
            <h3>Students</h3>
            <p>{users.length} Active</p>
          </div>
          <div className="card">
            <h3>Books</h3>
            <p>{books.length} Books</p>
          </div>
          <div className="card">
            <h3>Borrowed Books</h3>
            <p>$42,530</p>
          </div>
          <div className="card">
            <h3>Message</h3>
            <p>5 System Warnings</p>
          </div>
          <div className="card">
            <h3>Deleted Books</h3>
            <p>1 System Warnings</p>
          </div>
          <div className="card">
            <h3>Deleted Students</h3>
            <p>1 System Warnings</p>
          </div>
          <div className="card">
            <h3>Pending</h3>
            <p>1 System Warnings</p>
          </div>
          <div className="card">
            <h3>Admins</h3>
            <p>{users.length} Admins</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
