import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './carsol.css'; // Correct the import statement for your CSS file

const carouselStyle = {
  marginRight: '15px',
  borderRadius: '15px',
  marginLeft: '15px',
};

const im = {
  maxWidth: '100%',
  maxHeight: '80vh',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopRightRadius: '20px',
  borderTopLeftRadius: '20px',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
};

const Carsl = () => {
  return (
    <div className="carousel-container" style={carouselStyle}>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3" // Add a new button for the 4th slide
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="d-block w-100"
              alt="..."
              style={im}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Online Auction </h5>
              <p>The auction is the best way to buy rare items</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1384861062/photo/woman-taking-photo-of-spring-fashion-accessories-with-smartphone-influencer-and-social-media.jpg?s=612x612&w=0&k=20&c=FzCYnLsQlFBuDPII4sIzxy3rLQaqBdpnU3TNBuQP9So="
              className="d-block w-100"
              alt="..."
              style={im}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Resell the goods</h5>
              <p>Reselling is the more usefull thing that can save money</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="d-block w-100"
              alt="..."
              style={im}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Selling products</h5>
              <p>Auction is the best way to sell rare products</p>
            </div>
          </div>
          <div className="carousel-item"> {/* Add a new carousel item */}
            <img
              src="/20945855.jpg" // Replace with the URL of your fourth image
              className="d-block w-100"
              alt="..."
              style={im}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Fourth slide label</h5> {/* Change the label for the fourth slide */}
              <p>Some representative placeholder content for the fourth slide.</p> {/* Change the content */}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" style={{ color: 'black' }}></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" style={{ color: 'black' }}></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carsl;
