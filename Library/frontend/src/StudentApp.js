import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import StudentLogin from './client-side/Student-Login';
import StudentProfile from './client-side/Student-Profile';
import StudentDashboard from './client-side/Student-Dashboard';
import StudentRegister from './client-side/Student-Register';
import StudentHeader from './client-side/Student-Header';

const StudentProtected = () => {
  const token = localStorage.getItem('student_token');
  return token ? <Outlet /> : <Navigate to="/student-login" replace />;
};

const PublicRoute = () => {
  const token = localStorage.getItem('student_token');
  return token ? <Navigate to="/student-dashboard" replace /> : <Outlet />;
};

function StudentApp() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-register" element={<StudentRegister />} />
        </Route>

        <Route element={<StudentProtected />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/student-header" element={<StudentHeader />} />

        </Route>

        <Route path="*" element={<Navigate to="/student-login" replace />} />
      </Routes>
    </Router>
  );
}

export default StudentApp;
