import { useState } from 'react';
import '../styles/navbar.css';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  favoriteCount: number;
  onFavoritesFilterToggle: () => void;
  isFavoritesFilterActive: boolean;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar = ({
  searchQuery,
  onSearchChange,
  favoriteCount,
  onFavoritesFilterToggle,
  isFavoritesFilterActive,
  cartCount,
  onOpenCart,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#" className="navbar__brand">
          <span className="navbar__brand-mark">S</span>
          <span>Strikerz Mobiles</span>
        </a>

        <nav className={`navbar__links ${isOpen ? 'active' : ''}`}>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#brands">Brands</a>
          <a href="#offers">Offers</a>
        </nav>

        <div className="navbar__actions">
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <span>⌕</span>
          </button>
          <button
            className={`icon-btn ${isFavoritesFilterActive ? 'icon-btn--active' : ''}`}
            aria-label="Favorite products filter"
            onClick={onFavoritesFilterToggle}
          >
            <span>♡</span>
          </button>
          <button className="icon-btn" aria-label="Cart" onClick={onOpenCart}>
            <span>🛍</span>
            {cartCount > 0 ? <span className="icon-btn__count">{cartCount}</span> : null}
          </button>
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`navbar__search-panel ${isSearchOpen ? 'active' : ''}`}>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search devices, brands or accessories"
          aria-label="Search products"
        />
      </div>

      <div className="navbar__status">
        {isFavoritesFilterActive ? 'Showing favorite products only' : 'Use the heart to filter favorites'}
        <span className="navbar__count">{favoriteCount}</span>
      </div>
    </header>
  );
};

export default Navbar;
