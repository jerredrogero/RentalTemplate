import React from 'react'
import Layout from '@/components/Layout'
import '@/assets/css/home.css'

const Home = () => {
  return (
    <Layout strict={false}>
      <div style={{ 
        padding: '30px', 
        backgroundColor: '#ffffff',
        color: '#000000',
        margin: '30px',
        border: '5px solid red',
        borderRadius: '10px',
        position: 'relative',
        zIndex: 100
      }}>
        <h1>EMERGENCY TEST - HOME PAGE</h1>
        <p>This is a simplified home page for testing display issues</p>
        
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          border: '2px solid blue'
        }}>
          <h2>Search Section Would Be Here</h2>
          <p>If this is visible, then we can start adding back the original content</p>
        </div>
      </div>
    </Layout>
  )
}

export default Home
