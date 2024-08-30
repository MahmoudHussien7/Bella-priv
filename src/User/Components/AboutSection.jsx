// eslint-disable-next-line no-unused-vars
import React from "react";
import aboutImg1 from "../../assets/Images/about1.jpg";
import aboutImg2 from "../../assets/Images/about2.jpg";

function About() {
  return (
    <div
      className={`grid grid-cols-6 my-4 md:grid-cols-3 gap-5 justify-center items-center p-3 md:p-5 md:py-[3%] md:px-[7%] px-[7%]`}
    >
      <div className=" col-span-6 md:col-span-1 text-center md:text-start  p-2">
        <div className=" font-Montserrat">

          <h2 className=" text-[14px] md:text-[1.3rem] font-normal leading-[1.4]  text-mainColor mb-2 font-Montserrat letter-spacing">

            ABOUT US
          </h2>
          <p className="capitalize text-titleColor mb-3 text-[1.1rem] font-Montserrat">
            Best furniture at the best price
          </p>
          <p className="text-textColor mb-4 text-[14px] md:text-[1.1rem] font-Montserrat ">
            We are a home furniture manufacturer, mainly engaged in designing,
            manufacturing and selling home furniture products
          </p>
          <button
            className="text-[12px] md:text-[14] p-[0.6rem] px-5 md:p-[0.9rem] md:px-7 relative border border-textColor  
          after:content-[''] after:absolute after:top-[20] after:left-[-18px] after:w-[20%] after:h-[40%] after:bg-[#F7F7F7]  hover:after:opacity-0
          before:content-[''] before:absolute before:top-[20] before:right-[-18px] before:w-[20%] before:h-[40%] before:bg-[#F7F7F7]  hover:before:opacity-0
         transition ease-in duration-300 hover:text-mainColor hover:border-mainColor hover:p-[0.7rem] hover:px-5 md:hover:p-[0.9rem] md:hover:px-7"

          >
            MORE ABOUT US
          </button>
        </div>
      </div>
      <div className="col-span-2  md:col-span-1  relative left-[0rem]  md:relative md:left-[13rem] w-[120%] md:w-[80%] z-3">
        <img src={aboutImg2} alt="aboutUs" className="" />
      </div>
      <div className="col-span-4 md:col-span-1   relative z-5 pr-2">
        <img src={aboutImg1} alt="aboutUs" />
      </div>
    </div>
  );
}
export default About;
