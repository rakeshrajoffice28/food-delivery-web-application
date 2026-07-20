import { useState } from 'react';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import type { ProductItem } from './data/mockData';

type CartItem = ProductItem & { quantity: number };

function App() {
  const [activeView, setActiveView] = useState<'home' | 'cart'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavoriteProductIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const addToCart = (product: ProductItem) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);

      if (existingItem) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems((current) =>
      current.flatMap((item) => {
        if (item.id !== productId) {
          return [item];
        }

        if (item.quantity === 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (activeView === 'cart') {
    return (
      <CartPage
        cartItems={cartItems}
        onBackToHome={() => setActiveView('home')}
        onRemoveFromCart={removeFromCart}
        onIncreaseQuantity={increaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
      />
    );
  }

  return (
    <HomePage
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      showFavoritesOnly={showFavoritesOnly}
      onToggleFavoritesFilter={() => setShowFavoritesOnly((current) => !current)}
      favoriteProductIds={favoriteProductIds}
      onFavoriteToggle={toggleFavorite}
      onOpenCart={() => setActiveView('cart')}
      cartCount={cartCount}
      onAddToCart={addToCart}
    />
  );
}

export default App;
