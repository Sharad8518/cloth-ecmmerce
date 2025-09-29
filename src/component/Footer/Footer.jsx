import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.jpeg"
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h2 style={{fontFamily:"'Playfair' serif"}}>House of Ziba</h2>
          <p>Your trusted destination for fashion, lifestyle, and more. Quality, style, and service you can count on.</p>
          <img src={logo} style={{width:150,height:150}}/>
        </div>

        <div className="footer-links">
          <div>
            <h4>Customer Service</h4>
            <ul>
              <li>Contact Us</li>
              <li><Link className="link">Order Tracking</Link> </li>
              <li><Link className="link" to="/returnExchange">Returns & Exchanges</Link> </li>
              <li><Link className="link">Shipping Info</Link></li>
              <li><Link className="link" to="/aboutUs">About Us</Link></li>
              <li><Link className="link"> Help Center </Link></li>
            </ul>
          </div>

          <div>
            <h4>Categories</h4>
            <ul>
              <li><Link className="link">Men's Fashion </Link></li>
              <li><Link className="link">Women's Fashion </Link></li>
              <li><Link className="link">Kids</Link></li>
              <li><Link className="link"> Accessories</Link></li>
              <li><Link className="link"> New Arrivals </Link></li>
            </ul>
          </div>

            

            <div>
            <h4>Services</h4>
            <ul>
              <li><Link className="link"> Sell with Us</Link></li>
              <li><Link className="link"> Bulk Orders </Link></li>
              <li><Link className="link" to="/privacyPolicy"> Privacy Policy </Link></li>
              <li><Link className="link" to="/cookiesPolicy"> Cookies Policy </Link></li>
              <li><Link className="link" to="/termCondition">Terms & Condition </Link></li>
              <li><Link className="link">T&C Offers</Link></li>
            </ul>
          </div>

         <div>
      <h4>Connect</h4>
      <div className="flex gap-4 text-xl">
        <a href="#" className="hover:text-blue-600" style={{marginLeft:10,color:"#fff"}}>
          <FaFacebookF />
        </a>
        <a href="#" className="hover:text-pink-500" style={{marginLeft:10,color:"#fff"}}>
          <FaInstagram />
        </a>
        <a href="#" className="hover:text-blue-400" style={{marginLeft:10,color:"#fff"}}>
          <FaTwitter />
        </a>
        <a href="#" className="hover:text-red-600" style={{marginLeft:10,color:"#fff"}}>
          <FaYoutube />
        </a>
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
