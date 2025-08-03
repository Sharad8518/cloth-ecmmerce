import React from 'react'
import ProductGrid from '../../layout/ProductGrid/ProductGrid';

const products = [
  {
    image: "https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png",
    title: "Product 1",
    description: "Description of product 1.",
    price: "$29.99"
  },
  {
    image: "https://hooraindesignerwear.com/cdn/shop/articles/elevate-your-wardrobe-with-elegance-style-and-luxury-of-cross-stitch-pakistan-793587.webp?v=1721215446",
    title: "Product 2",
    description: "Description of product 2.",
    price: "$19.99"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvlyBlKveQdYhEL2atlEipLYpzk56ntS7gDo36kxkgd2vCIsJvdOrMeg9FJe1AP7LnN7M&usqp=CAU",
    title: "Product 3",
    description: "Description of product 3.",
    price: "$39.99"
  },
  {
    image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
    title: "Product 4",
    description: "Description of product 4.",
    price: "$49.99"
  },
   {
    image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
    title: "Product 4",
    description: "Description of product 4.",
    price: "$49.99"
  },
    {
    image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
    title: "Product 4",
    description: "Description of product 4.",
    price: "$49.99"
  },
   {
    image: "https://i.pinimg.com/736x/b0/4f/bf/b04fbff3976d176d88e0831d0d112a01.jpg",
    title: "Product 4",
    description: "Description of product 4.",
    price: "$49.99"
  },
    {
    image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
    title: "Product 4",
    description: "Description of product 4.",
    price: "$49.99"
  },
   {
    image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
    title: "Product 4",
    description: "Description of product 4.",
    price: "$49.99"
  },
];

export default function Product() {
  return (
    <div>
         <ProductGrid products={products} />
    </div>
  )
}
