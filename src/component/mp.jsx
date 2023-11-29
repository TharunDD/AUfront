import React, { useEffect } from 'react'; // Import useEffect from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './mp.css';
import axios from "axios";
import { AiFillStar } from 'react-icons/ai';
import { BsStar } from 'react-icons/bs';
import { Link, useLocation ,useNavigate} from 'react-router-dom'; // Correct the import statement
import { useSelector } from 'react-redux'; // Correct the import statement
import { toast } from 'react-toastify';
const Spa = () => {
  const u = useSelector((state) => state.cart.user);
  const a=1;
  const location = useLocation();
  const { data } = location.state || {};
  const formattedDate = new Date(data.date).toLocaleDateString();
  const isParticipationEnabled = () => {
   
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString([], { hour12: false });
    console.log("mp  :",currentDate,currentTime);
    console.log("mp  :",formattedDate,data.startTime,data.endTime);
    if (
      currentDate === formattedDate &&
      currentTime >= data.startTime &&
      currentTime <= data.endTime
    ) {
      return true; // Enable the button
    }
    return false; // Disable the button
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12" id="main">
          <div className="col-md-4" id="ff1">
            <img
              src={`https://recommerece.s3.ap-south-1.amazonaws.com/${data.image}`}
              alt="Yphone"
              id='ff2'
            />
          </div>
          <div className="col-md-5" id='ff'>
            <div id="fff1">
              <h4 style={{ fontFamily: 'Caladea', fontSize: "40px" }}>{data.model}</h4>
              <h6 style={{ fontFamily: 'Barlow', fontSize: "17px" }}>{data.desc}</h6>
              <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><BsStar style={{ fontSize: '16px' }}></BsStar>
              <h4 style={{ fontFamily: 'Caladea', fontSize: "30px" }}>About product:</h4>
              <h6 style={{ fontFamily: 'Caladea', fontSize: "19px" }}>
                &nbsp;&nbsp;StartTime: {data.startTime} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Owner: {data.name}
              </h6>
              <h6 style={{ fontFamily: 'Caladea', fontSize: "19px" }}>
                &nbsp;
                End Time:{data.endTime} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact: {data.phone} <br /><br />
                {/* &nbsp;StartTime: {data.startTime} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Time:{data.endTime} <br /><br /> */}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Auction date: {formattedDate}
              </h6>
              <br />
              <p style={{ fontFamily: 'Caladea', fontSize: "30px" }}>Price: {data.price}$</p>
              <div id='ui'>
              {isParticipationEnabled() ? (
          <Link to='/bid' state={{ data }}>
            <button className="btn btn-primary">Participate</button>
          </Link>
        ) : (
          <h5 style={{color:'red'}}>The auction is not started</h5>
        )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spa;
