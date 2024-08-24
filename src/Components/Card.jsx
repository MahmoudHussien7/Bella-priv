// eslint-disable-next-line no-unused-vars
import React from "react";
import ProductDetails from "../assets/Images/about2.jpg";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="w-full sm:w-[45%] md:w-[40%] lg:w-[30%] grid grid-rows-3 hover:cursor-pointer group relative m-2 ">
      <Link to="/Products" className="row-span-3">
        <img
          src={ProductDetails}
          alt="Product Image - Rozana Nightstand"
          className="w-full h-auto"
        />
        <div
          className="bg-titleColor text-[#fff] grid grid-cols-4 text-center row-span-1 w-[100%] 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="col-span-3 p-3 flex justify-center items-center hover:bg-hovermain hover:text-[white] transition-all duration-200">
            <Link to="/Products" className="text-[0.9rem]">
              ADD TO CART
            </Link>
          </div>
          <div
            className="col-span-1 cursor-pointer transition-all duration-200 hover:text-[white] hover:bg-hovermain hover:border-white flex justify-center items-center"
            aria-label="Add to Wishlist"
          >
            <CiHeart size={24} />
          </div>
        </div>
      </Link>

      <div className="row-span-1">
        <h2 className="text-titleColor text-[1rem]  md:text-[1.1rem]  lg:text-[1.3rem] font-light mt-1 hover:text-hovermain transition-all duration-200">
          Rozana Nightstand
        </h2>
        <p className="text-hovermain mt-1 text-[0.8rem] lg:text-[1rem]">
          7,900 EGP
        </p>
      </div>
    </div>
  );
}

export default Card;
