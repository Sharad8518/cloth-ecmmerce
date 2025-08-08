import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpeg"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h2>House of Ziba</h2>
          <p>Your trusted destination for fashion, lifestyle, and more. Quality, style, and service you can count on.</p>
          <img src={logo} style={{width:150,height:150}}/>
        </div>

        <div className="footer-links">
          <div>
            <h4>Customer Service</h4>
            <ul>
              <li>Contact Us</li>
              <li>Order Tracking</li>
              <li>Returns & Exchanges</li>
              <li>Shipping Info</li>
              <li>Help Center</li>
            </ul>
          </div>

          <div>
            <h4>Categories</h4>
            <ul>
              <li>Men's Fashion</li>
              <li>Women's Fashion</li>
              <li>Kids</li>
              <li>Accessories</li>
              <li>New Arrivals</li>
            </ul>
          </div>

          <div>
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Houseofziba. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
