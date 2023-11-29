import React, { useState } from "react";
import axios from "axios";
import './Login.css'; 
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
// ... (previous imports and component setup)

function Sigg() {
  const [formData, setFormData] = useState({
    name: "",
    umail: "",
    password: "",
    phone: "",
    address: "",
  });
  var a;
 const [sent,setsent]=useState(false);
  const [otpData, setOtpData] = useState({
    otp: 0,
    verified: false,
  });
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [otpp, setOtp] = useState(0); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOTPChange = (e) => {
    const { name, value } = e.target;
    setOtpData({ ...otpData, [name]: value });
  }; 

        const handleSubmit = async (e) => {
          console.log(sent);
          e.preventDefault();  
          const { name, umail, password, phone, address,o } = formData;
          const isEmailValid =/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(umail);
          const isPhoneValid = /^\d{10}$/.test(phone);
          if(!sent)
        {
          const sendOTP = async () => {
            try {
              console.log(umail);
              const response = await axios.post(`http://localhost:3000/u/${umail}`);
              if(response.status==200){
                setsent(true);
                console.log("hifroom seto");
                console.log(response.data.da);
                setOtp(response.data.da)
                toast.success("SUccess otp");
              } // Set OTP message
            } catch (error) {
              console.error(error);
            }
          };
          sendOTP();
        }
        if(sent){
        const verify=()=>{
            console.log(otpData.otp)
            console.log(otpp);
            if(otpData.otp==otpp){
              setOtpData({...otpData,verified:true});
            }
            else{
              toast.error("wrong password");
            }
        }
        verify();
      }
          if (!name || !umail || !password || !phone || !address) {
            toast.error("Please fill in all fields.");}
          else if (!isEmailValid) {
            toast.error("Please enter a valid email address.");
          } 
          else if (!isPhoneValid) {
            toast.error("Phone number must have exactly 10 digits.");
          } else if(!sent){
            toast.error("Please enter a vaild email");
          }else if(!otpData.verified){
                  toast.error("Enter the correct otp");
          }
          else {
              const requestData = {
                uname: name,
                umail: umail,
                upassword: password,
                uadd: address,
                phone: phone,
              };
        
              try {
                const response = await axios.post("http://localhost:3000/u/user/insertion", requestData);
                if (response.data.user) {
                  dispatch(login(response.data.user))
                  navigate("/");
                  toast.success("Welcome " + response.data.user.uname + "✌️✌️");
                } else {
                  toast.error("Fill all the fields")
                }
              } catch (error) {
                console.error("Error uploading data:", error);
              }
          }
          
        };
        return (
          <div className="asd">
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="content">
                  <div className="input-field">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      name="password"
                      placeholder="Enter your Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="input-field">
                    <div className="email-input">
                      <input
                        type="text"
                        name="umail"
                        placeholder="Your Mail Id"
                        value={formData.umail}
                        onChange={handleInputChange}
                      />
                      {!sent ? (
                        <>
                          <button className="btn btn-danger" onClick={handleSubmit}>Send OTP</button>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            value={otpData.otp}
                            onChange={handleOTPChange}
                          />
                          <button className="btn btn-primary" onClick={handleSubmit}>Verify</button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="action">
                  <Link to="/log">
                    <button>Login</button>
                  </Link>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
  );
}

export default Sigg;
