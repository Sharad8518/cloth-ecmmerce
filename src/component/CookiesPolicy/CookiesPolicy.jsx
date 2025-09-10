import React from 'react'
import NavbarMenu from '../Navbar/NavbarMenu'
import { Container } from 'react-bootstrap'
import Footer from '../Footer/Footer'

export default function CookiesPolicy() {
  return (
    <div>
    <NavbarMenu/>
  <br />
      <br />
      <br />
      <br />
      <br /> <br />
      <Container>
        <h2>Cookies Policy </h2>
        <hr />
        <div>
          <h5>What Are Cookies?</h5>
          <ul>
            <li>
             What Are Cookies?
            </li>
          </ul>

          <h5>How We Use Cookies</h5>
          <ul>
            <li>
             Website functionality
            </li>
            <li>
             Analytics (Google Analytics)
            </li>

            <li>
              Advertising and retargeting (Facebook Pixel, Google Ads)
            </li>
             <li>
              Improving browsing experience
            </li>
          </ul>

          <h5>Consent</h5>
          <div>By using our website, you consent to the use of cookies. Essential cookies are mandatory; non-essential cookies may track browsing behavior.
If you are located in jurisdictions requiring explicit opt-in consent (such as the EU), please discontinue use if you do not agree to this policy 
You can disable cookies through your browser settings; however, some features of our site may not function properly without them</div>
        
          </div>
          <br/>
          <div>
            House of Ziba reserves the right to modify or update this Cookies Policy at any time. Changes will be effective immediately upon posting on this website.
          </div>
          <br/>
          </Container>
          <Footer/>
    </div>
  )
}
