import '../styles/product-card.css';
import type { ProductItem } from '../data/mockData';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: ProductItem;
  isFavorite: boolean;
  onFavoriteToggle: (productId: number) => void;
  onAddToCart: (product: ProductItem) => void;
}

const ProductCard = ({ product, isFavorite, onFavoriteToggle, onAddToCart }: ProductCardProps) => {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} className="product-card__image" />
        <span className="product-card__badge">{product.badge}</span>
        <button
          className={`product-card__wishlist ${isFavorite ? 'active' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => onFavoriteToggle(product.id)}
        >
          ♡
        </button>
      </div>
      <div className="product-card__info">
        <p className="product-card__brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <div className="product-card__rating">
          {'★'.repeat(product.rating)}
          {'☆'.repeat(5 - product.rating)}
        </div>
        <div className="product-card__price-row">
          <div>
            <p className="product-card__discount">{formatCurrency(product.discountPrice)}</p>
            <p className="product-card__price">{formatCurrency(product.price)}</p>
          </div>
          <button className="product-card__button" onClick={() => onAddToCart(product)}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
