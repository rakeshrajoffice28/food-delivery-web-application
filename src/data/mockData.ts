export interface CategoryItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface ProductItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  rating: number;
  image: string;
  badge: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'Crafted for the bold.',
    subtitle: 'Discover flagship devices wrapped in timeless design.',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=80',
    cta: 'Shop Now',
  },
  {
    id: 2,
    title: 'Sound and style, redefined.',
    subtitle: 'Immersive audio meets refined technology for everyday luxury.',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=80',
    cta: 'Explore Deals',
  },
  {
    id: 3,
    title: 'The future in your hands.',
    subtitle: 'Premium electronics with effortless performance and elegance.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80',
    cta: 'View Collection',
  },
];

export const categories: CategoryItem[] = [
  {
    id: 1,
    title: 'Smartphones',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    description: 'Flagship power in stunning form.',
  },
  {
    id: 2,
    title: 'Laptops',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    description: 'Performance for every ambition.',
  },
  {
    id: 3,
    title: 'Tablets',
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=80',
    description: 'Entertainment and creativity in motion.',
  },
  {
    id: 4,
    title: 'Smart Watches',
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
    description: 'Elegance with intelligent wellness.',
  },
  {
    id: 5,
    title: 'Earbuds',
    image:
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80',
    description: 'Immersive sound with unmatched clarity.',
  },
  {
    id: 6,
    title: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    description: 'Elevate every experience with precision.',
  },
];

export const products: ProductItem[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 143000,
    discountPrice: 139000,
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    badge: 'Trending',
  },
  {
    id: 2,
    name: 'Galaxy Z Fold6',
    brand: 'Samsung',
    price: 149000,
    discountPrice: 140000,
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
  },
  {
    id: 3,
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 92000,
    discountPrice: 89999,
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 87000,
    discountPrice: 82999,
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    badge: 'Limited',
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 39000,
    discountPrice: 31999,
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    badge: 'Hot Deal',
  },
  {
    id: 6,
    name: 'Asus Zenbook 14',
    brand: 'Asus',
    price: 120000,
    discountPrice: 114999,
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    badge: 'Editor Pick',
  },
];

export const brands = ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Sony', 'Asus'];
