import React,{useEffect,useState} from 'react'
import NavbarMenu from '../../Navbar/NavbarMenu'
import { getFavorites } from "../../api/user/favoriteApi";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import ProductGrid from '../../layout/ProductGrid/ProductGrid';

export default function Favourites() {
const [favorites, setFavorites] = useState([]); // store only products
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      // Extract only the product from each favorite
      const products = data.favorites?.map(fav => fav.product) || [];
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
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <>
    <NavbarMenu />
    <br/>
    <br/>
    <br/>
     <h2 className="text-center my-4">My Wishlist</h2> {/* or "My Wishlist" */}
    <ProductGrid  products={favorites}/>
    </>
  )
}
