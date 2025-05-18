import React from 'react';

const Footer = ({ onOpenModal }) => {
  return (
    <footer className="">
      <div className="absolute bottom-5 px-10 flex items-end w-full">
        <div
          className="flex md:flex-col lg:flex-row items-center gap-7 bg-[#0097B2] lg:px-7 py-3 px-2 rounded-xl cursor-pointer"
          onClick={onOpenModal}
        >
          <img src="/letter.png" className="w-[80px]" />
          <h3 className="font-bold text-center text-white text-[2em] leading-[40px]">
            Ask the Experts <span className="block">a question, and</span> we'll write back!
          </h3>
        </div>

        <div className="flex gap-3 items-center right-10 absolute">
          <img src="/vision.jpg" className="h-[120px]" />
          <img src="/logo3.jpg" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;