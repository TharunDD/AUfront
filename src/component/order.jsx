import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './order.css';

const Ord = () => {
  const [users, setUsers] = useState([]);
  const us = useSelector((state) => state.cart.user);

  const hao = (product) => {
    const confirmed = window.confirm('Are you sure you want to delete the item from the sales?');

    if (confirmed) {
      // Perform the delete action here, outside of the useEffect
      axios
        .delete(`http://localhost:3000/b/product/de/${product._id}`)
        .then((response) => {
          console.log(response.message);
          // Update the users state to reflect the changes
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== product._id));
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/b/product/bu/${us.uid}`)
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [us.uid]); // Ensure useEffect runs when us.uid changes

  return (
    <div className="cart-container">
      <h2>Products</h2>
      <div className="cart-items">
        {users.map((product) => (
          <div className="cart-item" key={product._id}>
            <div className="cart-product">
              <img src={`http://localhost:3000/${product.image}`} alt="product" />
              <div>
                <h3>{product.model}</h3>
                <p>{product.desc}</p>
              </div>
            </div>
            <div className="cart-product-price">{product.price}</div>
            <div className="cart-product-quantity">
              <button className='btn btn-danger' onClick={() => hao(product)}>Remove</button>
            </div>
            <div className="cart-product-total-price">{product.price}</div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="continue-shopping">
          <Link to="/">
            <span>
              <AiOutlineArrowLeft /> Continue Shopping
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ord;
