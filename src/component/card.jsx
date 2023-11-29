import 'bootstrap/dist/css/bootstrap.min.css';
import './card.css';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import{BsInfoCircleFill} from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const colr = {
  borderRadius: '20px',
  marginLeft: '20px',
};

const cardContentStyle = {
  maxHeight: '150px', // Adjust the maximum height as needed
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const ProductCard = () => {

  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/p/product/ga")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleAddTOCart = (user) => {
    console.log("hi");
    dispatch(addToCart(user));
  };
  const shouldDisplayIcon = (user) => {
    const currentTime = new Date().toLocaleTimeString([], { hour12: false });
    const currentDate = new Date().toLocaleDateString();
    const formattedDate = new Date(user.date).toLocaleDateString();
    const startTime = user.startTime;
    const endTime = user.endTime;
    const d= currentTime > startTime && currentTime < endTime && currentDate === formattedDate;
    console.log("s:   ",currentDate,currentTime)
    console.log("s:   ",formattedDate,startTime,endTime);
    console.log(d);
    return d;
  };

  return (
    <div className="row">
      {users.map((user) => (
        <div key={user._id} className="col-md-3">
          <div className="card mb-4 shadow-sm c" style={colr}>
          <div className="card-img-top text-center" id="i" style={{ position: 'relative' }}>
    <img
        src={`https://recommerece.s3.ap-south-1.amazonaws.com/${user.image}`}
        alt="Yphone"
        style={{ width: '200px', height: '200px' }}
    />
    {/* <img
        src={`https://cdn-icons-png.flaticon.com/128/5822/5822037.png`}
        alt="Yphone"
        style={{ width: '50px', height: '38px', position: 'absolute', top: '0', right: '0' }}
    /> */}
   {shouldDisplayIcon(user) ? (
     <img
     src={`https://cdn-icons-png.flaticon.com/128/5822/5822037.png`}
     alt="Yphone"
     style={{ width: '50px', height: '38px', position: 'absolute', top: '0', right: '0' }}
   />
   ):null}
</div>


            <div className="card-body" id="hi">
              <h5 className="card-title" style={cardContentStyle}>
                {user.model}
              </h5>
              <p className="card-text" style={cardContentStyle}>
                Base Price:{user.price}
              </p>
              <p className="card-text" style={cardContentStyle}>
                Date:{new Date(user.date).toLocaleDateString()}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/login" state={{ data: user }}>
                  <button className="btn btn-sm btn-primary"><BsInfoCircleFill></BsInfoCircleFill>&nbsp;Detials</button>
                </Link>
                <button className="btn btn-sm btn-primary" onClick={() => handleAddTOCart(user)}>
                  <RiShoppingCart2Fill/>&nbsp;Add to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
