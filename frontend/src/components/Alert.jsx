const variants = {
  error: 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400',
  success: 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400',
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400',
};

const Alert = ({ type = 'error', message, onClose }) => {
  if (!message) return null;
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 rounded-xl border animate-fade-in ${variants[type]}`}
      role="alert"
    >
      <p className="text-sm font-medium">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 opacity-70 hover:opacity-100"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
