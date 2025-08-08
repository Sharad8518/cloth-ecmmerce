import React from "react";
import NavbarMenu from "../Navbar/NavbarMenu";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../Cart/ProductCart.module.css";
import { GrSubtract } from "react-icons/gr"
import { GrAdd } from "react-icons/gr";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ProductCart() {
  return (
    <>
      <NavbarMenu />
      <Container style={{ marginTop: 50 }}>
        <Row>
          <Col md={9}>
            <div className={styles.shopingCartItem}>
              <h5 style={{fontWeight:"700",color:"#000"}}>Shopping Cart </h5>
              <h5 style={{fontWeight:"700",color:"#000"}}>3 Item</h5>
            </div>
            <hr />

            <Row>
              <Col md={6}>
                <span style={{ fontSize: 13 }}>PRODUCT DETAILS</span>
              </Col>
              <Col md={6}>
                <Row>
                  <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <span style={{ fontSize: 13 }}>QUANTITY</span>
                  </Col>
                  <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <span style={{ fontSize: 13 }}>PRICE</span>
                  </Col>
                  <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <span style={{ fontSize: 13 }}>TOTAL</span>
                  </Col>
                </Row>
              </Col>
            </Row>

             <Row style={{marginTop:20,height:200}}>
              <Col md={6} style={{height:"100%"}}>
                <Row style={{height:"100%"}}>
                   <Col md={4} style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}>
                   <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05V2gc1n18gq4fKrCQQYdSx-5H5UARjgPzg&s"} style={{height:"100%"}}/>
                   </Col>
                    <Col md={8}>
                    <span style={{fontWeight:"600",fontSize:16,color:"#000"}}>
                        Wireless Headphones
                    </span><br/>
                    <span style={{fontSize:12}}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    </span>
                    </Col>

                </Row>
              </Col>
              <Col md={6} style={{height:"100%"}}>
                <Row>
                  <Col>
                    <div style={{display:"flex",justifyContent:"space-between",width:"100%",height:40,alignItems:"center"}}>
                     <div>
                        <GrSubtract/>
                     </div>

                     <div style={{width:40,height:40,border:"1px solid #ccc",borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                       <span>2</span>
                     </div>

                     <div>
                        <GrAdd/>
                     </div>
                    </div>
                  </Col>
                  <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <span style={{ fontSize: 15 ,fontWeight:"600",color:"#000"}}>₹ 150/-</span>
                  </Col>
                  <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                   <span style={{ fontSize: 15 ,fontWeight:"600",color:"#000",}}>₹ 300/-</span>
                  </Col>
                </Row>
              </Col>
            </Row>

             <Row style={{marginTop:20,height:200}}>
              <Col md={6} style={{height:"100%"}}>
                <Row style={{height:"100%"}}>
                   <Col md={4} style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"}}>
                   <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05V2gc1n18gq4fKrCQQYdSx-5H5UARjgPzg&s"} style={{height:"100%"}}/>
                   </Col>
                    <Col md={8}>
                    <span style={{fontWeight:"600",fontSize:16,color:"#000"}}>
                        Wireless Headphones
                    </span><br/>
                    <span style={{fontSize:12}}>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    </span>
                    </Col>

                </Row>
              </Col>
              <Col md={6} style={{height:"100%"}}>
                <Row>
                  <Col>
                    <div style={{display:"flex",justifyContent:"space-between",width:"100%",height:40,alignItems:"center"}}>
                     <div>
                        <GrSubtract/>
                     </div>

                     <div style={{width:40,height:40,border:"1px solid #ccc",borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                       <span>2</span>
                     </div>

                     <div>
                        <GrAdd/>
                     </div>
                    </div>
                  </Col>
                  <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <span style={{ fontSize: 15 ,fontWeight:"600",color:"#000"}}>₹ 150/-</span>
                  </Col>
                  <Col style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                   <span style={{ fontSize: 15 ,fontWeight:"600",color:"#000",}}>₹ 300/-</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            
            <div style={{marginTop:10}}>
            <span style={{color:"#5f27cd"}}> <IoIosArrowRoundBack size={25}/> Continue Shopping</span>
            </div>

          </Col>
          <Col md={3} style={{ height: "80vh", background: "#f5f5f5",padding:20 }}>
            <h5 className={styles.ordersummary}>Order Summary</h5>
            <hr/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                 <h6 style={{fontSize:15}}>ITEMS 3</h6>
                  <h6 style={{fontSize:15}}>₹ 300.5/-</h6>
            </div>
            <h6 style={{fontSize:15,marginTop:30}}>SHIPPING </h6>
            <select style={{width:"100%",padding:10,borderRadius:5,outline:"none",border:"none",marginTop:10}}>
 <option value="volvo">Select Shipping</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
            </select>

              <h6 style={{fontSize:15,marginTop:50}}>PROMO CODE </h6>
              <input placeholder="Enter you code" style={{width:"100%",padding:9,border:"none",outline:"none",marginTop:5}} />

              <button style={{padding:10,width:100,border:"none",marginTop:20,backgroundColor:"#f97574",color:"#fff"}}>APPLY</button>
              <hr/>

              <div style={{display:"flex",justifyContent:"space-between",marginTop:20}}>
                <h6>Total Cost</h6>
                <h6>₹ 282 /-</h6>
              </div>

              <button style={{width:"100%",height:40,fontSize:13,border:"none",backgroundColor:"#5c51db",color:"#fff",fontWeight:"600",marginTop:20}}>CHECKOUT</button>
          
          </Col>
        </Row>
      </Container>
    </>
  );
}
