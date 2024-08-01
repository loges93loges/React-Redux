import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, fetchProducts } from '../store/cartSlice';
import './Cart.css'; // Import the CSS file

const Cart = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
  const totalAmount = products.reduce((total, product) => total + (product.price * product.quantity), 0);

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {products.map(product => (
        <div key={product.id} className="cart-item">
          <h2>{product.title}</h2> 
      
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={product.title} className="product-image" />
            ))}
         <div className='cont'><br/>
          <p><strong>Price:</strong> ${product.price}</p>
          <p className='discount'>{product.discountPercentage}%</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Rating:</strong> {product.rating}</p>
            <p><strong>Quantity:</strong>
               <button onClick={() => dispatch(decreaseQuantity(product.id))}> - </button>
                {product.quantity}
                <button onClick={() => dispatch(increaseQuantity(product.id))}> + </button>
              </p> 
               <p><strong>Total:</strong> ${(product.price * product.quantity).toFixed(2)}</p>
        </div></div>
      ))}
      <div className="cart-summary">
        <h2>Total Quantity: {totalQuantity}</h2>
        <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
