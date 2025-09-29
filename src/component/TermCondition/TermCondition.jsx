import React ,{useEffect}from "react";
import NavbarMenu from "../Navbar/NavbarMenu";
import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import styles from "./TermCondition.module.css"

export default function TermCondition() {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
      <NavbarMenu />
      <br/>
      <Container className={styles.termContainer}>
        <h2>Terms & Conditions </h2>
        <hr />
        <div>
          <h5>Eligibility</h5>
          <ul>
            <li>
              You must be at least 18 years old to place an order on our
              website. If you are under 18, you may use our services only under
              the supervision of a parent or guardian.
            </li>
          </ul>

          <h5>General Conditions</h5>
          <ul>
            <li>
              We reserve the right to refuse service to anyone for any reason at
              any time
            </li>
            <li>
              Your content (excluding credit card info) may be transferred
              unencrypted across networks. Credit card data is always encrypted
              during transfer.
            </li>

            <li>
              You agree not to reproduce, duplicate, copy, sell, or exploit any
              product without written permission from us.
            </li>
          </ul>

          <h5>Accuracy, Completeness and Timeliness of Information</h5>
          <ul>
            <li>
              We are not responsible if site information is inaccurate,
              incomplete, or outdated.
            </li>
            <li>
              Some content may be historical and provided for reference only.
            </li>

            <li>
              We may update content anytime without obligation to notify. It is
              your responsibility to monitor changes.
            </li>
          </ul>

          <h5>Modifications to Service and Prices</h5>
          <ul>
            <li>Product prices may change without notice.</li>
            <li>
              We reserve the right to modify or discontinue any product/service
              without notice.
            </li>

            <li>
              Prices accessed from outside India may be higher than those within
              India.
            </li>
            <li>
              We are not liable for modifications, price changes, or
              discontinuance of services/products.
            </li>
          </ul>

          <h5>Products</h5>
          <ul>
            <li>
              Some products may be available exclusively online and in limited
              quantities.
            </li>
            <li>
              Colors and product images are shown as accurately as possible, but
              we cannot guarantee your monitor’s display.
            </li>

            <li>
              Sizes may vary by 1–2 inches (2–4 cm) due to manual measurement
              differences. We may update content anytime without obligation to
              notify. It is your responsibility to monitor changes.
            </li>
            <li>
              We reserve the right to limit sales, quantities, or discontinue
              products.
            </li>
            <li>
              We do not warrant that product quality or services will meet
              customer expectations.
            </li>
          </ul>

          <h5>Errors, Inaccuracies, and Omissions</h5>
          <ul>
            <li>
              Occasionally, errors may appear in descriptions, pricing, or
              availability.
            </li>
            <li>
              We reserve the right to correct and update information or cancel
              orders affected by such errors without notice.
            </li>
          </ul>

            <h5>Orders & Payments</h5>
          <ul>
            <li>
             Payments can be made via COD and all methods supported by Razorpay.
            </li>
            <li>
             Once an order is placed, you will receive confirmation via email/SMS.
            </li>
               <li>
            We reserve the right to refuse or cancel any order at our discretion, including suspected fraudulent or bulk orders.
            </li>
          </ul>

          <h5>Shipping & Delivery</h5>
          <ul>
            <li>
             Payments can be made via COD and all methods supported by Razorpay.
            </li>
            <li>
            Timelines are mentioned in the product description.
            </li>
               <li>
            House of Ziba is not responsible for delays caused by courier/logistics partners.
            </li>
          </ul>
        </div>
        <div>
            House of Ziba reserves the right to modify or update this Terms & Conditions at any time. Changes will be effective immediately upon posting on this website.
          </div>
      </Container>
      <br/>
      <Footer/>
    </div>
  );
}
