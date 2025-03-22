import React from 'react'
import Layout from '@/components/Layout'

import '@/assets/css/about.css'

const About = () => {
  const onLoad = () => { }

  return (
    <Layout onLoad={onLoad} strict>
      <div className="about">
        <h1>Axis Affiliates</h1>
        <p>
          Welcome to Axis Affiliates, your trusted partner for convenient and reliable property rental services. 
          Our platform is designed to provide a seamless experience for property owners and renters alike.
        </p>
        <p>
          At Axis Affiliates, we are committed to offering the highest quality service and 
          ensuring that your rental experience is smooth and hassle-free.
        </p>
        <h2>Contact Information</h2>
        <p>Email: jerred@axisaffiliates.com</p>
        <p>Phone: 7064610121</p>
        
        <h2>Connect With Us</h2>
        <div className="social-links">
          <p><a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></p>
          <p><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></p>
          <p><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a></p>
          <p><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </div>
      </div>
    </Layout>
  )
}

export default About
