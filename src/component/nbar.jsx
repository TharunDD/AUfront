import React, { useState } from 'react';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import {BsInfoCircleFill} from 'react-icons/bs'
import { BiSolidLogIn, BiSolidLogOut } from 'react-icons/bi';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/cartSlice';
import {clearFromcart} from '../redux/cartSlice';
import { MdSell } from 'react-icons/md';
import { toast } from 'react-toastify';
function Nabar() {
  const islog = useSelector((state) => state.cart.isAuthenticated);
  const us = useSelector((state) => state.cart.user);
  const dispatch = useDispatch();

  const ha = () => {
    dispatch(clearFromcart());
    dispatch(logout());
  }
  const h = () => {
    if(islog){
    }
    else{
      toast.error("Login to Sell products");
    }
  }

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/" style={{ marginLeft: '30px' }}>
        Recommerece
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse justify-content-end ${
          isNavCollapsed ? 'collapse' : ''
        }`}
        style={{ marginRight: '30px', backgroundColor: 'none' }}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/log">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/con">
              Contact
            </a>
          </li>
          <li className="nav-item">
            {/* Dropdown for Buy/Sell */}
            <Dropdown>
              <Dropdown.Toggle variant="light" id="buy-sell-dropdown" onMouseEnter={()=>{h()}}>
                 Sell
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {islog ? (<div>
                <Dropdown.Item href="/oo">Sell</Dropdown.Item>
                <Dropdown.Item href="/">Buy</Dropdown.Item>
                </div>):
                (<div>
                   <Dropdown.Item href="/log">Login</Dropdown.Item>
                </div>)}
                
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/o">
              <RiShoppingCart2Fill />
            </a>
          </li>
          {islog ? (
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="user-dropdown">
                  <AiOutlineUser></AiOutlineUser>&nbsp;{us.uname}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => { ha() }}>
                    <BiSolidLogOut /> &nbsp;Logout
                  </Dropdown.Item>
                  <Dropdown.Item  onClick={()=>toast.success(`Name:${us.uname} email:${us.umail} Phone:${us.phone} Uid:${us.uid}`)}><BsInfoCircleFill></BsInfoCircleFill>&nbsp;Details</Dropdown.Item>
                  <Dropdown.Item href="/ps" > <MdSell></MdSell> &nbsp;To Sell</Dropdown.Item>
                  <Dropdown.Item href="/order" > <MdSell></MdSell> &nbsp;Your order</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

export default Nabar;
