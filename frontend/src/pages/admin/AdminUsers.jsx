import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { formatDate } from '../../utils/format';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data.users);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (userId, role) => {
    try {
      await api.put(`/admin/users/${userId}`, { role });
      fetchUsers();
    } catch {
      /* ignore */
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot delete user');
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Manage Users</h1>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Joined</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-white/5">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => updateRole(u._id, e.target.value)}
                      className="input-field py-1 text-sm w-auto"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="p-3">{formatDate(u.createdAt)}</td>
                  <td className="p-3">
                    <button type="button" onClick={() => deleteUser(u._id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
