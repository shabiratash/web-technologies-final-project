import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { CATEGORIES } from '../constants/categories';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const filters = {
    page: parseInt(searchParams.get('page')) || 1,
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    featured: searchParams.get('featured') === 'true',
  };

  const { products, loading, error, pagination } = useProducts(filters);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    if (!updates.page) params.delete('page');
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateParams({ search, page: '' });
  };

  return (
    <div className="page-container py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display text-3xl lg:text-4xl font-bold">Shop Collection</h1>
        <p className="mt-2 text-zinc-500">
          {pagination.total} handcrafted products available
        </p>
      </div>

      <div className="glass-card mb-8 animate-slide-up">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field flex-1"
          />
          <select
            value={filters.category}
            onChange={(e) => updateParams({ category: e.target.value, page: '' })}
            className="input-field lg:w-48"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min $"
            value={filters.minPrice}
            onChange={(e) => updateParams({ minPrice: e.target.value, page: '' })}
            className="input-field lg:w-28"
            min="0"
          />
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxPrice}
            onChange={(e) => updateParams({ maxPrice: e.target.value, page: '' })}
            className="input-field lg:w-28"
            min="0"
          />
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              updateParams({ sortBy, sortOrder, page: '' });
            }}
            className="input-field lg:w-44"
          >
            <option value="createdAt-desc">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Name: A-Z</option>
          </select>
          <button type="submit" className="btn-primary lg:w-auto">
            Search
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {error && <p className="text-center text-red-500 py-8">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-zinc-500 py-16">No products found. Try adjusting your filters.</p>
      )}

      {!loading && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Pagination
            page={pagination.page}
            pages={pagination.pages}
            onPageChange={(p) => updateParams({ page: p })}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
