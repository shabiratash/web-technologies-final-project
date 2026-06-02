import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { formatPrice, capitalize } from '../../utils/format';
import LoadingSpinner from '../../components/LoadingSpinner';
import Alert from '../../components/Alert';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products?limit=100');
      setProducts(data.products);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setMessage('Product deleted');
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Manage Products</h1>
        <Link to="/admin/products/new" className="btn-primary">Add Product</Link>
      </div>

      {message && <Alert type="success" message={message} onClose={() => setMessage(null)} />}

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3 font-medium">{p.title}</td>
                  <td className="p-3 capitalize">{capitalize(p.category)}</td>
                  <td className="p-3">{formatPrice(p.price)}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 flex gap-2">
                    <Link to={`/admin/products/${p._id}/edit`} className="text-brand-600 hover:underline">
                      Edit
                    </Link>
                    <button type="button" onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">
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

export default AdminProducts;
