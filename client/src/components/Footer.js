import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

function Footer() {
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


export default Footer;