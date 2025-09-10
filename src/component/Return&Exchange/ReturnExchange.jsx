import React from 'react'
import NavbarMenu from '../Navbar/NavbarMenu'
import { Container } from "react-bootstrap";
import Footer from '../Footer/Footer';
export default function ReturnExchange() {
  return (
    <div>
    <NavbarMenu/>
 <br />
      <br />
      <br />
      <br />
      <br /> <br />
      <Container>
        <h2>Return, Exchange & Refund Policy</h2>
        <hr />
        <div>
          <h5>Returns</h5>
          <ul>
            <li>
             Returns are accepted within 7 days of delivery, except for custom-made orders.
            </li>
               <li>
           Products must be unused, unwashed, and returned in their original packaging with all tags intact.
            </li>
             <li>
            Custom orders are non-returnable
            </li>
          </ul>

          <h5>Exchanges</h5>
          <ul>
            <li>
             Exchanges are accepted within 7 days of delivery, subject to product availability
            </li>
            <li>
              Custom orders are non-exchangeable.
            </li>

            <li>
             Some products may carry specific return/exchange policies, which are mentioned on the respective product page.
            </li>
          </ul>


           <h5>Refunds</h5>
          <ul>
            <li>
            Refunds will be processed only after the returned product has been received and inspected by our team.
            </li>
            <li>
              Once approved, refunds will be initiated to the original method of payment within 7–10 business days.
            </li>

            <li>
             For Cash on Delivery (COD) orders, refunds will be issued via bank transfer to the customer’s provided account details.
            </li>

              <li>
            Shipping charges, if any, are non-refundable.
            </li>
             <li>
           In case of partial returns, the refund will be processed only for the returned items.
            </li>
             <li>
           If the returned product is found ineligible for refund (used, damaged, or not in original packaging), the product will be returned to the customer and no refund will be issued.
            </li>
             <li>
         Refund timelines may vary depending on the customer’s bank or payment provider
            </li>
          </ul>
          <p>For any queries regarding returns or refunds, please contact us at thehouseofziba@gmail.com or call our customer care number</p>
         <h5>Intellectual Property</h5>
         <ul>
          <li>All content, including product images, designs, logos, text, and graphics, are the intellectual property of House of Ziba. Unauthorized use is strictly prohibited.</li>
         </ul>

          <h5>Limitation of Liability</h5>
         <ul>
          <li>House of Ziba shall not be liable for delays, misuse of products, or indirect damages</li>
         </ul>

          <h5>Force Majeure</h5>
         <ul>
          <li>We are not liable for delays or failures caused by natural disasters, strikes, pandemics, government restrictions, or other events beyond our control</li>
         </ul>

           <h5>Governing Law</h5>
         <ul>
          <li>This Agreement shall be governed by and construed in accordance with the laws of India, and the courts of Chandigarh shall have exclusive jurisdiction.</li>
         </ul>
          </div>
          
          </Container>
         
         <Footer/>
          
    </div>
  )
}
