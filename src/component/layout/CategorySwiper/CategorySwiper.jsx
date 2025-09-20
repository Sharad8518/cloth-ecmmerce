import React,{useRef,useEffect,useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./CategorySwiper.module.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Food",
    image:
      "https://myfashionroad.com/wp-content/uploads/2024/04/varsha-fashion-maya-new-designs-muslin-ladies-dress-catalog-suppliers-0-2024-04-18_12_12_48-scaled.jpg",
  },
  {
    title: "Travel",
    image:
      "https://www.yellowbrick.co/wp-content/uploads/2023/08/fashion_blog_styling_blog_two-models-min.jpg",
  },
  {
    title: "Fitness",
    image:
      "https://i.pinimg.com/236x/60/cb/7c/60cb7c667c9d47f2c0afac0386a03591.jpg",
  },
  {
    title: "Tech",
    image:
      "https://images.bewakoof.com/web/latest-fashion-trends-bewakoof-blog-8-1621402705.jpg",
  },
  {
    title: "Fashion",
    image:
      "https://i.pinimg.com/736x/d1/ee/e0/d1eee010d20959ad6f0fc0aa7334c6d6.jpg",
  },
  {
    title: "Music",
    image:
      "https://media.voguebusiness.com/photos/621e06bf17b9c2e9b062bc0b/2:3/w_2560%2Cc_limit/reliance-acquisition-voguebus-full-getty-credit-mar-22-story.jpg",
  },
  {
    title: "Beauty",
    image:
      "https://maharaniwomen.b-cdn.net/wp-content/uploads/2024/06/189936-1-scaled.jpg",
  },
  {
    title: "Education",
    image:
      "https://www.uniformsarees.in/cdn/shop/products/LirilandBlueWomen_sPremiumSilkCrepePlainBorderSchoolTeacherUniformSareeSalwarCombo-CO1843-23.jpg?v=1650006687",
  },
  {
    title: "Sports",
    image:
      "https://5.imimg.com/data5/AA/SW/MY-52076364/girls-sports-wear-500x500.jpg",
  },
  {
    title: "Health",
    image:
      "https://m.media-amazon.com/images/I/61PCegDEbxL._UY1100_.jpg",
  },
  {
    title: "Lifestyle",
    image:
      "https://img.tatacliq.com/images/i25//450Wx545H/MP000000027169685_450Wx545H_202506300940051.jpeg",
  },
   
    {
    title: "Wedding",
    image:
      "https://img.faballey.com/images/Product/XLH05420Z/d3.jpg",
  },

   {
    title: "Party",
    image:
      "https://i.pinimg.com/originals/13/f8/81/13f881aa584f5d2cb1408a42e1576dfe.jpg",
  },

];

export default function CategorySwiper() {
      const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [navReady, setNavReady] = useState(false);
  const navigate = useNavigate()

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
        // navigation
        freeMode
        grabCursor
        style={{width:"100%",height:"170px"}}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index} style={{ width: "150px" ,height:"170px",backgroundColor:"transparent"}}>
            <div className={styles.categorySlide} onClick={()=>navigate("/categoryProduct",{ state: { category: cat.title }, })}>
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
