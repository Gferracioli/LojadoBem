import React from 'react';

const UserList = () => {
  const users = [
    { id: 1, nome: 'User 1', status: 'Admin' },
    { id: 2, nome: 'User 2', status: 'User' },
    // Add more sample users here
  ];

  // Handle user status change or deletion (will be connected to Firebase later)
  const changeUserStatus = (id: number, newStatus: string) => {
    console.log(`Change status of user with ID: ${id} to ${newStatus}`);
  };

  const deleteUser = (id: number) => {
    console.log(`Delete user with ID: ${id}`);
  };

  return (
    <ul className="space-y-4">
      {users.map((user) => (
        <li key={user.id} className="flex justify-between items-center border p-4 rounded-lg">
          <div>
            <h3 className="text-xl font-bold">{user.nome}</h3>
            <p>Status: {user.status}</p>
          </div>
          <div className="flex space-x-2">
            <select
              value={user.status}
              onChange={(e) => changeUserStatus(user.id, e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Banned">Banned</option>
            </select>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
