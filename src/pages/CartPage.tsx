import '../styles/cart.css';
import { formatCurrency } from '../utils/currency';
import type { ProductItem } from '../data/mockData';

interface CartPageProps {
  cartItems: (ProductItem & { quantity: number })[];
  onBackToHome: () => void;
  onRemoveFromCart: (productId: number) => void;
  onIncreaseQuantity: (productId: number) => void;
  onDecreaseQuantity: (productId: number) => void;
}

const CartPage = ({
  cartItems,
  onBackToHome,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartPageProps) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);
  const shipping = subtotal > 0 ? 199 : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <button className="cart-page__back" onClick={onBackToHome}>
          ← Back to store
        </button>
        <h1>Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-page__empty">
          <h2>Your cart feels light</h2>
          <p>Add a few premium picks and they’ll appear here.</p>
          <button className="btn btn--primary" onClick={onBackToHome}>
            Continue shopping
          </button>
        </div>
      ) : (
        <div className="cart-page__content">
          <div className="cart-page__items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item__details">
                  <h3>{item.name}</h3>
                  <p>{item.brand}</p>
                  <div className="cart-item__price">{formatCurrency(item.discountPrice)}</div>
                </div>
                <div className="cart-item__controls">
                  <div className="cart-item__qty">
                    <button onClick={() => onDecreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
                  </div>
                  <button className="cart-item__remove" onClick={() => onRemoveFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <strong>{formatCurrency(shipping)}</strong>
            </div>
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <button className="btn btn--primary btn--full">Checkout</button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
