const testimonials = [
  {
    name: 'Ahmad Rahimi',
    location: 'Kabul',
    text: 'The quality of these boots is exceptional. You can feel the craftsmanship in every stitch. Proud to support Afghan artisans.',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    location: 'London, UK',
    text: 'I ordered the Heritage Leather Boots and they exceeded my expectations. Beautiful design and incredibly comfortable.',
    rating: 5,
  },
  {
    name: 'Fatima Nazari',
    location: 'Herat',
    text: 'Finally a brand that celebrates our traditional footwear with modern quality. The embroidered sandals are stunning!',
    rating: 5,
  },
];

const Testimonials = () => (
  <section className="page-container py-16">
    <div className="text-center mb-12 animate-fade-in">
      <h2 className="font-display text-3xl lg:text-4xl font-bold">What Our Customers Say</h2>
      <p className="mt-2 text-zinc-500">Trusted by customers across Afghanistan and worldwide</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <blockquote
          key={t.name}
          className="glass-card animate-slide-up"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex gap-1 text-brand-500 mb-4">
            {Array.from({ length: t.rating }).map((_, j) => (
              <span key={j}>★</span>
            ))}
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 italic">&ldquo;{t.text}&rdquo;</p>
          <footer className="mt-6">
            <cite className="not-italic font-semibold">{t.name}</cite>
            <p className="text-sm text-zinc-500">{t.location}</p>
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);

export default Testimonials;
