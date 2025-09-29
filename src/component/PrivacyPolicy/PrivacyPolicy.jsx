import React,{useEffect} from "react";
import NavbarMenu from "../Navbar/NavbarMenu";
import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import styles from "./PrivacyPolicy.module.css"

export default function PrivacyPolicy() {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <NavbarMenu />
      <br/>
      <Container  className={styles.privacyContainer} >
        <h2>Privacy Policy </h2>
        <hr />
        <div>
          <h5>Data We Collect</h5>
          <ul>
            <li>
              Name, Email, Phone Number, Billing and Shipping Information.
            </li>
            <li>
              Optional profile information shared by you (e.g., date of birth,
              preferences, and similar details) to help us offer a more
              personalized shopping experience.
            </li>
            <li>
              Payment information (processed securely via Razorpay and we do not
              store full card details
            </li>
            <li>IP Address, Device Information, and Browsing Data.</li>
            <li>Order history and communication records.</li>
          </ul>
          <h5>How We Use Customer Data</h5>
          <ul>
            <li>Processing and fulfilling your orders</li>
            <li>Providing customer support</li>
            <li>Sending promotional emails/newsletters (with your consent)</li>
            <li>
              Marketing, retargeting, and analytics (via Google Analytics,
              Facebook Ads, etc.)
            </li>
            <li>Improving our website functionality and user experience</li>
          </ul>
          <h5>Sharing of Data We may share customer data with</h5>
          <ul>
            <li>Payment Gateway: Razorpay or any other </li>
            <li>Shipping Partners</li>
            <li>
              Marketing & Analytics Services: Google Analytics, Facebook Pixel
            </li>
            <li>
              We do not sell or rent customer data to unauthorized third
              parties.
            </li>
          </ul>
          <h5>Data Protection</h5>
          <ul>
            <li>
              We implement appropriate technical and organizational security
              measures to protect your personal data. However, no method of
              transmission over the internet is 100% secure, and we cannot
              guarantee absolute protection.
            </li>
          </ul>

          <h5>Promotional Emails</h5>
          <ul>
            <li>
              By providing your contact details, you agree to receive updates,
              offers, and newsletters from House of Ziba. You may opt out
              anytime by clicking the “unsubscribe” link in our emails.
            </li>
          </ul>

          <h5>Questions or Concerns </h5>
          <ul>
            <li>
              If you have any questions or concerns regarding our privacy
              policies, please send us a detailed message to
              thehouseofziba@gmail.com, We will make every effort to resolve
              your concerns
            </li>
            <li>
              Grievance Officer (As per IT Act, 2000 & DPDPA 2023) Grievance
              Officer: Amarjeet Singh, Email: thehouseofziba@gmail.com
            </li>
          </ul>
        </div>
         <br/>
          <div>
            House of Ziba reserves the right to modify or update this Privacy Policy at any time. Changes will be effective immediately upon posting on this website.
          </div>
      </Container>
      <br/>
      <Footer/>
    </div>
  );
}
