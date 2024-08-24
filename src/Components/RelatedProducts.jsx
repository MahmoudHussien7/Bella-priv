// eslint-disable-next-line no-unused-vars
import React from "react";
import Card from "../Components/Card";

function RelatedProducts() {
  return (
    <div className="px-[7%] py-5 md:py-[3%] md:px-[7%]">
      <h2 className="text-titleColor text-[1.3rem] md:text-[1.6rem]  mb-2 md:mb-5 font-semibold ">
        Related Products
      </h2>
      <div className="Related Products flex gab-5">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default RelatedProducts;
