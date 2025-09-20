import React from "react";
import { Carousel } from "react-bootstrap";
import styles from "./BannerSlider.module.css"; // 👈 CSS Module import

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
  return (
    <Carousel fade interval={4000} className={styles.bannerSlider}>
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className={`d-block w-100 ${styles.bannerImg}`}
            src={slide.image}
            alt={slide.title}
          />
          <Carousel.Caption className={styles.caption}>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
