import React from "react";
import "./CardItem.css";
import { GoHeart } from "react-icons/go";
import { IoHeartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function CardItem({ image, name, description, price }) {
  const navigate = useNavigate();
  return (
    <div
      className="tshirt-card"
      onClick={() =>
        navigate("/collections", {
          state: { filter: [name] },
        })
      }
    >
      <div className="card-image">
        <img src={image} alt={name} className="tshirt-image" />
        {/* <div className='fav-circle-card'>
         <IoMdHeartEmpty className='icon-heart' />
      </div> */}

        <div className="overlaybox">
          <div className="tshirt-content">
            <h2 className="tshirt-title">{name}</h2>
            <p className="tshirt-description">{description}</p>
            <div className="tshirt-footer">
              {/* <span className="tshirt-price">₹{price}</span> */}
              {/* <button className="buy-button">Buy Now</button> */}
              {/* <button className="cart-button">  <HiOutlineShoppingBag className="icon" /> </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
