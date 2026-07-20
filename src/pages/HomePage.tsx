import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import ProductSlider from '../components/ProductSlider';
import BrandSection from '../components/BrandSection';
import OfferBanner from '../components/OfferBanner';
import Footer from '../components/Footer';
import { categories, products, type ProductItem } from '../data/mockData';
import '../styles/homepage.css';

interface HomePageProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesFilter: () => void;
  favoriteProductIds: number[];
  onFavoriteToggle: (productId: number) => void;
  onOpenCart: () => void;
  cartCount: number;
  onAddToCart: (product: ProductItem) => void;
}

const HomePage = ({
  searchQuery,
  onSearchChange,
  showFavoritesOnly,
  onToggleFavoritesFilter,
  favoriteProductIds,
  onFavoriteToggle,
  onOpenCart,
  cartCount,
  onAddToCart,
}: HomePageProps) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCategories = categories.filter((category) => {
    const haystack = `${category.title} ${category.description}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const filteredProducts = products.filter((product) => {
    const haystack = `${product.name} ${product.brand} ${product.badge}`.toLowerCase();
    const matchesSearch = haystack.includes(normalizedQuery);
    const matchesFavorite = !showFavoritesOnly || favoriteProductIds.includes(product.id);
    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="homepage-shell">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        favoriteCount={favoriteProductIds.length}
        onFavoritesFilterToggle={onToggleFavoritesFilter}
        isFavoritesFilterActive={showFavoritesOnly}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
      />
      <main>
        <HeroSection />
        <CategorySection categories={filteredCategories} />
        <ProductSlider
          title="Trending Products"
          products={filteredProducts.slice(0, 4)}
          favoriteProductIds={favoriteProductIds}
          onFavoriteToggle={onFavoriteToggle}
          onAddToCart={onAddToCart}
        />
        <OfferBanner />
        <ProductSlider
          title="Best Sellers"
          products={filteredProducts.slice(2, 6)}
          favoriteProductIds={favoriteProductIds}
          onFavoriteToggle={onFavoriteToggle}
          onAddToCart={onAddToCart}
        />
        <BrandSection />
        <ProductSlider
          title="New Arrivals"
          products={filteredProducts.slice(1, 5)}
          favoriteProductIds={favoriteProductIds}
          onFavoriteToggle={onFavoriteToggle}
          onAddToCart={onAddToCart}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
