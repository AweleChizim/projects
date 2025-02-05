import React from 'react'
import './Hero.css'
import right_arrow from '../../assets/icons/arrow-right.svg'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div className="hero container">
        <div className="hero-text">
            <h1>Simplyfing Your Campus Life</h1>
            <p> With the use of cutting-edge AI technologies UniVerse provides personalized 
            experiences for students and predictive analytics for universities to optimize 
            resources. UniVerse also leverages the Google Maps APIs to aid in navigation 
            within the campus.</p>
            <Link to='academics' smooth={true} offset={-200} duration={500} className='button'>Explore more <img src={right_arrow}/></Link>
        </div>
    </div>
  )
}

export default Hero