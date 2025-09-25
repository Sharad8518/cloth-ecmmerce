import React,{useEffect} from "react";
import styles from "./CollectionObleLuxw.module.css";
import NavbarMenu from "../Navbar/NavbarMenu";
import { useLocation } from "react-router-dom";
import BannerSlider from "../Banner/BannerSlider";
import ProductGrid from "../layout/ProductGrid/ProductGrid";
import Footer from "../Footer/Footer";

export default function CollectionObleLuxe() {
  const location = useLocation();
  const product = location.state?.product;
   useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <NavbarMenu />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <BannerSlider />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <ProductGrid products={product} />
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
}
