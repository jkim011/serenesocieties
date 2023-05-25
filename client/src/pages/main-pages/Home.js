import React from 'react';
import { Link } from 'react-router-dom';

import modelFront from '../../assets/backgrounds/modelFront.jpg';
import modelBack from '../../assets/backgrounds/modelBack.jpg';
import palmTree from '../../assets/backgrounds/toxicPalmtree.jpg';

import LogoMain from '../../assets/logo/serene-logo-new-main.jpg';
import LogoMainBlack from '../../assets/logo/SereneLogoMainBlack.png';
import IgIcon from '../../assets/icons/ig-icon.png';
import TiktokIcon from '../../assets/icons/tiktok-icon.png';
import FacebookIcon from '../../assets/icons/twitter-icon.png';
import EmailIcon from '../../assets/icons/email-icon.png';

function Home() {
  return (
    <div className='home-container'>
      <img src={modelFront} className='home-pic-left'/>
      <img src={modelBack} className='home-pic-right'/>
      <img src={palmTree} className='home-pic-phone'/>
      
      <div className='home-intro'>
        <Link as={Link} to='/' className='home-image-link'><img src={LogoMainBlack} className='logo-main'/></Link>
        <div className='home-links-section'>
          <Link as={Link} to='/shop' className='home-links'>Shop</Link>
          <Link as={Link} to='/gallery' className='home-links'>Gallery</Link>
          <Link as={Link} to='/lookbook' className='home-links'>Lookbook</Link>
          <Link as={Link} to='/about' className='home-links'>About</Link>
          <a href='/terms-and-conditions' className='terms home-links'>Terms & Conditions</a>
          <div className='social-links'>
          <a href='https://www.instagram.com/serenesocieties/' target="_blank" rel="noreferrer"><img src={IgIcon} className=''/></a>
          <a href='' target="_blank" rel="noreferrer"><img src={TiktokIcon} className=''/></a>
          <a href='' target="_blank" rel="noreferrer"><img src={FacebookIcon} className=''/></a>
          <a href='' target="_blank" rel="noreferrer"><img src={EmailIcon} className=''/></a>
          </div>
        </div>
      </div>

    </div>
  )
}


export default Home;