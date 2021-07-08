import React, { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';

import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const cartContext = useContext(CartContext);
  
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  
  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };
  
  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };
  
  const orderHandler = () => {
    setIsCheckingOut(true);
  };
  
  const submitOderHandler = (userData) => {
    fetch('https://udemy-ng-http-602ae.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartContext.items
      })
    });
  };
  
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem key={item.id}
                  name={item.name}
                  amount={item.amount}
                  price={item.price}
                  onRemove={cartItemRemoveHandler.bind(null, item.id)}
                  onAdd={cartItemAddHandler.bind(null, item)} />
      ))}
    </ul>
  );
  
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && <Checkout onCancel={props.onClose} onConfirm={submitOderHandler} />}
      {!isCheckingOut && modalActions}
    </Modal>
  );
};

export default Cart;
