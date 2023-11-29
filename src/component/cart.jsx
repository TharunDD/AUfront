import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./cart.css";
import { removeFromcart ,clearFromcart,decreaseCart,inCart, gettotal} from '../redux/cartSlice';
const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const u = useSelector((state) => state.cart.user);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(gettotal());

  },[cart])
  // Use the useSelector hook to access the cart data from the Redux store
  const handleopenpay=(data)=>{
    const options={
      "key": 'rzp_test_k4Tt6sd8KGwe0q', // Enter the Key ID generated from the Dashboard
      "amount": Number(data.amount)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Tharun",
      "description": "Test Transaction",
      "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
        console.log(response);
        axios.post(`http://localhost:3000/verify`,{response:response}).then((res)=>{
          toast.success("order completed");
           axios
        .post(`http://localhost:3000/b/product/cart/${u.uid}`, cart.Cartitems) // Sending the array directly
        .then((response) => {
          console.log(response.data.message);
          toast.success("Your Order Confirmed");
          navi('/ps');
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
        }).catch(err=>{
          console.log(err);
        })
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
      },
    }
    
  var rzp = new window.Razorpay(options);
  rzp.open();
   }
  const handleBuyClick = (us) => {
    const _data={
      amount:cart.CartTotalA,
    }
    axios.post(`http://localhost:3000/orders`,_data).then((res)=>{
      if(res){
        console.log(res.data,'29');
        handleopenpay(res.data.data);
      }
    }).catch(err=>{
      console.log(err);
    })}

  const handleRemovefromcart=(cartItem)=>{
      console.log("hi");
      dispatch(removeFromcart(cartItem)); 
  }
  const handleclaer=()=>{
    dispatch(clearFromcart());
  }
  const haop=(ci)=>{
    dispatch(decreaseCart(ci));
  }
  const hj=(o)=>{
    dispatch(inCart(o))
  }
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.Cartitems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <div className="start-shopping">
            <Link to="/">
              <span>
                <AiOutlineArrowLeft /> Start Shopping
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="Price">Price</h3>
            <h3 className="Quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.Cartitems && cart.Cartitems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={`http://localhost:3000/${cartItem.image}`} alt="cart-item" />
                  <div>
                    <h3>{cartItem.model}</h3>
                    <p>{cartItem.desc}</p>
                    <button className="btn btn-success" onClick={()=>handleRemovefromcart(cartItem)}>Remove</button>
                  </div>
                </div>
                <div className="cart-product-price">Rs.{cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={()=>haop(cartItem)}>-</button>
                  <div className="count">{cartItem.cartQuantiy}</div>
                  <button onClick={()=>hj(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  RS.{cartItem.price * cartItem.cartQuantiy}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={()=>handleclaer()}>Clear cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="Amount">{cart.CartTotalA}</span>
              </div>
              <p>Free shipping available</p>
              <button className='btn btn-success' onClick={handleBuyClick}>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <span>
                    <AiOutlineArrowLeft /> Continue Shopping
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
