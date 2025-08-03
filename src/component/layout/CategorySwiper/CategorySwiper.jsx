import React,{useRef,useEffect,useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./CategorySwiper.module.css";

const categories = [
  { title: "Food", image: "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg" },
  { title: "Travel", image: "https://www.yellowbrick.co/wp-content/uploads/2023/08/fashion_blog_styling_blog_two-models-min.jpg" },
  { title: "Fitness", image: "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg" },
  { title: "Tech", image: "https://images.bewakoof.com/web/latest-fashion-trends-bewakoof-blog-8-1621402705.jpg" },
  { title: "Fashion", image: "https://i.pinimg.com/736x/d1/ee/e0/d1eee010d20959ad6f0fc0aa7334c6d6.jpg" },
  { title: "Music", image: "https://media.voguebusiness.com/photos/621e06bf17b9c2e9b062bc0b/2:3/w_2560%2Cc_limit/reliance-acquisition-voguebus-full-getty-credit-mar-22-story.jpg" },
 { title: "Food", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIbB_jgxoaV0-TK5KPsFxkca5cEROonM0Utg&s" },
  { title: "Travel", image: "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg" },
  { title: "Fitness", image: "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg" },
  { title: "Tech", image: "https://media.fashionnetwork.com/cdn-cgi/image/fit=cover,width=501,height=501,format=auto/m/be5f/f1b1/3839/340e/b882/531b/5f92/21d2/59e9/aaaa/aaaa.jpg" },
  { title: "Fashion", image: "https://media.fashionnetwork.com/cdn-cgi/image/fit=cover,width=501,height=501,format=auto/m/be5f/f1b1/3839/340e/b882/531b/5f92/21d2/59e9/aaaa/aaaa.jpg" },
  { title: "Music", image: "https://media.fashionnetwork.com/cdn-cgi/image/fit=cover,width=501,height=501,format=auto/m/be5f/f1b1/3839/340e/b882/531b/5f92/21d2/59e9/aaaa/aaaa.jpg" },
   { title: "Food", image: "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg" },
  { title: "Travel", image: "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg" },
  { title: "Fitness", image: "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg" },
  { title: "Tech", image: "https://media.fashionnetwork.com/cdn-cgi/image/fit=cover,width=501,height=501,format=auto/m/be5f/f1b1/3839/340e/b882/531b/5f92/21d2/59e9/aaaa/aaaa.jpg" },
  { title: "Fashion", image: "https://media.fashionnetwork.com/cdn-cgi/image/fit=cover,width=501,height=501,format=auto/m/be5f/f1b1/3839/340e/b882/531b/5f92/21d2/59e9/aaaa/aaaa.jpg" },
  { title: "Music", image: "https://media.fashionnetwork.com/cdn-cgi/image/fit=cover,width=501,height=501,format=auto/m/be5f/f1b1/3839/340e/b882/531b/5f92/21d2/59e9/aaaa/aaaa.jpg" },
];

export default function CategorySwiper() {
      const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [navReady, setNavReady] = useState(false);

  // Trigger Swiper init after refs are set
  useEffect(() => {
    setNavReady(true);
  }, []);
  return (
   <div className={styles.swiperContainer}>
    <h2  className={styles.shopbycategory}>Shop By Category</h2>
      {/* <div className={styles.customNav}>
        <button ref={prevRef} className={styles.customPrev}>
          ◀
        </button>
        <button ref={nextRef} className={styles.customNext}>
          ▶
        </button>
      </div> */}
      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={16}
        slidesPerView="auto"
        navigation
        freeMode
        grabCursor
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index} style={{ width: "150px" }}>
            <div className={styles.categorySlide}>
              <img src={cat.image} alt={cat.title} className={styles.categoryImg} />
              <div className={styles.categoryTitle}>{cat.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={`${styles.ViewAllBtn} mx-auto d-block`}>View All</button>
    </div>
  )
}
