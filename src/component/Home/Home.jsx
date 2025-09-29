import React from "react";
import TinderCards from "../TinderCard/TinderCards";
import styles from "../Home/Home.module.css";
import Navbar from "../Navbar/NavbarMenu";
import AllProduct from "../AllProduct/CollectionTranding/TrendingProduct";
import Footer from "../Footer/Footer";
import CategorySwiper from "../layout/CategorySwiper/CategorySwiper";
import Product from "../AllProduct/Product/Product";
import BannerSlider from "../Banner/BannerSlider";
import ContentWithSlider from "../ContentWithSlider/ContentWithSlider";
import SuspensionPage from "./SuspensionPage";
const people = [
  {
    name: "Lily",
    age: 25,
    image:
      "https://images.cbazaar.com/images/pink-net-embroidered-stones-with-moti-umbrella-lehenga-ghscc47559002a-u.jpg",
  },
  {
    name: "Alex",
    age: 28,
    image:
      "https://www.sairasboutique.net/cdn/shop/files/OliveDesignerHeavyEmbroideredNetBridalLehenga-Saira_sBoutique.jpg?v=1683954679",
  },
  {
    name: "Mia",
    age: 24,
    image: "https://img.faballey.com/images/Product/ILL01101Z/3.jpg",
  },
  {
    name: "Mia",
    age: 24,
    image:
      "https://5.imimg.com/data5/ECOM/Default/2024/1/377131521/AY/XN/SD/153990963/img-20231224-wa0011-500x500.jpg",
  },
  {
    name: "Mia",
    age: 24,
    image:
      "https://cdn.shopify.com/s/files/1/0825/9253/0718/files/DSC01964_copy_600x600.jpg?v=1695708576",
  },

  {
    name: "Mia",
    age: 24,
    image:
      "https://assets2.andaazfashion.com/media/catalog/product/r/e/red-silk-embroidered-bridal-wear-lehenga-llcv113627-1.jpg",
  },
];

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <BannerSlider />
      {/* <SuspensionPage/> */}
      <br></br>
      <AllProduct />
      <ContentWithSlider />
      <CategorySwiper />

      <br />
      <Product />
      <br />
      <Footer />
    </div>
  );
}
