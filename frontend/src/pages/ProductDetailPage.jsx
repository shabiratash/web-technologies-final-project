import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../hooks/useCart';
import { formatPrice, capitalize } from '../utils/format';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container py-16 text-center">
        <Alert type="error" message={error || 'Product not found'} />
        <Link to="/products" className="btn-primary mt-6 inline-flex">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container py-8">
      <nav className="text-sm text-zinc-500 mb-6">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-brand-600">Shop</Link>
        <span className="mx-2">/</span>
        <span>{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in">
        <div className="glass-card overflow-hidden p-0">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80'}
            alt={product.title}
            className="w-full aspect-square object-cover rounded-2xl"
          />
        </div>

        <div className="space-y-6">
          <span className="inline-block px-3 py-1 text-sm rounded-full glass capitalize">
            {capitalize(product.category)}
          </span>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">{product.title}</h1>
          {product.rating > 0 && (
            <p className="text-brand-600">★ {product.rating.toFixed(1)} ({product.numReviews} reviews)</p>
          )}
          <p className="text-3xl font-bold text-brand-600">{formatPrice(product.price)}</p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{product.description}</p>
          <p className="text-sm">
            <span className="font-medium">Stock:</span>{' '}
            {product.stock > 0 ? (
              <span className="text-green-600">{product.stock} available</span>
            ) : (
              <span className="text-red-500">Out of stock</span>
            )}
          </p>

          {added && <Alert type="success" message="Added to cart!" />}

          {product.stock > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center glass rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-white/10"
                >
                  −
                </button>
                <span className="px-4 py-3 font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-3 hover:bg-white/10"
                >
                  +
                </button>
              </div>
              <button type="button" onClick={handleAddToCart} className="btn-primary flex-1 sm:flex-none">
                Add to Cart
              </button>
              <Link to="/cart" className="btn-secondary">
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
