import React, { useState } from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";
import axios from "axios"
import {GiExitDoor} from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FiUsers } from 'react-icons/fi';
import './bid.css';
import { toast } from 'react-toastify';
import {useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const socket = io.connect("http://localhost:3000");

function Bi() {
  const u = useSelector((state) => state.cart.user);
  const location = useLocation();
  const navi=useNavigate();
  const { data } = location.state || {};
  const {dta}={...data}
  const [timer, setTimer] = useState();
  const [wname, swname] = useState();
  const [bs,sbs]=useState(true);
  const [bidElements, setBidElements] = useState([]); // Initialize with an empty array
  const [isBidStarted, setIsBidStarted] = useState(false);
  const[isdb,sisdb]=useState(false);
 const[amt,samt]=useState(0);
 const [base,sbase]=useState(data.price || 0);
const inc=()=>{
  var e=0;
  if(base<1000){
         e=100;
  }else if(base>1000 && base<5000){e=200}
  else if(base>=5000 && base<10000){e=400}
  else {
    e=500;
  }
  console.log(e);
  socket.emit("binow",data.model,e,u);
  socket.emit('resetTimer');
  socket.emit('startBid');
}
const startBid = () => {
  console.log(data);
  sisdb(true);
  sbs(false);
  socket.emit("userjoin",data,u);
  socket.emit('startBid');
};
const handleopenpay=(da)=>{
  const options={
    "key": 'rzp_test_k4Tt6sd8KGwe0q', // Enter the Key ID generated from the Dashboard
    "amount": 500*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Tharun",
    "description": "Test Transaction",
    "order_id": da.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
      console.log(response);
      axios.post(`http://localhost:3000/verify`,{response:response}).then((res)=>{
        toast.success("order completed");
         axios
      .post(`http://localhost:3000/b/product/cart/${u.uid}`, data) // Sending the array directly
      .then((response) => {
        console.log(response.data.message);
        toast.success("WOn the auction");
        navi("/ps");
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

const resetTimer = () => {
  socket.emit('resetTimer');
  setIsBidStarted(false);
};
const exit=()=>{
  console.log("Trying to exit");
  socket.emit("exit",data.model);
  navi("/")
}
const yu=()=>{
  toast.success(`This is a brief description of the auction rules.
  1. Auction starts only if the participant count is greater than 10.
  2. Every time the bid amount increases statically from the base amount.
  If the amount is less than 700, the amount increases by Rs 70.
  If the amount is less than 2000, the amount increases by 150.
  If a bidder bids the amount, and if no one bids for the next 30 seconds, they declare to be the winner`);
  
}
  useEffect(() => {
    socket.on("uj",(a)=>{
      toast.success(`${a} has joined the room`);
      
    }),
    socket.on("re", (newBidAmount,win) => {
      // Update the bid amount in the user interface
      console.log("Received updated bid amount:", newBidAmount);
      const newBidElement = <div>The bidded value is {newBidAmount},by {win}</div>;
      setBidElements((prevBidElements) => [...prevBidElements, newBidElement]);
      swname(win);
      samt(newBidAmount);
    });
    
  socket.on("left",(a)=>{
    console.log("trying to leave");
    toast.success(`${a} has left the auction`, {
      position: toast.POSITION.TOP_CENTER, // Display at the center
      autoClose: 1000, // Close after 0.5 seconds (500 milliseconds)
    });
 
  }),
  socket.on('bidStarted', () => {
    setIsBidStarted(true);
  });
  socket.on('timerUpdate', (newTimerValue) => {
    console.log("recived timer :",newTimerValue);
    setTimer(newTimerValue);
  });
  socket.on('Winner', (id,am,wn) => {
    console.log("recived Winner :",id);
    navi('/');
    if(u.uid==id){
      toast.success("Congrats you are the winner");
      const _data={
        amount:am,
      }
      axios.post(`http://localhost:3000/orders`,_data).then((res)=>{
        if(res){
          console.log(res.data,'29');
          handleopenpay(res.data.data);
        }
      }).catch(err=>{
        console.log(err);
      })
    }
    else{
      toast.success(`Better luck next time, the winnner is ${wn}`);
    }
  });
   socket.on("error", (error) => {
  console.error("Socket.io error:", error);
});
  }, [socket]);
  return (
    <div className="main">
      <div className="b1">
      <div className="product-image">
    <img src={`https://recommerece.s3.ap-south-1.amazonaws.com/${data.image}`} alt="Product Image" id='d' />
  </div>
  <div className="product-details">
    <h2>Product Name</h2>
    <p>
      Start Price: {data.price}
    </p>
    <p>
      Seller: {data.name}
    </p>

  </div>
      </div>
      <div className="b11" id='tb'>
      {bidElements}
      </div>
      <div className="b12">
        <div className="top-row">
          <button className="participant-ico" onClick={exit}><GiExitDoor></GiExitDoor></button>
          <button className="participant-icon"><FiUsers></FiUsers></button>
          <div className="countdown-clock">Time left:00:{timer}</div>
        </div>
        <div className="column-container">
          <div className="bid-amount">
            <label>Current Highest Amount:</label>
            <span>{amt}</span>
          </div>
          <div className="bidder-name">
            <label>Bidder Name:</label>
            <span>{wname}</span>
          </div>
          <div className="auction-rules">
          <button className="btn btn-danger" onClick={yu}>Auction rules</button>
          </div>
          {isBidStarted ? (
        <button onClick={startBid} disabled={isdb} className="btn btn-primary">Join Auction</button>
      ) : (
        <button onClick={startBid} className="btn btn-primary">Join Auction</button>
      )}
      <button onClick={inc}  disabled={bs} className="btn btn-primary" id="i">BID</button>
        </div>
      </div>
    </div>
  );
}

export default Bi;
