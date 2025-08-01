import React from 'react'
import CardItem from '../layout/Card/CardItem'


const tshirtItems = [
  {
    image: "https://static.wixstatic.com/media/c70d98_62302925b270475f8b7a5c13061f075b~mv2.jpg/v1/fill/w_520,h_780,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c70d98_62302925b270475f8b7a5c13061f075b~mv2.jpg",
    title: "Urban Fit T-Shirt",
    description: "Sleek black design, breathable cotton, unisex fit. Limited edition.",
    price: "29.99"
  },
  {
    image: "https://stylady.in/cdn/shop/files/IMG_2586_800x.jpg?v=1714902823",
    title: "Bold Graphic Tee",
    description: "Striking visuals printed on 100% organic cotton.",
    price: "24.99"
  },
  {
    image: "https://www.zarijaipur.com/cdn/shop/products/IMG_0087copy_44a93dfc-b9ef-4541-a20b-0a53f8d51502.jpg?v=1753947982&width=1080",
    title: "Vintage Style Tee",
    description: "Retro vibes with a soft worn-in feel. Pre-shrunk.",
    price: "21.99"
  },
   {
    image: "https://static.wixstatic.com/media/c70d98_2cec3c2df8bd43d0a1988fba943cdf07~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
    title: "Vintage Style Tee",
    description: "Retro vibes with a soft worn-in feel. Pre-shrunk.",
    price: "21.99"
  },
   {
    image: "https://cdn.shopify.com/s/files/1/0559/9497/4251/files/2_6d3fec36-8c7d-4cc0-b01a-c03aa78a5836.png?v=1738234856",
    title: "Vintage Style Tee",
    description: "Retro vibes with a soft worn-in feel. Pre-shrunk.",
    price: "21.99"
  },
    {
    image: "https://images.jdmagicbox.com/quickquotes/images_main/pure-soft-silk-designer-saree-awyhagw7.jpg",
    title: "Vintage Style Tee",
    description: "Retro vibes with a soft worn-in feel. Pre-shrunk.",
    price: "21.99"
  },
    {
    image: "https://static.toiimg.com/photo/115867339/115867339.jpg",
    title: "Vintage Style Tee",
    description: "Retro vibes with a soft worn-in feel. Pre-shrunk.",
    price: "21.99"
  },
    {
    image: "https://assets0.mirraw.com/images/8724175/RS2227-D_zoom.jpg?1613372381",
    title: "Vintage Style Tee",
    description: "Retro vibes with a soft worn-in feel. Pre-shrunk.",
    price: "21.99"
  }
];
export default function AllProduct() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px", backgroundColor: "#f7f7f7" }}>
         <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      padding: "40px",
      backgroundColor: "#f7f7f7"
    }}>
      {tshirtItems.map((item, index) => (
        <CardItem key={index} {...item} />
      ))}
    </div>
        
        </div>
  )
}
