

const Header = ({ setModalState }) => {
  // Region data for pins
 const regions = [
    {
      imgSrc: '/gundu.png',
      style: { top: '71%', left: '3.5%' },
      region: 'WEST COAST',
      title: 'ADAM OLSEN (SŦHENEP)',
      Question: 'What do the Southern Resident Orcas need to be healthy?',
      videoSrc: '/videos/adam.mp4',
    },
    {
      imgSrc: '/img2.png',
      style: { top: '91%', left: '71%' },
      region: 'OTTAWA',
      title: 'JULIA LAFORAGES-NATURE CANADA',
      Question: "How can we protect the Orcas' home?",
      videoSrc: "/videos/julia.mp4",
    },
    {
      imgSrc: '/img3.png',
      style: { top: '67%', left: '91%' },
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
<h1 className="text-xl sm:text-2xl md:text-[2em] lg:text-[2.6em] font-bold absolute top-4 left-4">

          Click the images to hear <span className="block">from our Ocean Experts</span>
        </h1>
        <div>
<img src="/logo.png" className="w-[150px] md:w-[300px] lg:w-[350px] absolute top-4 right-4" />

        </div>
      </div>

      {/* Map and Pins */}
      <div className="flex items-center justify-center lg:pl-20 md:pt-50 lg:pt-0   md:ml-10 ">
      <div className="relative w-full max-w-[800px] mx-auto">

<img
  src="/map.jpg"
  className="w-full h-auto aspect-[4/3]" // maintains consistent ratio
  alt="Map"
/>


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
  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
      style={{
        ...style,
        transform: 'translate(-50%, -100%)', // Keep pin anchored at its position
      }}
      onClick={onClick}
    >
      {/* Circle with border and image */}
      <div
        className="lg:w-50 lg:h-50 md:w-40 md:h-40 w-32 h-32 rounded-full border-8 border-[#0097B2] bg-white overflow-hidden relative"
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