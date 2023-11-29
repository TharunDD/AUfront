
import React, { useState } from 'react';
import './contact.css'; // Import your CSS file for styling
import { FaPhone, FaEnvelope } from 'react-icons/fa'; // Import the icons
import Footer from './footer';
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
    console.log(formData);
  };

  return (
    <div>
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-details">
          <h2>Contact Details</h2>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <span className="contact-label">Phone:</span>
            </div>
            <div className='contct-det'>
            <span className="contact-bold">123-456-7890</span>
            <br />
          </div><br/><br/><br/>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <span className="contact-label">Email:</span>
        </div>
        <div>
            <span className="contact-bold">example@example.com</span>
            <br />
          </div>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ContactForm;
