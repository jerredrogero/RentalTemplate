import React from 'react'
import Layout from '@/components/Layout'

import '@/assets/css/contact.css'

const Contact = () => {
  const onLoad = () => { }

  return (
    <Layout onLoad={onLoad} strict>
      <div className="contact">
        <h1>Contact Us</h1>
        
        <p>Thank you for your interest in Axis Affiliates. We are here to help with any questions or concerns you may have about our services.</p>
        
        <h2>Get in Touch</h2>
        <div className="contact-info">
          <p><strong>Email:</strong> <a href="mailto:jerred@axisaffiliates.com">jerred@axisaffiliates.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:7064610121">7064610121</a></p>
        </div>
        
        <h2>Connect With Us</h2>
        <div className="social-links">
          <p><strong>Facebook:</strong> <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">https://facebook.com/</a></p>
          <p><strong>Instagram:</strong> <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">https://instagram.com/</a></p>
          <p><strong>Twitter:</strong> <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">https://twitter.com/</a></p>
          <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">https://linkedin.com/</a></p>
        </div>
        
        <h2>Business Hours</h2>
        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
        <p>Saturday - Sunday: Closed</p>
      </div>
    </Layout>
  )
}

export default Contact
