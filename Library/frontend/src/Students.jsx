import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import './css/Student-List.css';
import Header from './Header';

function Students() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('All');
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await api.get('/students');
                const sortedStudents = res.data.sort((a, b) => {
                    const dateA = new Date(a.updated_at || a.created_at);
                    const dateB = new Date(b.updated_at || b.created_at);
                    return dateB - dateA;
                });

                setStudents(sortedStudents);
                extractCourses(sortedStudents);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch Students:', error);
                setLoading(false);
            }
        };

        fetchStudents();

        const interval = setInterval(() => {
            fetchStudents();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const extractCourses = (students) => {
        const allCourses = ['All', ...new Set(students.map((b) => b.course || 'Uncategorized'))];
        setCourse(allCourses);
    };

    useEffect(() => {
        let filtered = students;

        if (selectedCourse !== 'All') {
            filtered = filtered.filter(
                (student) => (student.course || 'Uncategorized') === selectedCourse
            );
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter((student) =>
                (student.student_id_number && student.student_id_number.toLowerCase().includes(term)) ||
                (student.email && student.email.toLowerCase().includes(term)) ||
                (student.first_name + ' ' + student.middle_name + ' ' + student.last_name).toLowerCase().includes(term) ||
                (student.year_level && student.year_level.toLowerCase().includes(term))
            );
        }

        setFilteredStudents(filtered);
    }, [students, searchTerm, selectedCourse]);



    return (
        <header>
            <Header />
            <div className="table-container">
                <h1>Students List</h1>

                <div className="book-controls">
                    <input
                        type="text"
                        placeholder="Search by id, name, email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="category-select"
                    >
                        {course.map((course, index) => (
                            <option key={index} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>

                    <Link to="/deleted-books" className="btn-deleted">
                        View Deleted Student
                    </Link>
                </div>

                {loading ? (
                    <p>Loading Students...</p>
                ) : filteredStudents.length === 0 ? (
                    <p>No Students found.</p>
                ) : (
                    <div className="table-scroll">
                        <table className="books-table">
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Email</th>
                                    <th>Full Name</th>
                                    <th>Course</th>
                                    <th>Year Level</th>
                                    <th>Borrowed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id || student._id}>
                                        <td>{student.student_id_number}</td>
                                        <td>{student.email}</td>
                                        <td>{`${student.first_name} ${student.middle_name} ${student.last_name}`}</td>
                                        <td>{student.course}</td>
                                        <td>{student.year_level}</td>
                                        <td>{/* You can later populate this with borrowed book count */}</td>
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

export default Students;
