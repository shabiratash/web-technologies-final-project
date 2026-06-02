export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ') : '';
