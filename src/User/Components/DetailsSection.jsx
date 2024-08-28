// eslint-disable-next-line no-unused-vars
import React from "react";
import ProductDetails from "../../assets/Images/details.jpg";
import { NavLink } from "react-router-dom";

function Details() {
  return (
    <>
      <div className="grid grid-cols-2 gap-10 px-[7%] py-5 md:py-[3%] md:px-[7%]">
        <div className="bg-slate-400 col-span-2 sm:col-span-1">
          <img src={ProductDetails} alt="aboutUs" className="" />
        </div>
        <div className="col-span-2 sm:col-span-1 px-3 sticky top-5 left-[50%]">
          <h2 className="text-titleColor text-[1.2rem] md:text-[1.5rem] font-light mb-2 md:mb-5 ">
            Rozana nightstand
          </h2>
          <p className="text-hovermain mb-2 md:mb-5">7,900EGP</p>
          <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
            White Zen wood
          </p>
          <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
            Good wood countertops
          </p>
          <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
            Natural veneer
          </p>
          <p className="text-textColor text-[0.8rem] mb-2 md:mb-5">
            Eco-friendly paints
          </p>
          <p className="text-textColor text-[0.8rem] mb-5 md:mb-[3rem]">
            <span className="font-bold text-[0.8rem]">Size:</span> 65 x 46
          </p>
          <div className="flex gap-2 mb-5 md:mb-[5rem]">
            <button className="text-[14px] md:text-[14px] p-[0.3rem] border border-textColor">
              <span className="px-2">-</span> 1 <span className="px-2">+</span>
            </button>
            <button className="text-[12px] md:text-[14px] p-[0.6rem] px-7 border border-hovermain hover:text-[#fff] hover:bg-hovermain">
              ADD TO CART
            </button>
          </div>
          <div>
            <p className="text-titleColor text-[0.8rem]">
              {`Category:`}
              <NavLink to="/Products" className="text-textColor">
                New Arrival
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
