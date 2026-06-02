import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';
import { formatPrice } from '../utils/format';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shipping, setShipping] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    province: user?.address?.province || '',
    postalCode: user?.address?.postalCode || '',
    country: 'Afghanistan',
  });
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');

  if (cartItems.length === 0) {
    return (
      <div className="page-container py-16 text-center">
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn-primary mt-4 inline-flex">Shop Now</Link>
      </div>
    );
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const placeOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));
      await api.post('/orders', {
        orderItems,
        shippingAddress: shipping,
        paymentMethod,
      });
      clearCart();
      navigate('/dashboard', { state: { orderSuccess: true } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container py-8 max-w-4xl mx-auto">
      <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex gap-4 mb-8">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 rounded-full transition-colors ${
              step >= s ? 'bg-brand-600' : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
          />
        ))}
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {step === 1 && (
        <form onSubmit={handleShippingSubmit} className="glass-card space-y-4 animate-slide-up">
          <h2 className="font-display text-xl font-semibold">Shipping Information</h2>
          {['fullName', 'phone', 'street', 'city', 'province', 'postalCode'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="text"
                required={field !== 'postalCode'}
                value={shipping[field]}
                onChange={(e) => setShipping({ ...shipping, [field]: e.target.value })}
                className="input-field"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input type="text" value={shipping.country} readOnly className="input-field opacity-70" />
          </div>
          <button type="submit" className="btn-primary w-full">
            Review Order
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-slide-up">
          <div className="glass-card">
            <h2 className="font-display text-xl font-semibold mb-4">Order Review</h2>
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <p className="font-bold text-lg border-t border-white/10 pt-4">
              Total: {formatPrice(cartTotal)}
            </p>
          </div>

          <div className="glass-card">
            <h3 className="font-semibold mb-2">Ship to</h3>
            <p className="text-sm text-zinc-500">
              {shipping.fullName}<br />
              {shipping.street}, {shipping.city}<br />
              {shipping.province}, {shipping.country}<br />
              {shipping.phone}
            </p>
          </div>

          <div className="glass-card">
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cash_on_delivery"
                checked={paymentMethod === 'cash_on_delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-3 cursor-pointer mt-2">
              <input
                type="radio"
                name="payment"
                value="bank_transfer"
                checked={paymentMethod === 'bank_transfer'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Bank Transfer
            </label>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">
              Back
            </button>
            <button
              type="button"
              onClick={placeOrder}
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
