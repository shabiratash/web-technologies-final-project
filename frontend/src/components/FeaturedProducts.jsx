import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts({ featured: true, limit: 4 });

  return (
    <section className="page-container py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold">Featured Collection</h2>
          <p className="mt-2 text-zinc-500">Handpicked favorites from our artisans</p>
        </div>
        <Link to="/products" className="btn-secondary hidden sm:inline-flex">
          View All
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 py-8">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center sm:hidden">
        <Link to="/products" className="btn-primary">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
