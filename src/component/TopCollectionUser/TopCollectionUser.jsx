import React from 'react'
import { useLocation } from 'react-router-dom';
import NavbarMenu from '../Navbar/NavbarMenu';
import BannerSlider from '../Banner/BannerSlider';
import ProductGrid from "../layout/ProductGrid/ProductGrid";
import Footer from "../Footer/Footer";
export default function TopCollectionUser() {
  const location = useLocation()
  const { product } = location.state || {};
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
  )
}
