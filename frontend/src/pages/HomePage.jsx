import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';

const HomePage = () => (
  <>
    <Hero />
    <section className="page-container py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '🎨', title: 'Handcrafted', desc: 'Each piece made by skilled Afghan artisans' },
          { icon: '🌿', title: 'Premium Leather', desc: 'Vegetable-tanned, sustainably sourced materials' },
          { icon: '🇦🇫', title: 'Support Local', desc: 'Every purchase empowers local communities' },
        ].map((item) => (
          <div key={item.title} className="glass-card text-center animate-scale-in">
            <span className="text-4xl">{item.icon}</span>
            <h3 className="font-display text-xl font-semibold mt-4">{item.title}</h3>
            <p className="mt-2 text-zinc-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
    <FeaturedProducts />
    <Testimonials />
  </>
);

export default HomePage;
