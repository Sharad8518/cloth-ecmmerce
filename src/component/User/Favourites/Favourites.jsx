import React,{useEffect,useState} from 'react'
import NavbarMenu from '../../Navbar/NavbarMenu'
import { getFavorites } from "../../api/user/favoriteApi";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import ProductGrid from '../../layout/ProductGrid/ProductGrid';
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Anim/loading.json";
import MobileBackButton from '../../layout/BackButton/MobileBackButton';
import styles from "./Favourite.module.css"

export default function Favourites() {
const [favorites, setFavorites] = useState([]); // store only products
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      // Extract only the product from each favorite
      const products = data.favorites?.map(fav => fav.product) || [];
      console.log('products',products)
      setFavorites(products);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setLoading(false);
    }
  };

  console.log("favorites",favorites)

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
       <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection:"column",
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
        </div> // or a spinner component
    );
  }
  return (
    <>
    <NavbarMenu />
    <br/>
    <br/>
    <div className={styles.headerwishlist}>
      <MobileBackButton/>
     <h2 className={styles.wishlist}>My Wishlist</h2> {/* or "My Wishlist" */}
     </div>
    <ProductGrid  products={favorites}/>
    </>
  )
}
