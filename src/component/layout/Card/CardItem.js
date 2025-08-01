import React from 'react'
import "./CardItem.css"
import { GoHeart } from "react-icons/go";
import { IoHeartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function CardItem({ image, title, description, price }) {
  return (
     <div className="tshirt-card">
      <div className='card-image'>
      <img src={image} alt={title} className="tshirt-image" />
      <div className='fav-circle-card'>
         <IoMdHeartEmpty className='icon-heart' />
      </div>

      <div className='overlaybox'>
  <div className="tshirt-content">
        <h2 className="tshirt-title">{title}</h2>
        <p className="tshirt-description">{description}</p>
        <div className="tshirt-footer">
          <span className="tshirt-price">₹{price}</span>
          {/* <button className="buy-button">Buy Now</button> */}
          <button className="cart-button">  <HiOutlineShoppingBag className="icon" /> </button>
        </div>
      </div>
      </div>
      </div>
    
    </div>
  )
}
