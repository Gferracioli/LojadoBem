import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <Link to="/admin/products" className="hover:text-gray-300">Manage Products</Link>
          <Link to="/admin/users" className="hover:text-gray-300">Manage Users</Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
