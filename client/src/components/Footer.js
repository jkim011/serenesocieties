import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import IgIcon from '../assets/icons/ig-icon.png';
import TiktokIcon from '../assets/icons/tiktok-icon.png';
import FacebookIcon from '../assets/icons/twitter-icon.png';
import EmailIcon from '../assets/icons/email-icon.png';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  // console.log(window.location.pathname);
  if(window.location.pathname === '/') {
    // navigate(0);
    return (<div></div>)
  } else {
  return (
    <div className='footer-container'>
      <p className='footer-space'>© 2023 Serene</p>
      <a href='/about' className='footer-about footer-space'>About</a>
      <a href='/terms-and-conditions' className='footer-terms footer-space'>Terms & Conditions</a> 

      <div className='footer-space'>
        <a href='https://www.instagram.com/serenesocieties/' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} className='footer-socials'/></a>
        <a href='' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTiktok} className='footer-socials'/></a>
        <a href='' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faXTwitter} className='footer-socials'/></a>
        <a href='' target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faEnvelope} className='footer-socials'/></a>
      </div>
    </div>
  )
}
}


export default Footer;