import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './api';
import './css/Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (storedRememberMe) {
      setForm({ email: storedEmail, password: storedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      alert('Someone is already logged in');
      return;
    }

    try {
      const response = await api.post('/login', form);
      localStorage.setItem('token', response.data.token);

      if (rememberMe) {
        localStorage.setItem('email', form.email);
        localStorage.setItem('password', form.password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.setItem('rememberMe', 'false');
      }

      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <center>
      <div className='login-body'>
        <div className="wrapper">
          <form className="login-form" onSubmit={handleLogin}>
            <h1>Login</h1>
            {error && <div className="error-msg">{error}</div>}
            <div className='input-box'>
              <box-icon type='solid' name='envelope'></box-icon>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-box'>
              <box-icon type='solid' name='lock'></box-icon>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='remember-forgot'>
              <label>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
                <Link to="/forgot-password">Forgot Password?</Link>
              </label>
            </div>
            <div>
              <button className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading-text">Loading in</span> : 'Login'}
              </button>
            </div>
            <p className="register-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </center>
  );
}

export default Login;
