import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-brand-600 text-white' : 'hover:bg-white/10'
    }`;

  return (
    <div className="page-container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0">
          <nav className="glass-card space-y-1 sticky top-24">
            <p className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase">Admin Panel</p>
            <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
            <NavLink to="/admin/products" className={linkClass}>Products</NavLink>
            <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
            <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
          </nav>
        </aside>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
