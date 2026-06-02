import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'text-brand-600 bg-brand-600/10'
        : 'hover:text-brand-600 hover:bg-white/10'
    }`;

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🥾</span>
            <span className="font-display text-xl lg:text-2xl font-bold group-hover:text-brand-600 transition-colors">
              Boot Handcraft
              <span className="block text-xs font-sans font-normal text-zinc-500 -mt-1">
                Afghanistan
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Shop
            </NavLink>
            {user && (
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl glass hover:bg-white/20 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <Link
              to="/cart"
              className="relative p-2 rounded-xl glass hover:bg-white/20 transition-colors"
              aria-label="Shopping cart"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-brand-600 text-white rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-zinc-500 max-w-[120px] truncate">
                  {user.name}
                </span>
                <button type="button" onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Register
                </Link>
              </div>
            )}

            <button
              type="button"
              className="md:hidden p-2 rounded-xl glass"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col gap-2">
              <NavLink to="/" className={navLinkClass} onClick={() => setMobileOpen(false)} end>
                Home
              </NavLink>
              <NavLink to="/products" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Shop
              </NavLink>
              {user && (
                <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                  Dashboard
                </NavLink>
              )}
              {isAdmin && (
                <NavLink to="/admin" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                  Admin
                </NavLink>
              )}
              {!user && (
                <>
                  <Link to="/login" className="btn-secondary text-center" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-center" onClick={() => setMobileOpen(false)}>
                    Register
                  </Link>
                </>
              )}
              {user && (
                <button type="button" onClick={handleLogout} className="btn-secondary w-full">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
