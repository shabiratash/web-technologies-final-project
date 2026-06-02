const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pagesToShow = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= page - 1 && i <= page + 1)) {
      pagesToShow.push(i);
    } else if (pagesToShow[pagesToShow.length - 1] !== '...') {
      pagesToShow.push('...');
    }
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
      >
        Previous
      </button>
      {pagesToShow.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-zinc-500">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
              p === page
                ? 'bg-brand-600 text-white shadow-lg'
                : 'glass hover:bg-white/20'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
