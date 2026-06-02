import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { formatPrice, formatDate } from '../../utils/format';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data.stats);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers, icon: '👥', link: '/admin/users' },
    { label: 'Total Products', value: stats?.totalProducts, icon: '🥾', link: '/admin/products' },
    { label: 'Total Orders', value: stats?.totalOrders, icon: '📦', link: '/admin/orders' },
    { label: 'Revenue', value: formatPrice(stats?.totalRevenue || 0), icon: '💰' },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card) => (
          <div key={card.label} className="glass-card animate-scale-in">
            {card.link ? (
              <Link to={card.link} className="block hover:opacity-90">
                <span className="text-3xl">{card.icon}</span>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
                <p className="text-sm text-zinc-500">{card.label}</p>
              </Link>
            ) : (
              <>
                <span className="text-3xl">{card.icon}</span>
                <p className="text-2xl font-bold mt-2">{card.value}</p>
                <p className="text-sm text-zinc-500">{card.label}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card">
          <h2 className="font-display text-xl font-semibold mb-4">Orders by Status</h2>
          <div className="space-y-2">
            {Object.entries(stats?.ordersByStatus || {}).map(([status, count]) => (
              <div key={status} className="flex justify-between text-sm capitalize">
                <span>{status}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h2 className="font-display text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats?.recentOrders?.map((order) => (
              <div key={order._id} className="flex justify-between text-sm border-b border-white/10 pb-2">
                <div>
                  <p className="font-medium">{order.user?.name}</p>
                  <p className="text-zinc-500">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(order.totalPrice)}</p>
                  <p className="capitalize text-zinc-500">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/admin/products/new" className="btn-primary">Add Product</Link>
        <Link to="/admin/products" className="btn-secondary">Manage Products</Link>
        <Link to="/admin/orders" className="btn-secondary">Manage Orders</Link>
        <Link to="/admin/users" className="btn-secondary">Manage Users</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
