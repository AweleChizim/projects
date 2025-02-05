import React, { useState } from 'react';
import './Clubs.css';
import next_icon from '../../assets/icons/arrow-right.svg';
import prev_icon from '../../assets/icons/arrow-left.svg';
import chess from '../../assets/chess.jpg';
import dance from '../../assets/dance.jpg';
import drama from '../../assets/drama.jpg';
import film from '../../assets/film.jpg';
import tech from '../../assets/tech.jpg';

const Clubs = () => {
  const images = [
    { src: chess, name: 'Chess Club' },
    { src: drama, name: 'Drama Club' },
    { src: dance, name: 'Dance Club' },
    { src: film, name: 'Film Club' },
    { src: tech, name: 'Tech Club' }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getVisibleImages = () => {
    return [
      images[(startIndex) % images.length],
      images[(startIndex + 1) % images.length],
      images[(startIndex + 2) % images.length]
    ];
  };

  return (
    <div className="clubs">
      <img src={prev_icon} alt="Previous" className="prev-button" onClick={handlePrev} />
      <div className="slider">
        {getVisibleImages().map((image, index) => (
          <div key={index} className="gallery">
            <img src={image.src} alt={image.name} />
            <div className="caption">
              <p>{image.name}</p>
            </div>
          </div>
        ))}
      </div>
      <img src={next_icon} alt="Next" className="next-button" onClick={handleNext} />
    </div>
  );
};

export default Clubs;