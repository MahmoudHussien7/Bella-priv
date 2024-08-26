// eslint-disable-next-line no-unused-vars
import React from "react";
import imgCatogeryBg from "../assets/Images/Catogery.jpg";
import Catogery from "./catogery";

function CategorySection() {
  return (
    <div>
      <div
        className="bg-center bg-cover pb-[5%]"
        style={{
          backgroundImage: `url(${imgCatogeryBg})`,
        }}
      >
        <div className="flex justify-between items-center px-[6%] py-[5%] text-white">
          <div className="flex items-center space-x-4">
            <img src="/triangle.svg" alt="Icon" className="w-8 h-8" />
            <h2 className="text-white text-[1.8rem] md:text-[2rem]  leading-4 font-montserrat">
              Choose A Category
            </h2>
          </div>
          <p className="text-sm  w-[30%]  font-montserrat text-14 leading-7 opacity-0 lg:opacity-100 ">
            Your place to get one-of-a-kind furniture pieces along with our home
            styling, and consultancy services.
          </p>
        </div>

        <Catogery />
      </div>
    </div>
  );
}

export default CategorySection;
