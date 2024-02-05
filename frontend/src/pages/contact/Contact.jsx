import React, { useState } from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { FaMapMarker, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import './contact.css';
import axios from 'axios';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/send-email', formData);
      console.log(response.data);
      setSuccessMessage('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <div className="info-item">
          <AiOutlineMail className="icon" />
          <p>Email: example@example.com</p>
        </div>
        <div className="info-item">
          <AiOutlinePhone className="icon" />
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="info-item">
          <FaMapMarker className="icon" />
          <p>Address: 123 Street, City, Country</p>
        </div>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <FaUser />
              Name:
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope />
              Email:
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">
              <FaPhone />
              Phone:
            </label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
