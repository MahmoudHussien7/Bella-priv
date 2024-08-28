// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-titleColor text-white">
      <div className="flex flex-col justify-center items-center p-[3%]">
        <div className="mt-3">
          <h2 className="flex justify-center items-center flex-col text-hovermain text-[10px]">
            <Link to="/" className="font-sans text-3xl font-bold">
              Bella
            </Link>
            <span className="text-[9px] font-light">LUXURY YOU DESERVE</span>
          </h2>
        </div>
        <p className="text-[1.3rem] w-[55%] md-[55%] lg:w-70%  p-[1%] text-center font-thin">
          Subscribe to get 10% off your first order
        </p>
      </div>

      <div className="w-full h-[1px] bg-[#4D4D4D]"></div>

      <div className="w-full  flex flex-col md:flex-row justify-between items-center px-[7%] py-[1.5%]">
        <div className="flex gap-3 my-5 lg:m-0">
          <Link
            to="https://web.facebook.com"
            className="border rounded-full border-textColor p-2 text-textColor hover:bg-white  hover:text-titleColor "
          >
            <FaFacebookF size={12} />
          </Link>
          <Link
            to="https://www.instagram.com"
            className="border rounded-full p-2 border-textColor text-textColor hover:bg-white  hover:text-titleColor "
          >
            <FaInstagram size={12} />
          </Link>
        </div>

        <div className="flex gap-10 lg:gap-6">
          <Link
            to="/AboutUs"
            className="text-textColor hover:text-white text-[1.1rem]"
          >
            About Us
          </Link>
          <Link
            to="/Products"
            className="text-textColor hover:text-white text-[1.1rem]"
          >
            Our Policies
          </Link>
          <Link
            to="/contactUs"
            className="text-textColor hover:text-white text-[1.1rem]"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="flex justify-center mt-5 p-2">
        <p className="text-[0.7rem] md:text-[0.8rem] text-textColor">
          COPYRIGHT 2024 © BELLA. ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  );
}

export default Footer;
