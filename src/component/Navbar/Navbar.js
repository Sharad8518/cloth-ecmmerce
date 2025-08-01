import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import './Navbar.css';
import { RiMenu2Fill } from "react-icons/ri";

export default function Navbar() {
  const cartItemCount = 3; // Replace with dynamic value from state/store

  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">ShopMate</h2>
      </div>

      <div className="navbar-center">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/collections">Collections</a></li>
             <li><a href="/collections">Womenswear</a></li>
              <li><a href="/collections">Menswear</a></li>
               <li><a href="/collections">Bestsellers</a></li>
               <li><a href="/collections">Saree</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
       
        </ul>
      </div>

      <div className="navbar-right">
        {/* ✅ Cart Icon with Badge */}
        <div className="cart-icon">
          <HiOutlineShoppingBag className="icon" />
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </div>
        <FaRegUser className="icon"  />
      </div>


    </nav>

    <nav className="navbar-mobile" >
    <RiMenu2Fill  size={25} style={{marginLeft:"10px"}}/>

     <h2 className='logo-mobile'>ShopMate</h2>
 <div style={{marginRight:10,display:"flex"}}>
        {/* ✅ Cart Icon with Badge */}
        <div className="cart-icon" style={{marginRight:12}}>
          <HiOutlineShoppingBag className="icon" />
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </div>
        {/* <FaRegUser className="icon"  style={{left:10}} /> */}
      </div>
    </nav>
    </>
  );
}

