import React from 'react';
import Navbar from './navbar';
import './home.css'
import './navbar.css'
import ausIcon from './images/002-australia.png'
import shipIcon from './images/001-delivery-truck.png'
import boxIcon from './images/003-box.png'
import warrantyIcon from './images/004-quality.png'
import appleFeature from './images/home-featured-apple.png'
import samsungFeature from './images/home-featured-samsung.png'
import oppoFeature from './images/home-featured-oppo.png'
import androidFeature from './images/home-featured-android.png'
import Footer from './footer';
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
      <div className='home-page'>
        <Navbar />
        <header className='home-header'>
<div className='hero-content'> 
  <div className='title'><h1>BRANDS THAT STAND THE TEST OF TIME</h1>
  <button className='hero-btn'>SHOP MOBILE PHONES</button>
  </div>
  </div>
        </header>
        <main>
<section className='promo-bar'>
  <div className='bar-box'>
    <img src={ausIcon} alt='Icon of Australia' className='bar-icon'>
    </img>
    <p>AUSTRALIAN STOCK</p>
  </div>
  <div className='bar-box'>
    <img src={shipIcon} alt='Icon of a shipping truck' className='bar-icon'>
    </img>
    <p>FREE SHIPPING OVER $100</p>
  </div>
  <div className='bar-box'>
    <img src={boxIcon} alt='Icon of a box' className='bar-icon'>
    </img>
    <p>AUSTRALIAN STOCK</p>
  </div>
  <div className='bar-box'>
    <img src={warrantyIcon} alt='Icon of a warranty shield' className='bar-icon'>
    </img>
    <p>AUSTRALIAN STOCK</p>
  </div>
</section>
<section className='category-section'>
  <h2>Brands Worth Your Time</h2>
  <div className='category-grid'>
  <div className="grid-container">

  <img src={appleFeature} alt='apple iphone features'className="grid-item"/>

  <img src={samsungFeature} alt='samsung phone features' className="grid-item" />
  <img src={oppoFeature} alt='oppo phone features'className="grid-item"/>
 
  <img src={androidFeature} alt='android phone features'className="grid-item"/>
    </div>
    </div>
</section>
        </main>
        <Footer />
      </div>
      
    
    
 
    );
  }
  
  export default HomePage;