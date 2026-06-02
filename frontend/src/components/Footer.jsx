import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-auto border-t border-white/10 glass">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-2xl font-bold">
            Boot Handcraft Afghanistan
          </Link>
          <p className="mt-4 text-zinc-500 max-w-md">
            Authentic handcrafted boots and leather goods made by skilled Afghan artisans.
            Every purchase supports traditional craftsmanship and local communities.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-zinc-500">
            <li><Link to="/products" className="hover:text-brand-600 transition-colors">Shop All</Link></li>
            <li><Link to="/products?category=boots" className="hover:text-brand-600 transition-colors">Boots</Link></li>
            <li><Link to="/cart" className="hover:text-brand-600 transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-zinc-500 text-sm">
            <li>Kabul, Afghanistan</li>
            <li>info@boothandcraft.af</li>
            <li>+93 700 000 000</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Boot Handcraft Afghanistan. All rights reserved.</p>
        <p>Crafted with care in Afghanistan 🇦🇫</p>
      </div>
    </div>
  </footer>
);

export default Footer;
