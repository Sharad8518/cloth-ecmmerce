import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./CategorySwiper.module.css";
import { useNavigate } from "react-router-dom";

const categories = [
  
  {
    title: "Kurta Set",
    image:
      "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg",
  },
  {
    title: "Designer Suit",
    image:
      "https://www.yellowbrick.co/wp-content/uploads/2023/08/fashion_blog_styling_blog_two-models-min.jpg",
  },
  {
    title: "Indo Western",
    image:
      "https://i.pinimg.com/236x/60/cb/7c/60cb7c667c9d47f2c0afac0386a03591.jpg",
  },
  {
    title: "Jwellery",
    image:
      "https://images.bewakoof.com/web/latest-fashion-trends-bewakoof-blog-8-1621402705.jpg",
  },
  {
    title: "Potilis",
    image:
      "https://i.pinimg.com/736x/d1/ee/e0/d1eee010d20959ad6f0fc0aa7334c6d6.jpg",
  },
];

export default function CategorySwiper() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [navReady, setNavReady] = useState(false);
  const navigate = useNavigate();

  // Trigger Swiper init after refs are set
  useEffect(() => {
    setNavReady(true);
  }, []);
  return (
    <div className={styles.swiperContainer}>
      <h2 className={styles.shopbycategory}>Shop By Category</h2>
      {/* <div className={styles.customNav}>
        <button ref={prevRef} className={styles.customPrev}>
          ◀
        </button>
        <button ref={nextRef} className={styles.customNext}>
          ▶
        </button>
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={16}
          slidesPerView="auto"
          grabCursor
          loop={false} // optional
          style={{
            width: "100%",
            height: "170px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide
              key={index}
              style={{
                width: "150px",
                height: "170px",
                backgroundColor: "transparent",
              }}
            >
              <div
                className={styles.categorySlide}
                onClick={() =>
                  navigate("/categoryProduct", {
                    state: { category: cat.title },
                  })
                }
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className={styles.categoryImg}
                />
                <div className={styles.categoryTitle}>{cat.title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        className={`${styles.ViewAllBtn} mx-auto d-block`}
        onClick={() => navigate("/categoryProduct")}
      >
      New Arrival
      </button>
    </div>
  );
}
