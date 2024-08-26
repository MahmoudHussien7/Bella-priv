// eslint-disable-next-line no-unused-vars
import React from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import ProductDetails from "../assets/Images/about2.jpg";

function Card({ product }) {
  return (
    <div className=" w-[100%] hover:cursor-pointer group relative ">
      <Link to={`/Products/${product.id}`} className="row-span-3">
        <img
          // src={product.image}
          src={ProductDetails}
          alt={`Product Image - ${product.name}`}
          className="w-full h-auto"
        />
        <div
          className="bg-titleColor text-[#fff] grid grid-cols-4 text-center w-[100%]  
        opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="col-span-3 p-3 flex justify-center items-center hover:bg-hovermain hover:text-[white] transition-all duration-200">
            <Link to={`/Products/${product.id}`} className="text-[0.9rem]">
              ADD TO CART
            </Link>
          </div>
          <div
            className="col-span-1 cursor-pointer border-[#4D4D4D] border transition-all duration-200 hover:text-[white] hover:border-hovermain  hover:bg-hovermain  flex justify-center items-center"
            aria-label="Add to Wishlist"
          >
            <CiHeart size={24} />
          </div>
        </div>
      </Link>

      <div className="">
        <h2 className="text-titleColor text-[1rem]  md:text-[1.1rem]  lg:text-[1.3rem] font-light mt-1 hover:text-hovermain transition-all duration-200">
          {product.name}
        </h2>
        <p className="text-hovermain mt-1 text-[0.8rem] lg:text-[1rem]">
          {product.price} EGP
        </p>
      </div>
    </div>
  );
}

export default Card;
