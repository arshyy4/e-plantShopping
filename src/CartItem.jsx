import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // 🧮 Calculate subtotal for a single item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)); // Remove "$" and convert to float
    return (unitPrice * item.quantity).toFixed(2);
  };

  // 💰 Calculate total amount of cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const price = parseFloat(item.cost.substring(1));
      total += price * item.quantity;
    });
    return total.toFixed(2);
  };

  // ➕ Increase quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ➖ Decrease quantity or remove if 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // ❌ Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // 🔙 Go back to plant listing
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // Call parent handler
  };

  // 🧾 Placeholder for checkout
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ color: 'gray', fontSize: '18px' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>

                {/* Quantity Control */}
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>

                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping} disabled={cart.length === 0}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
