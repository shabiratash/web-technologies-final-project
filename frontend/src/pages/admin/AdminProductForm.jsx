import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { CATEGORIES } from '../../constants/categories';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'boots',
    images: '',
    price: '',
    stock: '',
    featured: false,
  });

  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        const p = data.product;
        setForm({
          title: p.title,
          description: p.description,
          category: p.category,
          images: (p.images || []).join('\n'),
          price: p.price,
          stock: p.stock,
          featured: p.featured,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      images: form.images.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="max-w-2xl">
      <Link to="/admin/products" className="text-sm text-brand-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      <h1 className="font-display text-3xl font-bold mb-8">
        {isEdit ? 'Edit Product' : 'Add Product'}
      </h1>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <form onSubmit={handleSubmit} className="glass-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="input-field">
            {CATEGORIES.filter((c) => c.value).map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URLs (one per line)</label>
          <textarea name="images" value={form.images} onChange={handleChange} rows={3} className="input-field" placeholder="https://..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required className="input-field" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Featured product
        </label>
        <button type="submit" disabled={saving} className="btn-primary w-full flex justify-center gap-2">
          {saving ? <LoadingSpinner size="sm" /> : isEdit ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
