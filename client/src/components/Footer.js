import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import '../assets/styles/Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='socialMedia' style={{ opacity: '1' }}>
        <a href='https://instagram.com/' rel='noreferrer' target='_blank'>
          <InstagramIcon />
        </a>
        <a href='https://twitter.com/' rel='noreferrer' target='_blank'>
          <TwitterIcon />
        </a>
        <a href='https://www.facebook.com/' rel='noreferrer' target='_blank'>
          <FacebookIcon />
        </a>
        <a href='https://www.linkedin.com/' rel='noreferrer' target='_blank'>
          <LinkedInIcon />
        </a>
      </div>
      <p> &copy; 2022 samertech.com</p>
    </div>
  );
}

export default Footer;
