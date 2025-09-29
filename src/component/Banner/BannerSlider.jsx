import React,{useEffect,useState} from "react";
import { Carousel } from "react-bootstrap";
import styles from "./BannerSlider.module.css"; // 👈 CSS Module import
import { getAllTopCollection } from "../api/user/topCollectionApi";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Anim/loading.json";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    image:
      "https://subhvastra.in/cdn/shop/files/Anarkali_Suits_banner_1_x800.jpg?v=1740552755",
    title: "Premium Bridal Wear",
    description: "Explore exclusive bridal collections with elegance.",
  },
  {
    id: 2,
    image:
      "https://medias.utsavfashion.com/media/wysiwyg/promotions/2023/2610/luxe-designer-wear-new.jpg",
    title: "Designer Lehengas",
    description: "Latest designer wear for weddings & parties.",
  },
  {
    id: 3,
    image: "https://gillori.com/cdn/shop/articles/Gillori_blog_banner_3.jpg",
    title: "Trendy Outfits",
    description: "Fashion that keeps you ahead in style.",
  },
];




export default function BannerSlider() {

  const [collections, setCollections] = useState([]);
  const [loading,setLoading]  =useState(true)
  const navigate=  useNavigate()
const fetchCollections = async () => {
    try {
      const res = await getAllTopCollection();
      console.log("res",res)
      setCollections(res);
    } catch (err) {
      console.error(err);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  console.log('collections',collections)
  if (loading) {
      return (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff", // optional
          }}
        >
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
            style={{ width: 200, height: 200 }}
          />
          <p style={{ marginTop: "1rem", fontSize: "18px", color: "#333" }}>
            Please wait, loading...
          </p>
        </div>
      ); // or a spinner component
    }

  return (
    <>
    <Carousel fade interval={4000} className={styles.bannerSlider}>
      {collections?.map((slide) => (
        <Carousel.Item key={slide._id}>
          <img
            className={`d-block w-100 ${styles.bannerImg}`}
            src={slide.image}
            alt={slide.title}
            onClick={()=>navigate("/collection1",{state:{product:slide.product}})}
          />
        {/* <Carousel.Caption className={styles.caption}>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>  */}
        </Carousel.Item>
      ))}
    </Carousel>
  {/* <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-black text-center py-2 fixed top- left-0 z-50 shadow-md">
  <h6 className="text-sm font-medium tracking-wide">
     Website under development — stay tuned for updates
  </h6>
</div> */}
</>
  );
}
