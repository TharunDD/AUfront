import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './Login.css';
import { login } from '../redux/cartSlice';
import { toast } from 'react-toastify';

function Logg() {
  const [formData, setFormData] = useState({
    umail: '',
    password: '',
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { umail, password } = formData;

    if (!umail || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(umail);

    if (!isEmailValid) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/u/user/search', {
        umail,
        upassword: password, // Make sure the server expects 'upassword'
      });

      console.log(response.data);
      const { success, message, user } = response.data;

      if (success) {
        dispatch(login(user));
        setUser(user);
        navigate('/');
        toast.success(`Welcome Back, ${user.uname}!`);
        // You may want to redirect the user or perform other actions
      } else {
        toast.error('Login failed');
        console.log('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className="asd">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="umail"
                placeholder="Your Mail Id"
                value={formData.umail}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="action">
            <Link to="/sig">
              <button>Siginin</button>
            </Link>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Logg;
