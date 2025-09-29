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
      "https://www.bullionknot.com/cdn/shop/files/Poonam_4_a3edcb27-e733-45cb-acf0-7ed47628c6eb.jpg?v=1746264104",
  },
  {
    title: "Designer Suit",
    image:
      "https://suvidhafashion.com/cdn/shop/files/RAFEEQAH-1.jpg?v=1741087647&width=600",
  },
  {
    title: "Indo Western",
    image:
      "https://www.shauryasanadhya.com/cdn/shop/products/DSC4946_1080x.jpg?v=1745482463",
  },
  {
    title: "Jwellery",
    image:
      "https://rubans.in/cdn/shop/files/rubans-24k-gold-plated-goddess-lakshmi-motif-handcrafted-traditional-temple-jewellery-set-necklaces-necklace-sets-chains-mangalsutra-1151539141.jpg?v=1755710564",
  },
  {
    title: "Potilis",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh3rMzNm5aPLblelJvQZxz9F3zq83riccGUiWGp4J7B57wcySi-2jre1fTH-5JicUTSrI&usqp=CAU",
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
      <h2 className={styles.title}>SHOP BY CATEGORY</h2>
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
                  navigate("/product-category", {
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
        onClick={() => navigate("/newIn")}
      >
      New Arrival
      </button>
    </div>
  );
}
