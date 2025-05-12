import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './api';
import './css/Login.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/register', form);
      alert("Registered Successful");
      navigate('/login');
    } catch (err) {

      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <center>
      <div className='login-body'>
        <div className="wrapper">
          <form className="login-form" onSubmit={handleRegister}>
            <h1>Register</h1>
            {error && <div className="error-msg">{error}</div>}

            <div className="input-box">
              <box-icon type="solid" name="user"></box-icon>
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
              <box-icon type="solid" name="envelope"></box-icon>
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
              <box-icon type="solid" name="lock"></box-icon>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <button className="btn btn-primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>

            <p className="register-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </center>
  );
}

export default Register;
