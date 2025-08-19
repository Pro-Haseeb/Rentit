// pages/AdminContactMessages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminContactus.css';
import API from "../axiosConfig";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get('http://localhost:5000/api/contact');
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching contact messages:', err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="admin-contact-wrapper">
      <h2>Contact Us Messages</h2>
      {messages.length === 0 ? (
        <p>No messages received yet.</p>
      ) : (
        <ul className="message-list">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="message-card"
              onClick={() => setSelectedMessage(msg)}
            >
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p className="message-preview">{msg.message.slice(0, 50)}...</p>
              <p><em>{new Date(msg.createdAt).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      )}

      {selectedMessage && (
        <div className="message-overlay">
          <div className="message-popup">
            <button className="close-btn" onClick={() => setSelectedMessage(null)}>✖</button>
            <h3>Full Message</h3>
            <p><strong>Name:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <div className="full-message-scroll">
              <p>{selectedMessage.message}</p>
            </div>
            <p><em>{new Date(selectedMessage.createdAt).toLocaleString()}</em></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
