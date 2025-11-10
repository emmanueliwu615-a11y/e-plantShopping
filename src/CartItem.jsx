import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../path/to/CartSlice';

const dispatch = useDispatch();

const handleRemove = (name) => {
  dispatch(removeItem(name));
};

const handleQuantityChange = (name, newQuantity) => {
  dispatch(updateQuantity({ name, quantity: newQuantity }));
};
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
  const calculateTotalAmount = (cartItems) => {
  let total = 0;
  cartItems.forEach(item => {
    // Extract the numeric value from the cost string (e.g., "$10.00")
    const price = parseFloat(item.cost.substring(1));
    total += price * item.quantity;
  });
  return total.toFixed(2); // Return total as a string with 2 decimals

};
};
  const handleContinueShopping = (e) => {
  e.preventDefault();
  onContinueShopping(e);

};
  



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      } else {
        // If quantity would drop to 0, remove the item from the cart
        dispatch(removeItem(item.name));
      }
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.substring(1)); // Extract numeric value from cost string like "$10.00"
    return numericCost * item.quantity; // Multiply by quantity to get total cost
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


