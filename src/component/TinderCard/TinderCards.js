import React, { useRef, useState } from 'react';
import './TinderCards.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';

const TinderCards = ({ people = [] }) => {
  const [position, setPosition] = useState({ x: 0, rotation: 0, released: false });
  const startX = useRef(0);
  const dragging = useRef(false);

  const handleMouseDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    setPosition(prev => ({ ...prev, released: false }));

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    const deltaX = e.clientX - startX.current;
    setPosition({
      x: deltaX,
      rotation: deltaX / 15,
      released: false,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    const threshold = 100;

    if (position.x > threshold) {
      setPosition({ x: 500, rotation: 20, released: true });
    } else if (position.x < -threshold) {
      setPosition({ x: -500, rotation: -20, released: true });
    } else {
      setPosition({ x: 0, rotation: 0, released: true });
    }

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
  <div className="card-container">
    {people.map((person, index) => {
      const isTopCard = index === 0;

      return (
        <div
          key={person.name}
          className={`tinder-card ${
            position.released && isTopCard ? "released" : ""
          }`}
          onMouseDown={isTopCard ? handleMouseDown : undefined}
          style={{
            zIndex: people.length - index,
          }}
        >
          <img src={person.image} alt={person.name} />
          {/* <h3>{person.name}, {person.age}</h3> */}
        </div>
      );
    })}
  </div>

  {/* ✅ Mobile View Slider */}
  <div className="mobile-view">
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
    >
      {people.map((person, index) => (
        <SwiperSlide key={index}>
          <img
            src={person.image}
            alt={person.name}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
          {/* Optional text below image */}
          {/* <h3>{person.name}, {person.age}</h3> */}
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</>

  );
};

export default TinderCards;
