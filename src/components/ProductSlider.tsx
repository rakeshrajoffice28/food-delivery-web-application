import ProductCard from './ProductCard';
import '../styles/product-slider.css';
import type { ProductItem } from '../data/mockData';

interface ProductSliderProps {
  title: string;
  products: ProductItem[];
  favoriteProductIds: number[];
  onFavoriteToggle: (productId: number) => void;
  onAddToCart: (product: ProductItem) => void;
}

const ProductSlider = ({
  title,
  products,
  favoriteProductIds,
  onFavoriteToggle,
  onAddToCart,
}: ProductSliderProps) => {
  return (
    <section id="products" className="product-slider-section">
      <div className="section-block__header">
        <div>
          <p className="section-block__eyebrow">Handpicked favorites</p>
          <h2>{title}</h2>
        </div>
        <a href="#" className="section-link">
          View more
        </a>
      </div>
      {products.length === 0 ? (
        <div className="product-slider__empty">No matching products right now.</div>
      ) : (
        <div className="product-slider">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favoriteProductIds.includes(product.id)}
              onFavoriteToggle={onFavoriteToggle}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSlider;
