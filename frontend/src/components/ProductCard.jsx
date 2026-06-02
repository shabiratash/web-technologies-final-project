import { Link } from 'react-router-dom';
import { formatPrice, capitalize } from '../utils/format';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <article className="glass-card group overflow-hidden animate-scale-in hover:shadow-2xl transition-all duration-300">
      <Link to={`/products/${product._id}`} className="block relative aspect-[4/5] overflow-hidden rounded-xl mb-4">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full glass capitalize">
          {capitalize(product.category)}
        </span>
        {product.stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold">
            Out of Stock
          </span>
        )}
      </Link>
      <div className="space-y-2">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-display text-xl font-semibold group-hover:text-brand-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-brand-600">{formatPrice(product.price)}</p>
          {product.rating > 0 && (
            <span className="text-sm text-zinc-500">★ {product.rating.toFixed(1)}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="btn-primary w-full text-sm py-2.5 mt-2"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
