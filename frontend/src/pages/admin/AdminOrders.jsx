import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { formatPrice, formatDate } from '../../utils/format';
import { ORDER_STATUSES } from '../../constants/categories';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const { data } = await api.get(`/admin/orders${params}`);
      setOrders(data.orders);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}`, { status });
      fetchOrders();
    } catch {
      /* ignore */
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="font-display text-3xl font-bold">Manage Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field w-auto"
        >
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="glass-card">
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div>
                  <p className="font-medium">{order.user?.name} — {order.user?.email}</p>
                  <p className="text-sm text-zinc-500">{formatDate(order.createdAt)}</p>
                </div>
                <p className="font-bold text-brand-600">{formatPrice(order.totalPrice)}</p>
              </div>
              <div className="text-sm space-y-1 mb-4">
                {order.products.map((item, i) => (
                  <p key={i}>{item.title} × {item.quantity}</p>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm">Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="input-field w-auto py-2 text-sm capitalize"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
