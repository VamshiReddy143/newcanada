import React, { useRef, useState } from 'react';

const Header = ({ setModalState }) => {
  // Region data for pins
  const regions = [
    {
      imgSrc: '/gundu.png',
      style: { top: '75%', left: '4%' },
      region: 'WEST COAST',
      title: 'ADAM OLSEN (STHENEP)',
      Question: 'What do the Southern Resident Orcas need to be healthy?',
      videoSrc: '/videos/adam.mp4',
    },
    {
      imgSrc: '/img2.png',
      style: { top: '85%', left: '70%' },
      region: 'OTTAWA',
      title: 'JULIA LAFORAGES-NATURE CANADA',
      Question: 'How can we protect the Orcas home?',
      videoSrc: "/videos/julia.mp4",
    },
    {
      imgSrc: '/img3.png',
      style: { top: '65%', left: '90%' },
      region: 'EAST COAST',
      title: 'REBECCA BRUSHETT - ECOLOGY ACTION CENTER',
    Question: 'What is the Laurentian Channel Marine Protected Area?',
      videoSrc: "/videos/rebecca.mp4",
    },
  ];

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handlePinClick = debounce((regionData) => {
    setModalState({
      isOpen: true,
      title: regionData.title,
      Question: regionData.Question,
      videoSrc: regionData.videoSrc,
      region: regionData.region,
    });
  }, 300);

  return (
    <div className="bg-[#002B6B] text-white px-5 py-10 relative overflow-hidden">
      {/* Title Section */}
      <div className="flex items-start justify-between">
        <h1 className="text-[2em] font-bold leading-[40px] absolute top-10 left-10">
          Click the images to hear <span className="block">from our Ocean Experts</span>
        </h1>
        <div>
          <h1 className="text-[3em] font-extrabold leading-[50px] absolute top-10 right-10">
            CRITICAL<span className="block"> DISTANCE</span>
          </h1>
        </div>
      </div>

      {/* Map and Pins */}
      <div className="flex items-center justify-center pl-20 md:pt-20 lg:pt-0">
        <div className="relative w-[46em]">
          <img src="/map.jpg" className="w-full h-auto" alt="Map" />

          {/* Location Pins */}
          {regions.map((region, index) => (
            <LocationPin
              key={index}
              imgSrc={region.imgSrc}
              style={region.style}
              onClick={() => handlePinClick(region)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LocationPin = ({ imgSrc, style, onClick }) => {
  const pinRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef(null);
  const distance = { x: 15, y: 15 }; // Same as balls

  const handleMouseMove = (e) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPosition(distance);
    }, 10);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{
        ...style,
        transform: `translate(-50%, -100%) translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 200ms ease-in-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      ref={pinRef}
    >
      {/* Circle with border and image */}
      <div
        className="w-30 h-30 rounded-full border-8 border-[#0097B2] bg-white overflow-hidden relative"
        style={{ zIndex: 10 }}
      >
        <img
          src={imgSrc}
          alt="Expert"
          className="w-full h-full object-cover"
        />
      </div>

      {/* The pointed tail */}
      <div
        className="w-10 h-10 border-l-[20px] border-r-[20px] border-t-[24px] border-l-transparent border-r-transparent border-t-[#0097B2]"
        style={{ marginTop: '-4px' }}
      />
    </div>
  );
};

export default Header;