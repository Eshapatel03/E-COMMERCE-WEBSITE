import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log('Cart contents:', cart);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart.length) {
    return <div className="cart-empty">Your cart is empty.</div>;
  }

  const handleCheckout = () => {
    if (!isLoggedIn()) {
      navigate('/login');
    } else {
      // Proceed with checkout logic here
      alert('Proceeding to checkout');
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cart.map(item => (
          <div className="cart-card" key={item.id}>
            <img src={item.images[0]} alt={item.title} className="cart-product-image" />
            <div className="cart-product-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.options && (
                <div className="cart-option">
                  <span>Option:</span>
                  <select value={item.selectedOption} disabled>
                    {item.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="cart-quantity">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="cart-price">
              {(item.price * item.quantity).toFixed(2)} $
            </div>
            <button className="cart-remove" onClick={() => removeFromCart(item.id)}>🗑️</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div>
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}$</span>
          </div>
          <div className="cart-checkout">
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
        {/* Payment icons and security info can go here */}
      </div>
    </div>
  );
}

export default Cart;
