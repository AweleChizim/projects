import React, { useEffect, useState } from 'react'
import './NavBar.css'
import logo2 from '../../assets/logo2-no-bg.png'
import menu_icon from '../../assets/icons/menu-icon.png'
import { Link } from 'react-scroll';

const NavBar = () => {
  const [darkNavbar, setDarkNavbar] = useState(false);
  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 50 ? setDarkNavbar(true) : setDarkNavbar(false)
    })
  },[]);

  const [menu, setMenu] = useState(false);
  const toggleMenu = ()=>{
    menu ? setMenu(false) : setMenu(true);
  }

  return (
    <nav className={`container ${darkNavbar? `dark-navbar`: ``}`}>
        <img src={logo2} alt='The logo of UniVerse' className='logo2'/>
        <ul className={menu?'':'hide-menu'}>
            <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='academics' smooth={true} offset={-200} duration={500}>Academics</Link></li>
            <li><Link to='map' smooth={true} offset={-200} duration={500}>Campus Map</Link></li>
            <li><Link to='clubs' smooth={true} offset={-200} duration={500}>Clubs</Link></li>
            <li><Link to='events' smooth={true} offset={-200} duration={500}>Events</Link></li>
            {/* <li><Link to='hero' smooth={true} offset={0} duration={500} className='button'>Help</Link></li> */}
        </ul>
        <img src={menu_icon} alt='' className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default NavBar