import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-brand-800/80 to-zinc-900/90 dark:from-brand-950 dark:via-zinc-950 dark:to-zinc-950" />
    <div
      className="absolute inset-0 opacity-30 bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1920&q=80)',
      }}
    />
    <div className="relative page-container py-24 lg:py-32">
      <div className="max-w-3xl animate-slide-up">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full glass text-brand-200">
          Authentic Afghan Craftsmanship
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
          Handcrafted Boots
          <br />
          <span className="text-brand-300">From the Heart of Afghanistan</span>
        </h1>
        <p className="mt-6 text-lg text-zinc-300 max-w-xl">
          Discover premium leather boots, sandals, and traditional footwear made by
          master artisans using centuries-old techniques.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/products" className="btn-primary text-lg px-8 py-4">
            Shop Collection
          </Link>
          <Link to="/products?featured=true" className="btn-secondary text-lg px-8 py-4 text-white border-white/30">
            Featured Items
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
