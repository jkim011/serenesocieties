import React from 'react';
import { Link } from 'react-router-dom';

import Testbackground from '../assets/backgrounds/testbackground.jpg';
import LogoMain from '../assets/logo/serene-logo-new-main.jpg';
import IgIcon from '../assets/icons/ig-icon-darker.png';
import TiktokIcon from '../assets/icons/tiktok-icon-darker.png';
import FacebookIcon from '../assets/icons/twitter-icon-darker.png';

function Home() {
  return (
    <div className='home-container'>
      <div className='home-intro'>
        <Link as={Link} to='/'><img src={LogoMain} className='logo-main'/></Link>
        <div className='home-links-section'>
          <Link as={Link} to='/shop' className='home-links'>Shop</Link>
          <Link as={Link} to='/gallery' className='home-links'>Art Gallery</Link>
          <Link as={Link} to='/shop' className='home-links'>Lookbook</Link>
          <Link as={Link} to='/shop' className='home-links'>About</Link>
          <div className='social-links'>
          <a href='https://www.instagram.com/serenesocieties/' target="_blank" rel="noreferrer"><img src={IgIcon} className=''/></a>
          <a href='' target="_blank" rel="noreferrer"><img src={TiktokIcon} className=''/></a>
          <a href='' target="_blank" rel="noreferrer"><img src={FacebookIcon} className=''/></a>
          </div>
        </div>
      </div>
      
    </div>
  )
}


export default Home;