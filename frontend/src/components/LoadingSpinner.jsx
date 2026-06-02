const sizes = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
};

const LoadingSpinner = ({ size = 'md', className = '' }) => (
  <div
    className={`${sizes[size]} border-brand-200 border-t-brand-600 rounded-full animate-spin ${className}`}
    role="status"
    aria-label="Loading"
  />
);

export default LoadingSpinner;
