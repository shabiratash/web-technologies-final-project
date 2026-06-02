import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container py-16 flex justify-center">
      <div className="glass-card w-full max-w-md animate-scale-in">
        <h1 className="font-display text-3xl font-bold text-center">Create Account</h1>
        <p className="text-center text-zinc-500 mt-2">Join Boot Handcraft Afghanistan</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
          {['name', 'email', 'password', 'confirmPassword'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field === 'confirmPassword' ? 'Confirm Password' : field}
              </label>
              <input
                type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                required
                minLength={field.includes('password') ? 6 : undefined}
                value={form[field]}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center gap-2">
            {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
