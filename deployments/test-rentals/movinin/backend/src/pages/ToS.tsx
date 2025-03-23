import React from 'react'
import Layout from '@/components/Layout'

import '@/assets/css/tos.css'

const ToS = () => {
  const onLoad = () => { }

  return (
    <Layout onLoad={onLoad} strict>
      <div className="tos">
        <h1>Terms of Service</h1>
        
        <p>Welcome to Axis Affiliates! By accessing our website and using our services, you agree to comply with and be bound by the following Terms of Service. If you do not agree to these terms, please do not use our services.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using our services, you confirm that you have read, understood, and agree to these Terms of Service and our Privacy Policy.</p>

        <h2>2. Use of Our Services</h2>
        <p>You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of our services. This includes compliance with all applicable laws and regulations.</p>

        <h2>3. Reservations and Payments</h2>
        <p>When you make a reservation with Axis Affiliates, you agree to provide accurate and complete information. All payments must be made through our secure payment system. Once payment is completed, you will receive a confirmation of your reservation.</p>

        <h2>4. Cancellation Policy</h2>
        <p>Cancellations made 24 hours before the rental date may be eligible for a full refund. Cancellations made less than 24 hours prior to the rental date may incur a cancellation fee. Please refer to our cancellation policy for detailed information.</p>

        <h2>5. Rental Conditions</h2>
        <p>All rentals are subject to our rental conditions, which include but are not limited to age restrictions and insurance obligations. You are responsible for ensuring that you meet all requirements before making a reservation.</p>

        <h2>6. Limitation of Liability</h2>
        <p>Axis Affiliates shall not be liable for any indirect, incidental, or consequential damages arising out of your use of our services. In no event shall our total liability exceed the amount paid by you for the services.</p>

        <h2>7. Modifications to Terms</h2>
        <p>We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services following any changes constitutes your acceptance of the new terms.</p>

        <h2>8. Governing Law</h2>
        <p>These Terms of Service shall be governed by and construed in accordance with the laws. Any disputes arising out of these terms shall be resolved in the courts.</p>

        <h2>9. Contact Information</h2>
        <p>If you have any questions regarding these Terms of Service, please contact us at jerred@axisaffiliates.com.</p>

        <h2>10. Acknowledgment</h2>
        <p>By using our services, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.</p>
      </div>
    </Layout>
  )
}

export default ToS
