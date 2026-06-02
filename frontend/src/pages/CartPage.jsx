import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/format';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="page-container py-16 text-center animate-fade-in">
        <span className="text-6xl">🛒</span>
        <h1 className="font-display text-3xl font-bold mt-6">Your cart is empty</h1>
        <p className="text-zinc-500 mt-2">Discover our handcrafted collection</p>
        <Link to="/products" className="btn-primary mt-8 inline-flex">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="glass-card flex gap-4 sm:gap-6 animate-scale-in">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&q=80'}
                alt={item.title}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl"
              />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item._id}`} className="font-semibold hover:text-brand-600 line-clamp-1">
                  {item.title}
                </Link>
                <p className="text-brand-600 font-bold mt-1">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center glass rounded-lg overflow-hidden text-sm">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="px-3 py-1.5 hover:bg-white/10"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-3 py-1.5 hover:bg-white/10"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-bold shrink-0">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="glass-card h-fit sticky top-24 animate-slide-up">
          <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-white/10">
            <span>Total</span>
            <span className="text-brand-600">{formatPrice(cartTotal)}</span>
          </div>
          <Link to="/checkout" className="btn-primary w-full mt-6 text-center">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="btn-secondary w-full mt-3 text-center block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
