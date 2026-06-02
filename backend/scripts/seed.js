import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

const products = [
  {
    title: 'Kabul Heritage Leather Boots',
    description:
      'Hand-stitched premium leather boots inspired by traditional Afghan craftsmanship. Durable sole, comfortable fit.',
    category: 'boots',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
    ],
    price: 189.99,
    stock: 25,
    featured: true,
    rating: 4.8,
    numReviews: 42,
  },
  {
    title: 'Herat Embroidered Sandals',
    description:
      'Lightweight sandals with intricate hand embroidery. Perfect for warm weather and cultural events.',
    category: 'sandals',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    ],
    price: 79.99,
    stock: 40,
    featured: true,
    rating: 4.6,
    numReviews: 28,
  },
  {
    title: 'Paktia Traditional Chapan Boots',
    description:
      'Traditional high-cut boots paired with regional textile accents. A statement piece for festivals.',
    category: 'traditional',
    images: [
      'https://images.unsplash.com/photo-1614252230536-9c3aee4b894b?w=800&q=80',
    ],
    price: 219.99,
    stock: 15,
    featured: true,
    rating: 4.9,
    numReviews: 19,
  },
  {
    title: 'Artisan Leather Belt',
    description:
      'Vegetable-tanned leather belt with brass buckle, crafted by master artisans in Mazar-i-Sharif.',
    category: 'leather-goods',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80',
    ],
    price: 45.99,
    stock: 60,
    featured: false,
    rating: 4.5,
    numReviews: 35,
  },
  {
    title: 'Nomad Travel Boot Bag',
    description:
      'Waxed canvas and leather boot bag for travel. Protects your handcrafted footwear on every journey.',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    ],
    price: 59.99,
    stock: 30,
    featured: false,
    rating: 4.4,
    numReviews: 12,
  },
  {
    title: 'Bamiyan Mountain Trek Boots',
    description:
      'Rugged outdoor boots built for mountain terrain. Reinforced toe and water-resistant leather.',
    category: 'boots',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851136b1d85?w=800&q=80',
    ],
    price: 249.99,
    stock: 18,
    featured: true,
    rating: 4.7,
    numReviews: 31,
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    await User.deleteMany({ email: { $in: ['admin@boothandcraft.af', 'demo@boothandcraft.af'] } });

    await Product.insertMany(products);

    await User.create({
      name: 'Admin User',
      email: 'admin@boothandcraft.af',
      password: 'admin123',
      role: 'admin',
    });

    await User.create({
      name: 'Demo Customer',
      email: 'demo@boothandcraft.af',
      password: 'demo123',
      role: 'user',
    });

    console.log('Database seeded successfully!');
    console.log('Admin: admin@boothandcraft.af / admin123');
    console.log('Demo:  demo@boothandcraft.af / demo123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
