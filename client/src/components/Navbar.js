import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import '../assets/styles/Navbar.css';

import menuIcon from '../assets/images/menu-icon.svg';
import closeIcon from '../assets/images/close-icon.svg';

function Navbar() {
  let toggleBtn = useRef();

  useEffect(() => {
    gsap.from('.toggleBtn', { duration: 0.5, x: -150, y: -150, delay: 3.4 });

    // MENU ANIMATION
    var tl = gsap.timeline({ paused: true });

    tl.to('.menu-icon', { duration: 0.8, opacity: 0, rotation: 180 });

    tl.to('.close-icon', { duration: 0.8, opacity: 1, rotation: 180 }, '-=0.9');

    tl.to('.menu', { duration: 0.8, scale: 1 }, '-=1');

    tl.from('.menu li', { duration: 0.8, opacity: 0, x: -100, stagger: 0.4 });

    tl.reverse();

    toggleBtn.current.onclick = function () {
      //console.log('hi');
      tl.reversed(!tl.reversed());
    };
  }, []);

  return (
    <>
      <div className='toggleBtn' ref={toggleBtn}>
        <img className='menu-icon' src={menuIcon} alt='' />
        <img className='close-icon' src={closeIcon} alt='' />
      </div>
      <div className='menu'>
        <nav>
          <ul>
            <li>
              <Link onClick={() => toggleBtn.current.click()} to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => toggleBtn.current.click()} to='/projects'>
                Projects
              </Link>
            </li>
            <li>
              <Link onClick={() => toggleBtn.current.click()} to='/experience'>
                Experience
              </Link>
            </li>
            <li>
              <Link onClick={() => toggleBtn.current.click()} to='/contact'>
                Contact me
              </Link>
            </li>
            <li>
              <Link onClick={() => toggleBtn.current.click()} to='/admin'>
                admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
