import React from 'react';

const Footer = ({ onOpenModal }) => {
  return (
    <footer className="">
      <div className="absolute bottom-5 px-10 flex items-end w-full">
        <div
          className="flex md:flex-col lg:flex-row items-center lg:gap-9 gap-7 bg-[#0097B2] lg:px-7 py-3 px-2 rounded-3xl cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
          onClick={onOpenModal}
        >
          <img
            src="/letter.png"
            className="lg:w-[100px] md:w-[80px] w-[60px] hover:scale-110 hover:rotate-6 transition-transform duration-200 ease-in-out"
          />
          <h3 className="font-bold text-center text-white lg:text-[2.5em] md:text-[2em] leading-[47px]">
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