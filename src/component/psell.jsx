import React, { useState } from "react";
import axios from "axios";
import './psell.css'; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function Salf() {
  const na = useNavigate();
  const us = useSelector((state) => state.cart.user);

  const currentDate = new Date();
  const currentHours = currentDate.getHours().toString().padStart(2, "0");
  const currentMinutes = currentDate.getMinutes().toString().padStart(2, "0");
  const initialStartTime = `${currentHours}:${currentMinutes}`;

  const [formData, setFormData] = useState({
    name: `${us.uname}`,
    phone: `${us.phone}`,
    uid: `${us.uid}`,
    image: null,
    price: null,
    model: "",
    desc: "",
    type: "",
    duration: null,
    date: "", // Add date field
    startTime: initialStartTime, // Initialize startTime with current time
    endTime: "",
    st: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "date" || name === "startTime") {
      setFormData({ ...formData, [name]: value });
  
      if (name === "startTime") {
        const [hours, minutes] = value.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        const newTotalMinutes = totalMinutes + 30;
        const endHours = Math.floor(newTotalMinutes / 60) % 24;
        const endMinutes = newTotalMinutes % 60;
        const endTimeValue = `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
        const startTotalMinutes = totalMinutes - 30;
        const startHours = Math.floor(startTotalMinutes / 60);
        const startMinutes = startTotalMinutes % 60;
        const startTimeValue = `${startHours.toString().padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`;
  
        setFormData({ ...formData, endTime: endTimeValue, st: startTimeValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleValidation = async () => {
    const { date, st } = formData;
    const rd={
      date:date,
      startTime:st,
    }
    try {
      const response = await axios.post("http://localhost:3000/p/product/cdt",rd);
      if (response.data.exists) {
        toast.error("This date and start time already exist.");
        return false; // Prevent form submission
      }
      return true; // Proceed with form submission
    } catch (error) {
      console.error("Error checking database:", error);
      return false; // Handle errors by preventing submission
    }
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, image, uid, model, price, desc, type, duration, date, endTime, st } = formData;

    // Validate phone number format (10 digits)
    const isPhoneValid = /^\d{10}$/.test(phone);
    const isValid = await handleValidation();

    if (!name || !phone || !uid || !model || !price || !desc || !type || !duration || !date || !endTime || !st) {
      toast.error("Please fill in all fields.");
    } else if (!isPhoneValid) {
      toast.error("Phone number must have exactly 10 digits.");
    } else if(!isValid){
      toast.error("the date or time is already taken");
    }else {
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("phone", phone);
      formDataToSend.append("uid", uid);
      formDataToSend.append("model", model);
      formDataToSend.append("price", price);
      formDataToSend.append("desc", desc);
      formDataToSend.append("type", type);
      formDataToSend.append("duration", duration);
      formDataToSend.append("image", image);
      formDataToSend.append("date", date);
      formDataToSend.append("st", st);
      formDataToSend.append("endTime", endTime);

      try {
        const response = await axios.post("http://localhost:3000/p/product/ap", formDataToSend);
        console.log(response.data);
        toast.success(`Your product ${model} is on sale`);
        na("/ps");
      } catch (error) {
        console.error("Error uploading data:", error);
      }
    }
  };

  return (
    <div className="asd">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Product Details</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
              />
            </div>
            <div className="input-field">
              <input
                type="number"
                name="uid"
                placeholder="User Id"
                value={formData.uid}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="model"
                placeholder="Model Name"
                value={formData.model}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="desc"
                placeholder="Description"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <input
                type="number"
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="input-field">
  <input
    type="date"
    name="date"
    placeholder="Date"
    value={formData.date}
    onChange={handleInputChange}
  />
</div>
<div className="input-field">
              <input
                type="time"
                name="startTime"
                placeholder="Start Time"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </div>
            <label>Start Time</label>
            <div className="input-field">
              <input
                type="time"
                name="st"
                placeholder="End Time"
                value={formData.st}
                onChange={handleInputChange}
                disabled // Disable user input for end time
              />
            </div>
            <label>End Time</label>
            <div className="input-field">
              <input
                type="time"
                name="endTime"
                placeholder="End Time"
                value={formData.endTime}
                onChange={handleInputChange}
                disabled // Disable user input for end time
              />
            </div>
          </div>
          <div className="action">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Salf;
