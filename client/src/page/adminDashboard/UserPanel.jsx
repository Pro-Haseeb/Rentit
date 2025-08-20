import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './UserPanel.css'; // optional styling
import API from "../../axiosConfig";

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('http://localhost:5000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const toggleBlock = async (userId, isCurrentlyBlocked) => {
    const url = `http://localhost:5000/api/admin/users/${isCurrentlyBlocked ? 'unblock' : 'block'}/${userId}`;
    try {
      await API.put(url, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error("Block/Unblock error:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await API.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by name
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>All Users</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>CNIC</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
              <td>
  {user.cnicImage ? (
    <a href={`http://localhost:5000${user.cnicImage}`} target="_blank" rel="noopener noreferrer">View</a>
  ) : (
    'N/A'
  )}
</td>

              <td>
                <button
                  className={user.isBlocked ? 'unblock' : 'block'}
                  onClick={() => toggleBlock(user._id, user.isBlocked)}
                >
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
                <button
                  className="delete"
                  onClick={() => deleteUser(user._id)}
                  style={{ marginLeft: '8px', backgroundColor: '#dc3545', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr><td colSpan="5">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPanel;
