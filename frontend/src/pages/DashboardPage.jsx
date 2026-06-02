import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { formatPrice, formatDate } from '../utils/format';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const { user, updateUser } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || {},
  });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [message, setMessage] = useState(location.state?.orderSuccess ? 'Order placed successfully!' : null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my');
        setOrders(data.orders);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const { data } = await api.put('/users/profile', profile);
      updateUser(data.user);
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await api.put('/users/password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setMessage('Password updated successfully');
      setPasswords({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-600',
    processing: 'bg-blue-500/20 text-blue-600',
    shipped: 'bg-purple-500/20 text-purple-600',
    delivered: 'bg-green-500/20 text-green-600',
    cancelled: 'bg-red-500/20 text-red-600',
  };

  return (
    <div className="page-container py-8">
      <h1 className="font-display text-3xl font-bold mb-2">My Dashboard</h1>
      <p className="text-zinc-500 mb-8">Welcome back, {user?.name}</p>

      {message && <Alert type="success" message={message} onClose={() => setMessage(null)} />}
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <div className="flex gap-2 mb-8 overflow-x-auto">
        {['orders', 'profile', 'password'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-colors ${
              activeTab === tab ? 'bg-brand-600 text-white' : 'glass hover:bg-white/20'
            }`}
          >
            {tab === 'password' ? 'Change Password' : tab}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}
          {!loading && orders.length === 0 && (
            <p className="text-zinc-500 text-center py-12">No orders yet.</p>
          )}
          {orders.map((order) => (
            <div key={order._id} className="glass-card animate-scale-in">
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-zinc-500">Order #{order._id.slice(-8)}</p>
                  <p className="text-sm">{formatDate(order.createdAt)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                {order.products.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.title} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <p className="font-bold mt-4 pt-4 border-t border-white/10">
                Total: {formatPrice(order.totalPrice)}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSave} className="glass-card max-w-lg space-y-4 animate-slide-up">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="input-field"
            />
          </div>
          {['street', 'city', 'province', 'postalCode'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <input
                type="text"
                value={profile.address?.[field] || ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: { ...profile.address, [field]: e.target.value },
                  })
                }
                className="input-field"
              />
            </div>
          ))}
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      )}

      {activeTab === 'password' && (
        <form onSubmit={handlePasswordSave} className="glass-card max-w-lg space-y-4 animate-slide-up">
          {['currentPassword', 'newPassword', 'confirm'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field === 'confirm' ? 'Confirm New Password' : field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="password"
                required
                minLength={field !== 'currentPassword' ? 6 : undefined}
                value={passwords[field]}
                onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                className="input-field"
              />
            </div>
          ))}
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  );
};

export default DashboardPage;
