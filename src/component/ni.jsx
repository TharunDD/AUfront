import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function L() {
  const [formData, setFormData] = useState({
    name: '',
    umail: '',
    phone: '',
    carName: '',
    carPrice: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, umail, phone, carName, carPrice, password } = formData;

    if (!name || !umail || !phone || !carName || !carPrice || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(umail);

    if (!isEmailValid) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/u/h',formData);

      console.log(response.data);
      if (success) {
    console.l
        // You may want to redirect the user or perform other actions
      } else {
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
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="umail"
                placeholder="Your Mail Id"
                value={formData.umail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="carName"
                placeholder="Car Name"
                value={formData.carName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="carPrice"
                placeholder="Car Price"
                value={formData.carPrice}
                onChange={handleInputChange}
                required
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

export default L;
