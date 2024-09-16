import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavBar'; // Navbar for admin page
import ProductList from '../../components/admin/ProductList'; // List of products with actions
import UserList from '../../components/admin/UserList'; // List of users with actions

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Admin Navigation Bar */}
      <AdminNavbar />

      <div className="container mx-auto p-8">
        {/* Product Management Section */}
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
            <ProductList />
          </div>

          {/* User Management Section */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <UserList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
