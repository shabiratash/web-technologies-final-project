import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useDebounce } from './useDebounce';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const debouncedSearch = useDebounce(filters.search || '', 400);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (filters.page) params.set('page', filters.page);
        if (filters.limit) params.set('limit', filters.limit);
        if (filters.category) params.set('category', filters.category);
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (filters.minPrice) params.set('minPrice', filters.minPrice);
        if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
        if (filters.sortBy) params.set('sortBy', filters.sortBy);
        if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);
        if (filters.featured) params.set('featured', 'true');

        const { data } = await api.get(`/products?${params}`);
        setProducts(data.products);
        setPagination({
          page: data.page,
          pages: data.pages,
          total: data.total,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    filters.page,
    filters.limit,
    filters.category,
    debouncedSearch,
    filters.minPrice,
    filters.maxPrice,
    filters.sortBy,
    filters.sortOrder,
    filters.featured,
  ]);

  return { products, loading, error, pagination };
};
